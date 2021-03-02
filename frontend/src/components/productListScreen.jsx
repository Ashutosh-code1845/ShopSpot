import React, { useEffect } from "react";
import Meta from "./meta";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./pagination";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productAction";
import { Link } from "react-router-dom";
import Message from "./message";
import "../css/button.css";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductList = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const keyword = "";

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || userInfo.isAdmin === false) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts(keyword, pageNumber));
    }
  }, [
    dispatch,
    userInfo,
    history,
    successDelete,
    successCreate,
    createdProduct,
    keyword,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you Sure to delete this product ?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <React.Fragment>
      <Meta title="ShopSpot | Product List" />
      {errorDelete && <Message children={errorDelete} />}
      {errorCreate && <Message children={errorCreate} />}
      <div className="container mt-4 mb-2">
        <div className=" mx-auto col-12 col-md-7"></div>
        {successDelete && (
          <div className="alert alert-success" style={{ textAlign: "center" }}>
            {" "}
            Product Deleted!!{" "}
          </div>
        )}
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <div>
              <h3 style={{ textAlign: "center" }}>
                <span className=""> My Store </span>
                <i className="ml-3 fa fa-sitemap"></i>
              </h3>
            </div>
            <div>
              {loadingCreate ? (
                <div className="mr-4 spinner-border text-primary"></div>
              ) : (
                <button
                  className="btn btn-outline-info "
                  id="remover"
                  onClick={createProductHandler}
                >
                  Create
                  <i className=" ml-2 fas fa-plus"></i>
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="mx-auto spinner-border text-primary"></div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">IMAGE</th>
                      <th scope="col">NAME</th>
                      <th scope="col">PRICE</th>
                      <th scope="col">CATEGORY</th>
                      <th scope="col">BRAND</th>
                      <th scope="col">UPDATE</th>
                      <th scope="col">DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* read study in diff in map and forEach from stackoverflow */}
                    {/* .map is not function error occurs when you try to iterate object not array */}

                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id.substring(0, 10)}</td>
                        <td style={{ paddingTop: "-1000px" }}>
                          <div
                            className="col-12 col-md-12"
                            style={{ width: "100px" }}
                          >
                            <img
                              style={{
                                borderRadius: "10%",
                                maxHeight: "70px",
                                minHeight: "70px",
                                maxWidth: "90px",
                                minWidth: "90px",
                              }}
                              src={product.image}
                              alt={product.name}
                              className="img-fluid "
                            ></img>
                          </div>
                        </td>
                        <td>{product.name}</td>
                        <td>Rs. {product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td>
                          <Link to={`/admin/product/${product._id}/edit`}>
                            <button className="btn btn-sm btn-outlin-info">
                              <i
                                className="fa fa-pencil "
                                style={{ color: "blue" }}
                              ></i>
                            </button>
                          </Link>
                        </td>
                        <td>
                          {loadingDelete ? (
                            <div className="mx-auto spinner-border text-primary"></div>
                          ) : (
                            <button
                              className="btn btn-sm"
                              id="remover"
                              onClick={() => deleteHandler(product._id)}
                            >
                              <i
                                className="fas fa-trash"
                                style={{ color: "red" }}
                              ></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      <Pagination pages={pages} page={page} isAdmin={true} />
    </React.Fragment>
  );
};

export default ProductList;
