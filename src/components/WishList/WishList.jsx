import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites, getFavoritesGmail, removeFavorite, removeFavoriteGmail } from "../../redux/actions";
import w from "../WishList/WishList.module.css";
import { Link } from "react-router-dom";
import { HiHeart } from "react-icons/hi"
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";


function WishList() {
  const dispatch = useDispatch();
  let favorites = useSelector((state) => state.favorites);
  let userDb = JSON.parse(localStorage.getItem("loggedUser"))
  const { isAuthenticated, user } = useAuth0();


  useEffect(() => {
    if(userDb) dispatch(getFavorites(userDb.email))
    if(user)dispatch(getFavoritesGmail(user.email))
  }, [dispatch]);
  
  let favs = favorites["Favorites"]
  let favsGmail = favorites["Gmailfavs"]

  const handleDeleteFavorite = async(productId) => {
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
    dispatch(removeFavorite(userDb.email, productId))
    Swal.fire(
      'Deleted!',
      'The product has been deleted.',
      'success'
      )
      dispatch(getFavorites(userDb.email))
  } else if(result.isConfirmed && user){
    dispatch(removeFavoriteGmail(user.email, productId))
    Swal.fire(
      'Deleted!',
      'The product has been deleted.',
      'success'
      )
      dispatch(getFavoritesGmail(user.email))
  }
})
}

if(user && isAuthenticated === true){
  return (
    <div className={w.wCont}>
      <h1> My wishlist </h1>
      {favsGmail=== undefined || !favsGmail || !favsGmail.length ? 
       <div className={w.empty}>
       <h2> Your wishlist is empty. </h2>
       <Link to='/shop'><button className={w.searchBtn}>Search products</button></Link>
      </div> : 
      favsGmail.map(el => (<div className={w.wItem} key={el.id}>
        <img src={el.image} height='120px' width='auto' alt={el.name} />
        <div className={w.productName}>
         <h3>{el.name}</h3>
         <Link to={'/shop/'+el.id}> <p>View product details</p> </Link>
        </div>
        <div className={w.likeBtn}>
          <button onClick={()=> handleDeleteFavorite(el.id)}> <HiHeart size={'2em'} /> </button>
        </div>
        </div>))
      }
    </div>
  )
}
 
if(userDb)
  return(
    <div className={w.wCont}> 
    <h1> My wishlist</h1>
      {Array.isArray(favs) && favs.length? favs.map(el => (<div className={w.wItem} key={el.id}>
         <img src={el.image} height='120px' width='auto' alt={el.name} />
         <div className={w.productName}>
          <h3>{el.name}</h3>
          <Link to={'/shop/'+el.id}> <p>View product details</p> </Link>
         </div>
         <div className={w.likeBtn}>
           <button onClick={()=> handleDeleteFavorite(el.id)}> <HiHeart size={'2em'} /> </button>
         </div>
         </div>)) : 
         <div className={w.empty}>
          <h2> Your wishlist is empty. </h2>
          <Link to='/shop'><button className={w.searchBtn}>Search products</button></Link>
         </div>
         }
    </div>
  )
  else if(!userDb || isAuthenticated === false)
  return (
    <div className={w.wCont}>
      <h1> Please Log in to see your wishlist </h1>
    </div>
  )
 
}

export default WishList;