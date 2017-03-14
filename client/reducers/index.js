import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import auth from './auth';
import alert from './alert'
import items from './items'

export default combineReducers({
  auth,
  routeReducer,
  alert,
  items
})
