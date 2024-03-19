import React, { useState, useRef } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import axios from 'axios';
import './signup-faculty.css'

const SignupFaculty = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [errorname, setErrorname] = useState('');
  const [errorpassword, setErrorpassword] = useState('');
  const [errormail, setErrormail] = useState('');
  const [errorconfirm, setErrorconfirm] = useState('');
  const [errormatch, setErrormatch] = useState('');
  const [erroremailvalid, setEmailvalid] = useState('');
  const [errordept, setErrorDept] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const departmentRef = useRef(null);

  const handleSignup = async () => {
    if (!name.trim()) {
      setErrorname('Name is required');
      nameRef.current.focus();
      return;
    } else {
      setErrorname('');
    }

    if (!email.trim()) {
      setErrormail('Email is required');
      emailRef.current.focus();
      return;
    } else {
      setErrormail('');
    }

    if (!password.trim()) {
      setErrorpassword('Password is required');
      passwordRef.current.focus();
      return;
    } else {
      setErrorpassword('');
    }

    if (!confirmPassword.trim()) {
      setErrorconfirm('Confirm Password is required');
      confirmPasswordRef.current.focus();
      return;
    } else {
      setErrorconfirm('');
    }

    if (password !== confirmPassword) {
      setErrormatch('Passwords do not match');
      confirmPasswordRef.current.focus();
      return;
    } else {
      setErrormatch('');
    }

    if (!email.endsWith('@karpagamtech.ac.in')) {
      setEmailvalid('Email should end with @karpagamtech.ac.in');
      emailRef.current.focus();
      return;
    } else {
      setEmailvalid('');
    }

    if (!department) {
      setErrorDept('Department is required');
      departmentRef.current.scrollIntoView({ behavior: 'smooth' });
      return;
    } else {
      setErrorDept('');
    }

    try {
      const response = await axios.post('http://localhost:4000/signup-faculty', { name, email, password, department});
      console.log('Response:', response);
      setIsSignedUp(true);
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!isConfirmPasswordVisible);
  };

  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState(false);

  if (isSignedUp) {
    window.location.href = '/home';
  }

  return (
    <div className='signup-container-faculty'>
      <h1 className='signup-header-faculty'>Signup</h1>
      <div className='signup-inner-container-faculty'>
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={nameRef}
          className="input-field-faculty"
        />
      </div>
      {errorname && <p className="error-message">{errorname}</p>}
      <div className='signup-inner-container-faculty'>
        <label>Email</label>
        <input
          type="text"
          placeholder="E-Mail "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
          className="input-field-faculty"
        />
      </div>
      {errormail && <p className="error-message">{errormail}</p>}
      {erroremailvalid && <p className="error-message">{erroremailvalid}</p>}
      <div className='signup-inner-container-faculty'>
        <label>Password</label>
        <div className="password-input-container-faculty">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
            className="input-field-faculty"
          />
          <button
            className="eye-button"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <IoMdEyeOff size={22} color='black'/> : <IoMdEye size={22} color='gray'/>}
          </button>
        </div>
      </div>
      {errorpassword && <p className="error-message">{errorpassword}</p>}
      <div className='signup-inner-container-faculty'>
        <label>Confirm Password</label>
        <div className="password-input-container-faculty">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            ref={confirmPasswordRef}
            className="input-field-faculty"
          />
          <button
            className="eye-button"
            onClick={toggleConfirmPasswordVisibility}
          >
            {isConfirmPasswordVisible ? <IoMdEyeOff size={22} color='black'/> : <IoMdEye  size={22} color='gray'/>}
          </button>
        </div>
      </div>
      {errorconfirm && <p className="error-message">{errorconfirm}</p>}
      {errormatch && <p className="error-message">{errormatch}</p>}

      <div className='signup-faculty-department' ref={departmentRef}>
        <label className='signup-faculty-department-label'>Select Department:</label>
        <div className='signup-faculty-department-options'>
          <div className='signup-faculty-department-inner'>
            <input
              type="radio"
              name="department"
              value="IT"
              checked={department === 'IT'}
              onChange={() => setDepartment('IT')}
            />
            <label>IT</label>
          </div>
          <div className='signup-faculty-department-inner'>
            <input
              type="radio"
              name="department"
              value="CSE"
              checked={department === 'CSE'}
              onChange={() => setDepartment('CSE')}
            />
            <label>CSE</label>
          </div>
          <div className='signup-faculty-department-inner'>
            <input
              type="radio"
              name="department"
              value="ECE"
              checked={department === 'ECE'}
              onChange={() => setDepartment('ECE')}
            />
            <label>ECE</label>
          </div>
          <div className='signup-faculty-department-inner'>
            <input
              type="radio"
              name="department"
              value="EEE"
              checked={department === 'EEE'}
              onChange={() => setDepartment('EEE')}
            />
            <label>EEE</label>
          </div>
          <div className='signup-faculty-department-inner'>
            <input
              type="radio"
              name="department"
              value="MECH"
              checked={department === 'MECH'}
              onChange={() => setDepartment('MECH')}
            />
            <label>MECH</label>
          </div>
          <div className='signup-faculty-department-inner'>
            <input
              type="radio"
              name="department"
              value="AI&DS"
              checked={department === 'AI&DS'}
              onChange={() => setDepartment('AI&DS')}
            />
            <label>AI&DS</label>
          </div>
        </div>
        {errordept && <p className="error-message">{errordept}</p>}
      </div>
      <button onClick={handleSignup} className='signup-button-faculty'>Signup</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SignupFaculty;
