import React, { useEffect, useState } from "react";
import Meta from "./meta";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import LogInError from "../components/loginerror";
import { Link } from "react-router-dom";
import "../css/button.css";

const Register = ({ location, history }) => {
  //   const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  const redirect = location.search
    ? location.search.split("=")[1]
    : userInfo
    ? "/"
    : "/register";
  useEffect(() => {
    if (userInfo) {
      //if already logged in
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const registerHandler = (e) => {
    e.preventDefault();
    //dispatch login
    if (password !== confirmPassword) {
      setMessage("Password does not match!! ");
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <React.Fragment>
      <Meta title="ShopSpot | Register" />
      <div className="container">
        <div className="row  justify-content-center mt-4">
          <div className=" mx-auto col-12 col-md-7">
            <div className="card">
              <h3 style={{ textAlign: "center" }} className="card-header">
                Register
                <i className="fa fa-user-circle ml-3"></i>
              </h3>
              <div className="list-group-item">
                {message && <LogInError children={message} />}
                {error && <LogInError children="Invalid email or Password" />}
                <form onSubmit={registerHandler}>
                  <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="Enter name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address: </label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass">Enter Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="pass"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPass">Confirm Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPass"
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                  </div>
                  <div className="row">
                    <button
                      id="remover"
                      className="btn btn-outline-primary ml-3"
                      style={{ width: "150px" }}
                      type="submit"
                    >
                      Register
                      <i className="ml-3 fa fa-sign-in"></i>
                    </button>
                    {loading && (
                      <div className=" ml-3 spinner-border text-primary"></div>
                    )}
                  </div>
                </form>
                <div className="row py-3 justify-content-center">
                  Already Have An Account ?{" "}
                  <Link
                    to={redirect ? `/login?redirect=${redirect}` : `/login`}
                  >
                    <span className="ml-3">LogIn</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Register;
