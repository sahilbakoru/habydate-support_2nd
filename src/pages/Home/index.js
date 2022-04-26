import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import PhoneButton from "../../components/PhoneAuth/PhoneButton"
import { initFirebase } from '../../services/initFirebaseService';
import { bindActionCreators } from 'redux';
import actionCreators from "../../redux/actions"
import userActions from '../../redux/user/actions'
import { signInWithGoogle, checkUniqueUserOrCreate } from "../../services/FirebaseServices"
import CreateUser from '../CreateUser/index';

const firebase = initFirebase();

function Home({ user, setLogin, signOut }) {
    const [isNewUser, setIsNewUser] = useState(false);

    const dispatch = useDispatch()
    const history = useHistory();


    useEffect(() => {

        firebase.auth().onAuthStateChanged(async function (user) {
            if (user) {
                // User is signed in.

                const AuthUserUid = firebase.auth().currentUser.uid;

            } else {
                // No user is signed in.
                signOut()
                history.push("/");
            }
        });

    }, [history]);

    useEffect(() => {
        const userLoc = localStorage.getItem('location')

        if (!userLoc) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const loc = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                dispatch(userActions.userLocation(loc))
                localStorage.setItem('location', JSON.stringify(loc))
            });
        }

    }, [user.location]);

    const googleSignIN = async () => {
        dispatch(userActions.userLogin())
        const res = await signInWithGoogle()
        if (res.user.length > 0) {
            dispatch(userActions.userLoinSuccess(res.user))
            localStorage.setItem('user', JSON.stringify(res.user[0]))
            toast(res.msg)
        } else {
            // toast(res.msg)
            toast("Please complete Your registration Process");
            if (res.user) {
                const providerData = res.user.providerData[0]
                const basicUser = {
                    email: providerData.email,
                    name: providerData.displayName,
                    socialType: 'google',
                    profilePic: providerData.photoURL,
                    uid: res.user.uid
                }
                dispatch(userActions.userSetBasic(basicUser))
                setIsNewUser(true)
            } else {
                toast(res.msg);
            }
            dispatch(userActions.userLoinError())
        }
    };

    const signInWithFb = async () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().useDeviceLanguage();
        dispatch(userActions.userLogin())
        firebase.auth().signInWithPopup(provider).then(async (result) => {
            var credential = result.credential;

            // The signed-in user info.
            var user = result.user;
            var res = await checkUniqueUserOrCreate(user);
            if (res.user.length > 0) {
                dispatch(userActions.userLoinSuccess(res.user))
                localStorage.setItem('user', JSON.stringify(res.user[0]))

                toast(res.msg)
                dispatch(userActions.userLogin())
            } else {
                toast("Please complete Your registration Process");
                setIsNewUser(true)
                dispatch(userActions.userLoinError())
            }
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var accessToken = credential.accessToken;

        }).catch((error) => {
            dispatch(userActions.userLoinError())
            toast(error.message)
        });

    };

    const handlePhoneLogin = async (user) => {
        dispatch(userActions.userLogin())
        const res = await checkUniqueUserOrCreate(user)
        if (res.user.length > 0) {
            dispatch(userActions.userLoinSuccess(res.user))
            localStorage.setItem('user', JSON.stringify(res.user[0]))
            toast(res.msg)
        } else {
            toast("Please complete Your registration Process");
            setIsNewUser(true)
            dispatch(userActions.userLoinError())
        }
    }

    const handleSetNewUser = () => {
        setIsNewUser(!isNewUser);
    }

    return (
        <section className="h-150 gradient-custom-2" >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 text-center">
                                <h3 className="mb-5">Login to Habydate</h3>
                                <button className="btn btn-lg btn-block btn-primary gradient-google-signin" type="submit" onClick={googleSignIN}><i className="fab fa-google me-2" style={{ marginRight: "5px" }}></i> Sign in with google</button>
                                <hr className="my-4" />
                                <button className="btn btn-lg btn-block btn-primary mb-2 gradient-fb-signin" type="submit" onClick={signInWithFb}><i className="fab fa-facebook-f me-2" style={{ marginRight: "5px" }}></i>Sign in with facebook</button>
                                <hr className="my-4" />
                                <PhoneButton phoneLogin={handlePhoneLogin} setLogin={setLogin} setIsNewUser={() => handleSetNewUser()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateUser />
        </section>
    )
}

const mapStateToProps = (states) => {
    return {
        user: states.user
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)