require('dotenv').config({ path: '.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');
const path = require('path');

import words from ''

const app = express();

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

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
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