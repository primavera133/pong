import * as request from 'axios';
import { routeActions } from 'redux-simple-router'
import { httpError } from '../../../client/actions/error';

export const getGameState = (matchId, playerId) => (dispatch) => {
  return request
    .get(`/api/games/dwarfthrow/${matchId}/${playerId}`)
    .then(({ data }) => {
      /*
       dispatch({
       type: 'RECEIVE_GAMES',
       payload: data
       })
       */
    })
    .catch((error) => {
      dispatch(httpError(error))
    });
}


