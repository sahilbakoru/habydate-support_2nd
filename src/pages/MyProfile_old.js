import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import '../index.css';
import "../App.css";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux'
import profilepicdemo from "../img/profilepicdemo.jpeg";
import onedemo from "../img/1demo.jpeg"
import twodemo from "../img/2demo.jpeg"
import threedemo from "../img/3demo.jpeg"
import fourdemo from "../img/4demo.jpeg"
import EditProfile from './EditProfile';
import { Button } from 'react-bootstrap';

function MyProfile({ user }) {
  const [setEditShowHide, showHideEdit] = useState(false)
  const [dayDiff, setDayDiff] = useState(20)

  const handleShowHideEdit = () => {
    showHideEdit(!setEditShowHide)
  }
  const { list } = user
  return (
    // <div className="flex flex-col h-full bg-white dark:bg-coolDark-500 dark:text-white transition-colors">
    // <main
    //   className="flex-1"
    //   style={{ maxHeight: 'calc(100% - var(--topbar-height))' }}
    // >
    <section className="h-200 gradient-custom-2">

      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-9 col-xl-7">
            <div className="card">
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: "#000", height: "200px" }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: "150px", marginRight: "20px", marginLeft: "20px" }}>
                  <img src={list.profilePic} alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2" style={{ width: "150px", zIndex: "1" }} />
                  {/* <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{zIndex: "1"}} >
                          Edit profile
                        </button> */}
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <h5>Name: {list?.name}</h5>
                  <p>Email: {list?.email}</p>
                </div>
              </div>

              <div className="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="d-flex justify-content-end text-center py-1">
                  <div>
                    <p className="mb-1 h5">Premium</p>
                    <p className="small text-muted mb-0">{`${dayDiff} Days Left`}</p>
                  </div>
                  {/* <div className="px-3">
                          <p className="mb-1 h5">1026</p>
                          <p className="small text-muted mb-0">Followers</p>
                        </div>
                        <div>
                          <p className="mb-1 h5">478</p>
                          <p className="small text-muted mb-0">Following</p>
                        </div> */}
                </div>
              </div>

              {setEditShowHide ?
                <div className="card-body p-4 text-black">
                  <EditProfile showHideEdit={handleShowHideEdit} />
                </div>
                :
                <div className="card-body p-4 text-black">
                  <div className="mb-5">
                    <p className="lead fw-normal mb-1">About</p>
                    <Button onClick={handleShowHideEdit}>Edit Profile</Button>
                    <div className="p-4" style={{ backgroundColor: "#f8f9fa" }} >
                    <p className="font-italic mb-1">About me: {list?.bio}</p>
                      <p className="font-italic mb-1">Date Of Birth: {list?.DoB}</p>
                      <p className="font-italic mb-1">Age: {list?.age}</p>
                      <p className="font-italic mb-1">Email: {list?.email}</p>
                      <p className="font-italic mb-1">Gender: {list?.gender}</p>
                      <p className="font-italic mb-0">Height: {list?.height}</p>
                      <p className="font-italic mb-1">Income: Over {list?.income}</p>
                      <p className="font-italic mb-0">Marital status: {list?.maritalStatus}</p>
                      <p className="font-italic mb-0">Body type: {list?.bodyType}</p>
                      <p className="font-italic mb-1">Drinking habit: {list?.drinkingStatus}</p>
                      <p className="font-italic mb-1">Eating habit: {list?.eatingStatus}</p>
                      <p className="font-italic mb-0">Education: {list?.education}</p>
                      <p className="font-italic mb-1">Personality: {list?.personality}</p>
                      <p className="font-italic mb-0">Religion: {list?.religion}</p>
                      <p className="font-italic mb-1">Sexuality: {list?.sexuality}</p>
                      <p className="font-italic mb-0">Smoking status: {list?.smokingStatus}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <p className="lead fw-normal mb-0">My Photos</p>
                    {/* <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p> */}
                  </div>
                  <div className="row g-2">
                    <div className="col mb-2">
                      <img src={onedemo} alt="image 1" style={{ height: "400px" }} className="w-100 rounded-3" />
                    </div>
                    <div className="col mb-2">
                      <img src={twodemo} alt="image 1" style={{ height: "400px" }} className="w-100 rounded-3" />
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="col">
                      <img src={threedemo} alt="image 1" style={{ height: "400px" }} className="w-100 rounded-3" />
                    </div>
                    <div className="col">
                      <img src={fourdemo} alt="image 1" style={{ height: "400px" }} className="w-100 rounded-3" />
                    </div>
                  </div>
                </div>
              }



            </div>
          </div>
        </div>
      </div>
    </section>
    //     </main>
    //   </div>  
  );
}

const mapStateToProps = (states) => {
  return {
    user: states.user
  }
}

export default connect(mapStateToProps)(MyProfile)