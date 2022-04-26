import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import 'firebase/auth';
import 'firebase/firestore';
import '../index.css';
import '../App.css';
import { connect, useDispatch } from 'react-redux';
import actionCreators from '../redux/actions';
import userActions from '../redux/user/actions';
import ProfileHeader from '../components/Profile/profileHeader';
import ProfileAbout from '../components/Profile/profileAbout';
import { useParams } from 'react-router-dom';
import { addToBlocked, unblockUser } from "../services/FirebaseServices";
import { toast } from "react-toastify";
import ReportUser from '../components/ReportUser';
import Button from '@restart/ui/esm/Button';

function PersonProfile({ matches, reportedUser, user }) {
	const [profileDetails, setProfileDetails] = useState(null);
	const [alreadyReported, setAlreadyReported] = useState(false);
	const [isBlocked, setIsBlocked] = useState(false)
	const [openModel, setOpenModel] = useState(false);
	const params = useParams();
	const dispatch = useDispatch();
	const { list, blockedByYou } = user
	useEffect(() => {
		const res = matches.find((item) => item.user.username === params.person)
		if (res) {
			const foundedUser = blockedByYou && blockedByYou.length > 0 ?
				blockedByYou.filter(item => item.to_user_id === res.user.uid) : [];
			if (foundedUser.length > 0) {
				setIsBlocked(true)
			} else {
				setIsBlocked(false)
			}
			setProfileDetails(res);
			const foundedReported = reportedUser && reportedUser.length ? reportedUser.filter(item => item.to_user_id === res.uid) : 0;
			if (foundedReported.length > 0) {
				setAlreadyReported(true)
			} else {
				setAlreadyReported(false)
			}
		}

	}, [matches, params.person]);

	const handleUserBlock = async () => {
		const data = {
			blockedByYou: {
				to_user_id: profileDetails.user.uid,
				user_id: list.uid
			},
			init: false
		}
		if (!isBlocked) {
			dispatch(userActions.setUserLoading(true))
			const res = await addToBlocked(data.blockedByYou);
			console.log("................res", data);
			if (res.error === false) {
				setIsBlocked(true);
				dispatch(userActions.addBlockedUser(data));
			}
			dispatch(userActions.setUserLoading(false))
		} else {
			toast("User already blocked")
		}

	}

	const handleUnblockUser = async () => {

		const payload = {
			toId: profileDetails.user.uid,
			uid: list.uid
		}

		dispatch(userActions.setUserLoading(true))
		const res = await unblockUser(payload);
		// console.log("............res", res)
		if (res.error === false) {
			setIsBlocked(false);
			dispatch(userActions.unBlockedUser(payload))
		} else {
			dispatch(userActions.setUserLoading(false))
		}

	}

	console.log("..............alreadyReported", alreadyReported)
	return (
		// <div className="flex flex-col h-full bg-white dark:bg-coolDark-500 dark:text-white transition-colors">
		// <main
		profileDetails && profileDetails.user ?
			<section className="top-sec">
				<div className="container">
					<div className="row dummy-bk bt">
						<div className="col-lg-12">
							<ProfileHeader user={profileDetails?.user} reportedUser={reportedUser} dispatch={dispatch} currentUser={list} isPersonHeader={true} />
						</div>
						<div className="col-lg-12">
							<div className="under-tabs">
								<div className="tab-content" id="nav-tabContent">
									<div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
										<div className="row">
											<div className="col-lg-12 blk-rpt">
												{isBlocked ? <Button className="sm-btn bt btn btn-primary" onClick={handleUnblockUser}> Unblock</Button> : <Button className="sm-btn bt btn btn-primary" onClick={handleUserBlock}>Block</Button>}
												{alreadyReported ? <Button className="sm-btn bt btn btn-primary" onClick={() => setOpenModel(!openModel)}>Reported</Button> : <Button className="sm-btn bt btn btn-primary" onClick={() => setOpenModel(!openModel)}>Report</Button>}
											</div>
											<div className="col-lg-12">
												<ProfileAbout user={profileDetails?.user} profileType="personProfile" isBlocked={isBlocked} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<ReportUser initModelOpen={openModel} setOpenModel={setOpenModel} cuid={list?.uid} uid={profileDetails?.user.uid} dispatch={dispatch} setAlreadyReported={setAlreadyReported} />
					</div>
				</div>
			</section> : ""
		//     </main>
		//   </div>
	);
}

const mapStateToProps = (states) => {
	return {
		user: states.user,
		matches: states.matches.list,
		reportedUser: states.matches.reportedUser
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PersonProfile);
