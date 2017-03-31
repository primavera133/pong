import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import socketio from './socketio';
import auth from './auth';
import alert from './alert'
import friends from './friends'
import matches from './matches'
import games from './games'

export default combineReducers({
  socketio,
  auth,
  routeReducer,
  alert,
  friends,
  matches,
  games
})
