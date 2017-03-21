import * as request from 'axios';
import {routeActions} from 'redux-simple-router'
import {httpError} from './error';

export const loadFriends = () => (dispatch) => {
  return request
    .get('/api/players/friends')
    .then(({data}) => {
      dispatch({
        type: 'RECEIVE_FRIENDS',
        payload: data
      })
    })
    .catch((error) => {
      dispatch(httpError(error))
    });
}
export const findFriend = (name) => (dispatch) => {
  return request
    .get(`/api/player/findbyname/${name}`)
    .then(({data}) => {
      dispatch({
        type: 'FIND_FRIENDS',
        payload: data
      })
    })
    .catch((error) => {
      dispatch(httpError(error))
    });
}
