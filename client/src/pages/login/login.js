import React, { useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emptyField, setEmptyField] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setEmptyField('Email and password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/auth/login', { email, password });
      const token = response.data.token; // Assuming the token is returned as 'token' key in response
      sessionStorage.setItem("token", token);
      setIsLoggedIn(true);
    } catch (error) {
      if (error.response?.status === 401 && error.response?.data?.message === 'Invalid password') {
        setPasswordError('Incorrect password');
      } else if (error.response?.status === 401 && error.response?.data?.message === 'Invalid username') {
        setEmailError('User not found');
      }
    }
  };

  if (isLoggedIn) {
    navigate('/home'); 
  }

  return (
    <div className="container">
      <h1 className='login-header'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="text" placeholder=" " value={email} onChange={handleEmailChange} />
          <label>Email</label>
        </div>
        <div className="input-container">
          <input type="password" placeholder=" " value={password} onChange={handlePasswordChange} />
          <label>Password</label>
          {passwordError && <p>{passwordError}</p>}
          {emailError && <p>{emailError}</p>}
        </div>
        <Link to={'/forgetPassword'}>Forget Password</Link>
        {emptyField && <p className='errormessage'>{emptyField}</p>}
        <button type="submit" className='button'>Login</button>
      </form>
    </div>
  );
};

export default Login;
