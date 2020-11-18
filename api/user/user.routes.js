const express = require('express');

const asyncHandler = require('../../middlewares/async');
const advancedResults = require('../../middlewares/advancedResults');
const { protect, authorize } = require('../../middlewares/auth');

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('./user.controller');

const User = require('../../models/User');

const router = express.Router();
router.use(protect);
router.use(authorize('admin'));

// @desc Gel all users
// @route GET /api/v1/users
// @access Private/Admin
router.get('/', advancedResults(User, 'users'), asyncHandler(getUsers));

// @desc Get single user
// @route GET /api/v1/users/:id
// @access Private/Admin
router.get('/:id', asyncHandler(getUser));

// @desc Update user
// @route PUT /api/v1/users/:id
// @access Private/Admin
router.put('/:id', asyncHandler(updateUser));

// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access Private/Admin
router.delete('/:id', asyncHandler(deleteUser));

module.exports = router;
