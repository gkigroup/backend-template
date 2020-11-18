const express = require('express');

const asyncHandler = require('../../middlewares/async');
const advancedResults = require('../../middlewares/advancedResults');
const { protect, authorize } = require('../../middlewares/auth');

const {
  getContacts,
  addContact,
  getContact,
  updateContact,
  deleteContact,
} = require('./contact.controller');

const Contact = require('../../models/Contact');

const router = express.Router();

// @desc Get all contacts
// @route GET /api/v1/contacts
// @access Private/Admin
router.get(
  '/',
  protect,
  authorize('admin'),
  advancedResults(Contact),
  asyncHandler(getContacts)
);

// @desc Add new contact
// @route POST /api/v1/contacts
// @access Public
router.post('/', asyncHandler(addContact));

// @desc Get single contact
// @route GET /api/v1/contacts/:id
// @access Private/Admin
router.get('/:id', protect, authorize('admin'), asyncHandler(getContact));

// @desc Update contact
// @route PUT /api/v1/contacts/:id
// @access Private/Admin
router.put('/:id', protect, authorize('admin'), asyncHandler(updateContact));

// @desc Delete contact
// @route DELETE /api/v1/contacts/:id
// @access Private/Admin
router.delete('/:id', protect, authorize('admin'), asyncHandler(deleteContact));

module.exports = router;
