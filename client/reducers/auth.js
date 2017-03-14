import {handleActions} from 'redux-actions';

const initialState = {
  email: '',
  scope: null,
  session: []
};

export default handleActions({
  AUTH_LOGIN: (state, action) => ({
    ...state,
    ...action.payload
  }),

  AUTH_INFO: (state, action) => {
    return ({
      ...state,
      ...action.payload
    })
  },

  AUTH_SESSION: (state, action) => ({
    ...state,
    ...action.payload
  }),

  AUTH_LOGOUT: (state, action) => initialState
}, initialState);
