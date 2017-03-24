import {handleActions} from 'redux-actions';

export default handleActions({
  RECEIVE_MATCH: (state, action) => ({
    ...state,
    match: action.payload
  }),
  RECEIVE_MATCHES: (state, action) => ({
    ...state,
    list: action.payload
  }),

  CHOOSE_OPPONENT: (state, action) => {
    return {
      ...state,
      opponent: action.payload
    }
  },

  MATCH_UPDATED: (state, action) => {
    return Object.assign({}, state, {
      list: state.list.map((match, index) => {
        if (match._id === action.payload._id) {
          return Object.assign({}, action.payload)
        }
        return match
      })
    })
  }
}, {
  list: [],
  opponent: ''
});
