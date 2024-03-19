import React from 'react';
import { FaGithub, FaGlobe, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './landing.css';
import { Link } from 'react-router-dom';
import landing from '../../assets/landing.jpg'


const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header-landing">
        <p className='leave-text'>Leave Management System</p>
        <div className='login-button'>
          <Link to={'/signup-form-student'}><button className='register'>Register</button></Link>
          <Link to={'/login'}><button className='log'>Login</button></Link>
        </div>
      </header>
      <main className="content">
        <div className="text-and-image-container">
          <div className="text-container">
            <p className='quote-text'>Leave managed right, work-life balance in sight.</p>
            <p className='para'>
              Leave management is the process of managing employee leave requests, including tracking
              time off, approving or denying requests, and maintaining leave records.
            </p>
            <p className='para'>
              Our leave management system provides a streamlined process for employees to request
              leave, managers to approve or deny requests,to track and manage
              employee leave.
            </p>
            <Link to={'/login'}><button className='getStarted'>Get Started</button></Link>
          </div>
          <div className="image-container">
            <img src={landing} alt="Leave Management" />
          </div>
        </div>
      </main>


      <footer className="footer">
        <div className="social-icons">
          <a href="https://github.com/PrashadhG" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="www.linkedin.com/in/prashadh-g" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.yourwebsite.com" target="_blank" rel="noopener noreferrer">
            <FaGlobe />
          </a>
        </div>
        <p>&copy; 2024 Leave Management System. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
