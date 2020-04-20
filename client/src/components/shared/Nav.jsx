import React from 'react';
import { NavLink } from 'react-router-dom';

import mascot from '../../images/mascot.png';
import './Nav.css';

const unauthenticatedOptions = (
  <>
    <NavLink className="link" to="/sign-up">
      Sign Up
    </NavLink>
    <NavLink className="link" to="/sign-in">
      Sign In
    </NavLink>
  </>
);

const authenticatedOptions = (
  <>
    <NavLink className="link" to="/items">
      Inventory
    </NavLink>
    <NavLink className="link" to="/add-item">
      Add Item
    </NavLink>
    <NavLink className="link" to="/sign-out">
      Sign Out
    </NavLink>
  </>
);

const Nav = ({ user }) => {
  return (
    <nav>
      <div className="header">
        <div className="nav">
          <NavLink className="squirrel" to="/">
            <img src={mascot} alt="red squirrel logo" />
            <div className="logoText">
              <h1>Red</h1>
              <h1>Squirrel</h1>
            </div>
          </NavLink>
          <div className="navLinks">
            <div className="navOptions">
              {user ? authenticatedOptions : unauthenticatedOptions}
            </div>
            <div className="userHello">
              {user && (
                <div className="userWelcome">Welcome {user.username}!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
