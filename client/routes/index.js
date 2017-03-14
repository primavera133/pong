import store from '../store';
import { ping, logout } from '../actions/auth';

export const requireAuth = (nextState, replace, callback) => {
	store.dispatch(ping())
		.catch((error) => {
			if (error.response && error.response.status === 401) {
				store.dispatch(logout());
			}
		})
		.then(callback);
};
