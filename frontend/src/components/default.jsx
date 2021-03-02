import React from "react";
import { Link } from "react-router-dom";
import "../css/button.css";

const NotFound = () => {
  return (
    <React.Fragment>
      <div style={{ marginBottom: "38vh" }}>
        <div className="container">
          <div className="row  justify-content-center mt-4">
            <div className=" mx-auto col-12 col-md-7">
              <div className="card">
                <h3 style={{ textAlign: "center" }} className="card-header">
                  Not Found
                  <i className="ml-3 fa fa-exclamation-triangle"></i>
                </h3>
                <div className="list-group-item text-center">
                  <h4>Oops !!</h4>
                  <h4>Seems like page doesn't exist you searching for!!</h4>
                  <Link to="/">
                    <button
                      className="btn btn-small btn-outline-primary"
                      id="remover"
                    >
                      Home<i className="ml-3 fa fa-home"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
