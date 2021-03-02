import React, { useState } from "react";
import Meta from "./meta";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartAction";
import "../css/button.css";
import ChexkoutSteps from "./checkoutSteps";

const Shipping = ({ history }) => {
  const Address = useSelector((state) => state.shippingAddress);
  const { shippingAddress } = Address;

  //if user already have filled address and other stuff in past so that next time he gets that filled automatically when order again something
  const [address, setAddress] = useState(shippingAddress.address);
  const [state, setState] = useState(shippingAddress.state);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();

  const shippingHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, state, city, postalCode, country })
    );
    history.push("/payment");
  };

  return (
    <React.Fragment>
      <Meta title="ShopSpot | Shipping" />
      <div className="container">
        <div className="row  justify-content-center mt-4">
          <div className=" mx-auto col-12 col-md-7">
            <ChexkoutSteps step1 step2 />
            <div
              style={{ height: "10px", width: "50%", borderRadius: "150px" }}
              className="bg-success mb-3 mt-1"
            ></div>
            <div className="card">
              <h3 style={{ textAlign: "center" }} className="card-header">
                Shipping
                <i className="ml-3 fa fa-truck"></i>
              </h3>
              <div className="list-group-item">
                <form onSubmit={shippingHandler}>
                  <div className="form-group">
                    <label htmlFor="address">Address: </label>
                    <input
                      className="form-control"
                      id="address"
                      required
                      type="text"
                      placeholder="Enter address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State: </label>
                    <input
                      className="form-control"
                      id="state"
                      required
                      type="text"
                      placeholder="Enter State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City: </label>
                    <input
                      className="form-control"
                      id="city"
                      type="text"
                      required
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="postol_code">Postal Code: </label>
                    <input
                      className="form-control"
                      id="postol_code"
                      type="text"
                      required
                      placeholder="Enter postal code"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country: </label>
                    <input
                      className="form-control"
                      id="country"
                      type="text"
                      required
                      placeholder="Enter country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    ></input>
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
    </React.Fragment>
  );
};

export default Shipping;
