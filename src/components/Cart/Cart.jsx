import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart, postOrder } from "../../redux/actions";
import CartItem from "../CartItem/CartItem";
import cartStyles from "../Cart/Cart.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const usersDb = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { user } = useAuth0();
  const navigate = useNavigate();
  // crear una funcion para que el usuario no pueda comprar si no esta logueado

  let TotalCart = 0;
  Object.keys(cart).forEach(function (item) {
    TotalCart += cart[item].quantity * cart[item].price;
  });
  function TotalPrice(price, tonggia) {
    return Number(price * tonggia).toLocaleString("en-US");
  }
  let data = {
    "status": "created",
    "total": TotalCart,
    "items": cart.map((item) => [
      "id", item.id,
      "name", item.name,
      "price", item.price,
      "quantity", item.quantity,
    ]),
    "email": user? user.email : "email",
  };
  // -- el item se guarda en el carrito ---
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleClear = () => {
    dispatch(clearCart());
  };
 
  

  const handleSaveCart = () => {
    dispatch(postOrder(data))
    navigate("/stripe/");
  };

  if (!cart.length)
    return (
      <div className={cartStyles.empty}>
        <h1>Cart</h1>
        <h2> Your cart is empty. </h2>
        <Link to={"/shop/"}>
          <button className={cartStyles.seeBtn}> See products </button>
        </Link>
      </div>
    );

  if (cart.length)
    return (
      <div className={cartStyles.cartContainer}>
        <h1> Cart </h1>
        <div className="d-flex justify-content-center">
          <p> You have {cart.length} items in your cart </p>
        </div>
        {cart.map((item) => (
          <div key={item.id} className={cartStyles.card}>
            <CartItem key={item.id} item={item} />{" "}
          </div>
        ))}
        <div className={cartStyles.total}>
          <h4>Total: $ {TotalCart} </h4>
        </div>
        <div className={cartStyles.buyBtn}>
          <button onClick={() => handleSaveCart()}> Confirm Payment </button>
        </div>
        <div className={cartStyles.clear}>
          <button onClick={() => handleClear()}> Clear cart </button>
        </div>
        <div className={cartStyles.continue}>
          <Link to={"/shop/"}>« Continue shopping</Link>
        </div>
      </div>
    );
}

