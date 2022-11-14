
import React, { useState, useContext } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

import userContext from './userContext';
import "./Navigation.css"

/** Displays Navigation bar with links to homepage and
 *  - when loggedIn: display link to show all users, link to logout
 *  - when loggedOut: display link to login, signup
 *
 * Props:
 * - logout: function called from parent
 *
 * State:
 * - isOpen: boolean
 *
 * App -> Navigation
 *
*/

function Navigation({ logout }) {
  const { currentUser } = useContext(userContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  function loggedIn() {
    return (
      <>
        <NavItem>
          <NavLink to="/users"
            activeclassname="active"
            tag={RRNavLink}>Users</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/matches"
            activeclassname="active"
            tag={RRNavLink}>Matches</NavLink>
        </NavItem>
        <NavItem
            className="nav-link"
            onClick={logout}>Log out, {currentUser.fullName}
        </NavItem>

      </>
    );
  }

  function loggedOut() {
    return (
      <>
        <NavItem>
          <NavLink to="/login"
            activeclassname="active"
            tag={RRNavLink}>Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/signup"
            activeclassname="active"
            tag={RRNavLink}>Sign Up</NavLink>
        </NavItem>
      </>
    );
  }

  return (
    <div>
      <Navbar color="white" light expand="lg">
        <NavbarBrand href="/" style={{ color: "orange" }}>Friender</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            {currentUser && loggedIn()}
            {!currentUser && loggedOut()}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}


export default Navigation;

// padding: 0.25rem 0.75rem;
// font-size: 1.25rem;
// line-height: 1;
// background-color: transparent;
// border: 1px solid transparent;
// border-radius: 0.25rem;
// transition: box-shadow .15s ease-in-out;
// width: 100px;