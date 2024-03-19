const express = require('express');
const { login, signupFaculty, signupStudent, signout } = require('../controllers/authController');

const router = express.Router();

// Inside your route handlers, pass secretKey as an argument
router.post('/login', (req, res) => login(req, res, 'your_secret_key'));
router.post('/signup-faculty', (req, res) => signupFaculty(req, res, 'your_secret_key'));
router.post('/signup-student', (req, res) => signupStudent(req, res, 'your_secret_key'));
router.post('/signout', (req, res) => signout(req, res, 'your_secret_key'));

module.exports = router;
