import React from "react";
import { NavLink } from "react-router-dom";
import "../css/step.css";

const ChexkoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <React.Fragment>
      <nav
        className="navbar d-flex bg-light justify-content-between "
        style={{
          borderRadius: "150px",
          paddingTop: "-20px",
        }}
      >
        <div className="nav-item active">
          {step1 ? (
            <NavLink
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              Sign In
            </NavLink>
          ) : (
            <span style={{ cursor: "pointer", opacity: "0.5" }} disable="true">
              Sign In
            </span>
          )}
        </div>
        <div className="active">
          {step2 ? (
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/shipping"
            >
              Shipping
            </NavLink>
          ) : (
            <span style={{ cursor: "pointer", opacity: "0.5" }} disable="true">
              Shipping
            </span>
          )}
        </div>
        <div className=" active">
          {step3 ? (
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/payment"
            >
              Payment
            </NavLink>
          ) : (
            <span style={{ cursor: "pointer", opacity: "0.5" }} disable="true">
              Payment
            </span>
          )}
        </div>
        <div className="nav-item active">
          {step4 ? (
            <NavLink
              style={{ textDecoration: "none", color: "black" }}
              to="/placeorder"
            >
              Place Order
            </NavLink>
          ) : (
            <span
              className="disabled"
              style={{ cursor: "pointer", opacity: "0.5" }}
              disable="true"
            >
              Place Order
            </span>
          )}
        </div>
      </nav>
      <div />
    </React.Fragment>
  );
};

export default ChexkoutSteps;
