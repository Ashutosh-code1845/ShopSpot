import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <React.Fragment>
        <div className="d-flex">
          <div className="mx-auto">
            <nav aria-label="Page navigation example  className">
              <ul className="pagination">
                <li
                  className={`page-item ${page > 1 ? "" : "disabled"}`}
                  tabIndex={`${page > 1 ? "-1" : ""}`}
                >
                  <Link
                    className="page-link"
                    to={
                      !isAdmin
                        ? keyword
                          ? `/search/${keyword}/page/${page - 1}`
                          : `/page/${page - 1}`
                        : `/admin/productlist/${page - 1}`
                    }
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Next</span>
                  </Link>
                </li>

                {[...Array(pages).keys()].map((x) => (
                  <li
                    className={`page-item ${x + 1 === page ? "active" : ""}`}
                    key={x + 1}
                  >
                    <Link
                      className="page-link"
                      to={
                        !isAdmin
                          ? keyword
                            ? `/search/${keyword}/page/${x + 1}`
                            : `/page/${x + 1}`
                          : `/admin/productlist/${x + 1}`
                      }
                    >
                      {x + 1}
                    </Link>
                  </li>
                ))}
                <li
                  className={`page-item ${page < pages ? "" : "disabled"}`}
                  tabIndex={`${page > 1 ? "-1" : ""}`}
                >
                  <Link
                    className="page-link"
                    to={
                      !isAdmin
                        ? keyword
                          ? `/search/${keyword}/page/${page + 1}`
                          : `/page/${page + 1}`
                        : `/admin/productlist/${page + 1}`
                    }
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </React.Fragment>
    )
  );
};

export default Pagination;
