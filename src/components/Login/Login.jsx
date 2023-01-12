import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { getAllUsers, loginUser } from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Swal from 'sweetalert2';

function Login() {
	const { loginWithRedirect } = useAuth0();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const actualUser = useSelector((state) => state.user);

	const allUsers = useSelector((state) => state.allUsers);

	const [input, setInput] = useState({ email: '', password: '' });

	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		setInput({
			...input,
			[event.target.name]: event.target.value,
		});

		setErrors(
			validation({
				...input,
				[event.target.name]: event.target.value,
			})
		);
	};

	useEffect(() => {
		dispatch(getAllUsers());
		if (Object.keys(actualUser).length !== 0) {
			navigate(-1);
		}
	}, [actualUser]);

	const handleSubmit = (event) => {
		event.preventDefault();
		let wrongPassword = false;
		for (let user of allUsers) {
			wrongPassword = true;
			if (user.password == input.password) {
				wrongPassword = false;
				break;
			}
		}
		if (wrongPassword) {
			Swal.fire({
				title: 'Could not Login your password is incorrect',
				icon: 'error',
			});
		} else {
			const loginSuccess = dispatch(loginUser(input));
			if (loginSuccess) navigate(-1);
		}
	};

	const validation = (input) => {
		let errors = {};
		const emailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

		if (!input.email) {
			errors.email = 'You must write the email address';
		}

		if (!emailRegex.test(input.email)) {
			errors.email = 'This is not a valid email address';
		}

		if (!input.password) {
			errors.password = 'You must write the password';
		}

		for (let user of allUsers) {
			if (user.email === input.email && user.banned) {
				errors.email = "This email address can't access the website";
				break;
			}
		}
		return errors;
	};

	return (
		<div className='login_container'>
			<div className='login_form_container'>
				<div className='left'>
					<form className='form_container' onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type='email'
							placeholder='Email'
							name='email'
							required
							className='input'
							value={input.email}
							onChange={(e) => handleChange(e)}
						/>
						{errors.email && <p className='error_msg'>{errors.email}</p>}
						<input
							type='password'
							placeholder='Password'
							name='password'
							required
							className='input'
							value={input.password}
							onChange={(e) => handleChange(e)}
						/>
						{errors.password && <p className='error_msg'>{errors.password}</p>}
						<button
							type='submit'
							className='green_btn'
							disabled={Object.keys(errors).length > 0}
						>
							Sign In
						</button>
						<button
							type='submit'
							className='green_btn'
							onClick={() => loginWithRedirect()}
						>
							Sign In with Google
						</button>
					</form>
				</div>
				<div className='right'>
					<h1>New Here ?</h1>
					<Link to='/signup'>
						<button type='button' className='white_btn'>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
