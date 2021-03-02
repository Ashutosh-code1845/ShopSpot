import React from "react";
import "../css/footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <React.Fragment>
      <div className="footer-dark">
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-3 item">
                <h3>Help & About </h3>
                <ul>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/help">ShopBot</Link>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6 col-md-3 item">
                <h3>Feedback & Profile</h3>
                <ul>
                  <li>
                    <Link to="/contactus">Contact Us</Link>
                  </li>
                  <li>
                    <Link to="/profile">My Profile</Link>
                  </li>
                </ul>
              </div>

              <div className="col item social">
                <a href="https://www.linkedin.com/in/ashutosh-tiwari-178b281ba">
                  <i className="fa fa-linkedin"></i>
                </a>
                <a href="https://www.facebook.com/Ashutosh9919">
                  <i className="fa fa-facebook"></i>
                </a>

                <a href="https://github.com/Ashutosh-code1845">
                  <i className="fa fa-github"></i>
                </a>
                <a href="https://www.instagram.com/i_am_.ashutosh/">
                  <i className="fa fa-instagram"></i>
                </a>
              </div>
            </div>
            <p className="copyright">
              Copyright ©{" "}
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <strong> ShopSpot </strong>
              </Link>{" "}
              2021
            </p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Footer;
