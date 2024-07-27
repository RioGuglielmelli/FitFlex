const express = require('express');
const cors = require('cors');
const mongoose = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware'); // Import the middleware
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure you have dotenv configured

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Frontend URL
app.use(express.json());

// Example in-memory user store
const users = {};

// Routes for registration and login
app.post('/api/register', (req, res) => {
    console.log('Register endpoint hit');
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    users[email] = { password, firstName, lastName };
    res.status(200).json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
    console.log('Login endpoint hit');
    const { email, password } = req.body;
    const user = users[email];
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ email, firstName: user.firstName, lastName: user.lastName }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
});

// Protected routes
const protectedRoutes = express.Router();
protectedRoutes.get('/example', (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});
app.use('/api/protected', authMiddleware, protectedRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

