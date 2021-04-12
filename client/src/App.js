import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';
import axios from 'axios';

import Header from './components/Header';
import TweetCard from './components/TweetCard';
import StreamInput from './components/StreamInput';

axios.defaults.headers.common['Access-Control-Allow-Origin'] =
  process.env.REACT_APP_AXIOS_BASE_URL;
axios.defaults.baseURL = process.env.REACT_APP_AXIOS_BASE_URL;

function App() {
  const [tweets, setTweets] = useState([]);

  const socket = socketIOClient(process.env.REACT_APP_AXIOS_BASE_URL);

  useEffect(() => {
    socket.on('connection', () => {
      console.log('Server');
    });

    socket.on('tweet', (tweet) => {
      setTweets((tweets) => [...tweets, tweet]);
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <StreamInput />
      <div className="tweets-container">
        {tweets.reverse().map((tweet, i) => (
          <TweetCard key={i} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}

export default App;
