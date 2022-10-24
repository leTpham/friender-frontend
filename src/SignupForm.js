import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/** Form for adding.
 *
 * Props:
 * - register: function to call in parent.
 *
 * State:
 * - formData
 * - selectedFile
 *
 * RoutesList -> SignUpForm
 */

function SignupForm({ updateToken }) {

  const [selectedFile, setSelectedFile] = useState(null);
  const [isBadSignup, setIsBadSignup] = useState(false);
  // const { currentUser, setCurrentUser } = useContext(userContext);
  const initial =
  {
    username: "",
    password: "",
    fullName: "",
    hobbies: "",
    interests: "",
    zipcode: "",
    radius: ""
  };
  // const [file, setFile] = useState(null)
  const [fData, setfData] = useState(initial);

  const navigate = useNavigate();

  /** Update form input. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setfData(fData => ({
      ...fData,
      [name]: value,
    }));
  }

  /** Call parent function, submit metadata form with axios and clear form. */
  const handleSubmit = async function (evt) {

    evt.preventDefault();

    const formData = new FormData();

    formData.append("username", fData.username);
    formData.append("password", fData.password);
    formData.append("fullName", fData.fullName);
    formData.append("hobbies", fData.hobbies);
    formData.append("interests", fData.interests);
    formData.append("zipcode", fData.zipcode);
    formData.append("radius", fData.radius);
    formData.append("image", selectedFile);

    try {
      const response = await axios({
        method: "post",
        url:  process.env.REACT_APP_BASE_URL ?
        `${process.env.REACT_APP_BASE_URL}/signup` :
        "http://localhost:5001/signup",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      updateToken(response.data.token);

      setfData(initial);
      setSelectedFile(null);
      alert("Your account has been successfully created!");
      navigate("/users");
    } catch (error) {
      setIsBadSignup(true);
      console.log(error);
    }
  };

  /** Handle selecting file for form */
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };


  return (
    <div className="signupPage container mt-5">
      <h3 className="mb-4">Sign Up</h3>
      <form className="SignUpForm" onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="mb-2 label">Username</label>
          <input
            id="username"
            name="username"
            className="form-control"
            placeholder="Enter username"
            onChange={handleChange}
            value={fData.username}
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
            value={fData.password}
            aria-label="Password"
            type="password"
          />
        </div>
        <div className="mb-3">
          <label className="mb-2 label">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            className="form-control"
            placeholder="Enter full name"
            onChange={handleChange}
            value={fData.fullName}
            aria-label="Full Name"
          />
        </div>
        <div className="mb-3">
          <label className="mb-2 label">Hobbies</label>
          <input
            id="hobbies"
            name="hobbies"
            className="form-control"
            placeholder="Enter Hobbies"
            onChange={handleChange}
            value={fData.hobbies}
            aria-label="Hobbies"
          />
        </div>
        <div className="mb-3">
          <label className="mb-2 label">Interests</label>
          <input
            id="interests"
            name="interests"
            className="form-control"
            placeholder="Enter Interests"
            onChange={handleChange}
            value={fData.interests}
            aria-label="Interests"
          />
        </div>
        <div className="mb-3">
          <label className="mb-2 label">Zipcode</label>
          <input
            id="zipcode"
            name="zipcode"
            className="form-control"
            placeholder="Enter Zipcode"
            onChange={handleChange}
            value={fData.zipcode}
            aria-label="Zipcode"
          />
        </div>

        <div className="mb-3">
          <label className="mb-2 label">Radius</label>
          <input
            id="radius"
            name="radius"
            className="form-control"
            placeholder="Enter Radius"
            onChange={handleChange}
            value={fData.radius}
            aria-label="Radius"
          />
        </div>

        <div className="mb-3">
          <label className="mb-2 label">Image</label>
          <input
            id="image"
            name="image"
            type="file"
            onChange={handleFileSelect}
            className="form-control"
            placeholder="Enter Image"
            aria-label="Image"
          />
        </div>

        {isBadSignup &&
          <div className="alert alert-danger" role="alert">
            All fields must be filled out
          </div>
        }
        <div>
          <button className="btn btn-primary">
            Submit
          </button>
        </div>

      </form>
    </div>
  );
}

export default SignupForm;
