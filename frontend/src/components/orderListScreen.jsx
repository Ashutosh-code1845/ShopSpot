import React, { useEffect } from "react";
import Meta from "./meta";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../actions/orderAction";
import { Link } from "react-router-dom";
import "../css/button.css";

const OrderList = ({ history }) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  return (
    <React.Fragment>
      <Meta title="ShopSpot | Order List" />
      <div className="container mt-4">
        <div className=" mx-auto col-12 col-md-7"></div>
        <div className="card">
          <div className="card-header">
            <h3 style={{ textAlign: "center" }}>
              <span className="mx-1"> Orders </span>
              <i className="ml-3 fa fa-list-alt"></i>
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
                    <th scope="col">USER</th>
                    <th scope="col">DATE</th>
                    <th scope="col">TOTAL</th>
                    <th scope="col">PAID</th>
                    <th scope="col">DELIVERED</th>
                    <th scope="col">DETAILS</th>
                  </tr>
                </thead>
                <tbody>
                  {/* read study in diff in map and forEach from stackoverflow */}
                  {/* .map is not function error occurs when you try to iterate object not array */}

                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user && order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>Rs. {order.totalPrice}</td>
                      <td>
                        {order.ispaid ? (
                          <span style={{ color: "green" }}>
                            <strong> {order.paidAt.substring(0, 10)}</strong>
                          </span>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <span style={{ color: "green" }}>
                            <strong>
                              {order.deliveredAt.substring(0, 10)}
                            </strong>
                          </span>
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <Link to={`/order/${order._id} `}>
                          <button className="btn btn-sm btn-outline-info">
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
    </React.Fragment>
  );
};

export default OrderList;
