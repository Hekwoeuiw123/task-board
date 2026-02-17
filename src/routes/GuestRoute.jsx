import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // If logged in, force them to the board. If logged out, let them see the login page.
  return isAuthenticated ? <Navigate to="/board" replace /> : <Outlet />;
};

export default PublicRoute;