import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import Mascot from "../../Images/mascot.png";

const authenticatedOptions = (
  <>
    <NavLink className="link" to="/add-product">
      Add Product
    </NavLink>
    <NavLink className="link" to="/sign-out">
      Sign Out
    </NavLink>
  </>
);

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

const alwaysOptions = (
  <>
    <NavLink className="link" to="/products">
      Products
    </NavLink>
  </>
);

const Nav = ({ user }) => {
  return (
    <nav>
      <div className="header">
        <div className="nav">
          <NavLink className="squirrel" to="/">
            <img src={Mascot} />
            <div className="logoText">
              <h1>Red</h1>
              <h1>Squirrel</h1>
            </div>
          </NavLink>
          <div className="navLinks">
            <div className="navOptions">
              {alwaysOptions}
              {user ? authenticatedOptions : unauthenticatedOptions}
            </div>
            <div>
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
