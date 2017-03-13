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

    if (error.response.status === 409) {
      dispatch(showDanger(t('danger.keyConflict')));
      return;
    }
  }

  return dispatch(showDanger(t('danger.generalError')));
};
