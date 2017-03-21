import {handleActions} from 'redux-actions';

export default handleActions({
  RECEIVE_GAMES: (state, action) => ({
    ...state,
    list: action.payload
  }),
}, {
  list: []
});
