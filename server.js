import dotenv from 'dotenv';
import express from 'express';
import pkg from 'body-parser';
const { urlencoded, json } = pkg;
import cors from 'cors';
import Pusher from 'pusher';
import Datastore from 'nedb';

dotenv.config({ path: '.env' });

const app = express();

const db = new Datastore();

var dbHost, dbUser, dbPass, dbPort, dbName;

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

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(urlencoded({ extended: false }));
app.use(json());

// app.get('/', (req, res) => {
//   db.find({}, (err, data) => {
//     if (err) {
//       return res.status(500).send(err);
//     }
//   });
// });

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'build', 'index.html'), (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error loading page');
      }
    });
  } catch (error) {
    console.error('Root route error:', error);
    res.status(500).send('Server error');
  }
});

app.get('/graffiti', (req, res) => {
  db.find({}, (err, data) => {
    if (err) return res.status(500).send(err);
    res.json(data);
  });
});

app.post('/draw', (req, res) => {
  db.insert(Object.assign({}, req.body), (err, newCanvas) => {
    if (err) { return res.status(500).send(err); }
    res.status(200).send('OK');
  });
})

app.get('/freeourpee', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'freeourpee.html'));
});

app.get('//freeourpee', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'freeourpee.html'));
});

app.post('/pusher/auth', (req, res) => {
  try {
    console.log('Auth endpoint hit with socket_id:', req.body.socket_id);
    console.log('Channel requested:', req.body.channel_name);

    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const presenceData = {
      user_id: Math.floor(Math.random() * 1000000000),
      user_info: {
        entry_time: Date.now(),
        isSpy: req.body.isSpy === 'true',
      }
    };

    const authRes = pusher.authorizeChannel(socketId, channel, presenceData);
    console.log('Auth successful');
    res.send(authRes);
  } catch (error) {
    console.error('Pusher auth error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/message', (req, res) => {
  console.log('Message endpoint hit');
  const payload = req.body;
  const channel = req.body.channel_name;
  pusher.trigger(channel, 'message', payload);
  res.send(payload);
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

app.use((req, res) => {
  console.log('404 hit for path:', req.path);
  res.status(404).send('Not Found');
});