import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'

// Import Component
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Layout from './layout/Layout'
import Login from './pages/Login/Login'

// CSS
import './styles/App.scss'

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to='/admin/dashboard' />} />
          <Route path="/admin" element={<Navigate to='/admin/dashboard' />} />
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} dispatch={dispatch} />}>
            <Route path='/admin/*' element={<Layout />} />
          </Route>
          <Route path='login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App