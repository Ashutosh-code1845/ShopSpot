import React from "react";
import Meta from "./meta";
import "../css/about.css";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <React.Fragment>
      <Meta title="ShopSpot | Contact" />
      <div
        className="card col col-12 col-md-6 mx-auto mt-5"
        id="about"
        style={{ height: "50vh" }}
      >
        <h3 className="card-header text-center">
          Contact <i className="ml-3 fa fa-envelope-o"></i>
        </h3>
        <div className="card-body">
          <h5 className="card-title">Developer </h5>
          <p className="card-text">
            Ashutosh Tiwari
            <br></br>
          </p>
          <p>
            <strong>Mail : </strong>{" "}
            <a href="mailto:ashutosht1845@gmail.com">ashutosht1845@gmail.com</a>
          </p>
          <p className="card-text">
            Feel Free to contact if you find any bug & Scroll Down for other
            ways to contact.
          </p>
          <Link to="/" className="btn btn-primary">
            <i className="mr-3 fa fa-angle-double-left"></i>Back
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ContactUs;
