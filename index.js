const app = require('express')();
const Twitter = require('twitter');
const cors = require('cors');
const bodyParser = require('body-parser');

const keys = require('./config/keys');
const { parseTweet } = require('./utils/utils');

// Socket.io
const http = require('http');
const socketIO = require('socket.io');
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: keys.ORIGIN,
    methods: ['GET', 'POST'],
  },
});

const dotenv = require('dotenv');
dotenv.config();
app.use(cors());
const jsonParser = bodyParser.json();

const twitter = new Twitter({
  consumer_key: keys.TWITTER_API_KEY,
  consumer_secret: keys.TWITTER_API_SECRET,
  access_token_key: keys.TWITTER_ACCESS_TOKEN,
  access_token_secret: keys.TWITTER_ACCESS_TOKEN_SECRET,
});

let twitterStream;

const startStream = (streamQuery) => {
  twitter.stream(
    'statuses/filter',
    {
      track: streamQuery,
    },
    (stream) => {
      stream.on('data', async (tweet) => {
        const data = await parseTweet(tweet);
        sendTweet(data);
      });

      twitterStream = stream;
    }
  );
};

const sendTweet = (tweet) => {
  if (tweet.text.includes('RT')) {
    return;
  }

  io.emit('tweet', tweet);
};

app.post('/api/startStream', jsonParser, (req, res) => {
  const streamQuery = req.body.streamQuery;
  startStream(streamQuery);
  return res.status(200).json(`Streaming started for: "${streamQuery}"`);
});

app.post('/api/stopStream', (req, res) => {
  twitterStream.destroy();
  return res.status(200).json('Streaming stopped');
});

io.on('connection', () => console.log('Client connected'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = keys.PORT;
server.listen(port, () => console.log(`Listening on port ${port}`));
