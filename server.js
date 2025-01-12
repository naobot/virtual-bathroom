import dotenv from 'dotenv'
import express from 'express';
import pkg from 'body-parser';
const { urlencoded, json } = pkg;
import cors from 'cors';
import Pusher from 'pusher';
import Datastore from 'nedb';

dotenv.config({ path: '.env' });

const app = express();

const db = new Datastore();

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

app.get('/', (req, res) => {
  db.find({}, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    }
  });
});

app.post('/pusher/auth', (req, res) => {
  console.log('Auth endpoint hit');
  // console.log('Body:', req.body);
  // console.log('Socket ID:', req.body.socket_id);
  // console.log('Channel:', req.body.channel_name);
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var presenceData = {
    user_id: Math.floor(Math.random() * 1000000000), // random enough
    user_info: {
      entry_time: Date.now(),
      isSpy: req.body.isSpy == 'true',
    }
  };
  var authRes = pusher.authorizeChannel(socketId, channel, presenceData);
  res.send(authRes);
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