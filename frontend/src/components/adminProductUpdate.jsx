import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Meta from "./meta";
import { Link } from "react-router-dom";
import { listProductDetails, updateProduct } from "../actions/productAction";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import "../css/button.css";

const AdminProductUpdate = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/productlist");
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setCategory(product.category);
        setDescription(product.description);
      }
    }
  }, [dispatch, productId, product, history, successUpdate]);

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: product._id,
        name,
        price,
        brand,
        image,
        category,
        description,
        countInStock,
      })
    );
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
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch {
      setUploading(false);
    }
  };

  return (
    <React.Fragment>
      <Meta title="ShopSpot | Admin" />
      <div className="container">
        <div className="row  justify-content-center mt-4">
          <div className=" mx-auto col-12 col-md-9">
            <div className="card">
              <h3 style={{ textAlign: "center" }} className="card-header">
                Update Product
                <i className="ml-3 fa fa-exchange"></i>
              </h3>
              {loadingUpdate && (
                <div className=" ml-3 mx-auto spinner-border text-primary"></div>
              )}
              {errorUpdate && (
                <div
                  className="alert alert-danger"
                  style={{ textAlign: "center" }}
                >
                  Some kind of error Occured!!{" "}
                </div>
              )}
              {loading ? (
                <div className=" ml-3 mx-auto spinner-border text-primary"></div>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <form onSubmit={updateHandler}>
                  <div className="form-group ml-2">
                    <label htmlFor="name">Name : </label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="Enter product's new name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group ml-2">
                    <label htmlFor="price">Price (In Rs. ) : </label>
                    <input
                      className="form-control"
                      id="price"
                      type="price"
                      placeholder="Enter product's new price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group ml-2 ">
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
                      <label htmlFor="uploader">Choose Image File: </label>

                      <input
                        id="uploader"
                        type="file"
                        style={{ overflow: "hidden" }}
                        className="form-control-file"
                        onChange={uploadFileHandler}
                      ></input>
                    </div>
                    {uploading && (
                      <div className=" ml-3 mx-auto spinner-border text-primary"></div>
                    )}
                  </div>
                  <div className="form-group ml-2 ">
                    <label htmlFor="brand">Brand : </label>
                    <input
                      className="form-control"
                      id="brand"
                      type="text"
                      placeholder="Enter product's new brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    ></input>
                  </div>

                  <div className="form-group ml-2 ">
                    <label htmlFor="count">Count in Stock : </label>
                    <input
                      className="form-control"
                      id="count"
                      type="number"
                      placeholder="Enter product's current stock"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                    ></input>
                  </div>

                  <div className="form-group ml-2 ">
                    <label htmlFor="category">Category : </label>
                    <input
                      className="form-control"
                      id="category"
                      type="text"
                      placeholder="Enter product's new category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></input>
                  </div>

                  <div className="form-group ml-2 ">
                    <label htmlFor="description">Description : </label>
                    <textarea
                      rows="2"
                      cols="50"
                      style={{ resize: "none" }}
                      maxLength="200"
                      className="form-control"
                      id="description"
                      type="textarea"
                      placeholder="Enter product's new description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="row d-flex justify-content-center">
                    <button
                      id="remover"
                      className="btn btn-outline-primary mb-2 mr-2"
                      style={{ width: "150px" }}
                      type="submit"
                    >
                      Update
                      <i className="ml-3 fa fa-folder-open"></i>
                    </button>
                    {loading && (
                      <div className=" ml-3 spinner-border text-primary"></div>
                    )}
                    <Link to="/admin/productlist">
                      <button
                        className="btn btn-outline-dark mb-2 ml-2"
                        id="remover"
                        style={{ width: "150px" }}
                      >
                        Back
                        <i className=" ml-3 fa fa-chevron-left"></i>
                      </button>
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminProductUpdate;
