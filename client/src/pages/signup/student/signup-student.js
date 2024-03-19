import React, { useState, useRef } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import axios from 'axios';
import './signup-student.css';

const SignupStudent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const [errorname, setErrorname] = useState('');
  const [errorpassword, setErrorpassword] = useState('');
  const [errormail, setErrormail] = useState('');
  const [errorconfirm, setErrorconfirm] = useState('');
  const [errormatch, setErrormatch] = useState('');
  const [erroremailvalid, setEmailvalid] = useState('');
  const [errordept, setErrorDept] = useState('');
  const [erroryear, setErrorYear] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const departmentRef = useRef(null);
  const yearRef = useRef(null);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisibility] = useState(false);

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
      setEmailvalid('Email should be @karpagamtech.ac.in');
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

    if (!year) {
      setErrorYear('Year is required');
      yearRef.current.scrollIntoView({ behavior: 'smooth' });
      return;
    } else {
      setErrorYear('');
    }

    try {
      const response = await axios.post('http://localhost:4000/signup-student', { name, email, password, department, year});
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

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisibility(!isConfirmPasswordVisible);
  };

  if (isSignedUp) {
    window.location.href = '/login';
  }

  return (
    <div className='signup-container-student'>
      <h1 className='signup-header'>Signup</h1>
      <div className='signup-inner-container'>
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={nameRef}
          className="input-field"
        />
      </div>
      {errorname && <p className="error-message">{errorname}</p>}
      <div className='signup-inner-container'>
        <label>Email</label>
        <input
          type="text"
          placeholder="E-Mail "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={emailRef}
          className="input-field"
        />
      </div>
      {errormail && <p className="error-message">{errormail}</p>}
      {erroremailvalid && <p className="error-message">{erroremailvalid}</p>}
      <div className='signup-inner-container'>
        <label>Password</label>
        <div className="password-input-container">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
            className="input-field"
          />
          <button
            className="eye-button"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? <IoMdEyeOff size={22} color='black' /> : <IoMdEye size={22} color='gray' />}
          </button>
        </div>
      </div>
      {errorpassword && <p className="error-message">{errorpassword}</p>}
      <div className='signup-inner-container'>
        <label>Confirm Password</label>
        <div className="password-input-container">
          <input
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            ref={confirmPasswordRef}
            className="input-field"
          />
          <button
            className="eye-button"
            onClick={toggleConfirmPasswordVisibility}
          >
            {isConfirmPasswordVisible ? <IoMdEyeOff size={22} color='black' /> : <IoMdEye size={22} color='gray' />}
          </button>
        </div>
      </div>
      {errorconfirm && <p className="error-message">{errorconfirm}</p>}
      {errormatch && <p className="error-message">{errormatch}</p>}
      <div className='signup-student-deparment' ref={departmentRef}>
        <label className='signup-department-label'>Select Department:</label>
        <div className='signup-department-options'>
          <div className='signup-department-inner'>
            <input
              type="radio"
              name="department"
              value="IT"
              checked={department === 'IT'}
              onChange={() => setDepartment('IT')}
            />
            <label>IT</label>
          </div>
          <div className='signup-department-inner'>
            <input
              type="radio"
              name="department"
              value="CSE"
              checked={department === 'CSE'}
              onChange={() => setDepartment('CSE')}
            />
            <label>CSE</label>
          </div>
          <div className='signup-department-inner'>
            <input
              type="radio"
              name="department"
              value="ECE"
              checked={department === 'ECE'}
              onChange={() => setDepartment('ECE')}
            />
            <label>ECE</label>
          </div>
          <div className='signup-department-inner'>
            <input
              type="radio"
              name="department"
              value="EEE"
              checked={department === 'EEE'}
              onChange={() => setDepartment('EEE')}
            />
            <label>EEE</label>
          </div>
          <div className='signup-department-inner'>
            <input
              type="radio"
              name="department"
              value="MECH"
              checked={department === 'MECH'}
              onChange={() => setDepartment('MECH')}
            />
            <label>MECH</label>
          </div>
          <div className='signup-department-inner'>
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

      <div className='signup-student-year' ref={yearRef}>
        <label className='signup-year-label'>Select Year:</label>
        <div className='signup-year-options'>
          <div className='signup-year-inner'>
            <input
              type="radio"
              name="year"
              value="1"
              checked={year === '1'}
              onChange={() => setYear('1')}
            />
            <label>1</label>
          </div>
          <div className='signup-year-inner'>
            <input
              type="radio"
              name="year"
              value="2"
              checked={year === '2'}
              onChange={() => setYear('2')}
            />
            <label>2</label>
          </div>
          <div className='signup-year-inner'>
            <input
              type="radio"
              name="year"
              value="3"
              checked={year === '3'}
              onChange={() => setYear('3')}
            />
            <label>3</label>
          </div>
          <div className='signup-year-inner'>
            <input
              type="radio"
              name="year"
              value="4"
              checked={year === '4'}
              onChange={() => setYear('4')}
            />
            <label>4</label>
          </div>
        </div>
        {erroryear && <p className="error-message">{erroryear}</p>}
      </div>

      <button onClick={handleSignup} className='signup-button'>Signup</button>
      {error && <p className="error-message">{error}</p>}
    </div >
  );
};

export default SignupStudent;
