import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getAllUsers } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from "sweetalert2";

function SignUp() {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const [errors, setErrors] = useState({});

  const [create, setCreate] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    setCreate({
      ...create,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validation({
        ...create,
        [event.target.name]: event.target.value,
      })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errors = validation(create);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    Swal.fire({
      title: "The user was created succesfully, proceed to login.",
      icon: "success",
    });
    dispatch(createUser(create));
    setCreate({
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
    });
    navigate("/login");
  }

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  function validation(create) {
    const errors = {};
    if (!create.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(create.email)) {
      errors.email = "Email is invalid";
    } else {
      let emailInUse = false;
      let emailBanned = false;
      for (let user of allUsers) {
        if (user.email === create.email) {
          emailInUse = true;
          if (user.banned) {
            emailBanned = true;
          }
          break;
        }
      }

      if (emailInUse) {
        if (emailBanned) {
          errors.email = "This email address can't access the website";
        } else {
          errors.email = "Email is already in use";
        }
      }
    }

    return errors;
  }

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left-left">
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className="white_btn">
              Sign in
            </button>
          </Link>
        </div>
        <div className="right-right">
          <form onSubmit={(e) => handleSubmit(e)} className="form_container">
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstname"
              required
              className="input"
              value={create.firstname}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              required
              className="input"
              value={create.lastname}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              className="input"
              value={create.username}
              onChange={(e) => handleChange(e)}
            />
            {errors.username ? (
              <p className="error">{errors.username}</p>
            ) : null}
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              className="input"
              value={create.email}
              onChange={(e) => handleChange(e)}
            />
            {errors.email ? <p className="error">{errors.email}</p> : null}

            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className="input"
              value={create.password}
              onChange={(e) => handleChange(e)}
            />
            {errors.password ? (
              <p className="error">{errors.password}</p>
            ) : null}
            <button
              type="submit"
              className="green_btn"
              disabled={Object.keys(errors).length > 0}
            >
              Sign Up
            </button>
            <button
              type="submit"
              className="green_btn"
              onClick={() =>
                loginWithRedirect({ prompt: "login", screen_hint: "signup" })
              }
            >
              Sign Up with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
