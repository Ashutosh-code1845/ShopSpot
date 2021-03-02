import React from "react";
import { Link } from "react-router-dom";
import "../css/about.css";
import Meta from "./meta";

const About = () => {
  return (
    <React.Fragment>
      <Meta title="ShopSpot | About" />
      <div
        className="card col col-12 col-md-6 mx-auto mt-5"
        id="about"
        style={{ height: "50vh" }}
      >
        <h3 className="card-header text-center">
          About <i className="ml-3 fa fa-info-circle"></i>
        </h3>
        <div className="card-body">
          <h5 className="card-title">About this Project</h5>
          <p className="card-text">
            This project is build on MERN Stack using classes of Bootstarp as
            well as custom CSS is used.
          </p>
          <p className="card-text">
            This website is prototype of an e-commerce website so please don't
            reveal any personal information of yours.
          </p>
          <Link to="/" className="btn btn-primary">
            <i className="mr-3 fa fa-angle-double-left"></i>Back
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;
