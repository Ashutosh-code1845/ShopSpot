import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Products from "../components/products";
import Message from "../components/message";
import Spinner from "../components/loadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAction";
import Pagination from "../components/pagination";

const Home = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <React.Fragment>
      <Helmet>
        <title>ShopSpot | Home</title>
        <meta name="description" content="Brilliant Basic !!"></meta>
        <meta
          name="keywords"
          content="electronics, clothing ,cheap price"
        ></meta>
      </Helmet>

      {loading ? (
        <Spinner />
      ) : error ? (
        <Message children={error} />
      ) : (
        <>
          <div className="row mx-auto">
            {products.map((product) => (
              <div key={product._id} className="mx-auto">
                <Products product={product} />
              </div>
            ))}
          </div>
          <Pagination
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default Home;
