const Groq = require('groq-sdk');

// @route   POST api/assistant/chat
// @desc    Chat with the AI assistant
// @access  Public
exports.chatWithAssistant = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ msg: 'Messages must be provided as an array' });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    // Format messages for the GROQ API
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Add system message to give context about Suno to the model
    const systemMsg = {
      role: "system",
      content: `You are an AI assistant specializing in Suno's music generation tools. 
        Your purpose is to help users understand how to create effective music prompts, 
        use meta tags, and leverage Suno's advanced features. 
        
        You can:
        1. Explain how to use meta tags (e.g., [Verse], [Chorus], [Instrumental], [Mood: happy])
        2. Suggest prompts based on genres or descriptions
        3. Analyze and improve existing prompts
        4. Guide users through Suno's advanced features like Custom Mode
        
        Always be helpful, accurate, and encouraging. When suggesting prompts, be creative and detailed.`
    };

    // Add system message at the beginning
    const chatMessages = [systemMsg, ...formattedMessages];

    // Call the GROQ API
    const chatCompletion = await groq.chat.completions.create({
      messages: chatMessages,
      model: "deepseek-r1-distill-llama-70b",
      temperature: 0.75,
      max_tokens: 4096,
      top_p: 0.95,
      stream: false,
      stop: null
    });

    // Send the response
    res.json({
      response: chatCompletion.choices[0].message.content,
      usage: chatCompletion.usage
    });
  } catch (err) {
    console.error('AI Assistant Error:', err);
    res.status(500).json({ msg: 'Error connecting to AI assistant', error: err.message });
  }
};

// @route   POST api/assistant/analyze-prompt
// @desc    Analyze a music prompt
// @access  Public
exports.analyzePrompt = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ msg: 'Prompt is required' });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const messages = [
      {
        role: "system",
        content: `You are an AI assistant specializing in analyzing and improving Suno music prompts.
          Analyze the given prompt for a Suno AI music generation and provide:
          1. An assessment of its strengths
          2. Suggestions for improvement
          3. Potential meta tags that could enhance it (e.g., [Verse], [Chorus], [Mood: energetic])
          4. A rewritten version that incorporates your suggestions
          
          Be specific and detailed in your analysis, focusing on how to make the prompt more effective for music generation.`
      },
      {
        role: "user",
        content: `Please analyze this Suno music prompt: "${prompt}"`
      }
    ];

    // Call the GROQ API
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "deepseek-r1-distill-llama-70b",
      temperature: 0.75,
      max_tokens: 4096,
      top_p: 0.95,
      stream: false,
      stop: null
    });

    // Send the response
    res.json({
      analysis: chatCompletion.choices[0].message.content,
      usage: chatCompletion.usage
    });
  } catch (err) {
    console.error('Prompt Analysis Error:', err);
    res.status(500).json({ msg: 'Error analyzing prompt', error: err.message });
  }
};

// @route   POST api/assistant/generate-prompt
// @desc    Generate a music prompt based on description
// @access  Public
exports.generatePrompt = async (req, res) => {
  try {
    const { description, genre, mood } = req.body;

    if (!description && !genre && !mood) {
      return res.status(400).json({ msg: 'At least one of description, genre, or mood is required' });
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    let prompt = "Generate a Suno music prompt";
    if (description) prompt += ` for: ${description}`;
    if (genre) prompt += ` in the ${genre} genre`;
    if (mood) prompt += ` with a ${mood} mood`;

    const messages = [
      {
        role: "system",
        content: `You are an AI assistant specializing in creating effective prompts for Suno AI music generation.
          Generate a detailed, creative music prompt for Suno based on the user's description.
          Include appropriate meta tags like [Verse], [Chorus], [Instrumental], [Mood], etc.
          Explain the reasoning behind your prompt structure and meta tag choices.
          Format your response with:
          
          PROMPT:
          [The complete prompt with meta tags]
          
          EXPLANATION:
          [Brief explanation of the prompt structure and meta tag choices]`
      },
      {
        role: "user",
        content: prompt
      }
    ];

    // Call the GROQ API
    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "deepseek-r1-distill-llama-70b",
      temperature: 0.75,
      max_tokens: 4096,
      top_p: 0.95,
      stream: false,
      stop: null
    });

    // Send the response
    res.json({
      generatedPrompt: chatCompletion.choices[0].message.content,
      usage: chatCompletion.usage
    });
  } catch (err) {
    console.error('Prompt Generation Error:', err);
    res.status(500).json({ msg: 'Error generating prompt', error: err.message });
  }
};
