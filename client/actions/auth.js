import * as request from 'axios';
import i18n from '../config/i18n';
import {routeActions} from 'redux-simple-router'
import {httpError} from './error';
import { showSuccess, showDanger } from './alert';

const t = i18n.getFixedT(null, 'alerts');

export const signIn = (credentials, path) => (dispatch) => {
  return request
    .post('/auth/login', credentials)
    .then(({data}) => {
      dispatch(routeActions.push(path));
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        return dispatch(showDanger(t('danger.invalidAuth')));
      }

      dispatch(httpError(error));
    });
}

export const signOut = (path) => (dispatch) => {
  return request
    .get('/auth/logout')
    .then(({data}) => {
      dispatch({
        type: 'AUTH_LOGOUT',
        payload: data
      });
      dispatch(showSuccess(t('success.logout')));
      dispatch(gotoLogin());
    })
    .catch((error) => dispatch(httpError(error)));
}

export const gotoLogin = () => (dispatch) => {
  dispatch(routeActions.replace('/login'));
}

export const ping = () => (dispatch) => {
  return request
    .get('/auth/ping')
    .then(({data}) => {
      dispatch({
        type: 'AUTH_INFO',
        payload: data
      });
    });
};
