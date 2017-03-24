import * as request from 'axios';
import {routeActions} from 'redux-simple-router'
import {httpError} from './error';

export const signUp = (payload, path) => (dispatch) => {
  return request
    .post('/api/players', payload)
    .then(({data}) => {
    	console.log(1111, data)
      dispatch(routeActions.push(path))
    })
    .catch((error) => {
      dispatch(httpError(error))
    });
}
