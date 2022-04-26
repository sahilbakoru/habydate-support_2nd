import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import 'firebase/auth';
import 'firebase/firestore';
import MatchList from './MatchList.js';
import matchesActions from '../../redux/matches/actions';
import { bindActionCreators } from 'redux';
import actionCreators from '../../redux/actions';
import { getAllMatchesLists, getAllReportedUser } from '../../services/FirebaseServices';
function MatchesList({ user, matches }) {
	const dispatch = useDispatch();

	useEffect(async () => {
		async function fetchData() {
			dispatch(matchesActions.getAllMatches());
			if (user) {
				const { list } = user
				const res = await getAllMatchesLists(list.uid);
				const reportedUser = await getAllReportedUser(list.uid);
				if (res && res.length > 0) {
					var payload = {
						matchedUser: res,
						reportedUser: reportedUser.data
					}
					dispatch(matchesActions.getAllMatchesSuccess(payload));
				} else {
					dispatch(matchesActions.getAllMatchesError());
				}
			}
		}
		fetchData();
	}, [dispatch, user]);

	return (
		<div className="dummy-size">
			{matches.length && matches.length > 0
				? matches.map((item) => (
					item.user ?
						<div className="rpeat-div bt">
							<MatchList
								name={item.user.username}
								message="Matched"
								timestamp="5 days ago"
								profilepic={item.user.profilePic}
								user={user}
								uid={item.user.uid}
							/>
						</div> : ""
				))
				: 'No match found'}
		</div>
	);
}

const mapStateToProps = (states) => {
	return {
		user: states.user,
		matches: states.matches.list,
	};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MatchesList);
