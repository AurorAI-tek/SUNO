const Feature = require('../models/Feature');

// @route   GET api/features
// @desc    Get all features
// @access  Public
exports.getFeatures = async (req, res) => {
  try {
    const features = await Feature.find().sort({ order: 1 });
    res.json(features);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET api/features/:id
// @desc    Get feature by ID
// @access  Public
exports.getFeatureById = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ msg: 'Feature not found' });
    }
    
    res.json(feature);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Feature not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route   POST api/features
// @desc    Create a feature
// @access  Private (Admin only)
exports.createFeature = async (req, res) => {
  const { title, description, howToUse, examples, imageUrl, order } = req.body;

  try {
    // Check if feature already exists
    let feature = await Feature.findOne({ title });
    
    if (feature) {
      return res.status(400).json({ msg: 'Feature already exists' });
    }
    
    // Create new feature
    feature = new Feature({
      title,
      description,
      howToUse,
      examples,
      imageUrl,
      order
    });
    
    await feature.save();
    res.json(feature);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT api/features/:id
// @desc    Update a feature
// @access  Private (Admin only)
exports.updateFeature = async (req, res) => {
  const { title, description, howToUse, examples, imageUrl, order } = req.body;

  try {
    let feature = await Feature.findById(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ msg: 'Feature not found' });
    }
    
    // Update feature
    feature.title = title || feature.title;
    feature.description = description || feature.description;
    feature.howToUse = howToUse || feature.howToUse;
    feature.examples = examples || feature.examples;
    feature.imageUrl = imageUrl || feature.imageUrl;
    feature.order = order !== undefined ? order : feature.order;
    feature.updatedAt = Date.now();
    
    await feature.save();
    res.json(feature);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Feature not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route   DELETE api/features/:id
// @desc    Delete a feature
// @access  Private (Admin only)
exports.deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ msg: 'Feature not found' });
    }
    
    await feature.deleteOne();
    res.json({ msg: 'Feature removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Feature not found' });
    }
    res.status(500).send('Server Error');
  }
};
