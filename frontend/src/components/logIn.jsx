import React, { useEffect, useState } from "react";
import Meta from "./meta";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userAction";
import LogInError from "../components/loginerror";
import { Link } from "react-router-dom";
import "../css/button.css";

const LogIn = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      //if already logged in
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    //dispatch login
    dispatch(login(email, password));
  };
  return (
    <React.Fragment>
      <Meta title="ShopSpot | Login" />
      <div className="container">
        <div className="row  justify-content-center mt-4">
          <div className=" mx-auto col-12 col-md-7">
            <div className="card">
              <h3 style={{ textAlign: "center" }} className="card-header">
                Sign In
                <i className="fa fa-user-circle ml-3"></i>
              </h3>
              <div className="list-group-item">
                {error && <LogInError children={error} />}
                <form onSubmit={submitHandler}>
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
                  <div className="row">
                    <button
                      id="remover"
                      className="btn btn-outline-primary ml-3"
                      style={{ width: "150px" }}
                      type="submit"
                    >
                      LogIn
                      <i className="ml-3 fa fa-sign-in"></i>
                    </button>
                    {loading && (
                      <div className=" ml-3 spinner-border text-primary"></div>
                    )}
                  </div>
                </form>
                <div className="row py-3 justify-content-center">
                  New Here ?{" "}
                  <Link
                    to={
                      redirect ? `/register?redirect=${redirect}` : `/register`
                    }
                  >
                    <span className="ml-3">Register Now</span>
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

export default LogIn;
