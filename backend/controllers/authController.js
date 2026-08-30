const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
};

// Register user from the MARP Sign Up page
const registerUser = async (req, res) => {
    const { username, email, phoneNumber, password } = req.body;

    try {
        // Check all required fields
        if (!username || !email || !phoneNumber || !password) {
            return res.status(400).json({
                message: 'Please fill in all fields'
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: 'Invalid email format'
            });
        }

        // Check whether email already exists
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                message: 'Email already exists'
            });
        }

        // Check whether phone number already exists
        const phoneNumberExists = await User.findOne({ phoneNumber });
        if (phoneNumberExists) {
            return res.status(400).json({
                message: 'Phone number already exists'
            });
        }

        // Password is automatically hashed in User.js pre('save') middleware
        const user = await User.create({
            username,
            email,
            phoneNumber,
            password
        });

        res.status(201).json({
            message: 'User registered successfully',
            id: user.id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: generateToken(user.id)
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Login with email and password
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            return res.status(200).json({
                message: 'Login successful',
                id: user.id,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                token: generateToken(user.id)
            });
        }

        res.status(401).json({
            message: 'Invalid email or password'
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    registerUser,
    loginUser,

};