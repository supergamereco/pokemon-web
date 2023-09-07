import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../action/authAction';
import { useNavigate } from 'react-router-dom'; 

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = async () => {
    await dispatch(login(credentials));
    navigate('/pokemon');
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleInputChange}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
