import React, { useState, useEffect } from 'react';
import './App.css';
import { connect, useDispatch } from 'react-redux'
import Notifications from './pages/Notifications';
import MatchesList from './pages/MatchesDetails/index';
import ChatList from './pages/ChatDetails/index';
import ChatScreen from './pages/ChatDetails/ChatScreen';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';
import Header from './pages/Header';
import MyProfile from './pages/MyProfile';
import PersonProfile from './pages/PersonProfile';
import { initFirebase } from './services/initFirebaseService';
import { bindActionCreators } from 'redux';
import actionCreators from "./redux/actions"
import userActions from './redux/user/actions';
import globalActions from './redux/global/action';
import matchesActions from './redux/matches/actions';
import chatsActions from './redux/chats/actions';
import Home from './pages/Home';
import Toaster from "./components/toaster"
import MyLoader from './components/newLoader';
import Membership from './pages/Membership';

const firebase = initFirebase();

function App({ user }) {
	// const [isSignedIn, setIsSignedIn] = useState(user.isLogin);
	const dispatch = useDispatch()
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			dispatch(userActions.userSignIN())
		} else {
			dispatch(userActions.userSignOut())
		}
	}, []);

	const signOut = async () => {
		try {
			await firebase.auth().signOut();
			dispatch(userActions.userSignOut())
			dispatch(globalActions.clearGlobalReducer())
			dispatch(chatsActions.clearChat())
			dispatch(matchesActions.clearMatches())
			localStorage.removeItem('user');
		} catch (error) {
		}
	};

	const { isLogin } = user


	return (
		<Router>
			<MyLoader>
				<Header isSignedIn={isLogin} signOut={signOut} user={user} />
				<Switch>
					<Route path="/notifictaions">
						<Notifications />
					</Route>
					<Route path="/chat/:person">
						<ChatScreen signOut={signOut} />
					</Route>
					<Route path="/chats">
						<ChatList signOut={signOut} />
					</Route>
					<Route path="/matches/:person">
						<PersonProfile />
					</Route>
					<Route path="/matches">
						<MatchesList />
					</Route>
					<Route path="/membership">
						<Membership />
					</Route>
					<Route path="/">
						{isLogin ? <MyProfile signOut={signOut} /> : <Home setLogin={isLogin} signOut={signOut} />}
					</Route>
				</Switch>
				<Toaster />
			</MyLoader>
		</Router>
	);
}

const mapStateToProps = (states) => {
	return {
		user: states.user
	}
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App)
