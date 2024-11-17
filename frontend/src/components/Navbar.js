import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling
import { FiLogOut } from 'react-icons/fi'; // Logout icon
import logo from './assets/logo.png';  

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Get user role from localStorage

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('role');  // Remove role
    navigate('/login');               // Redirect to login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="EduVents Logo" />
      </div>

      <div className="navbar-links">
        <Link to="/">HOME</Link>
        {/* Conditional rendering based on user role */}
        {userRole === 'coordinator' ? (
          <Link to="/creatorevents">OUR EVENTS</Link> // Updated link for coordinators
        ) : (
          <Link to="/myevents">MY EVENTS</Link>
        )}
        <Link to="/profile">PROFILE</Link>
      </div>
  
      <div className="navbar-logout" onClick={handleLogout}>
        {isAuthenticated && <FiLogOut size={24} color="black" />}
      </div>
    </nav>
  );
};

export default Navbar;
