import React, { useState, useEffect } from 'react';
import UploadImage from '../../pages/UploadImage';
import { Tooltip } from '@mui/material';
import { AiOutlineClose, AiOutlinePicture } from 'react-icons/ai'
import {initFirebase} from '../../services/initFirebaseService';
import { border, borderColor } from '@mui/material/node_modules/@mui/system';
import { CSVLink } from "react-csv";


const firebase = initFirebase();
const db = firebase.firestore();


const headers = [
  { label: "First Name", key: "name" },
  { label: "email", key: "email" },
  { label: "Id", key: "id" },
  { label: "Phone", key: "phone" },
  
];




function ProfileAbout({ open, onClose, toEditTitle, toEditDescription, id }) {


  
  const [newname, setName2] = useState()

  console.log("newname", newname)
    const [users, setUsers] = useState([]);
    console.log(".....................",users )
    console.log(".....................1", setUsers)

    const csvReport = {
      data: users,
      headers: headers,
      filename: 'Clue_Mediator_Report.csv'
    };
    console.log("csvReport", csvReport)
    
    useEffect((e) => { 
   
      db.collection('Users').onSnapshot(snapshot => {
       
        setUsers(snapshot.docs.map(doc => ({
          id:doc.id,
           name:doc.data().name,
            personality:doc.data().personality,
            gender:doc.data().gender,
            email:doc.data().email,
            isemail:doc.data().isemail,
            verify:doc.data().verify,
            location:doc.data().location,
            phone:doc.data().phone
         
        })))
      })
      console.log(".....................1", setUsers)


    },[]);
  
     /* function to update name in firestore */
  const updateName =  async( id,doc) => {
    //  const newname2 =JSON.stringify(id)
    // console.log("set users", setName2)
 console.log("newname", newname)
//  console.log("id", newname2)
   await db.collection("Users").doc(id).update({name:newname});
  };

  
    const updateUser =  ( id,isemail,doc) => {
        db.collection("Users").doc( id).update({isemail:"true"});
      };

      const updateUser2 =  ( id,isemail,doc) => {
        db.collection("Users").doc( id).update({isemail:"false"});
      };

      const verifyUser =  ( id,verify,doc) => {
        db.collection("Users").doc( id).update({verify:"true"});
      };

      const verifyUser2 =  ( id,verify,doc) => {
        db.collection("Users").doc( id).update({verify:"false"});
      };

      function onEmailClick(email) {
        window.open(`mailto:${email}`);
    }
    return (
        <div className="under-common">
             <h2>All Users</h2>
           
             <br/>
             <button class="btn btn-dark" ><CSVLink {...csvReport}>Export to CSV</CSVLink></button>
             
             
             <table style={{width:"150%", border:"1px solid",tableLayout:"fixed"}}>
                 <thead>
  <tr>
  <th style={{border:"1px solid black" ,textAlign:"center",color:"#9B2B69",fontSize:"20px"}}>Edit Name</th>

    <th style={{border:"1px solid black" ,textAlign:"center",color:"#9B2B69",fontSize:"20px"}}>Name</th>
    {/* <th style={{border:"1px solid black",textAlign:"center",color:"#9B2B69",fontSize:"20px"}}>Gender</th> */}
    <th style={{border:"1px solid black",textAlign:"center",color:"#9B2B69",fontSize:"20px"}}>Email</th>
    <th style={{border:"1px solid black",textAlign:"center",color:"#9B2B69",fontSize:"20px",padding:"0.4%"}}>Email / Verify</th>
  <th style={{border:"1px solid black",textAlign:"center",color:"#9B2B69",fontSize:"20px"}}>User id in DB</th>
  <th style={{border:"1px solid black",textAlign:"center",color:"#9B2B69",fontSize:"20px"}}>location</th>


    {/* <th style={{border:"1px solid black",textAlign:"left",color:"blue"}}></th> */}
    {/* <th style={{border:"1px solid black",textAlign:"left",color:"blue"}}>Email send </th> */}
  </tr>
  
 
  </thead>
  </table>

            {users.map(name1 => <div>
    <table style={{width:"150%", border:"1px solid",tableLayout:"fixed"}}>
        <tbody>
  <tr>

    <div style={{fontSize:"20px" ,padding:"10px"}} >
  <input  class="form-control form-control-sm"   placeholder="Enter new name" type='text' name='newname' onChange={(e) => setName2(e.target.value)} value={name1.newname} style={{border:"1px solid black",textAlign:"left",fontSize:"20px" ,paddingLeft:"20px"}} ></input>
  <button style={{marginLeft:"25%"}}
   type="button" class="btn btn-light" onClick={() => {
      updateName(name1.id);
    }} type='submit' >Edit</button>
</div>
    <td style={{border:"1px solid black",textAlign:"left",fontSize:"20px" ,paddingLeft:"20px"}} >{name1.name}

</td>


    
    {/* <td style={{border:"1px solid black",textAlign:"left",fontSize:"20px",paddingLeft:"20px"}} >{name1.gender} </td> */}
    <td style={{border:"1px solid black",textAlign:"left",fontSize:"20px",paddingLeft:"20px"}} >{name1.email} </td>
    <td style={{border:"1px solid black",textAlign:"left",padding:"0.4%",paddingLeft:"30px"}} >
      
  {  name1.isemail==="true"?
  <button type="button" class="btn btn-success" 
  
  onClick={() => {
    updateUser2(name1.id, name1.isemail);
  }}
>
  {" "}
  ✔️ &nbsp;&nbsp;Email has send
</button>
    :

    <button type="button" class="btn btn-danger"
    onClick={() => {
      updateUser(name1.id, name1.isemail);
    }}
  >
    {" "}
    ✖️ &nbsp;&nbsp;Email not send 
  </button>
     
  }
  &nbsp;

  {  name1.verify==="true"?
  <button type="button" class="btn btn-success" 
 
  onClick={() => {
    verifyUser2(name1.id, name1.verify);
  }}
>
  {" "}
  <i  class="fa fa-check-circle" style={{color:"#0a5dff"}} ></i>&nbsp;Verifed
</button>
    :
    <button type="button" class="btn btn-secondary"
    
    onClick={() => {
    verifyUser(name1.id, name1.verify);
    }}
  >
    {" "}
    ✖️not verifed 
  </button>
     
  }


  {/* {  name1.isemail==="false"?
  <button   type="button" class=" btn-info"  style={{  padding:"12px",boxShadow:" 0px 6px 15px grey"}} 
  onClick={() => {
      onEmailClick(name1.email);
    }} >📝 SEND EMAIL</button>:""
}       */}
  
  </td>
    <td style={{border:"1px solid black",textAlign:"left",fontSize:"15px",paddingLeft:"20px"}} >{name1.id} </td>
    <td style={{border:"1px solid black",textAlign:"left",fontSize:"15px",paddingLeft:"20px"}} > {JSON.stringify(name1.location)} </td>

  </tr>
  
  </tbody>
</table>
    </div>
    )}
    
            {/* <div className='aboutsec' ><p><b>About me :</b></p> <span>{user?.bio}</span></div> 
            <ul className="data-ul">
                <li><p>Date Of Birth:</p> <span>{user?.DoB}</span></li>
                <li><p>Age:</p> <span>{user?.age}</span></li>
                <li><p>Email:</p> <span>{user?.email}</span></li>
                <li><p>Gender:</p> <span>{user?.gender}</span></li>
                <li><p>Height:</p> <span>{user?.height}</span></li>
                <li><p>Income: Over</p> <span>{user?.income}</span></li>
                <li><p>Marital status:</p> <span>{user?.maritalStatus}</span></li>
                <li><p>Body type:</p> <span>{user?.bodyType}</span></li>
                <li><p>Drinking habit:</p> <span>{user?.drinkingStatus}</span></li>
                <li><p>Eating habit:</p> <span>{user?.eatingStatus}</span></li>
                <li><p>Education:</p> <span>{user?.education}</span></li>
                <li><p>Personality:</p> <span>{user?.personality}</span></li>
                <li><p>Religion:</p> <span>{user?.religion}</span></li>
                <li><p>Sexuality:</p> <span>{user?.sexuality}</span></li>
                <li><p>Smoking status:</p> <span>{user?.smokingStatus}</span></li>
                
            </ul> */}
            {/* <div className="my-pic-section">

                <div className="d-flex justify-content-between align-items-left mb-4">
                    <p className="lead fw-normal mb-0 name-1">My Photos</p>
               
                </div>
                {profileType === 'myProfile' ?
                    <div className="uploadImage">
                        <UploadImage />
                    </div>
                    : ""}

                <div className="row">
                    {user?.photos ? user.photos.length > 0 ?
                        user.photos.map(item => {
                            return (
                                <div className="col-md-6 col-lg-6 col-sm-4 col-xl-6 my-all-img">
                                    <img src={item.photoUrl} alt="profile-pic" style={{ height: "400px" }} className="w-100 rounded-3" />
                                    {profileType == "myProfile" ? <ul className="image-actions">
                                        <li>
                                           
                                            <AiOutlinePicture className="main-action" onClick={() => markAsProfile(item)} />
                                            
                                        </li>
                                        <li>
                                           
                                            <AiOutlineClose className="main-action" onClick={() => deleteImage(item)} />
                                         
                                        </li>
                                    </ul> : ""}

                                </div>
                            )
                        })
                        : "" : ""}
                </div>
            </div>  */}
        </div>
    )
}

export default ProfileAbout