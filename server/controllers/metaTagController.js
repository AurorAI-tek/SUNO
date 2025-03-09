const MetaTag = require('../models/MetaTag');

// @route   GET api/meta-tags
// @desc    Get all meta tags
// @access  Public
exports.getMetaTags = async (req, res) => {
  try {
    const metaTags = await MetaTag.find().sort({ category: 1, name: 1 });
    res.json(metaTags);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   GET api/meta-tags/:id
// @desc    Get meta tag by ID
// @access  Public
exports.getMetaTagById = async (req, res) => {
  try {
    const metaTag = await MetaTag.findById(req.params.id);
    
    if (!metaTag) {
      return res.status(404).json({ msg: 'Meta tag not found' });
    }
    
    res.json(metaTag);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Meta tag not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route   POST api/meta-tags
// @desc    Create a meta tag
// @access  Private (Admin only)
exports.createMetaTag = async (req, res) => {
  const { name, description, syntax, examples, category } = req.body;

  try {
    // Check if meta tag already exists
    let metaTag = await MetaTag.findOne({ name });
    
    if (metaTag) {
      return res.status(400).json({ msg: 'Meta tag already exists' });
    }
    
    // Create new meta tag
    metaTag = new MetaTag({
      name,
      description,
      syntax,
      examples,
      category
    });
    
    await metaTag.save();
    res.json(metaTag);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @route   PUT api/meta-tags/:id
// @desc    Update a meta tag
// @access  Private (Admin only)
exports.updateMetaTag = async (req, res) => {
  const { name, description, syntax, examples, category } = req.body;

  try {
    let metaTag = await MetaTag.findById(req.params.id);
    
    if (!metaTag) {
      return res.status(404).json({ msg: 'Meta tag not found' });
    }
    
    // Update meta tag
    metaTag.name = name || metaTag.name;
    metaTag.description = description || metaTag.description;
    metaTag.syntax = syntax || metaTag.syntax;
    metaTag.examples = examples || metaTag.examples;
    metaTag.category = category || metaTag.category;
    metaTag.updatedAt = Date.now();
    
    await metaTag.save();
    res.json(metaTag);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Meta tag not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @route   DELETE api/meta-tags/:id
// @desc    Delete a meta tag
// @access  Private (Admin only)
exports.deleteMetaTag = async (req, res) => {
  try {
    const metaTag = await MetaTag.findById(req.params.id);
    
    if (!metaTag) {
      return res.status(404).json({ msg: 'Meta tag not found' });
    }
    
    await metaTag.deleteOne();
    res.json({ msg: 'Meta tag removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Meta tag not found' });
    }
    res.status(500).send('Server Error');
  }
};
