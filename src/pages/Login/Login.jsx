import React from 'react'
import { getInforDetails, loginAccount } from '../../service/UserAPI'

const Login = () => {
  const handleLogin = async () => {
    const response = await loginAccount('0385427654', '123456');
    localStorage.setItem('token', response.data.token);
    localStorage.setItem("refreshToken", response.data.refresh_token);
  }

  const handleDetail = async () => {
    const response = await getInforDetails();
    console.log(response);
  }

  return (
    <div>Login
      <button onClick={handleLogin} >Login</button>
      <button onClick={handleDetail}>Detail</button>
    </div>
  )
}

export default Login