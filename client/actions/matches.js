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
    })
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

export const cancelMatch = (match) => (dispatch) => {
  match.accepted = false;
  match.rejected = true;
console.log()
  return request
    .put(`/api/matches/${match._id}`, match)
    .then(({data}) => {
      dispatch({
        type: 'MATCH_CANCELED',
        payload: data
      })
    })
    .catch((error) => {
      dispatch(httpError(error))
    })
}

export const acceptMatch = (match) => (dispatch) => {
  match.accepted = true;
  match.rejected = false;

  return request
    .put(`/api/matches/${match._id}`, match)
    .then(({data}) => {
      dispatch(routeActions.push(`/match/${match._id}`))
    })
    .catch((error) => {
      dispatch(httpError(error))
    })

}