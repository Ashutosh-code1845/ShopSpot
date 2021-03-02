import React, { useEffect } from "react";
import Meta from "./meta";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartAction";
import "../css/button.css";

const Cart = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <React.Fragment>
      <Meta title="ShopSpot | Cart" description="My Cart" />
      <div className="container-fluid list-group list-group-flush col-12 ">
        <div className="row" style={{ borderRadius: "10px" }}>
          <div className="col col-md-8 mx-auto my-5 px-0">
            <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
              <h3 style={{ textAlign: "center" }} className="list-group-item">
                MY CART
                <i className="ml-3 fa fa-shopping-basket"></i>
                <hr></hr>
              </h3>
            </Link>
            {cartItems.length === 0 ? (
              <div className="alert alert-info">
                Your Cart is empty!!{" "}
                <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                  <strong>Shop Now</strong>
                </Link>
              </div>
            ) : (
              <div className="list-group list-group-flush">
                {cartItems.map((item) => (
                  <div className="list-group-item" key={item.product}>
                    <div className="row">
                      <div className="col col-3 col-md-1">
                        <img
                          style={{ borderRadius: "10%" }}
                          src={item.image}
                          alt={item.name}
                          className="img-fluid "
                        ></img>
                      </div>
                      <div className="col col-md-5 col-8 my-auto">
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "black",
                            fontSize: "19px",
                            fontFamily: "revert",
                          }}
                          to={`/product/${item.product}`}
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div
                        className="col col-md-2 my-auto col-6"
                        style={{ fontFamily: "revert", fontSize: "19px" }}
                      >
                        <span style={{ fontFamily: "Sora, sans-serif" }}>
                          {" "}
                          <strong>Rs. {item.price}</strong>
                        </span>
                      </div>
                      <div className="col col-md-2 my-auto">
                        <form>
                          <select
                            className="form-control"
                            style={{
                              height: "34px",
                            }}
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </form>
                      </div>
                      <div className="col col-md-2 mx-auto">
                        <button
                          type="button"
                          style={{ width: "40px" }}
                          id="remover"
                          className="btn btn-outline-danger ml-4 my-auto"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="col col-md-4 px-0 ">
              <div className="card mt-3">
                <div
                  className="list-group list-group-flush"
                  style={{ textAlign: "center" }}
                >
                  <div className="list-group-item">
                    <h3
                      style={{ fontFamily: "Roboto Condensed,sans-serif" }}
                      className="my-1"
                    >
                      Total<span> </span>
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      <span> </span>
                      items in cart.
                    </h3>
                    <span style={{ fontFamily: "Work Sans, sans-serif" }}>
                      Rs.<span> </span>
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  id="remover"
                  className="btn btn-outline-dark mx-auto mb-2 mt-2"
                  style={{ width: "200px" }}
                  disabled={cartItems.length === 0 ? true : false}
                  onClick={checkOutHandler}
                >
                  <strong> Proceed to checkout</strong>
                  <i className="fa fa-credit-card ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Cart;
