import React, { useState } from "react";
import Meta from "./meta";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartAction";
import "../css/button.css";
import ChexkoutSteps from "./checkoutSteps";

const Payment = ({ history }) => {
  const Address = useSelector((state) => state.shippingAddress);
  const { shippingAddress } = Address;

  //if user already have filled address and other stuff in past so that next time he gets that filled automatically when order again something
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  if (!shippingAddress) {
    history.push("/shipping");
  }
  const paymentHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <React.Fragment>
      <Meta title="ShopSpot | Payment" />
      <div style={{ marginBottom: "38vh" }}>
        <div className="container">
          <div className="row  justify-content-center mt-4">
            <div className=" mx-auto col-12 col-md-7">
              <ChexkoutSteps step1 step2 step3 />
              <div
                style={{ height: "10px", width: "75%", borderRadius: "150px" }}
                className="bg-success mb-3 mt-1"
              ></div>
              <div className="card">
                <h3 style={{ textAlign: "center" }} className="card-header">
                  Payment Method
                  <i className="ml-3 fa fa-money"></i>
                </h3>
                <div className="list-group-item">
                  <form onSubmit={paymentHandler}>
                    <div className="form-group">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          value="PayPal"
                          id="invalidCheck2"
                          required
                          checked
                        ></input>
                        <label
                          className="form-check-label"
                          htmlFor="invalidCheck2"
                        >
                          PayPal or Credit card
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <button
                        id="remover"
                        className="btn btn-outline-primary ml-3"
                        style={{ width: "150px" }}
                        type="submit"
                      >
                        Continue
                        <i className="ml-3 fa fa-angle-double-right"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Payment;
