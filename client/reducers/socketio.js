import {handleActions} from 'redux-actions';

export default handleActions({
  RECEIVE_IO: (state, action) => {
    console.log('RECEIVE_IO', action.data)
    return ({
      ...state,
      data: action.data
    })
  }
}, {
  data: {}
});
