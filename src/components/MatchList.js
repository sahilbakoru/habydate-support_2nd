import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';

const MatchList = (user) => {

  const [userdata, setUserdata] = useState([]);
  const [matchuseruid, setMatchUserUid] = useState([]);
  const [matchdocument, setMatchDocument] = useState([]);

  const db = firebase.firestore();

  //   useEffect(() => {

  //     const matchudid = db.collection("Matches").get()
  //                     .then(function(querySnapshot) {
  //                         querySnapshot.forEach(function(doc) {
  //                             var data = doc.data();
  //                             const matchudidis = data.other_uid.toString();
  //                             setMatchuid(matchudidis);      
  //                             console.log("matchudidis", matchudidis);                    
  //                         });
  //                     })
  //                     .catch(function(error) {
  //                         console.log("Error getting documents: ", error);
  //                     });

  //   },[]);

  useEffect(() => {

    // Get All Users Data from Users Firestore Document. 
    const matchudid = db.collection("Users").onSnapshot(snapshot => (
      setUserdata(snapshot.docs.map(doc => doc.data())))
    );

    // Get Authenticated User UID
    const AuthUserUid = firebase.auth().currentUser.uid;

    // Get Authenticated User Data From Users Firestore Document.
    const CurentUserData = db.collection("Users")
      .where("uid", "==", AuthUserUid)
      .get()
      .then(queryDoc => {
        const documents = queryDoc.docs.map(doc => doc.data())

        // Get Single Value From Firestore.
        const singlevalueUser = documents.map(value =>
          value.DoB
        )

      })

    // Get Other Person Match UDID For Authenticated User.
    const MatchesUserData = db.collection("Matches")
      .where("other_uid", "==", AuthUserUid)
      .get()
      .then(queryDoc => {
        const documents = queryDoc.docs.map(doc => doc.data())
        //setMatchDocument(documents);
        setMatchDocument(documents);
        // Get Single Value From Firestore. We will use it when we need because value is not stored constantly in state so we will use it when we need it only.
        const singlevaluematches = documents.map(value =>
          //console.log("value.uid", value.uid)

          // setMatchUserUid(value.uid)
          // Pushing Multiple Values in Array the variable is enclosed in ""
          setMatchUserUid((matchuseruid) => [
            ...matchuseruid,
            value.uid,
          ])
        )
      })

    // const OtherPersonUidData = matchdocument.map(value =>
    //    console.log("value.uid", value.uid),

    // Pushing Multiple Values in Array the variable is enclosed in ""
    //    setMatchUserUid((matchuseruid) => [
    //         ...matchuseruid,
    //        value.uid,
    //       ])

    //)


    // console.log("Matches UID Are:", matchuseruid );  
    console.log("Document Are:", matchdocument);

  }, []);



  return (
    <div>
      Hi {console.log("Matches UID Are:", matchuseruid)}
    </div>
  );
};


export default MatchList;
