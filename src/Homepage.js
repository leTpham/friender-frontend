import React, { useContext } from "react";
import { Button } from 'reactstrap';
import userContext from "./userContext";
import "./Homepage.css";

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
        <div>
          <Button
            href="/login"
            className="lgsu"
            color="info"> Log In</Button>
          <Button
            href="/signup"
            className="lgsu"
            color="warning"> Sign up</Button>
        </div>}
    </div>
  );
}

export default Homepage;
