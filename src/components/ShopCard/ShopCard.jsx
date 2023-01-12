import React from "react";
import "./ShopCard.css";
import Rating from "react-rating";
import { BsStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShopCard(props) {
  const dispatch = useDispatch()
let itemId = props.id
const notify = () => toast.success("Item added to cart");

const handleAddToCart= () => {
  dispatch(addToCart(itemId))
  notify()
  }
  return (
    <div className="shop-card">
      <div className="shop-card-image">
      <Link className="shop-card-link" to={'/shop/'+props.id}>
        <h3 className="card-title">{props.name}</h3>
        <h5>
          {" "}
          Brand: <p>{props.brand}</p>
        </h5>
        <h5 className="card-price">
          {" "}
          Price: <p>${props.price}</p>
        </h5>
        <h5>
          {" "}
          <p> Available: {props.stock > 0 
              ? props.stock
              : 'No stock'}</p>
        </h5>
        <h5>
          {" "}
          Qualification:{" "}
          <Rating
            initialRating={props.rating}
            emptySymbol={<BsStar />}
            fullSymbol={<BsStarFill />}
            halfSymbol={<BsStarHalf />}
            readonly={true}
          />
        </h5>{" "}
        <img className="card-image" 
          src={props.image}
          alt="image not found"
          width={"80px"}
          height={"120px"}
        />{" "}
        </Link>
        
        <button onClick={()=> handleAddToCart()} className="add-to-cart-button">Add to Cart</button>
      </div>
    </div>
  );
}

export default ShopCard;
