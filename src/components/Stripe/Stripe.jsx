import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  checkout,
  clearCart,
  sendEmail,
  postOrder,
} from "../../redux/actions/index.js";
import { useNavigate } from "react-router-dom";
import "./Stripe.css";
import Cart from "../Cart/Cart.jsx";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";

const stripePromise = loadStripe(
  "pk_test_51MGiEBJf3Ra7t0LIpbXGmuheCzm64uisAtUjjerxb3LCv7AEkdcfVfUWRlVRWcScZU5oLKXKRHSP45u6LIPRS66y00oG54GCjY"
);

function CheckoutForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useAuth0();
  const userDB = useSelector((state) => state.user);

  const getCartItems = () =>
    Object.keys(cart).map((item) => (
      <span style={{ color: "#319795" }}>
        {cart[item].quantity} ({cart[item].price} c/u):{" "}
        {cart[item].quantity * cart[item].price}
      </span>
    ));

  const getTotal = () =>
    Object.values(cart).reduce((sum, { quantity, price }) => {
      return sum + quantity * price;
    }, 0);



  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log("[error]", error);
    } else {
      try {
        const { id } = paymentMethod;
        dispatch(checkout({ id, amount: getTotal() }));
        dispatch(clearCart());

        //fetch data from localstorage
        const items = JSON.parse(localStorage.getItem("cart"));
        const totalCost = getTotal();
        if (userDB && !isAuthenticated) {
          const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
          let customerEmail = loggedUser.email;
          dispatch(sendEmail(items, totalCost, customerEmail));
        }
        if (user) {
          dispatch(sendEmail(items, totalCost, user.email));
        }

        Swal.fire({
          title: "Your payment has been processed",
          text: "You will be redirected to the shop",
          icon: "success",
        });
        navigate("/shop");
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(clearCart());

  };

  return (
    <form onSubmit={handleSubmit} className="card card-body ">
      <Cart />
      {getCartItems()}
      <br />
      <div className="form-group">
        <h4>Enter your card details</h4>

        <CardElement
          options={{
            style: {
              base: {
                fontSize: "24px",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button type="submit" className="btn btn-primary">
          Buy
        </button>
      </div>
    </form>
  );
}

function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-6">
        <div className="row">
          <CheckoutForm />
        </div>
      </div>
    </Elements>
  );
}

export default Stripe;
