import React, { useContext, useEffect } from "react";
import userContext from "./userContext";
import "./Homepage.css"

/** Displays main homepage for Friender app
 *
 * Props: none
 * State: none
 *
 * Routelist -> Homepage
 *
 */

function Homepage() {
  const { currentUser } = useContext(userContext);

  return (
    <div className="homepage">
      <h1 className="fw-bold">Friender</h1>
      <br />
      <p>A place to make friends</p>
      {currentUser &&
        <h2>Welcome Back, {currentUser.fullName}!</h2>}
      {!currentUser &&
        <div className="homepage-btn">
          <a href="/login" className="btn btn-primary me-3">Log In</a>
          <a href="/signup" className="btn btn-primary">Sign Up</a>
        </div>}
    </div>
  );
}

export default Homepage;
