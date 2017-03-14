import { handleActions } from 'redux-actions';

export default handleActions({
	SHOW_SUCCESS: (state, action) => {
		return {
			...state,
			message: action.payload,
			type: 'success'
		};
	},
	SHOW_WARNING: (state, action) => {
		return {
			...state,
			message: action.payload,
			type: 'warning'
		};
	},
	SHOW_DANGER: (state, action) => {
		return {
			...state,
			message: action.payload,
			type: 'danger'
		};
	},
	SHOW_INFO: (state, action) => {
		return {
			...state,
			message: action.payload,
			type: 'info'
		};
	}
}, {
	message: ''
});
