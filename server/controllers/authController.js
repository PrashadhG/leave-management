const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Student, Faculty } = require('../schema');

const login = async (req, res, secretKey) => {
    const { email, password } = req.body;

    let user = await Student.findOne({ email });
    let userType = 'student';

    if (!user) {
        user = await Faculty.findOne({ email });
        userType = 'faculty';
    }

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, userType }, secretKey);
    res.json({ token });
};

const signupFaculty = async (req, res, secretKey) => {
    const { name, email, password, department } = req.body;

    const existingUser = await Faculty.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newFaculty = new Faculty({ name, email, password: hash, department });
    await newFaculty.save();

    res.json({ message: 'Faculty created successfully' });
};

const signupStudent = async (req, res, secretKey) => {
    const { name, email, password, department, year } = req.body;

    const existingUser = await Student.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newStudent = new Student({ name, email, password: hash, department, year });
    await newStudent.save();

    res.json({ message: 'Student created successfully' });
};

const signout = async (req, res, secretKey) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token not provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.userId;

        res.json({ message: 'Signed out successfully' });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { login, signupFaculty, signupStudent, signout };
