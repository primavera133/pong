import * as request from 'axios';
import {routeActions} from 'redux-simple-router'
import {httpError} from './error';

export const loadMatchList = () => (dispatch) => {
  return request
    .get('/api/matches')
    .then(({data}) => {
      dispatch({
        type: 'RECEIVE_MATCHES',
        payload: data
      })
    })
    .catch((error) => {
      dispatch(httpError(error))
    });
}

export const startMatch = (opponent, game) => (dispatch) => {
  return request
    .post('/api/matches', {opponent, game})
    .then(({data}) => {
      dispatch(routeActions.push(`/matches`))
    })
    .catch((error) => {
      dispatch(httpError(error))
    })
}

export const chooseOpponent = (opponent) => (dispatch) => {
  dispatch({
    type: 'CHOOSE_OPPONENT',
    payload: opponent
  })
}