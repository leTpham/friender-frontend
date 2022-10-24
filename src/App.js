
import FrienderApi from './_api';
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import userContext from "./userContext";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import RoutesList from './RoutesList';
import Loading from './Loading';
import './App.css';

const GLOBAL_TOKEN = "token";

/** Friender application.
 *
 * - currentUser: user obj from API. This is passed around via context
 *  throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 * Is required to be set for most API calls;
 * initially read from localStorage or set to null if there isn't one
 *
 * App -> RoutesList
 */

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(GLOBAL_TOKEN) || null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(function getCurrentUser() {
    async function getUser() {
      if (token) {
        FrienderApi.token = token;
        try {
          let user = jwt_decode(token);
          const userData = await FrienderApi.getOneUser(user.username);
          setCurrentUser(userData);
          setIsLoading(false);
        } catch (err) {
          console.error("ERROR: ", err);
        }
      } else {
        setCurrentUser(null);
        setIsLoading(false);
      }
    }
    getUser();
  }, [token]);


  if (isLoading) return (<Loading />);

  /** Handles login. */
  async function login(loginData) {
    try {
      let tokenData = await FrienderApi.login(loginData);
      setToken(tokenData);
      setIsLoading(true);
      localStorage.setItem(GLOBAL_TOKEN, tokenData);
    } catch (err) {
      console.error("ERROR: ", err);
    }
  }

  /** Handles site-wide logout */
  function logout() {
    setCurrentUser(null);
    setToken(null);
    FrienderApi.token = null;
    localStorage.removeItem(GLOBAL_TOKEN);
  }
  /** Handles updating token outside of app.js */
  async function updateToken(tokenData) {
    setToken(tokenData);
    localStorage.setItem(GLOBAL_TOKEN, tokenData);

  }

  return (
    <div className="App">
      <userContext.Provider value={{ currentUser, setCurrentUser }}>
        <div>
          <BrowserRouter>
            <Navigation logout={logout} />
            <div>
              <RoutesList login={login} updateToken={updateToken} />
            </div>
          </BrowserRouter>
        </div>
      </userContext.Provider>
    </div>

  );
}

export default App;
