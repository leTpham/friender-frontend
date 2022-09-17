import { Routes, Route, Navigate } from 'react-router-dom';
import userContext from './userContext';
import React, { useContext } from "react";
import Homepage from './Homepage';
import Login from './LoginForm';
import Signup from './SignupForm';
import UserList from './UserList';
import UserDetail from './UserDetail';
import Matches from './Matches';

/** Site-wide routes
 *
 * Parts of site only visible when looged in.
 *
 * Visiting a non-existent route navigate to the homepage
 *
 */

function RoutesList({ login, updateToken }) {
  const { currentUser } = useContext(userContext);

  return (
    <Routes>
      <Route
        path="/"
        element={<Homepage />}
      />

      {!currentUser &&
        <>
          <Route
            path="/login"
            element={<Login login={login} />}
          />

          <Route
            path="/signup"
            element={<Signup updateToken={updateToken} />}
          />
        </>
      }

      {currentUser &&
        <>
          <Route
            path="/users"
            element={<UserList />}
          />

          <Route
            path="/users/:username"
            element={<UserDetail cantfind="/users" />}
          />

          <Route
            path="/matches"
            element={<Matches />}
          />
        </>
      }


      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default RoutesList;
