import * as request from 'axios';
import {routeActions} from 'redux-simple-router'
import {httpError} from './error';

export const loadGames = () => (dispatch) => {
  return request
    .get('/api/games')
    .then(({data}) => {
      dispatch({
        type: 'RECEIVE_GAMES',
        payload: data
      })
    })
    .catch((error) => {
      dispatch(httpError(error))
    });
}