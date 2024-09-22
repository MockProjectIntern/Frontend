import React, { useState, useEffect } from 'react'
import { login } from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Truy cập trạng thái xác thực từ Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const doLogin = () => {
    dispatch(login(formData.phone, formData.password));
  }

  // Sử dụng useEffect để điều hướng sau khi đăng nhập thành công
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Login</h1>
      <input
        style={{border: "1px solid #000"}}
        onChange={(e) => handleChange(e)}
        value={formData.phone}
        type="text"
        name="phone"
      />
      <input
        style={{border: "1px solid #000"}}
        onChange={(e) => handleChange(e)}
        value={formData.password}
        type="password"
        name="password"
      />
      <button onClick={() => doLogin()}>Login</button>
    </div>
  )
}

export default Login
