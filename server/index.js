const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const DBConnect = require("./DBConnect");
const cors = require('cors');
const app = express();
app.use(cors());
DBConnect();

const authRoutes = require('./routes/authRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const facultyRoutes = require('./routes/facultyRoutes');

app.use(bodyParser.json());

const secretKey = 'your_secret_key';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Authorization token not provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.userId = decoded.userId;
        req.userType = decoded.userType;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Protected route
app.get('/protected', verifyToken, async (req, res) => {
    const userId = req.userId;
    res.json({ message: `Protected resource accessed by user ${userId}` });
});

app.use((req, res, next) => {
    if (!req.headers.authorization && !req.url.startsWith('/auth')) {
        return res.status(401).json({ message: 'Authorization token not provided' });
    }
    next();
});

app.use('/auth', authRoutes);
app.use('/leave', verifyToken, leaveRoutes);
app.use('/faculty', verifyToken, facultyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


app.listen(4000, () => {
    console.log('Server running on port 4000');
});
