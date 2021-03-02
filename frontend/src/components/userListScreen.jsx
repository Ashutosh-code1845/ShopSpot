import React, { useEffect } from "react";
import Meta from "./meta";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userAction";
import { Link } from "react-router-dom";
import "../css/button.css";

const UserList = ({ history }) => {
  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete this user")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <React.Fragment>
      <Meta title="ShopSpot | Users" />
      <div className="container mt-4">
        <div className=" mx-auto col-12 col-md-7"></div>
        <div className="card">
          <div className="card-header">
            <h3 style={{ textAlign: "center" }}>
              <span className="mx-1"> User </span>{" "}
              <span className="mx-1">Details</span>
              <i className="ml-3 fa fa-users"></i>
            </h3>
          </div>
          {loading ? (
            <div className="mx-auto spinner-border text-primary"></div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div className="table-responsive">
              <table className="table ">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">ADMIN</th>
                    <th scope="col">EDIT</th>
                    <th scope="col">DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {/* read study in diff in map and forEach from stackoverflow */}
                  {/* .map is not function error occurs when you try to iterate object not array */}

                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>
                        {user.isAdmin ? (
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <button className="btn btn-sm btn-outlin-info">
                            <i
                              className="fa fa-pencil "
                              style={{ color: "blue" }}
                            ></i>
                          </button>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm"
                          id="remover"
                          onClick={() => deleteHandler(user._id)}
                        >
                          <i
                            className="fas fa-trash"
                            style={{ color: "red" }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserList;
