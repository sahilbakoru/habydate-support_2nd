import React, { useState, useEffect, useRef } from "react";
import { initFirebase } from "../../services/initFirebaseService";
import Avatar from '@mui/material/Avatar';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import actionCreators from "../../redux/actions";
import chatsActions from '../../redux/chats/actions';
import userActions from "../../redux/user/actions";
import { getAllMatchMessages, addMessageInConversation, conversationsCollection, uploadUserImage, uploadUserVoice,updateLatestMessageInConversation } from "../../services/FirebaseServices"
import "./ChatScreen.css";
import { useHistory, useParams } from "react-router-dom";
import { getDifferentInTime } from "../../utils/common";
import { AiFillFolder, AiOutlineClose } from "react-icons/ai";


function ChatScreen({ chats, signOut, cuUser, username, id }) {
    const history = useHistory();
    const dispatch = useDispatch()
    const hiddenFileInput = React.useRef(null);
    const [input, setInput] = useState('');
    const [currentUser, setCurrentUser] = useState(cuUser.list);
    const [currentUserId, setCurrentUserId] = useState("");
    const [matchedUser, setMatchedUser] = useState(null)
    const [matchesId, setMatchedId] = useState(null)
    const params = useParams();
    const { list, messagesList } = chats;
    const [messages, setMessages] = useState(messagesList);
    const [fileUrl, setFileUrl] = useState(null);
    const [voiceUrl, setVoiceUrl] = useState(null);
    const [updateComp, setUpdateComp] = useState(false);
  
    const chatRef = useRef(null)
 
    let firebase = null
    useEffect(() => {
        
        if (currentUser) {

            // User is signed in.
            const AuthUserUid = currentUser.uid//firebase.auth().currentUser.uid;
            console.log(".............username", AuthUserUid)
            setCurrentUserId(AuthUserUid)
            const foundedUser = list.filter(item => item.user.username === username)
            if (foundedUser.length > 0) {
                const matches_id = foundedUser[0].matches_id
                dispatch(chatsActions.getAllMatchedMessages())
                getAllMatchMessages(matches_id).then(res => {
                    if (res.error === false) {
                        dispatch(chatsActions.getAllMatchedMessagesSuccess(res.data))
                        setMatchedUser(foundedUser[0])
                        setMatchedId(matches_id)
                        setMessages(res.data)
                        chatRef.current && chatRef.current.scrollIntoView({ behavior: "smooth" })
                    } else {
                        dispatch(chatsActions.getAllMatchedMessagesError())
                    }
                }).catch(err => {
                    dispatch(chatsActions.getAllMatchedMessagesError())
                })

            }

        } else {
            // signOut();
            // history.push("/");
        }

    }, [history, username]);

    useEffect(() => {
        // console.log("matches..............id", matchesId)
        if (matchesId) {
            conversationsCollection
                .doc(matchesId)
                .collection('Messages')
                .orderBy('createdAt', 'asc')
                .onSnapshot((response) => {
                    const documents = response.docs.map((doc) => doc.data());
                    dispatch(chatsActions.getAllMatchedMessagesSuccess(documents))
                    setMessages(documents)
                    chatRef.current && chatRef.current.scrollIntoView({ behavior: "smooth" })
                })
        }
    }, [])

    // useEffect(() => {
    //     setUpdateComp(!updateComp);
    // }, [updateComp])






//  *********audio message fuction from here to........*********
let chunks = [];
let recorder;

const record= () =>{

    console.log("hello from miro.")
  
    let device = navigator.mediaDevices.getUserMedia({ video: true }); // this will check for microphone
    device.then(stream => {   // this will check that mic is on || off and recored ? on : do nothing
        console.log("rec test1")
        if (recorder === undefined) {
           
        console.log("rec test2")
        
        console.log(chunks,"chuncks")   
            recorder = new MediaRecorder(stream);
            console.log(chunks,"chuncks")
            console.log(recorder,"recorder")
           
            recorder.ondataavailable = e => {    
                
            chunks.push(e.data);
           
                if (recorder.state === 'inactive') {
                
                    let blob = new Blob(chunks, { type: 'audio' });
                    //document.getElementById('audio').innerHTML = '<source src="' + URL.createObjectURL(blob) + '" type="video/webm" />'; //;
                   
                    console.log(recorder,"recorder")
                    var reader = new FileReader();
                    console.log(reader,"reader")
                    console.log(recorder,"recorder")
                    console.log(chunks,"chuncks")
                    reader.addEventListener("load", function () {
                        console.log(reader,"reader")    //

    
                          
                        const store = async ()=>{
                            
                            const file =  reader.result 
                            console.log(file,"file....")
                           
                            dispatch(userActions.setUserLoading(true))
                            var url =  await uploadUserVoice(file, currentUserId)
                            console.log(url,"url....")
                            dispatch(userActions.setUserLoading(false));
                            setVoiceUrl(url);
                            console.log(url,"url............")
                        }
                       
                        store()
                        console.log(recorder,"recorder")

                    
                 const store2  = async ()=>{
                   
                    var msg = {
                        _id: uuidv4(),
                        createdAt: moment().utc().unix(),
                        messageType: "voice",
                        voice: reader.result  ,    // For local   replace reader.result  with URL.createObjectURL(blob) * show below*. 
                        user: { _id: currentUserId },
                        name: "voice name 6"
                    }
                    console.log(msg,"msglocal") // to check audio localy copy and paste the audio url in new tab.
                    // var msg = {         
                    //     userId: currentUserId,
                    //     msg:URL.createObjectURL(blob) ,
                    //     msgType: 'audio',
                    // };
                    // console.log(msg,"msg")
                    const allMsg = [...messages, msg]
                    console.log(allMsg,"allMsg")
                    setMessages(allMsg);
                    console.log(allMsg,"allMsg")
                    dispatch(chatsActions.getAllMatchedMessagesSuccess(allMsg))
                    console.log(allMsg,"allMsg")   
                    setInput("");
                    setVoiceUrl(null);
                     const res1 = await updateLatestMessageInConversation(matchesId, msg);
                     const res = await  addMessageInConversation(matchesId, msg);
                     
                 }    
                      store2() 
        // console.log("............res12", res);
        // const res = addMessageInConversation(matchesId, msg);
                        // firebase.database().ref('Conversations').push(msg, function (error) {
                        //     if (error) alert(error);
                        // });


                       


                 
                        // const voice =msg
                        // dispatch(userActions.setUserLoading(true))
                        // var url = uploadUserVoice(voice, currentUserId)
                        // dispatch(userActions.setUserLoading(false));
                        // setFileUrl(url);

                        
                    }, false);
                    reader.readAsDataURL(blob);  // this will convert that local url to string data so it can be stored in database.
                   
                   
               
                }
                else{
                    console.log("sothing isnt working")
                }
            }
            recorder.start();   
        }
    });   

    if (recorder !== undefined) {
    
            recorder.stop();
            console.log("something isnt working")
    }
    console.log(chunks,"chuncks")
            chunks = [];
            console.log(chunks,"chuncks")  



            
}
// *********audio message  function till here .************







    const handleSend = async (e, chatRef) => {
        e.preventDefault();
        if (fileUrl) { 
         

            var msg = {
                _id: uuidv4(),
                createdAt: moment().utc().unix(),
                messageType: "image",
                image: fileUrl,
                user: { _id: currentUserId }
            }

        } else {
            var msg = {
                _id: uuidv4(),
                createdAt: moment().utc().unix(),
                messageType: "text",
                text: input,
                user: { _id: currentUserId }
            }

        }

       


        const allMsg = [...messages, msg]

        // window.scrollTo(0, chatRef.current.scrollHeight)

        setMessages(allMsg);
        dispatch(chatsActions.getAllMatchedMessagesSuccess(allMsg))
        setInput("");
        setFileUrl(null);
        const res = await addMessageInConversation(matchesId, msg);
        // console.log("............res12", res);
        const res1 = await updateLatestMessageInConversation(matchesId, msg);
        // console.log("............res123", res1);
        chatRef.current && chatRef.current.scrollIntoView({ behavior: "smooth" })
    }

    const timeAgo = (timestamp) => {
        const allTime = timestamp ? getDifferentInTime(moment.unix(timestamp), true) : { diffMins: 0, diffMs: 0, days: 0 }
        const days = allTime.days > 0 ? `${allTime.days} days` : allTime.diffMs > 60000 ? allTime.diffMins > 59 ? `${(allTime.diffMins / 60).toFixed(2)} hours` : `${allTime.diffMins} minutes` : `${allTime.seconds} sec`
        return days
    }

    const handleChange = async (e) => {
        const file = e.target.files[0]
        e.preventDefault();
        dispatch(userActions.setUserLoading(true))
        var url = await uploadUserImage(file, currentUserId)
        dispatch(userActions.setUserLoading(false));
        setFileUrl(url);
    }

    const handleOpenUpload = async (e) => {
        hiddenFileInput.current.click();
    }

    const handleClearImg = () => {
        setFileUrl(null);
    }

    const tDay = moment().format("DD/MM/YYYY")
    // console.log(".............id.232345", fileUrl)
    return (
        <div className="chatScreen">
            <p className="chatScreen__timestamp"> You Matched With {username} On {tDay}</p>
            {messages && messages.length > 0 ? messages.map(item => {
                var text=""
                return item.user && item.user._id !== currentUserId ?
                    <div className="chatScreen__message">
                        <Avatar
                            className="chatScreen__image"
                            alt={matchedUser?.user.name}
                            src={matchedUser?.user.profilePic}
                        />
                            
                      
                        <p className="chatScreen__text">{item.text}</p>
                    
                        {item.messageType === 'image' ? <img className="chatScreen__text" src={item.image} alt={item.media_id} width="150" /> : ""}
                     

                        <p>{timeAgo(item.createdAt)}</p>
                    </div> : <div className="chatScreen__message">
                        {item.messageType === 'image' ? <Avatar
                            className="attach__image"
                            alt={item?.createdAt}
                            src={item?.image}
                        /> :
                       <p className="chatScreen__textUser">{item.text}</p>  } 





                       {/* if message is audio this will play that audio */}
                          {  item.messageType === 'voice' ? <audio controls>
                          <source src={item.voiceuri}  type="audio/webm" />
                          </audio>  :  ""}
                     {/* audio pard end */}




                        <p >{`${timeAgo(item.createdAt)} ago`}</p>
                    </div>
            }) : null}
            <div className="in-view" ref={chatRef} />
            <form className="chatScreen__input">

{/* <i onClick={record} id="voice"  class="fa fa-microphone" style={{fontSize:"24px"}} ></i>    */}
    

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="chatScreen__inputField"
                    placeholder="Type a message..."
                    type="text"
                />
                {fileUrl && <Avatar
                    className="attachImg"
                    alt="upload-img"
                    src={fileUrl}
                />}
                {fileUrl && <AiOutlineClose className="main-action clear-img" onClick={handleClearImg} />}

                <AiFillFolder className="main-action upload-img" onClick={handleOpenUpload} />
                <input type="file" ref={hiddenFileInput} id="imageUpload" hidden={true} onChange={handleChange} />
                <button onClick={(e) => handleSend(e, chatRef)} type="submit" className="chatScreen__inputButton">Send</button>
            </form>
            <div ></div>
        </div>
    );

}

const mapStateToProps = (states) => {
    return {
        chats: states.chats,
        cuUser: states.user
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)