import {matchTurn}from '../../../actions/matches';

export const throwDwarf = (match, auth) => (dispatch) => {
  const action = {matchId: match._id, throw: true, thrower: auth._id}

  dispatch(matchTurn(action));
}