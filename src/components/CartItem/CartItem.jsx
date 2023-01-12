import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteAllFromCart, deleteOneFromCart, increaseQuantity } from '../../redux/actions';
import cartIt from "../CartItem/CartItem.module.css"
import { RiDeleteBin6Line } from "react-icons/ri"


export default function CartItem({item}) {
    const dispatch = useDispatch();

    const handleAdd = () => {
      dispatch(increaseQuantity(item.id))
    };
    const handleDeleteOne = () => {
      dispatch(deleteOneFromCart(item.id));
    };

    const handleDeleteAll = () => {
      dispatch(deleteAllFromCart(item.id));
    };

  return (
    <div className={cartIt.itemContainer}>
      <div className={cartIt.imgAndName}>
        <div className={cartIt.itImg}><img src={item.image} height='100px' alt={item.name} /></div>
        <div className={cartIt.itName}><p>{item.name}</p></div>
      </div>
        <div className={cartIt.quantity}>
          <button  onClick={()=> handleDeleteOne()} > - </button>
          <h4>{item.quantity} </h4>
          <button  onClick={()=> handleAdd()}> + </button>
        </div>
        <div><p>Stock: {item.stock}</p></div>
        <div><h4>  ${item.price * item.quantity}</h4></div>
      <div className={cartIt.deleteBtn}><button onClick={() => handleDeleteAll()}>< RiDeleteBin6Line /></button></div>
    </div>
  )
}