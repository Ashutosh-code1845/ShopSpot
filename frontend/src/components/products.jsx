import React from "react";
import { Link } from "react-router-dom";
import "../css/product.css";
import Rating from "./rating";

const Products = ({ product }) => {
  return (
    <React.Fragment>
      <div className="card my-3 rounded" id="card-anim">
        <Link to={`/product/${product._id}`}>
          <img
            style={{ maxHeight: "228px", minHeight: "228px" }}
            className="card-img-top img-fluid"
            src={product.image}
            alt="Proucts_image"
          ></img>
        </Link>
        <div className="card-body">
          <Link
            to={`/product/${product._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className="card-title">
              <strong>{product.name}</strong>
            </div>
          </Link>
        </div>
        <div className="card-text px-4 py-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <h3>Rs. {product.price}</h3>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Products;
