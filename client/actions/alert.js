import { createAction } from 'redux-actions';

export const showSuccess = createAction('SHOW_SUCCESS');
export const showWarning = createAction('SHOW_WARNING');
export const showDanger = createAction('SHOW_DANGER');
export const showInfo = createAction('SHOW_INFO');
