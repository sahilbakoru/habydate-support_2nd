import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import actionCreators from "../../redux/actions";
import chatsActions from '../../redux/chats/actions';
import ChatList from "./ChatList.js";
import { getAllConversationLists } from "../../services/FirebaseServices"
import ChatScreen from './ChatScreen';
import { toast } from 'react-toastify';


function Chats({ signOut, chats, user }) {
    const [currentUsername, setCurrentUsername] = useState(null);
    const [blockedIds, setBlockedIds] = useState([]);
    const [blockedByYouIds, setBlockedByYouIds] = useState([]);
    const db = firebase.firestore();
    const { blockedUser, blockedByYou } = user;
    const history = useHistory();
    const dispatch = useDispatch()

    useEffect(() => {
        const bIds = blockedUser.length > 0 ? blockedUser.map(item => item.user_id) : [];
        const bByUIds = blockedByYou.length > 0 ? blockedByYou.map(item => item.to_user_id) : [];
        setBlockedByYouIds(bByUIds);
        setBlockedIds(bIds);
    }, [blockedUser, blockedByYou])

    useEffect(() => {

        if (user) {
            const { list } = user;
            // User is signed in.
            dispatch(chatsActions.getAllChats())
            const AuthUserUid = list.uid;//firebase.auth().currentUser.uid;
            getAllConversationLists(AuthUserUid).then(res => {
                dispatch(chatsActions.getAllChatsSuccess(res.data))
            }).catch(error => {
                dispatch(chatsActions.getAllChatsError())
            })

        } else {
            // No user is signed in.
            signOut()
            history.push("/");
        }

    }, []);

    const { list } = chats

    const handleClickOnCard = (val) => {
        if (blockedByYouIds.includes(val.id)) {
            toast("User is blocked by you")
        } else if (blockedIds.includes(val.id)) {
            toast("Your blocked by this user")
        } else {
            setCurrentUsername(val)
        }

    }

    return (
        list.length > 0 ?
            <div className="chat_main">
                <div className="chat_sidebar">
                    <div className="chat_repeat_div">
                        {list.map(item => {
                            return item.latestMessage ?
                                <ChatList
                                    name={item.user ? item.user?.name : ""}
                                    username={item.user ? item.user?.username : ""}
                                    message={item.latestMessage.text}
                                    timestamp={item.latestMessage.createdAt}
                                    profilepic={item.user ? item.user?.profilePic : ""}
                                    clickOnCard={handleClickOnCard}
                                    chatUser={item.user}
                                    blockedUser={blockedUser}
                                    blockedByYou={blockedByYou}
                                    blockedByYouIds={blockedByYouIds}
                                    blockedIds={blockedIds}
                                /> : ""
                        })
                        }
                    </div>
                </div>
                <div className="chat_Screen">
                    <ChatScreen username={currentUsername?.username} id={currentUsername?.id} />
                </div>
            </div> : "No record Founded"
    );
}

const mapStateToProps = (states) => {
    return {
        chats: states.chats,
        user: states.user
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Chats)