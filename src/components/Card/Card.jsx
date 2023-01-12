import React, { useEffect } from 'react';
import './Card.css';
import Rating from 'react-rating';
import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import {
	addFavorite,
	addToCart,
	removeFavorite,
	getFavorites,
	getFavoritesGmail,
	addFavoriteGmail,
	removeFavoriteGmail,
} from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import Swal from 'sweetalert2';
import { useAuth0 } from '@auth0/auth0-react';

function Card(props) {
	const dispatch = useDispatch();
	const { user, isAuthenticated } = useAuth0();
	const favorites = useSelector((state) => state.favorites);
	let userDb = JSON.parse(localStorage.getItem('loggedUser'));
	let productId = props.id;

	const handleAddToFavorites = () => {
		if (userDb || isAuthenticated === true) {
			Swal.fire({
				title: 'Add to wishlist',
				text: 'Do you want to add this product to your wishlist?',
				icon: 'question',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes!',
			}).then((result) => {
				if (result.isConfirmed && userDb) {
					dispatch(addFavorite(userDb.email, productId));
					Swal.fire(
						'Added!',
						'The product has been added to your wishlist.',
						'success'
					);
					dispatch(getFavorites(userDb.email));
				} else if (result.isConfirmed && user) {
					dispatch(addFavoriteGmail(user.email, productId));
					dispatch(getFavoritesGmail(user.email));
					Swal.fire(
						'Added!',
						'The product has been added to your wishlist.',
						'success'
					);
					dispatch(getFavoritesGmail(user.email));
				}
			});
		} else if (!userDb || isAuthenticated === false) {
			Swal.fire({
				title: 'Please log in to see your wishlist',
				icon: 'warning',
			});
		}
	};

	const handleDeleteFavorite = () => {
		if (userDb || isAuthenticated === true) {
			Swal.fire({
				title: 'Removing from wishlist',
				text: 'Do you want to delete this product from your wishlist?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!',
			}).then((result) => {
				if (result.isConfirmed && userDb) {
					dispatch(removeFavorite(userDb.email, productId));
					Swal.fire('Deleted!', 'The product has been deleted.', 'success');
					dispatch(getFavorites(userDb.email));
				} else if (result.isConfirmed && user) {
					dispatch(removeFavoriteGmail(user.email, productId));
					dispatch(getFavoritesGmail(user.email));
					Swal.fire(
						'Deleted!',
						'The product has been deleted to your wishlist.',
						'success'
					);
					dispatch(getFavoritesGmail(user.email));
				}
			});
		} else if (!userDb || isAuthenticated === false) {
			Swal.fire({
				title: 'Please log in to see your wishlist',
				icon: 'warning',
			});
		}
	};

	const notify = () => toast.success('Item added to cart');

	const handleAddToCart = () => {
		dispatch(addToCart(props.id));
		notify();
	};

	return (
		<div className='homeCard'>
			<Link to={'/shop/' + props.id}>
				<div className='imagen'>
					<img
						src={props.image}
						alt='image not found'
						width={'120px'}
						height={'170px'}
					/>
				</div>
				<div className='item1'>
					<div className='title-stars'>
						<h1>{props.name}</h1>
						<Rating
							initialRating={props.rating}
							emptySymbol={<BsStar />}
							fullSymbol={<BsStarFill />}
							halfSymbol={<BsStarHalf />}
							readonly={true}
						/>
					</div>
					{/*<div className='inStock'>
						<span>{props.stock > 0 ? 'In stock' : 'No stock'}</span>
					</div> */}
				</div>
			</Link>
			<div className='item2'>
				<h2>${props.price}</h2>
			</div>
			<div className='item3'>
				<button className='addCart' onClick={() => handleAddToCart()}>
					Add to cart
				</button>
				{userDb ? (
					!user &&
					favorites['Favorites'] &&
					favorites['Favorites'].find((el) => el.id === props.id) ? (
						<div className='fav'>
							<a onClick={() => handleDeleteFavorite()}>
								<HiHeart size={'2em'} />
							</a>
						</div>
					) : (
						<div className='fav'>
							<a onClick={() => handleAddToFavorites()}>
								<HiOutlineHeart size={'2em'} />
							</a>
						</div>
					)
				) : user &&
				  favorites['Gmailfavs'] &&
				  favorites['Gmailfavs'].find((el) => el.id === props.id) ? (
					<div className='fav'>
						<a onClick={() => handleDeleteFavorite()}>
							<HiHeart size={'2em'} />
						</a>
					</div>
				) : (
					<div className='fav'>
						<a onClick={() => handleAddToFavorites()}>
							<HiOutlineHeart size={'2em'} />
						</a>
					</div>
				)}
			</div>
		</div>
	);
}

export default Card;
