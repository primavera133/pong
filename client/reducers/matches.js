import {handleActions} from 'redux-actions';

export default handleActions({
  RECEIVE_MATCHES: (state, action) => ({
    ...state,
    list: action.payload
  }),

  CHOOSE_OPPONENT: (state, action) => {
    return {
      ...state,
      opponent: action.payload
    }
  }
}, {
  list: [],
  opponent: ''
});
