import {matchTurn}from '../../../actions/matches'
import uuid from 'uuid'

export const throwDwarf = (match, auth) => (dispatch) => {
  dispatch(matchTurn({matchId: match._id, throw: true, thrower: auth._id}))

  dispatch({type: 'server/room/broadcast', data: {_id: uuid.v4(), room: match._id, command: 'update'}})
}
