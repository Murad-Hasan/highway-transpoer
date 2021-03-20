import React, { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Login.css";
import googleIcon from "./google-icon.svg";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";
import { UserContext } from "../../App";

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSingIn: false,
    name: "",
    photo: "",
    password: "",
    password2: "",
    email: "",
    error: "",
    success: false,
  });

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, email, photoURL } = result.user;
        const userSingIn = {
          isSingIn: true,
          name: displayName,
          photo: photoURL,
          email: email,
        };
        setUser(userSingIn);
        setLoggedInUser(userSingIn);
        history.replace(from);

      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // email && password
  const handleBlue = (e) => { 
    let isFormValid = true;
    if (e.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'userName') {
      isFormValid = true;
    }
    if (e.target.name === "password") {
      isFormValid = e.target.value.length > 5;
      
    }
    const password = (e.target.name === 'password')
    const password2 = (e.target.name === 'password2')

    if (password.value !== password2.value) {
      isFormValid =false;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserErrorInfo = { ...user };
          newUserErrorInfo.error = "";
          newUserErrorInfo.success = true;
          setUser(newUserErrorInfo);
          updateUserName(user.name)
          setLoggedInUser(newUserErrorInfo)
        })
        .catch((error) => {
          const newUserErrorInfo = { ...user };
          newUserErrorInfo.error = error.message;
          newUserErrorInfo.success = false;
          setUser(newUserErrorInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserErrorInfo = { ...user };
          newUserErrorInfo.error = "";
          newUserErrorInfo.success = true;
          setUser(newUserErrorInfo);
          setLoggedInUser(newUserErrorInfo);
          history.replace(from);
        })
        .catch((error) => {
          const newUserErrorInfo = { ...user };
          newUserErrorInfo.error = error.message;
          newUserErrorInfo.success = false;
          setUser(newUserErrorInfo);
        });
    }
    e.preventDefault();
  };

  const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name
      })
      .then(function () {
        console.log('update user name successfully');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div id="container">
      <div className="form-wrap">
        {newUser ? <h1>Sing Up</h1> : <h1>Log In</h1>}
        <form onSubmit={handleSubmit}>
          {newUser && (
            <div className="form-group">
              <label htmlFor="name">Name*</label>
              <input
                type="text"
                name="name"
                id="first-name"
                onBlur={handleBlue}
                placeholder="Enter your name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">E-mail*</label>
            <input
              type="email"
              name="email"
              onBlur={handleBlue}
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password*</label>
            <input
              type="Password"
              onBlur={handleBlue}
              name="password"
              id="password"
              placeholder="Enter your password"
              required
            />
            {newUser && (
              <span style={{ fontSize: "14px" }} className="text-success">
                Password needs to be 6 characters or more
              </span>
            )
            }
          </div>
          {newUser && (
             <div className="form-group">
             <label htmlFor="password">Confirm Password*</label>
             <input
               type="Password"
               onBlur={handleBlue}
               name="password2"
               id="password"
               placeholder="Retype previous password"
               required
             />
           </div>
          )}
         
          {newUser ? (
            <input type="submit" className="btn" value="Sign Up" />
          ) : (
            <input type="submit" className="btn" value="Log In" />
          )}
          <p className="text-danger">{user.error} </p>
          {user.success && (
            <p className="text-info">
              User {newUser ? "Created" : "Logged In"} Successfully
            </p>
          )}
          <p className="bottom-text">
            {newUser
              ? "Already have a account Login"
              : "If your have no account? Sing Up"}{" "}
            <Link
              to={"./login"}
              onClick={() => setNewUser(!newUser)}
              name="newUser"
            >
              Here
            </Link>
          </p>
        </form>
      </div>
      <h6 style={{ textAlign: "center" }}>Or,</h6>
      <button className="google-btn" onClick={handleGoogleSignIn}>
        {" "}
        <img className="mr-3" width="25px" src={googleIcon} alt="" />
        Sing In With Google
      </button>
    </div>
  );
};

export default Login;
