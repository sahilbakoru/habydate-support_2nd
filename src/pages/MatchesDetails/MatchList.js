import React, { useEffect, useState } from 'react';
import { Card, Box, CardContent, CardMedia } from '@mui/material';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './Match.css';

function MatchList({ name, message, timestamp, profilepic, user, uid }) {
	const history = useHistory();
	const { blockedByYou } = user
	const [isBlocked, setIsBlocked] = useState(false)

	useEffect(() => {
		const foundedUser = blockedByYou && blockedByYou.length > 0 ?
			blockedByYou.filter(item => item.to_user_id === uid) : [];
		if (foundedUser.length > 0) {
			setIsBlocked(true)
		} else {
			setIsBlocked(false)
		}
	}, [blockedByYou])

	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				// User is signed in.
			} else {
				history.push('/');
				// No user is signed in.
			}
		});
	}, [history]);

	return (
		<Link to={`/matches/${name}`}>
			<Card sx={{ display: 'flex' }}>
				<CardMedia
					component="img"
					sx={{ width: 60, height: 60 }}
					image={profilepic}
					alt={name}
				/>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<CardContent
						sx={{ flex: '1 0 auto', marginTop: '10px', marginBottom: '1px' }}
					>
						<h2>{name}</h2>
						<p>{message}</p>
						{isBlocked ? <p className="blocked-user">Blocked</p> : null}
					</CardContent>
				</Box>
			</Card>
		</Link>
	);
}

export default MatchList;
