import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import {
	getFavorites,
	getUserByEmail,
	loginUser,
	searchName,
	userProfile,
	getFavoritesGmail,
} from '../../redux/actions';

import './Navbar.css';
import logo from '../../Assets/logo1.jpg';
import ProfileStatus from '../ProfileStatus/ProfileStatus';
import { useAuth0 } from '@auth0/auth0-react';

const picture = (user, userDb, isAuthenticated, picture2) => {
	//console.log(user, userDb, picture2, 20);
	if (user && isAuthenticated) {
		return user.picture;
	}
	if (userDb && userDb.searchUser) {
		return userDb.searchUser?.profileImage;
	}
	return picture2;
};

function Navbar() {
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const cart = useSelector((state) => state.cart);
	const favorites = useSelector((state) => state.favorites);
	const logged = useSelector((state) => state.isAuthenticated);
	let userDb = JSON.parse(localStorage.getItem('loggedUser'));

	const { user, isAuthenticated } = useAuth0();
	const useremail = useSelector((state) => state.userEmail);
	// actualiza el componente para cargar el length del array de favoritos cuando agregamos o eliminamos uno
	useEffect(() => {
		if (userDb) dispatch(getFavorites(userDb.email));
		if (user) dispatch(getFavoritesGmail(user.email));
		if (userDb) dispatch(getUserByEmail(userDb));
	}, [dispatch]);

	let myFavs =
		favorites['Favorites'] !== undefined ? favorites['Favorites'].length : '0';

	let favsGmail =
		favorites['Gmailfavs'] !== undefined ? favorites['Gmailfavs'].length : '0';

	const [showModal, setShowModal] = useState(false);

	const handleSearch = (e) => {
		dispatch(searchName(e));
		setName(e);
	};

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};
	return (
		<div className='nav-bar'>
			<img
				className='logo'
				src={logo}
				alt='logo'
				width={'100px'}
				height={'100px'}
			/>
			<NavLink to='/home'>Home</NavLink>
			<NavLink to='/shop'>Shop</NavLink>
			<NavLink to='/about'>About</NavLink>
			{logged ? <NavLink to='/dashboard'>Dashboard</NavLink> : null}

			<div className='search-bar'>
				<input
					id='search'
					className='bar-btn'
					name='search'
					placeholder='Search...'
					value={name}
					onChange={(e) => handleSearch(e.target.value)}
				></input>

				<button className='btn'>
					<img
						src='https://img.icons8.com/ios/50/000000/search--v1.png'
						width={'30px'}
						height={'30px'}
					/>
				</button>
			</div>

			<div className='cart'>
				<button className='btnes'>
					{' '}
					<Link to={'/wishlist'}>
						<img
							src='https://img.icons8.com/ios/50/000000/like--v1.png'
							width={'25px'}
							height={'25px'}
						/>
						<p>{user ? favsGmail : myFavs}</p>
					</Link>
				</button>

				<button className='btnes'>
					<Link to='/shop/cart'>
						<img
							src='https://img.icons8.com/ios/50/000000/shopping-cart--v1.png'
							width={'25px'}
							height={'25px'}
						/>
						<p>{cart.length}</p>
					</Link>
				</button>

				<button
					className='btnes'
					onClick={() => {
						openModal();
					}}
				>
					<img
						src={picture(
							user,
							useremail,
							isAuthenticated,
							'https://img.icons8.com/ios/50/000000/user--v1.png'
						)}
						width={'43px'}
						height={'43px'}
					/>
				</button>

				<ProfileStatus showModal={showModal} closeModal={closeModal} />
			</div>
		</div>
	);
}

export default Navbar;
