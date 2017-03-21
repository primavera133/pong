import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import auth from './auth';
import alert from './alert'
import friends from './friends'
import matches from './matches'
import games from './games'
import items from './items'

export default combineReducers({
  auth,
  routeReducer,
  alert,
  friends,
  matches,
  games,
  items
})
