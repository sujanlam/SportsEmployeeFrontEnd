import React from "react";
import { Link } from "react-router-dom";


export const LoginPage : React.FC = () => {
  return (
    <div className="container boundary">
      <h2 className="text-center">
        Please login to get access to the main contents
      </h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="centered-button-container">
          <button type="submit" className="btn btn-primary login-button">
            Submit
          </button>
        </div>
        <div className="container text-center mt-3">
          <p className="ask-user-text">Not Already an User?  
            <Link to="/register" className="link-no-underline reg-btn">
              <button className="btn btn-success">Register</button>
            </Link>
          </p>
    </div>
      </form>
    </div>
  );
};
