import React from 'react';
import { Navigate } from 'react-router-dom';
import './PrivateRoute.css';  // Optional for styling if needed

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // If no token is found, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the user's role doesn't match the required role, redirect to the home page
  if (role && !role.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
