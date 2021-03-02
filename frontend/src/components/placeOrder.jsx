import React, { useEffect } from "react";
import Meta from "./meta";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../css/button.css";
import ChexkoutSteps from "./checkoutSteps";
import { createOrder } from "../actions/orderAction";

const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const address = useSelector((state) => state.shippingAddress);
  const { shippingAddress } = address;
  const paymentMethod = useSelector((state) => state.paymentMethod);

  //calculate prices

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? 10 : 0;

  cart.taxPrice = addDecimals(Number(cart.itemsPrice * 0.15));

  cart.totalPrice = (
    Number(cart.shippingPrice) +
    Number(cart.itemsPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      //above line will redirect to orderpage where order_id is the id of the object created in db
    }
    // eslint-disable-next-line
  }, [history, success]);
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <React.Fragment>
      <Meta title="ShopSpot | Place Order" />
      <div className="container">
        <div className="row  justify-content-center mt-4">
          <div className=" mx-auto col-12 col-md-7">
            <ChexkoutSteps step1 step2 step3 step4 />
            <div
              style={{ height: "10px", width: "100%", borderRadius: "150px" }}
              className="bg-success mb-3 mt-1"
            ></div>
            <div className="col col-md-12 card">
              <div className="list-group list-group-flush">
                <div className="list-group-item">
                  <h3>Shipping:</h3>
                  <p>
                    <strong className="mr-2">Address:</strong>
                    {shippingAddress.address} , {shippingAddress.state} ,{" "}
                    {shippingAddress.city},{shippingAddress.postalCode},{" "}
                    {shippingAddress.country}
                  </p>
                  <hr></hr>
                </div>
                <div className="list-group-item" style={{ marginTop: "-20px" }}>
                  <h3>Payment Method:</h3>
                  <p>
                    <strong className="mr-2">Method:</strong>
                    {paymentMethod.paymentMethod}
                  </p>
                </div>
                <br></br>
                <div className="list-group-item" style={{ marginTop: "-20px" }}>
                  <h2>Ordered Items:</h2>
                  {cart.cartItems === 0 ? (
                    <div className="alert alert-info"></div>
                  ) : (
                    <div className="list-group list-group-flush">
                      {cart.cartItems.map((item, index) => (
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
                        Total Items Price : <span>Rs. {cart.itemsPrice}</span>
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
                        Shipping Price : <span>Rs. {cart.shippingPrice}</span>
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
                        Tax Price : <span>Rs. {cart.taxPrice}</span>
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
                        Total Price : <span>Rs. {cart.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="list-group-item">
                  {error && (
                    <div className="alert alert-danger ">
                      {error}
                      <i className="ml-3 fa fa-exclamation-circle"></i>
                    </div>
                  )}
                </div>
                <div className="list-group-item d-flex justify-content-center">
                  <button
                    type="button"
                    id="remover"
                    className="btn btn-success"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
                  >
                    {" "}
                    Place Order<i className="fa fa-location-arrow ml-3"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PlaceOrder;
