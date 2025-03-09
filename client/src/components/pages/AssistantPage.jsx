import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaPaperPlane, FaRobot, FaUser, FaMusic, FaLightbulb, FaSync } from 'react-icons/fa';

const AssistantPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [promptType, setPromptType] = useState('chat'); // 'chat', 'analyze', or 'generate'
  const [genreInput, setGenreInput] = useState('');
  const [moodInput, setMoodInput] = useState('');
  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() && promptType === 'chat') return;
    if (promptType === 'generate' && !input.trim() && !genreInput.trim() && !moodInput.trim()) return;

    let newMessage;
    let endpoint;
    let payload;

    switch (promptType) {
      case 'analyze':
        newMessage = { role: 'user', content: `Please analyze this prompt: "${input}"` };
        endpoint = '/api/assistant/analyze-prompt';
        payload = { prompt: input };
        break;
      case 'generate':
        const description = input.trim();
        const genre = genreInput.trim();
        const mood = moodInput.trim();
        
        let promptText = 'Can you generate a music prompt';
        if (description) promptText += ` for: ${description}`;
        if (genre) promptText += ` in the ${genre} genre`;
        if (mood) promptText += ` with a ${mood} mood`;
        
        newMessage = { role: 'user', content: promptText };
        endpoint = '/api/assistant/generate-prompt';
        payload = { description, genre, mood };
        break;
      case 'chat':
      default:
        newMessage = { role: 'user', content: input };
        endpoint = '/api/assistant/chat';
        payload = { 
          messages: [...messages, { role: 'user', content: input }]
        };
        break;
    }

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setGenreInput('');
    setMoodInput('');
    setLoading(true);

    try {
      const response = await axios.post(endpoint, payload);
      
      let assistantContent;
      if (promptType === 'analyze') {
        assistantContent = response.data.analysis;
      } else if (promptType === 'generate') {
        assistantContent = response.data.generatedPrompt;
      } else {
        assistantContent = response.data.response;
      }

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: assistantContent }
      ]);
    } catch (error) {
      console.error('Error communicating with AI assistant:', error);
      setMessages(prev => [
        ...prev,
        { 
          role: 'assistant', 
          content: 'Sorry, I encountered an error. Please try again later or contact support if the problem persists.' 
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">AI Assistant</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get help with crafting the perfect Suno prompts, learn about features, 
            or get suggestions based on your ideas.
          </p>
        </div>
      </section>

      {/* Assistant Interface */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            {/* Mode Selection Tabs */}
            <div className="flex border-b">
              <button
                onClick={() => setPromptType('chat')}
                className={`flex-1 py-3 text-center font-medium ${
                  promptType === 'chat'
                    ? 'text-indigo-600 border-b-2 border-indigo-500'
                    : 'text-gray-500 hover:text-indigo-500'
                }`}
              >
                <FaRobot className="inline mr-2" />
                Chat
              </button>
              <button
                onClick={() => setPromptType('analyze')}
                className={`flex-1 py-3 text-center font-medium ${
                  promptType === 'analyze'
                    ? 'text-indigo-600 border-b-2 border-indigo-500'
                    : 'text-gray-500 hover:text-indigo-500'
                }`}
              >
                <FaLightbulb className="inline mr-2" />
                Analyze Prompt
              </button>
              <button
                onClick={() => setPromptType('generate')}
                className={`flex-1 py-3 text-center font-medium ${
                  promptType === 'generate'
                    ? 'text-indigo-600 border-b-2 border-indigo-500'
                    : 'text-gray-500 hover:text-indigo-500'
                }`}
              >
                <FaMusic className="inline mr-2" />
                Generate Prompt
              </button>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  {promptType === 'chat' && (
                    <>
                      <FaRobot className="text-5xl mb-4 text-indigo-300" />
                      <p className="text-center">
                        Ask me anything about Suno features, meta tags, or prompt crafting!
                      </p>
                      <p className="text-sm mt-2 text-center">
                        Example: "How do I use the [Mood] meta tag?" or "What are some good jazz prompts?"
                      </p>
                    </>
                  )}
                  {promptType === 'analyze' && (
                    <>
                      <FaLightbulb className="text-5xl mb-4 text-indigo-300" />
                      <p className="text-center">
                        Enter a Suno prompt below and I'll analyze it for you!
                      </p>
                      <p className="text-sm mt-2 text-center">
                        I'll provide feedback and suggestions to improve your prompt.
                      </p>
                    </>
                  )}
                  {promptType === 'generate' && (
                    <>
                      <FaMusic className="text-5xl mb-4 text-indigo-300" />
                      <p className="text-center">
                        Describe the music you want, and I'll craft a detailed Suno prompt!
                      </p>
                      <p className="text-sm mt-2 text-center">
                        You can specify genre, mood, and other details below.
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-indigo-100 text-indigo-900'
                            : 'bg-white border border-gray-200 text-gray-800'
                        }`}
                      >
                        <div className="flex items-center mb-1">
                          {message.role === 'user' ? (
                            <>
                              <span className="font-semibold text-xs">You</span>
                              <FaUser className="ml-1 text-xs" />
                            </>
                          ) : (
                            <>
                              <span className="font-semibold text-xs">AI Assistant</span>
                              <FaRobot className="ml-1 text-xs" />
                            </>
                          )}
                        </div>
                        <div className="whitespace-pre-wrap">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white border-t">
              {promptType === 'generate' ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Describe your music idea..."
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      disabled={loading}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                    <input
                      type="text"
                      value={genreInput}
                      onChange={(e) => setGenreInput(e.target.value)}
                      placeholder="Genre (optional)"
                      className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      disabled={loading}
                    />
                    <input
                      type="text"
                      value={moodInput}
                      onChange={(e) => setMoodInput(e.target.value)}
                      placeholder="Mood (optional)"
                      className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      disabled={loading}
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handleClear}
                      className="text-gray-500 hover:text-indigo-500"
                      disabled={loading || messages.length === 0}
                    >
                      Clear Chat
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center disabled:opacity-50"
                      disabled={loading || (!input.trim() && !genreInput.trim() && !moodInput.trim())}
                    >
                      {loading ? (
                        <>
                          <FaSync className="animate-spin mr-2" />
                          Generating...
                        </>
                      ) : (
                        <>
                          Generate Prompt
                          <FaPaperPlane className="ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="flex items-end gap-2">
                  <div className="flex-grow relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder={
                        promptType === 'chat'
                          ? "Ask a question..."
                          : "Enter a Suno prompt to analyze..."
                      }
                      className="w-full p-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                      disabled={loading}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleClear}
                      className="text-gray-500 hover:text-indigo-500 px-3 py-3"
                      disabled={loading || messages.length === 0}
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-lg disabled:opacity-50"
                      disabled={loading || !input.trim()}
                    >
                      {loading ? (
                        <FaSync className="animate-spin" />
                      ) : (
                        <FaPaperPlane />
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            How the AI Assistant Can Help You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-500 text-3xl mb-4">
                <FaRobot />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ask Questions</h3>
              <p className="text-gray-600">
                Get answers about Suno features, learn how to use meta tags, or discover
                techniques for better music generation.
              </p>
              <div className="mt-4 bg-indigo-50 p-3 rounded-md text-sm">
                <strong>Try asking:</strong> "What's the difference between [Verse] and [Chorus] tags?"
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-500 text-3xl mb-4">
                <FaLightbulb />
              </div>
              <h3 className="text-lg font-semibold mb-2">Analyze Your Prompts</h3>
              <p className="text-gray-600">
                Get feedback on your existing prompts, with suggestions for improvement
                and explanations of how to make them more effective.
              </p>
              <div className="mt-4 bg-indigo-50 p-3 rounded-md text-sm">
                <strong>Try analyzing:</strong> "A dreamy pop song about floating through clouds"
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-500 text-3xl mb-4">
                <FaMusic />
              </div>
              <h3 className="text-lg font-semibold mb-2">Generate New Prompts</h3>
              <p className="text-gray-600">
                Describe the type of music you want to create, and get a complete,
                detailed prompt with appropriate meta tags.
              </p>
              <div className="mt-4 bg-indigo-50 p-3 rounded-md text-sm">
                <strong>Try generating:</strong> A Latin jazz song with upbeat energy
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AssistantPage;
