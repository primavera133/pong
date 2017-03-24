import { handleActions } from 'redux-actions';

export default handleActions({
  RECEIVE_GAMES: (state, action) => ({
    ...state,
    list: action.payload
  }),
  RECEIVE_GAME: (state, action) => {
    console.log(action)
    return ({
      ...state,
      game: action.payload
    })
  },
}, {
  list: [],
  game: {}
});
