require('dotenv').config({ path: '.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');
const Datastore = require('nedb');

const app = express();

const db = new Datastore();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});
// pusher.trigger('my-channel', 'my-event', {"message": "hello world"});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  db.find({}, (err, data) => {
    if (err) {
      return res.status(500).send(err);
      res.json(data);
    }
  });
});

app.post('/comment', (req, res) => {
  db.insert(Object.assign({}, req.body), (err, newComment) => {
    if (err) {
      return res.status(500).send(err);
    }
    pusher.trigger('comments', 'new-comment', {
      comment: newComment,
    });
    res.status(200).send('OK');
  });
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

// app.post('/pusher/auth', (req, res) => {
//   var socketId = req.body.socket_id;
//   var channel = req.body.channel_name;
//   var presenceData = {
//     user_id: 'unique_user_id',
//     user_info: {
//       name: 'Mr Channels',
//       twitter_id: '@pusher'
//     }
//   };
//   var auth = pusher.authenticate(socketId, channel, presenceData);
//   res.send(auth);
// });

app.post('/vote', (req, res) => {
  const { id, vote } = req.body;
  db.findOne({ _id: id }, function (err, doc) {
    if (err) {
      return res.status(500).send(err);
    }
    db.update({ _id: id }, { $set: { votes: doc.votes + vote } }, { returnUpdatedDocs: true }, (err, num, updatedDoc) => {
      if (err) {
        return res.status(500).send(err);
      }
      pusher.trigger('comments', 'new-vote', {
        comment: updatedDoc,
      });
    });
  });
});

// create a GET route
// app.get('/express_backend', (req, res) => {
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
// });