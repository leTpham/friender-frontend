import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import "./SignupForm.css"

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
        url: process.env.REACT_APP_BASE_URL ?
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
    <div className="signupPage">
      <Form className="signupForm">
        <FormGroup floating>
          <Input
            id="username"
            name="username"
            className="form-control"
            placeholder="Enter username"
            onChange={handleChange}
            value={fData.username}
            aria-label="Username"
          />
          <Label for="username">
            Username
          </Label>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
            value={fData.password}
            aria-label="Password"
            type="password"
          />
          <Label for="password">
            Password
          </Label>
        </FormGroup>

        <FormGroup floating>
          <Input
            id="fullName"
            name="fullName"
            className="form-control"
            placeholder="Enter full name"
            onChange={handleChange}
            value={fData.fullName}
            aria-label="Full Name"
          />
          <Label>Full Name</Label>
        </FormGroup>

        <FormGroup floating>
          <Input
            id="hobbies"
            name="hobbies"
            className="form-control"
            placeholder="Enter Hobbies"
            onChange={handleChange}
            value={fData.hobbies}
            aria-label="Hobbies"
          />
          <Label for="hobbies">Hobbies</Label>
        </FormGroup>

        <FormGroup floating>
          <Input
            id="interests"
            name="interests"
            className="form-control"
            placeholder="Enter Interests"
            onChange={handleChange}
            value={fData.interests}
            aria-label="Interests"
          />
          <Label for="interests">Interests</Label>
        </FormGroup>

        <FormGroup floating>
          <Input
            id="zipcode"
            name="zipcode"
            className="form-control"
            placeholder="Enter Zipcode"
            onChange={handleChange}
            value={fData.zipcode}
            aria-label="Zipcode"
          />
          <Label for="zipcode"> Zipcode</Label>
        </FormGroup>

        <FormGroup floating>
          <Input
            id="radius"
            name="radius"
            className="form-control"
            placeholder="Enter Radius"
            onChange={handleChange}
            value={fData.radius}
            aria-label="Radius"
          />
          <Label for="radius">Radius to connect</Label>
        </FormGroup>

        <FormGroup floating>
          <Input
            id="image"
            name="image"
            type="file"
            onChange={handleFileSelect}
            className="form-control"
            placeholder="Enter Image"
            aria-label="Image"
          />
          <Label for="image">Image</Label>
        </FormGroup>
        {isBadSignup &&
          <div className="alert alert-danger" role="alert">
            All fields must be filled out
          </div>
        }
        <Button onClick={handleSubmit}>Sign up</Button>
      </Form>
    </div>
  );
}

export default SignupForm;
