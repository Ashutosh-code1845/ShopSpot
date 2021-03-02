import React from "react";
import "../css/spinner.css";

const Spinner = () => {
  return (
    <React.Fragment>
      <div className="text-div">
        <h2 className="load-text">Hold On...</h2>
      </div>
      <div className="loading">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </React.Fragment>
  );
};

export default Spinner;
