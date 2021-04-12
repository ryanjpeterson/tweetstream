import { combineReducers } from 'redux';

import streamReducer from './Stream/stream.reducer';

const rootReducer = combineReducers({
  stream: streamReducer,
});

export default rootReducer;
