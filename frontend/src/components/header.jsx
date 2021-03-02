import React from "react";
import "../css/header.css";
import { Route } from "react-router-dom";
import logo from "../css/logo.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../actions/userAction";
import SearchBox from "./searchBox";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logOutHandler = () => {
    dispatch(logOut());
  };

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-dark sticky-top"
        id="nav-col"
      >
        <div id="div-logo">
          <NavLink className="navbar-brand " to="/" id="heading">
            <img src={logo} alt="Logo" id="logo"></img>
          </NavLink>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mr-5">
            <li className="nav-item slider ">
              <NavLink className="nav-link mr-3 " to="/cart" id="cart">
                <i className="fa fa-opencart mr-1"></i>
                Cart <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            {userInfo ? (
              <li className="nav-item dropdown ml-2">
                <div
                  className="nav-link dropdown-toggle active"
                  style={{ cursor: "pointer" }}
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {userInfo.name}
                </div>
                <div
                  className="dropdown-menu "
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link className="dropdown-item" to="/profile">
                    Profile
                    <img
                      alt="profile_image"
                      src={userInfo.image}
                      className="ml-4"
                      style={{
                        height: "30px",
                        width: "30px",
                        borderRadius: "20px",
                      }}
                    ></img>
                  </Link>
                  <div
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                    onClick={logOutHandler}
                  >
                    Log Out<i className=" ml-4 fa fa-sign-out"></i>
                  </div>
                </div>
              </li>
            ) : (
              <li className="nav-item slider">
                <NavLink className="nav-link " to="/login" id="login">
                  <i className="fa fa-user mr-1"></i>
                  LogIn
                </NavLink>
              </li>
            )}
            {userInfo && userInfo.isAdmin && (
              <li className="nav-item dropdown ml-2">
                <div
                  className="nav-link dropdown-toggle active"
                  style={{ cursor: "pointer" }}
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Admin<i className="ml-3 fa fa-star"></i>
                </div>
                <div
                  className="dropdown-menu "
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link className="dropdown-item" to="/admin/userlist">
                    User List <i className="ml-3 fa fa-users"></i>
                  </Link>
                  <Link
                    to="/admin/productlist"
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                  >
                    My Store <i className="ml-3 fa fa-sitemap"></i>
                  </Link>
                  <Link
                    to="/admin/orderlist"
                    style={{ cursor: "pointer" }}
                    className="dropdown-item"
                  >
                    Orders <i className="ml-3 fa fa-truck"></i>
                  </Link>
                </div>
              </li>
            )}
          </ul>
          <Route
            render={({ history }) => <SearchBox history={history} />}
          ></Route>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Header;
