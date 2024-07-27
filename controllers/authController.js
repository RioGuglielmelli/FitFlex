const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        if (!email || !password || !firstName || !lastName) {
            throw new Error('Missing required fields');
        }
        const user = new User({ email, password, firstName, lastName });
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(400).send({ error: 'Registration failed', details: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ error: 'Login failed' });
    }
};
