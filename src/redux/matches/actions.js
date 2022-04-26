const matchesActions = {
	GET_ALL_MATCHES: 'GET_ALL_MATCHES',
	GET_ALL_MATCHES_SUCCESS: 'GET_ALL_MATCHES_SUCCESS',
	GET_ALL_MATCHES_ERROR: 'GET_ALL_MATCHES_ERROR',
	ADD_REPORT: "ADD_REPORT",
	ADD_REPORT_SUCCESS: "ADD_REPORT_SUCCESS",
	ADD_REPORT_ERROR: "ADD_REPORT_ERROR",
	CLEAR_MATCHES: "CLEAR_MATCHES",
	getAllMatches: (payload) => ({
		type: matchesActions.GET_ALL_MATCHES,
		payload,
	}),
	getAllMatchesSuccess: (payload) => ({
		type: matchesActions.GET_ALL_MATCHES_SUCCESS,
		payload,
	}),
	getAllMatchesError: (payload) => ({
		type: matchesActions.GET_ALL_MATCHES_ERROR,
		payload,
	}),
	addReport: payload => ({
		type: matchesActions.ADD_REPORT,
		payload
	}),
	reportSuccess: payload => ({
		type: matchesActions.ADD_REPORT_SUCCESS,
		payload
	}),
	reportError: payload => ({
		type: matchesActions.ADD_REPORT_ERROR,
		payload
	}),
	clearMatches: payload => ({
		type: matchesActions.CLEAR_MATCHES,
		payload
	})
};

export default matchesActions;
