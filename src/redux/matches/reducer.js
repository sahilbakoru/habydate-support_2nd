import actions from './actions';

const initState = {
	list: [],
	reportedUser: [],
	loading: false,
	error: null,
};

export function matchesReducer(state = initState, action) {
	switch (action.type) {
		case actions.GET_ALL_MATCHES:
			return { ...state, loading: true };
		case actions.GET_ALL_MATCHES_SUCCESS:
			return { ...state, loading: false, list: action.payload.matchedUser, reportedUser: action.payload.reportedUser };
		case actions.GET_ALL_MATCHES_ERROR:
			return {
				...state,
				loading: false,
				error: 'Error while fetching matches',
			};
		case actions.ADD_REPORT:
			return { ...state, loading: true };
		case actions.ADD_REPORT_SUCCESS: {
			const reportUser = [...state.reportedUser, { ...action.payload }]
			return { ...state, loading: false, reportedUser: reportUser };
		}

		case actions.ADD_REPORT_ERROR:
			return {
				...state,
				loading: false,
				error: 'Error while fetching matches',
			};
		case actions.CLEAR_MATCHES:
			return {
				list: [],
				reportedUser: [],
				loading: false,
				error: null,
			}
		default:
			return state;
	}
}
