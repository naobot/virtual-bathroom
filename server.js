import dotenv from 'dotenv';
import express from 'express';
import pkg from 'body-parser';
const { urlencoded, json } = pkg;
import cors from 'cors';
import Pusher from 'pusher';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: '.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

const allowedOrigins = [
  'http://localhost:3000',
  'https://virtual-bathroom.herokuapp.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(urlencoded({ extended: false }));
app.use(json());

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'), (err) => {
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

app.get('/graffiti', async (req, res) => {
  const { data, error } = await supabase
    .from('doodles')
    .select('image_url');

  if (error) return res.status(500).send(error);

  const shaped = data.map(row => ({ canvasImage: row.image_url }));
  res.json(shaped);
});

app.post('/draw', async (req, res) => {
  const base64 = req.body.canvasImage;

  // Strip the data URL header (e.g. "data:image/png;base64,") to get raw base64
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  const filename = `doodle-${Date.now()}.png`;

  const { error: uploadError } = await supabase.storage
    .from('graffiti')
    .upload(filename, buffer, { contentType: 'image/png' });

  if (uploadError) return res.status(500).send(uploadError);

  const { data: { publicUrl } } = supabase.storage
    .from('graffiti')
    .getPublicUrl(filename);

  const { error: insertError } = await supabase
    .from('doodles')
    .insert({ image_url: publicUrl });

  if (insertError) return res.status(500).send(insertError);

  res.status(200).send('OK');
});

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