import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import alert from './alert'
import items from './items'

export default combineReducers({
  routeReducer,
  alert,
  items
})
