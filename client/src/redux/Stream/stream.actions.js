import axios from 'axios';
import { START_STREAM, STOP_STREAM } from './stream.types';

export const startStream = (streamQuery) => async (dispatch) => {
  const res = await axios.post('/api/startStream', {
    streamQuery,
  });
  dispatch({ type: START_STREAM });
  return res.data;
};

export const stopStream = () => async (dispatch) => {
  const res = await axios.post('/api/stopStream');
  dispatch({ type: STOP_STREAM });
  return res.data;
};
