const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if token exists
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Set user in request object
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

// Signup route
// Signup route
router.post('/signup', async (req, res) => {
    const { username, fullname, email, phone, dob, gender, address, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: true, message: 'User with this email already exists. Please login instead.' });
        }

        // Create new user
        user = new User({
            username,
            fullname,
            email,
            phone,
            dob,
            gender,
            address,
            password
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Create JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        // Access JWT secret from environment variable
        const secretToken = process.env.JWT_SECRET;
        if (!secretToken) {
            throw new Error('JWT secret token is not defined');
        }

        jwt.sign(payload, secretToken, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.status(201).json({ success: true, token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: true, message: 'Server Error. Please try again later.' });
    }
});


// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Create JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        // Access JWT secret from environment variable
        const secretToken = process.env.JWT_SECRET;
        if (!secretToken) {
            throw new Error('JWT secret token is not defined');
        }

        jwt.sign(payload, secretToken, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Route to get user profile
router.get('/me', authMiddleware, async (req, res) => {
    try {
        // Fetch the authenticated user's profile from the database using the user ID
        const user = await User.findById(req.user.id).select('-password'); // Excluding the password field

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Return the user's profile information
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: true, message: 'Server Error' });
    }
});

module.exports = { router, authMiddleware };
