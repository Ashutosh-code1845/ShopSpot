import React from "react";

const LogInError = ({ children }) => {
  return (
    <React.Fragment>
      <div className="col-12 col-md-12">
        <div className="alert alert-danger" style={{ textAlign: "center" }}>
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default LogInError;
