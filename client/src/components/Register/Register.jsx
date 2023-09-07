import { register } from '../../action/authAction';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

function Register() {
  const [userData, setUserData] = useState({ username: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = async () => {
    await dispatch(register(userData));
    navigate('/pokemon');
  };

  return (
    <div>
        <h2>Register</h2>
        <input
            type="text"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleInputChange}
        />
        <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleInputChange}
        />
        <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleInputChange}
        />
        <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
