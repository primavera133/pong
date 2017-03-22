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
  },

  MATCH_CANCELED: (state, action) => {
    /*
     const matches = state.list.map(match => {
     if (match._id === action.payload._id) {
     return action.payload
     }
     return match
     })

     */
    state.list[state.list.findIndex(match => match._id === action.match._id)] = action.payload
    return state
  }
}, {
  list: [],
  opponent: ''
});
