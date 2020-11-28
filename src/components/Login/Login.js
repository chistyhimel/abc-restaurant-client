import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import fbIcon from "../../images/logos/facebook.png";
import googleIcon from "../../images/logos/google.png";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);
  const [newUser, setNewUser] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const provider = new firebase.auth.GoogleAuthProvider();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const googleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        let token = result.credential.accessToken;
        const { displayName, email } = result.user;
        const user = { name: displayName, email: email };
        setLoggedInUser(user);
        history.replace(from);
      })
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
      });
  };

  return (
    <div className="login-container">
      <Container>
        <div className="login-form text-white">
          <h3 className="font-weight-bold pb-3">
            {newUser ? "Create an account" : "Login"}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            {newUser && (
              <div class="form-group">
                <input
                  type="text"
                  name="First Name"
                  ref={register({ required: true })}
                  className="form-control"
                  placeholder="First Name"
                />
                {errors.exampleRequired && <span>This field is required</span>}{" "}
              </div>
            )}
            {newUser && (
              <div class="form-group">
                <input
                  type="text"
                  name="Last Name"
                  ref={register({ required: true })}
                  className="form-control"
                  placeholder="Last Name"
                />
                {errors.exampleRequired && <span>This field is required</span>}{" "}
              </div>
            )}
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              name="email"
              ref={register({ required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}{" "}
            <br />
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              ref={register({ required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}{" "}
            <br />
            <button
              type="submit"
              className="btn btn-lg btn-danger form-control"
              onClick={googleLogin}
            >
              {newUser ? "Regester" : "Login"}
            </button>
          </form>
          <div className="text-center pt-3">
            <small className="">
              {newUser
                ? "Already have an account? "
                : "Don't have an account? "}

              <u
                onClick={() => setNewUser(!newUser)}
                style={{ cursor: "pointer" }}
              >
                {newUser ? "Login" : "Create an account"}
              </u>
            </small>
          </div>
          <div className="other-login mb-3">
            <h6 className="or-text">or</h6>
          </div>
          <div
            className="google-login d-flex align-items-center"
            onClick={googleLogin}
          >
            <img src={googleIcon} alt="" className="img-fluid" />
            <div className="mx-auto">Continue with Google</div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
