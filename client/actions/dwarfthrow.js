import {matchTurn} from './matches'

export const throwDwarf = (match, auth) => (dispatch) => {
  dispatch(matchTurn({matchId: match._id, throw: true, thrower: auth._id}))
}
