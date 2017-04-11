import * as request from 'axios';
import {routeActions} from 'redux-simple-router'
import {httpError} from './error';

export const signUp = (payload, path) => (dispatch) => {
  return request
    .post('/api/players', payload)
    .then(({data}) => {
      dispatch(routeActions.push(path))
    })
    .catch((error) => {
      dispatch(httpError(error))
    });
}

export const updateAccount = (id, payload, path) => (dispatch) => {
  return request
    .put(`/api/player/${id}`, payload)
    .then(({data}) => {
      dispatch(routeActions.push(path))
    })
    .catch((error) => {
      dispatch(httpError(error))
    });
}

