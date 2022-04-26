import React, { useEffect, useState } from 'react';
import 'firebase/auth';
import 'firebase/firestore';
import '../index.css';
import "../App.css";
import "../Main.css"
import { connect, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import ProfileHeader from '../components/Profile/profileHeader';
import ProfileAbout from '../components/Profile/profileAbout';
import EditProfile from './EditProfile';
import { bindActionCreators } from 'redux';
import actionCreators from "../redux/actions"
import userActions from '../redux/user/actions';
import { updateUser, getBlockedUser } from '../services/FirebaseServices';
import { initFirebase } from '../services/initFirebaseService';
import { toast } from 'react-toastify';
import CheckoutForm from "../components/StripeCard";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import moment from "moment";

const firebase = initFirebase();

function MyProfile({ user, signOut }) {
    const dispatch = useDispatch()
    const [modelOpen, setOpen] = useState(false);
    const { list } = user
    const history = useHistory();
    const cu_model_wrapper = {
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height: 400,
        display: 'block'
    }

    useEffect(() => {

        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                // User is signed in.

                const AuthUserUid = firebase.auth().currentUser.uid;
                const res = await getBlockedUser(AuthUserUid);
                console.log(".......................blocked user..............", res)
                if (res.error === false) {
                    dispatch(userActions.addBlockedUser(res.data))
                }
            } else {
                // No user is signed in.
                // signOut()
                // history.push("/");
            }
        });

    }, []);

    const handleDeleteImage = async (data) => {
        const userList = { ...list }
        const allPhotos = userList.photos;
        const findIndex = allPhotos.findIndex(item => item.publicId === data.publicId);
        if (findIndex !== -1) {
            allPhotos.splice(findIndex, 1);
            userList.photos = allPhotos;
            dispatch(userActions.userUpdate())
            const res = await updateUser(userList)
            if (res.error === false) {
                toast("Image deleted successfully")
                dispatch(userActions.userUpdateSuccess(res.user))
            } else {
                toast("Operation failed")
                dispatch(userActions.userUpdateError())
            }
        } else {
            toast("No image for delete")
        }
    }

    const handleMarkProfilePic = async (data) => {
        const userList = { ...list }
        userList.profilePic = data.photoUrl
        if (userList.photos && userList.photos.length > 0) {
            userList.photos[0].photoUrl = data.photoUrl
        } else {
            userList.photos = [
                {
                    photoUrl: data.photoUrl
                }
            ]
        }
        dispatch(userActions.userUpdate())
        const res = await updateUser(userList)
        if (res.error === false) {
            toast("Image marked as profile Pic")
            dispatch(userActions.userUpdateSuccess(res.user))
        } else {
            toast("Operation failed")
            dispatch(userActions.userUpdateError())
        }
    }

    useEffect(() => {
        const { list } = user
        if (list.payee === "0") {
            setOpen(true);
        }
    }, [list, user])

    const handleOpenCloseModel = () => {
        setOpen(!modelOpen)
    }

    const buyData = {
        amount: 1,
        expireDate: moment().add(30, 'd').unix(),
        initPay: true
    }

    return (
        <section className="top-sec">
            <div className="container">
                <div className="row dummy-bk bt">
                    <div className="col-lg-12">
                        {list.active === '0' ? <p className="blocked-test">You have been blocked by admin contact us for more details</p> : null}
                    </div>
                    <div className="col-lg-12">
                        {/* <ProfileHeader user={list} isPersonHeader={false} /> */}
                    </div>
                    <div className="col-lg-12">
                        <div className="under-tabs">
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    {/* <button className="nav-link active bt" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">All Users</button> */}
                                    {/* <button className="nav-link bt" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Edit Profile</button> */}
                                    {list.active === '0' ? <a className="bt btn btn-primary" href={`mailto:ikbalahamad9@gmail.com?subject=Un-Block${list.uid}&body=Hi,I Sir`} target="_blank" rel="noreferrer">Contact Us</a> : null}
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <ProfileAbout user={list} markAsProfile={handleMarkProfilePic} deleteImage={handleDeleteImage} profileType="myProfile" />
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    <div className="row">
                                        <div className="col-lg-12">

                                            <EditProfile isNewUser={false} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    open={modelOpen}
                    onClose={handleOpenCloseModel}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={cu_model_wrapper}>
                        <h3 style={{ textAlign: "center", marginTop: 20, marginBottom: 30 }}>Initial $1 payment</h3>
                        <CheckoutForm buyData={buyData} user={user?.list} dispatch={dispatch} handleOpenCloseModel={handleOpenCloseModel} />
                    </Box>
                </Modal>
            </div>
        </section>
    );
}

const mapStateToProps = (states) => {
    return {
        user: states.user
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile)