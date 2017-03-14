import * as request from 'axios';
import i18n from '../config/i18n';
import {routeActions} from 'redux-simple-router'
import { httpError } from './error';

const t = i18n.getFixedT(null, 'alerts');

export const signIn = (credentials, path) => (dispatch) => {
  return request
    .post('/auth/login', credentials)
    .then(({ data }) => {
      dispatch(routeActions.push(path));
    })
    .catch((error) => dispatch(httpError(error)));
}

export const signOut = (path) => (dispatch) => {
  const request = new XMLHttpRequest()
  request.open('GET', '/auth/logout', true)
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      dispatch(routeActions.push(path))
    }
  }
  request.send()
}

export const gotoLogin = () => (dispatch) => {
  dispatch(routeActions.replace('/authenticate'));
}