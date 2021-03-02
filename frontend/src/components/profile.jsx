import React, { useEffect, useState } from "react";
import axios from "axios";
import Meta from "./meta";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import LogInError from "../components/loginerror";
import { listMyOrders } from "../actions/orderAction";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import "../css/button.css";

const Profile = ({ history }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user, error } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success, updaterLoading, updated } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch({ type: "UPDATED" });
    }
    if (!userInfo) {
      //if already logged in
      history.push("/login");
    } else {
      if (!user.name || success) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        setImage(user.image);
      }
    }
  }, [history, userInfo, dispatch, user, success]);

  const updateHandler = (e) => {
    e.preventDefault();
    //dispatch login
    if (password !== confirmPassword) {
      setMessage("Password does not match!! ");
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, email, password, image })
      );
    }
  };

  const uploadFileHandler = async (e) => {
    //since we can upload multiple files hence we want to choose the first one of that arrray of file
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/api/profile/upload",
        formData,
        config
      );
      setImage(data);
      setUploading(false);
    } catch {
      setUploading(false);
    }
  };
  return (
    <React.Fragment>
      <Meta title="ShopSpot | Profile" />
      <div className="row mx-auto mt-4 ">
        <div className="col col-11 ml-3 col-md-3">
          <div className="card">
            <h3 style={{ textAlign: "center" }} className="card-header">
              User Profile
              {userInfo && (
                <img
                  alt="profile_image"
                  src={userInfo.image}
                  className="ml-3 mb-1"
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "20px",
                  }}
                ></img>
              )}
            </h3>
            <div className="list-group-item">
              {message && <LogInError children={message} />}
              {updated && (
                <div className="alert alert-success">
                  Profile Updated Successfully!!
                  <i className=" ml-3 fa fa-check-circle"></i>{" "}
                </div>
              )}
              {error && <LogInError children="Invalid email or Password" />}
              <form onSubmit={updateHandler}>
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
                {userInfo && (
                  <div className="form-group ">
                    <label htmlFor="image">Image : </label>
                    <input
                      className="form-control"
                      id="image"
                      type="text"
                      placeholder="Enter product's new image url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    ></input>

                    <div className="form-group">
                      <label htmlFor="uploader">
                        Choose Image File{" "}
                        <span
                          className="text-muted"
                          style={{ fontSize: "12px" }}
                        >
                          (Optional)
                        </span>{" "}
                        :
                      </label>

                      <input
                        id="uploader"
                        type="file"
                        className="form-control-file"
                        style={{ overflow: "hidden", fontSize: "12px" }}
                        onChange={uploadFileHandler}
                      ></input>
                    </div>
                    {uploading && (
                      <div className=" ml-3 mx-auto spinner-border text-primary"></div>
                    )}
                  </div>
                )}
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
                    Update
                    <i className=" ml-3 fa fa-pencil"></i>
                  </button>
                  {updaterLoading && (
                    <div className=" ml-3 spinner-border text-primary"></div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col col-12 col-md-8 mt-2">
          <div className="card">
            <h3 style={{ textAlign: "center" }} className="card-header">
              My Orders <i className="ml-3 fa fa-bars"></i>
            </h3>
            {loadingOrders ? (
              <div className=" ml-3 mx-auto spinner-border text-primary"></div>
            ) : errorOrders ? (
              <div className="alert alert-danger">{errorOrders}</div>
            ) : (
              <div className="col col-12 table-responsive">
                <table className="table table-striped ">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">DATE</th>
                      <th scope="col">TOTAL</th>
                      <th scope="col">PAID</th>
                      <th scope="col">DELIVERED</th>
                      <th scope="col">DETAILS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id.substring(0, 10)}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.totalPrice}</td>
                        <td>
                          {order.ispaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <i
                              className="ml-4 fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <i
                              className=" ml-4 fas fa-times"
                              style={{ color: "red" }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <Link to={`/order/${order._id}`}>
                            <button className="btn btn-light" id="remover">
                              Details
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
