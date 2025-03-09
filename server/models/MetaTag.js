const mongoose = require('mongoose');

const MetaTagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  syntax: {
    type: String,
    required: true
  },
  examples: [{
    prompt: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }],
  category: {
    type: String,
    required: true,
    enum: ['Structure', 'Mood', 'Instrumental', 'Vocals', 'Genre', 'Other']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MetaTag', MetaTagSchema);
