import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { logout } from '../../actions/auth';

const PrivateRoute = ({ isAuthenticated, dispatch }) => {
  if (isAuthenticated) {
    dispatch(logout());
    return <Navigate to='/login' />
  } else {
    return <Outlet />
  }
}

export default PrivateRoute