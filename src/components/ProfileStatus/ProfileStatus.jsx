import React, { useState, useHistory } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ProfileStatus.css';
import { useAuth0 } from '@auth0/auth0-react';
import { Link,  useNavigate,} from 'react-router-dom';
import EditProfile from '../EditProfile/EditProfile';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearCart, logoutUser } from '../../redux/actions';

function ProfileStatus({ showModal, closeModal }) {
	const { user, isAuthenticated, logout } = useAuth0();
	const dispatch = useDispatch();
	const navigate = useNavigate()

	const actualUser = useSelector((state) => state.user);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(actualUser));
	}, [actualUser]);

	const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);

	function toggleEditProfileModal() {
		setEditProfileModalVisible(!editProfileModalVisible);
	}
	const logoutu = () => {
		dispatch(logoutUser());
		dispatch(clearCart());
		navigate("/home")
	};

	const handleLogOut = () => {
		logout({ returnTo: window.location.origin });
		window.localStorage.clear();
		dispatch(clearCart());
	};

	if (isAuthenticated) {
		return (
			<Modal show={showModal} onHide={closeModal} style={{ maxWidth: '800px' }}>
				<Modal.Header closeButton>
					<br />
					<Modal.Title>User Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ maxHeight: '70vh', overflowY: 'scroll' }}>
					<div>
						<img
							src={user.picture}
							alt={user.name}
							width='240px'
							height='240px'
						/>
						<h3>Name: {user.name}</h3>
						<h4>{user.email}</h4>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						className='green_btn'
						variant='primary'
						onClick={() => handleLogOut()}
					>
						Logout
					</Button>
				</Modal.Footer>
			</Modal>
		);
	} else if (Object.keys(actualUser).length !== 0) {
		return (
			<Modal show={showModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>User Profile</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<div>
							<img
								src={actualUser.data.searchUser.profileImage}
								alt='profile-img'
								className='profile-img-card'
								width='240px'
								height='240px'
							/>
						</div>
						<br />
						<h1>Username: {actualUser.data.searchUser.username}</h1>
						<h3>
							Name:{actualUser.data.searchUser.firstname}{' '}
							{actualUser.data.searchUser.lastname}
						</h3>

						<h4>{actualUser.data.searchUser.email}</h4>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						className='green_btn'
						variant='primary'
						onClick={toggleEditProfileModal}
					>
						Edit Profile
					</Button>
					<Button
						className='green_btn'
						variant='primary'
						onClick={() => logoutu()}
					>
						Logout
					</Button>
				</Modal.Footer>
				{editProfileModalVisible && (
					<EditProfile
						showModal={editProfileModalVisible}
						closeModal={toggleEditProfileModal}
					/>
				)}
			</Modal>
		);
	} else {
		return (
		
			<Modal show={showModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Welcome, Login to your account or Sign Up</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div>
						<Link to='/login' className='link-to'>
							<Button className='green_btn' onClick={closeModal}>
								Login
							</Button>
						</Link>
						<Link to='/signup' className='link-to'>
							<Button className='green_btn' onClick={closeModal}>
								Sign Up
							</Button>
						</Link>
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

export default ProfileStatus;
