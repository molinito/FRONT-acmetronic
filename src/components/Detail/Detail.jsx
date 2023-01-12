import React, { useEffect, useState } from "react";
import d from "../Detail/detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getProductDetail, clean, addToCart, addFavorite, removeFavorite, getFavorites, addFavoriteGmail, removeFavoriteGmail, getFavoritesGmail } from "../../redux/actions";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";
import Reviews from "../Reviews/Reviews";

export default function Detail() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.detail);
  const favs = useSelector((state)=> state.favorites)
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth0();
  let userDb = JSON.parse(localStorage.getItem("loggedUser"))
  
  const [review, setReview] = useState(false)
  
  function handleReview (){
    
    if(review) {setReview(false)} else {setReview(true)}
  }

  useEffect(() => {
    dispatch(getProductDetail(id));
    if(userDb){dispatch(getFavorites(userDb.email))}
    if(user){dispatch(getFavoritesGmail(user.email))}
    return () => {
      dispatch(clean())};
  }, [dispatch, id]);

  const notify = () => toast.success("Item added to cart");

  const handleAddToCart = () => {
    dispatch(addToCart(product.product.id));
    notify();
  };
  const handleAddToFavorites= () => {
    if(userDb || isAuthenticated === true  ){
      Swal.fire({
      title: 'Add to wishlist',
      text: "Do you want to add this product to your wishlist?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.isConfirmed && userDb) {
        dispatch(addFavorite(userDb.email, parseInt(id)))
        Swal.fire(
          'Added!',
          'The product has been added to your wishlist.',
          'success'
          )
          dispatch(getFavorites(userDb.email))
      } 
      else if(result.isConfirmed && user){
        dispatch(addFavoriteGmail(user.email, parseInt(id)))
        Swal.fire(
          'Added!',
          'The product has been added to your wishlist.',
          'success'
          )
          dispatch(getFavoritesGmail(user.email))
      }
    }
      )
    } else if(!userDb || isAuthenticated === false) {
      Swal.fire({
        title: 'Please log in to see your wishlist',
        icon: 'warning'
      })
    }
    }
    
    const handleDeleteFavorite = () => {
      if(userDb || user ){
        Swal.fire({
        title: 'Removing from wishlist',
        text: "Do you want to delete this product from your wishlist?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed && userDb) {
          dispatch(removeFavorite(userDb.email, parseInt(id)))
          Swal.fire(
            'Deleted!',
            'The product has been deleted.',
            'success'
            )
            dispatch(getFavorites(userDb.email))
        }  else if(result.isConfirmed && user){
          dispatch(removeFavoriteGmail(user.email, parseInt(id)))
          Swal.fire(
            'Deleted!',
            'The product has been deleted to your wishlist.',
            'success'
            )
            dispatch(getFavoritesGmail(user.email))
        }
      })
      } else if(!userDb || isAuthenticated === false) {
        Swal.fire({
          title: 'Please log in to see your wishlist',
          icon: 'warning'
        })
      }
      } 
      

  if (product.length !== 0)
    return (
      <div className={d.detail}>
        <div className={d.container}>
          
          <div className={d.img}>
            <img src={product.product.image} />
          </div>
          <div className={d.content}>
            <h1>{product.product.name}</h1>
            {userDb? (!user && favs["Favorites"] && favs["Favorites"].find(el => el.id === product.product.id) ? 
            (<div className={d.favIcons}><a onClick={()=> handleDeleteFavorite()} ><HiHeart size={'2em'} /></a></div>) : 
            (<div className={d.favIcons}><a onClick={()=>handleAddToFavorites()}><HiOutlineHeart size={'2em'} /></a></div>  )) :
             (user && !userDb && favs["Gmailfavs"] && favs["Gmailfavs"].find(el => el.id === product.product.id) ? 
            (<div className={d.favIcons}><a onClick={()=> handleDeleteFavorite()} ><HiHeart size={'2em'} /></a></div>) : 
            (<div className={d.favIcons}><a onClick={()=>handleAddToFavorites()}><HiOutlineHeart size={'2em'} /></a></div>  ))}
            <p>Rating: {product.product.rating}</p>
            <h2>${product.product.price}</h2>
            <h3>{product.product.description}</h3>
            <div className={d.button}>
              <button onClick={() => handleAddToCart()}>
                {" "}
                Add to cart
                <span class="material-symbols-outlined"> shopping_cart </span>
              </button>
              <div className={d.backLink}>
            <Link to={"/shop/"}>« Continue shopping</Link>
            </div>
            </div>
          </div>
        </div>
        <div className={d.reviews}>
          <h2>Reviews: </h2>
          {product.product.reviews ? (
            product.product.reviews.map((r) => (
              <div className={d.reviewsContent}>
                <h3> {r} </h3>
              </div>
            ))
          ) : (
            <div className={d.reviewsContent}>
              {" "}
              <h3> This product does not have reviews yet. </h3>
            </div>
          )}
          <div className={d.reviewsBtn}>
          
              <button onClick={handleReview}
                type="button"
                class="btn btn-danger"
                style={{ width: "30%" }}
                data-toggle="modal"
                data-target="#form"
              >
                Add reviews
              </button>
              {review ? <Reviews product ={product.product?.id} /> : null}
          </div>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    );
  else
    return (
      <div>
        <NavLink to="/reviews">Reviews</NavLink>
        Loading...
      </div>
    );
}