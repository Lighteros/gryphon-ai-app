import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import imageNotfound from "../../assets/images/icon_404.svg";

const NotFound = () => {
  return (
    <main style={{ backgroundColor: "#000", height: "100vh" }}>
      <div className="container">
        <div className="p-404">
          <p className="p-404__image">
            <img
              src={imageNotfound}
              alt="404"
              className="animate-bounce  animate-infinite animate-slow"
            />
          </p>
          <div className="p-404__box">
            <p className="p-404__ttl">Something went wrong</p>
            <p className="p-404__txt">
              We're sorry, the page you requested could not be found.
              <br />
              Please go back to the homepage!
            </p>
            <Link to="/" className="popup-form__btn">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
