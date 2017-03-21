import i18n from '../config/i18n';
import {routeActions} from 'redux-simple-router';
import {gotoLogin} from './auth';
import {showDanger, showWarning} from './alert';

const t = i18n.getFixedT(null, 'alerts');

export const httpError = (error) => (dispatch) => {
  if (error.response) {
    if (error.response.status === 401) {
      dispatch(showDanger(t('warning.loggedOut')));
      dispatch(gotoLogin());
      return;
    }

    if (error.response.status === 403) {
      dispatch(showDanger(t('danger.noPermissions')));
      return;
    }

    if (error.response.status === 404) {
      dispatch(routeActions.push('/admin/404'));
      return;
    }

    if (error.response.status === 417) {
      dispatch(showDanger(t('danger.invalidAuth')));
      return;
    }

    if (error.response.status === 409) {
      if (error.response) {
        if (error.response.data.code === 11000) {
          if(error.response.data.field ==='name'){
            return dispatch(showDanger(t('danger.keyConflict.username')));
          }
          if(error.response.data.field ==='email'){
            return dispatch(showDanger(t('danger.keyConflict.email')));
          }
        }
      }
      dispatch(showDanger(t('danger.keyConflict.default')));
      return;
    }
  }
console.log(222222, error)
  return dispatch(showDanger(t('danger.generalError')));
};
