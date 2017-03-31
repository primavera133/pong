import {handleActions} from 'redux-actions';

export default handleActions({
  RECEIVE_ROOM_BROADCAST: (state, action) => {
    return ({
      ...state,
      action: JSON.parse(action.data)
    })
  },

  RECEIVE_ROOM_EMIT: (state, action) => {
    return ({
      ...state,
      action: JSON.parse(action.data)
    })
  }
}, {
  action: {}
});
