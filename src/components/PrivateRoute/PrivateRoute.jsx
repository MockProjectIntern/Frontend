import React, { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../actions/auth';

const PrivateRoute = ({ isAuthenticated, dispatch }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(logout());
    } else {
      navigate('/')
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  } else {
    return <Outlet />
  }
}

export default PrivateRoute