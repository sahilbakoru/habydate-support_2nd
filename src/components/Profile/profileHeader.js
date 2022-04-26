import React, { useState, useEffect } from 'react';
import { getDifferentInTime } from "../../utils/common"
import moment from 'moment';
import ReportUser from '../ReportUser';
import userPro from "../../img/demoProfile.jpg"

function ProfileHeader({ user, reportedUser, dispatch, currentUser, isPersonHeader }) {
    const days = user.packageEndDate ? getDifferentInTime(moment.unix(user.packageEndDate)).days : 0
    var profilePic = user.photos && user.photos.length > 0 ? user.photos[0].photoUrl : userPro
    return (
        <div className="main-top bt">
            <div className="main-left">
                <div className="media">
                    <img className="mr-3" src={profilePic} alt="Generic placeholder" />
                    <div className="media-body">
                        <p className="name-1">{user?.name}</p>
                        <p className="name-2">Age: {user?.age}</p>
                    </div>
                </div>
            </div>
            <div className="main-right">
                <p className="Premium">Premium</p>
                <p className="Premium-1">{days} day left</p>
            </div>
        </div>
    )
}

export default ProfileHeader