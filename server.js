require('dotenv').config({ path: '.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');
const Datastore = require('nedb');
const mysql = require('mysql');
const path = require('path');
const FormData = require('form-data');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const app = express();

const db = new Datastore();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

aws.config.update({
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId,
  region: 'us-east-2',
  useAccelerateEndpoint: false,
});

var s3 = new aws.S3();

var dbHost, dbUser, dbPass;

if (process.env.NODE_ENV === 'development') {
  dbHost = 'localhost';
  dbUser = 'root';
  dbPass = process.env.LOCALDB_PASSWORD;
  dbName = 'bathroom';
}
else {
  dbHost = process.env.DB_HOST;
  dbUser = process.env.DB_USER;
  dbPass = process.env.DB_PASS;
  dbPort = process.env.DB_PORT;
  dbName = process.env.DB_NAME;
}

let connection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPass,
  database: dbName
})

connection.connect((err) => {
  if (err) {
    return console.error(`error: ${err}`);
  }
  console.log('Connected to MySQL server.');
})

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'virtual-bathroom-assets',
    key: function(req, file, cb) {
      console.log(file);
      cb(null, Date.now());
    }
  })
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/graffiti', (req, res) => {
  // db.find({}, (err, data) => {
  //   if (err) return res.status(500).send(err);
  //   res.json(data);
  // });
});

app.post('/upload', upload.array('upl',1), (req, res, next) => {
  console.log(res);
  res.send('OK');
});

app.get('/freeourpee', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'freeourpee.html'));
})

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

app.post('/pusher/auth', (req, res) => {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var presenceData = {
    user_id: Math.floor(Math.random() * 1000000000), // random enough
    user_info: {
      entry_time: Date.now(),
      isSpy: req.body.isSpy == 'true',
    }
  };
  var auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

const awsParams = {
  Bucket: "virtual-bathroom-assets",
  Key: 'canvas-uploads',
  Expires: 60*60, // expiry time
  ACL: "bucket-owner-full-control",
  ContentType: "image/png" 
};

// api endpoint to get signed url
app.get("/get-signed-url", (req, res) => {
  const fileurls = [];
  s3.getSignedUrl("putObject", awsParams, function(err, url) {
    if (err) {
      console.log("Error getting presigned url from AWS S3");
      res.json({
        success: false,
        message: "Pre-Signed URL error",
        urls: fileurls
      });
    } else {
      fileurls[0] = url;
      console.log("Presigned URL: ", fileurls[0]);
      res.json({
        success: true,
        message: "AWS SDK S3 Pre-signed urls generated successfully.",
        urls: fileurls
      });
    }
  });
});

app.post('/message', (req, res) => {
  const payload = req.body;
  const channel = req.body.channel_name;
  pusher.trigger(channel, 'message', payload);
  res.send(payload);
});

// create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });