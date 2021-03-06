const express = require('express');

const asyncHandler = require('../../middlewares/async');
const { protect } = require('../../middlewares/auth');

const { register, login, logout } = require('./auth.controller');

const router = express.Router();

// @desc Register user
// @route POST /api/v1/auth/register
// @access Public
router.post('/register', asyncHandler(register));

// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
router.post('/login', asyncHandler(login));

// @desc Logout user / clear cookie
// @route GET /api/v1/auth/logout
// @access Private
router.get('/logout', protect, asyncHandler(logout));

// @desc Get logged in user
// @route GET /api/v1/auth/me
// @access Private
router.get('/me', protect, asyncHandler(getLoggedInUser));

module.exports = router;
