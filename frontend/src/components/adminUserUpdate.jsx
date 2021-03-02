import React, { useEffect, useState } from "react";
import Meta from "./meta";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userAction";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import { Link } from "react-router-dom";
import "../css/button.css";

const AdminUserUpdate = ({ match, history }) => {
  //   const [image, setImage] = useState("");
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setisAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setisAdmin(user.isAdmin);
      }
    }
  }, [dispatch, userId, user, successUpdate, history]);

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  return (
    <React.Fragment>
      <Meta title="ShopSpot | Admin" />
      <div className="container">
        <div className="row  justify-content-center mt-4">
          <div className=" mx-auto col-12 col-md-9">
            <div className="card">
              <h3 style={{ textAlign: "center" }} className="card-header">
                Update User
                <i className="ml-3 fa fa-pencil "></i>
              </h3>
              {loadingUpdate && (
                <div className=" ml-3 mx-auto spinner-border text-primary"></div>
              )}
              {errorUpdate && (
                <div className="alert alert-danger">{errorUpdate}</div>
              )}
              {loading ? (
                <div className=" ml-3 mx-auto spinner-border text-primary"></div>
              ) : error ? (
                <div className="alert alert-danger">
                  Oops!! Some error Occured!
                </div>
              ) : (
                <form onSubmit={updateHandler}>
                  <div className="form-group ml-2">
                    <label htmlFor="name">User's Name: </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="Enter user's new name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group ml-2">
                    <label htmlFor="email">User's Email : </label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="Enter user's new email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-check ml-2 ">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={isAdmin}
                      checked={isAdmin}
                      id="adminCheck"
                      onChange={(e) => setisAdmin(e.target.checked)}
                    ></input>
                    <label className="form-check-label" htmlFor="adminCheck">
                      Make Admin
                    </label>
                  </div>

                  <div className="row d-flex justify-content-center">
                    <button
                      id="remover"
                      className="btn btn-outline-primary mb-2 mr-2"
                      style={{ width: "150px" }}
                      type="submit"
                    >
                      Update
                      <i className="ml-3 fa fa-folder-open"></i>
                    </button>
                    {loading && (
                      <div className=" ml-3 spinner-border text-primary"></div>
                    )}
                    <Link to="/admin/userlist">
                      <button
                        className="btn btn-outline-dark mb-2 ml-2"
                        id="remover"
                        style={{ width: "150px" }}
                      >
                        Back
                        <i className=" ml-3 fa fa-chevron-left"></i>
                      </button>
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminUserUpdate;
