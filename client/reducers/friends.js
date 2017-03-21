import {handleActions} from 'redux-actions';

export default handleActions({
  RECEIVE_FRIENDS: (state, action) => ({
    ...state,
    list: action.payload
  }),
  FIND_FRIENDS: (state, action) => ({
    ...state,
    suggestions: action.payload
  }),
}, {
  list: [],
  suggestions: []
});
