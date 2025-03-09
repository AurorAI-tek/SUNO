const express = require('express');
const router = express.Router();
const { 
  getFeatures, 
  getFeatureById, 
  createFeature, 
  updateFeature, 
  deleteFeature 
} = require('../controllers/featureController');
const auth = require('../middleware/auth');

// @route   GET api/features
// @desc    Get all features
// @access  Public
router.get('/', getFeatures);

// @route   GET api/features/:id
// @desc    Get feature by ID
// @access  Public
router.get('/:id', getFeatureById);

// @route   POST api/features
// @desc    Create a feature
// @access  Private (Admin only)
router.post('/', auth, createFeature);

// @route   PUT api/features/:id
// @desc    Update a feature
// @access  Private (Admin only)
router.put('/:id', auth, updateFeature);

// @route   DELETE api/features/:id
// @desc    Delete a feature
// @access  Private (Admin only)
router.delete('/:id', auth, deleteFeature);

module.exports = router;
