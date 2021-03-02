import axios from "axios";
import Meta from "./meta";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";
import {
  getorderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderAction";
import Spinner from "../components/loadingSpinner";
import "../css/button.css";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderDetails = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  //
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //

  const orderDetails = useSelector((state) => state.orderDetails);
  const { error, loading, order } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  //
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

  //

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getorderDetails(orderId));
    } else if (!order.ispaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    order,
    match,
    orderId,
    successPay,
    successDeliver,
    history,
    userInfo,
  ]);

  //

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    order.shippingPrice = order.itemsPrice > 100 ? 10 : 0;
  }

  const SuccessPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <React.Fragment>
      <Meta title="ShopSpot | Order Details" />
      <div className="container">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="alert alert-danger">
            {error}
            <i className="ml-3 fa fa-exclamation-circle"></i>
          </div>
        ) : (
          <div className="row  justify-content-center mt-4">
            <div className=" mx-auto col-12 col-md-7">
              <div className=" card">
                <div className="list-group list-group-flush">
                  <div className="card">
                    <h2 style={{ textAlign: "center" }} className="card-header">
                      Order Created!! <i className="ml-3 fa fa-check"></i>
                    </h2>
                  </div>
                  <p className="ml-4">
                    <strong>Order Id: </strong>
                    {orderId}
                  </p>
                  <div className="ml-4">
                    <h3> Shipping:</h3>
                    <p>
                      <strong className="mr-2">Address:</strong>
                      {order.shippingAddress.address} ,{" "}
                      {order.shippingAddress.state} ,{" "}
                      {order.shippingAddress.city},
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                    <p>
                      <strong>Delivery Status : </strong>
                      {order.isDelivered ? (
                        <span style={{ color: "green" }}>
                          {" "}
                          <strong>Delivered</strong>{" "}
                          <i
                            className="fa fa-check-circle"
                            style={{ color: "green" }}
                          ></i>
                        </span>
                      ) : (
                        <span style={{ color: "red" }}>
                          {" "}
                          Not delivered yet{" "}
                        </span>
                      )}
                    </p>
                  </div>
                  <div
                    className="list-group-item"
                    style={{ marginTop: "-18px" }}
                  >
                    <h3>Payment Method:</h3>
                    <p>
                      <strong className="mr-2">Method:</strong>
                      {order.paymentMethod}
                    </p>
                    <p>
                      <strong>Payment Status : </strong>
                      {order.ispaid ? (
                        <span style={{ color: "green" }}>
                          {" "}
                          <strong>Paid</strong>{" "}
                          <i
                            className="fa fa-check-circle"
                            style={{ color: "green" }}
                          ></i>
                        </span>
                      ) : (
                        <span style={{ color: "red" }}> Not paid yet </span>
                      )}
                    </p>
                  </div>
                  <br></br>
                  <div
                    className="list-group-item"
                    style={{ marginTop: "-20px" }}
                  >
                    <h2>Ordered Items:</h2>
                    {order.orderItems === 0 ? (
                      <div className="alert alert-info"></div>
                    ) : (
                      <div className="list-group list-group-flush">
                        {order.orderItems.map((item, index) => (
                          <div className="list-group-item" key={index}>
                            <div className="row">
                              <div className="col-4 col-md-2">
                                <img
                                  style={{ borderRadius: "10%" }}
                                  src={item.image}
                                  alt={item.name}
                                  className="img-fluid "
                                ></img>
                              </div>
                              <div className="col col-md-6">
                                <Link
                                  style={{
                                    textDecoration: "none",
                                    color: "black",
                                    fontSize: "15px",
                                    fontFamily: "revert",
                                  }}
                                  to={`/product/${item.product}`}
                                >
                                  {item.name}
                                </Link>
                              </div>
                              <div className="col col-12 col-md-4">
                                {item.qty} Item * Rs. {item.price} =
                                <strong> Rs. {item.qty * item.price}</strong>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-md-5 mt-3">
              <div className="card ">
                <div className="list-group ">
                  <div className="card ">
                    <h3 style={{ textAlign: "center" }} className="card-header">
                      Order Summary
                      <i className="fa fa-sort-amount-asc ml-3"></i>
                    </h3>
                  </div>
                  <div className="list-group-item d-flex justify-content-center ">
                    <div className="row">
                      <div className="row">
                        <div
                          className="col ml-2 ml-2"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Roboto Condensed, sans-serif",
                          }}
                        >
                          Total Items Price :{" "}
                          <span>Rs. {order.itemsPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item d-flex justify-content-center">
                    <div className="row">
                      <div className="row">
                        <div
                          className="col ml-2"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Roboto Condensed, sans-serif",
                          }}
                        >
                          Shipping Price :{" "}
                          <span>Rs. {order.shippingPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item d-flex justify-content-center">
                    <div className="row">
                      <div className="row">
                        <div
                          className="col ml-2"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Roboto Condensed, sans-serif",
                          }}
                        >
                          Tax Price : <span>Rs. {order.taxPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item d-flex justify-content-center">
                    <div className="row">
                      <div className="row">
                        <div
                          className="col ml-2"
                          style={{
                            fontSize: "20px",
                            fontFamily: "Roboto Condensed, sans-serif",
                          }}
                        >
                          Total Price : <span>Rs. {order.totalPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="list-group-item justify-content-center">
                    <div className="row justify-content-center">
                      <div>
                        {!order.ispaid && (
                          <div className="list-group-item ">
                            {loadingPay && (
                              <div
                                style={{ marginLeft: "85px" }}
                                className="spinner-border text-primary"
                              ></div>
                            )}
                            {!sdkReady ? (
                              <div className="spinner-border text-primary"></div>
                            ) : (
                              <PayPalButton
                                amount={order.totalPrice}
                                onSuccess={SuccessPaymentHandler}
                              />
                            )}
                          </div>
                        )}
                      </div>
                      <div>
                        {order.ispaid ? (
                          <div></div>
                        ) : (
                          <div className="mt-1">
                            <p className="text-muted">
                              Note: This website is a prototype and consist of
                              sandbox payment module.
                            </p>
                            <p className="text-muted">
                              So, Don't reveal your payment and other details
                              here.
                            </p>
                          </div>
                        )}
                      </div>
                      {userInfo &&
                        userInfo.isAdmin &&
                        order.ispaid &&
                        !order.isDelivered && (
                          <button
                            className="btn btn-sm btn-outline-success"
                            id="remover"
                            onClick={deliverHandler}
                          >
                            <span> Mark as Delivered</span>
                            {loadingDeliver && (
                              <div
                                style={{ height: "20px", width: "20px" }}
                                className="ml-2 spinner-border text-white"
                              ></div>
                            )}
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default OrderDetails;
