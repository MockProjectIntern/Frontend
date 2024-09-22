import React, { useState } from 'react'
import { getInforDetails } from '../../service/UserAPI'
import { login } from '../../actions/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  })
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleDetail = async () => {
    const response = await getInforDetails();
    console.log(response);
  }

  const doLogin = () => {
    dispatch(login(formData.phone, formData.password));
    navigate('/')
  }

  return (
    <div>Login
      <input style={{border: "1px solid #000"}} onChange={(e) => handleChange(e)} value={formData.phone} type="text" name="phone" id="" />
      <input style={{border: "1px solid #000"}} onChange={(e) => handleChange(e)} value={formData.password} type="text" name="password" id="" />
      <button onClick={doLogin}>Login</button>
    </div>
  )
}

export default Login