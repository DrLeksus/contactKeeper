import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/authContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { logout, isAuthenticated, user } = authContext;

  return (
    <nav className="navbar bg-primary">
      <h2>
        <i className={icon} />
        {title}
      </h2>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {!isAuthenticated ? (
          <Fragment>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </Fragment>
        ) : (
          <li>
            <Link to="/" onClick={logout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-address-book"
};

export default Navbar;
