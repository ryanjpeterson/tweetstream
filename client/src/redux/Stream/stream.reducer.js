import { START_STREAM, STOP_STREAM } from './stream.types';

const INITIAL_STATE = {
  streaming: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_STREAM:
      return {
        ...state,
        streaming: true,
      };
    case STOP_STREAM:
      return {
        ...state,
        streaming: false,
      };
    default:
      return {
        ...state,
        streaming: false,
      };
  }
};

export default reducer;
