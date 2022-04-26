import React, { } from 'react';
import { Card, Box, CardContent, CardMedia } from '@mui/material';
import moment from 'moment'
import 'firebase/auth';
import 'firebase/firestore';
import Avatar from '@mui/material/Avatar';
import "./Chat.css";
import { Link } from "react-router-dom";
import blankpic from "../../img/blank-profile-picture.png";
import { getDifferentInTime } from "../../utils/common";

function ChatList({ name, username, message, timestamp, profilepic, clickOnCard, chatUser, blockedByYouIds, blockedIds }) {

  const allTime = timestamp ? getDifferentInTime(moment.unix(timestamp), true) : { diffMins: 0, diffMs: 0, days: 0 }
  const days = allTime.days > 0 ? `${allTime.days} days` : allTime.diffMs > 60000 ? allTime.diffMins > 59 ? `${(allTime.diffMins / 60).toFixed(2)} hours` : `${allTime.diffMins} minutes` : `${allTime.diffMins} minutes`
  console.log("username...........", username, name)
  return (
    blockedByYouIds.includes(chatUser.uid) ? null :
      <Card sx={{ display: 'flex' }} onClick={() => clickOnCard({ username, id: chatUser.uid })}>
        <Link to={`/matches/${username}`}>
          <CardMedia
            component="img"
            sx={{ width: 60, height: 60 }}
            image={profilepic}
            alt={name}
          />
        </Link>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent
            sx={{ flex: '1 0 auto', marginTop: '10px', marginBottom: '1px' }}
          >
            <h2>{name}</h2>
            <p>{message}</p>
            <p>{`${days} ago`}</p>
          </CardContent>
        </Box>
      </Card>
  );
}

export default ChatList;