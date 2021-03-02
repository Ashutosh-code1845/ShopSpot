import React, { useState, useEffect } from "react";
import Meta from "./meta";
import Rating from "./rating";
import "../css/productScreen.css";
import Message from "./message";
import Spinner from "./loadingSpinner";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productAction";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    error: errorProductReview,
    success: successProductReview,
  } = productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted !!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const addToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <React.Fragment>
      <Meta
        title={`ShopSpot | ${product.brand}`}
        description={product.description}
      />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message />
      ) : (
        <div className="mx-auto col col-12 col-md-10">
          <div className="row d-flex justify-content-center">
            <div className="col col-12 col-md-3 mt-3">
              <img
                id="prod_image"
                // style={{ width: "100%", height: "95%" }}
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col col-12 col-md-5 mt-3">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <h3>{product.name}</h3>
                </li>
                <li className="list-group-item">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </li>
                <li className="list-group-item">Price: Rs.{product.price}</li>
                <li className="list-group-item">
                  Description: {product.description}
                </li>
              </ul>
              <div className="card mt-2">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong>Rs. {product.price}</strong>
                  </li>
                  <li className="list-group-item">
                    Status:{" "}
                    {product.countInStock > 0 ? (
                      <span>
                        <span className="badge badge-success badge-pill">
                          {product.countInStock}
                        </span>{" "}
                        items in stock
                      </span>
                    ) : (
                      "Not In Stock"
                    )}
                  </li>
                </ul>
              </div>
              {product.countInStock > 0 && (
                <div className="list-group-item">
                  <div className="row">
                    <label className="col">Qty:</label>
                    <div className="col ">
                      <form>
                        <select
                          className="form-control"
                          style={{ height: "34px" }}
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </form>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={addToCart}
                className="btn btn-primary mt-1"
                type="button"
                disabled={product.countInStock > 0 ? false : true}
              >
                Add to Cart
              </button>
            </div>
            <div
              className="col-12 col-md-4 mt-3 bg-white"
              style={{
                borderRadius: "1%",
                maxHeight: "100%",
              }}
            >
              <div className="card-header text-center mt-1">
                <h3>
                  Reviews<i className="ml-3 fa fa-podcast"></i>
                </h3>
              </div>
              {product.reviews.length === 0 && (
                <div className="alert alert-info mt-1">
                  No Reviews!! Be the first to admire this !
                </div>
              )}
              {
                <div
                  className="list-group mt-1"
                  style={{
                    overflowY: "auto",
                    maxHeight: "250px",
                    minHeight: "250px",
                  }}
                >
                  {product.reviews &&
                    product.reviews.map((review) => (
                      <div
                        className="list-group-item list-group-flush"
                        key={review._id}
                      >
                        <strong>{review.name}</strong>

                        <Rating value={review.rating} />

                        <p className="text-muted" style={{ fontSize: "15px" }}>
                          {review.createdAt.substring(0, 10)}
                        </p>

                        <p style={{ marginTop: "-4%" }}>{review.comment}</p>
                      </div>
                    ))}
                </div>
              }
              <div className="position-relative">
                <div className="card-header mt-3 position-sticky">
                  <h6>Want to Write a Coustomer Review ?</h6>
                  {errorProductReview && (
                    <div className="alert alert-danger">
                      Oops!! Something went wrong
                    </div>
                  )}
                </div>
                <div className="mt-1 text-center">
                  {" "}
                  {userInfo ? (
                    <form onSubmit={submitHandler}>
                      <div className="form-group">
                        <div className="row">
                          <div className="col">
                            <label
                              htmlFor="review"
                              style={{
                                marginLeft: "-68%",
                                marginTop: "5px",
                              }}
                            >
                              <strong> Rating : </strong>
                            </label>
                          </div>
                          <div className="col">
                            <select
                              style={{ marginLeft: "-80%" }}
                              className="form-control"
                              id="review"
                              type="select"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select ...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Satisfying</option>
                              <option value="4">4 - Amazing</option>
                              <option value="5">5 - Excellent</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row ml-1">
                          <label htmlFor="comment">
                            <button
                              id="remover"
                              className="btn btn-sm btn-outline-info mr-3"
                              style={{ marginBottom: "5px" }}
                            >
                              Post
                              <i className="ml-3 fa fa-comment-o"></i>
                            </button>
                          </label>
                          <input
                            type="textarea"
                            placeholder="Comment your Views..."
                            row="3"
                            col="50"
                            maxLength="200"
                            id="comment"
                            style={{
                              resize: "none",
                              borderRadius: "10px",
                              borderBottom: "2px",
                              borderColor: "white",
                              height: "10%",
                              marginTop: "5px",
                            }}
                            onChange={(e) => setComment(e.target.value)}
                          ></input>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="alert alert-info">
                      Please{" "}
                      <Link to="/login">
                        <strong>Login</strong>
                      </Link>{" "}
                      first!!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductScreen;
