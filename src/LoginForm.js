import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import userContext from "./userContext";

/** Form for logging in.
 *
 * Props:
 * - login: function to call in parent.
 *
 * State:
 * - formData
 *
 * RoutesList -> LoginForm
 */

function LoginForm({ login }) {
  const { currentUser } = useContext(userContext);
  const initial = { username: "", password: "" };
  const [formData, setFormData] = useState(initial);
  const [isBadLogin, setIsBadLogin] = useState(true);

  const navigate = useNavigate();

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function and clear form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    await login(formData);
    setFormData(initial);
    if (currentUser) navigate("/users");
    if (!currentUser) setIsBadLogin(false);
  }

  return (
    <div className="loginPage">
      <h3 className="mb-4">Log In</h3>
      <form className="LoginForm" onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="mb-2 label">Username</label>
          <input
            id="username"
            name="username"
            className="form-control"
            placeholder="Enter username"
            onChange={handleChange}
            value={formData.username}
            aria-label="Username"
          />
        </div>
        <div className="mb-3">
          <label className="mb-2 label">Password</label>
          <input
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
            value={formData.password}
            aria-label="Password"
            type="password"
          />
        </div>
        {!isBadLogin &&
          <div className="alert alert-danger" role="alert">
            Incorrect Username or Password
          </div>
        }
        <div className="mb-3">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>

      </form>
    </div>
  );
}

export default LoginForm;
