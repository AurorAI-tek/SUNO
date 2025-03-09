const express = require('express');
const router = express.Router();
const { 
  chatWithAssistant, 
  analyzePrompt, 
  generatePrompt 
} = require('../controllers/assistantController');

// @route   POST api/assistant/chat
// @desc    Chat with the AI assistant
// @access  Public
router.post('/chat', chatWithAssistant);

// @route   POST api/assistant/analyze-prompt
// @desc    Analyze a music prompt
// @access  Public
router.post('/analyze-prompt', analyzePrompt);

// @route   POST api/assistant/generate-prompt
// @desc    Generate a music prompt based on description
// @access  Public
router.post('/generate-prompt', generatePrompt);

module.exports = router;
