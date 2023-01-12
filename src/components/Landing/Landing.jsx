import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Landing.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import {
	addGmailuser,
	getFavorites,
	getFavoritesGmail,
	logged,
} from '../../redux/actions/index';

function Landing() {
	const { isAuthenticated, user } = useAuth0();

	const dispatch = useDispatch();

	const userDb = useSelector((state) => state.user);
	const isauth = useSelector((state) => state.isAuthenticated);

	useEffect(() => {
		if (isAuthenticated) {
			const actualUser = {
				data: {
					searchUser: {
						username: user.nickname,
						firstname: user.given_name,
						lastname: user.family_name,
						profileImage: user.picture,
						email: user.email
					},
				},
			};
			window.localStorage.setItem('logged', 'true');
			dispatch(logged(actualUser));
			let data = {
				given_name: user.given_name,
				family_name: user.family_name,
				email: user.email,
				nickname: user.nickname,
			};
			dispatch(addGmailuser(data));
			dispatch(getFavoritesGmail(user.email));
		}
		if (isauth === true) {
			dispatch(getFavorites(userDb.data.searchUser.email));
		}
	}, [user, isauth]);

	return (
		<>
			<div className='landing'>
				<div className='landing__container'>
					<h2>WELCOME TO :</h2>
					<h1>ACMEtronics</h1>
					<h3>The Best Place To Buy Electronics</h3>
				</div>
				<div className='landing__btn' >
					<NavLink to='/home'>
						<button className='btn' >ENTER</button>
					</NavLink>
				</div>
			</div>
		</>
	);
}

export default Landing;
