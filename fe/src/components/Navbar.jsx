import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, username, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="hospital-logo">
          <span className="hospital-name">HealthCare Hospital</span>
        </div>
      </div>
      <div className="navbar-right">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        ) : (
          <div className="user-dropdown">
            <button 
              className="user-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="username">{username}</span>
              <i className="fas fa-user-circle"></i>
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={onLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;