const express = require('express');
const router = express.Router();
const { 
  getMetaTags, 
  getMetaTagById, 
  createMetaTag, 
  updateMetaTag, 
  deleteMetaTag 
} = require('../controllers/metaTagController');
const auth = require('../middleware/auth');

// @route   GET api/meta-tags
// @desc    Get all meta tags
// @access  Public
router.get('/', getMetaTags);

// @route   GET api/meta-tags/:id
// @desc    Get meta tag by ID
// @access  Public
router.get('/:id', getMetaTagById);

// @route   POST api/meta-tags
// @desc    Create a meta tag
// @access  Private (Admin only)
router.post('/', auth, createMetaTag);

// @route   PUT api/meta-tags/:id
// @desc    Update a meta tag
// @access  Private (Admin only)
router.put('/:id', auth, updateMetaTag);

// @route   DELETE api/meta-tags/:id
// @desc    Delete a meta tag
// @access  Private (Admin only)
router.delete('/:id', auth, deleteMetaTag);

module.exports = router;
