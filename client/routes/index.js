import store from '../store';
import { ping, logout } from '../actions/auth';
import { loadMatch } from '../actions/matches';

export const updateMatch = (nextState, replace, callback) => {
  store.dispatch(ping())
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        store.dispatch(logout());
      }
    })
    .then(() => {
      return store.dispatch(loadMatch(nextState.params.id))
    })
    .then(callback);
};

export const requireAuth = (nextState, replace, callback) => {
	store.dispatch(ping())
		.catch((error) => {
			if (error.response && error.response.status === 401) {
				store.dispatch(logout());
			}
		})
		.then(callback);
};
