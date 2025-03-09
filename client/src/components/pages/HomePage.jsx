import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMusic, FaTag, FaRobot, FaLightbulb } from 'react-icons/fa';
import axios from 'axios';

const HomePage = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyzePrompt = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('/api/assistant/analyze-prompt', { prompt });
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error('Error analyzing prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate waveform animation bars
  const renderWaveformBars = () => {
    return Array.from({ length: 15 }, (_, i) => (
      <div
        key={i}
        className="waveform-bar"
        style={{ animationDelay: `${i * 0.1}s` }}
      ></div>
    ));
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Create Better Music with Suno
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover advanced features, meta tags, and expert tips to take your
            Suno music generation to the next level.
          </p>
          <div className="waveform mb-8">
            {renderWaveformBars()}
          </div>
          <form
            onSubmit={handleAnalyzePrompt}
            className="max-w-3xl mx-auto flex flex-col md:flex-row gap-4"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your Suno prompt here..."
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Analyzing...' : 'Analyze Prompt'}
            </button>
          </form>
        </div>
      </section>

      {/* Analysis Result */}
      {analysis && (
        <section className="py-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-indigo-600">Prompt Analysis</h2>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
              </div>
              <div className="mt-6 flex justify-center">
                <Link
                  to="/assistant"
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300"
                >
                  Try AI Assistant
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">What We Offer</h2>
          <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Everything you need to master Suno's music generation capabilities
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-indigo-500 text-4xl mb-4">
                <FaTag />
              </div>
              <h3 className="text-xl font-bold mb-2">Meta Tags Library</h3>
              <p className="text-gray-600 mb-4">
                Explore a comprehensive collection of meta tags to structure and
                enhance your music prompts.
              </p>
              <Link
                to="/meta-tags"
                className="text-indigo-500 hover:text-indigo-700 font-medium"
              >
                Explore Meta Tags →
              </Link>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-indigo-500 text-4xl mb-4">
                <FaLightbulb />
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Features</h3>
              <p className="text-gray-600 mb-4">
                Learn about Custom Mode, song extension, and other powerful
                features to create amazing music.
              </p>
              <Link
                to="/features"
                className="text-indigo-500 hover:text-indigo-700 font-medium"
              >
                Discover Features →
              </Link>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="text-indigo-500 text-4xl mb-4">
                <FaRobot />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Assistant</h3>
              <p className="text-gray-600 mb-4">
                Get personalized help with your prompts, suggestions for
                improvements, and answers to your questions.
              </p>
              <Link
                to="/assistant"
                className="text-indigo-500 hover:text-indigo-700 font-medium"
              >
                Try AI Assistant →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-indigo-500 font-bold">JM</span>
                </div>
                <div>
                  <h3 className="font-semibold">James Miller</h3>
                  <p className="text-gray-500 text-sm">Musician</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The meta tags guide helped me structure my songs better. Now I'm
                getting much more coherent results from Suno!"
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-indigo-500 font-bold">SK</span>
                </div>
                <div>
                  <h3 className="font-semibold">Sarah Kim</h3>
                  <p className="text-gray-500 text-sm">Producer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The AI assistant is incredible at analyzing my prompts and
                suggesting improvements. It's like having a music prompt expert
                at my side."
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-indigo-500 font-bold">DT</span>
                </div>
                <div>
                  <h3 className="font-semibold">David Thompson</h3>
                  <p className="text-gray-500 text-sm">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I had no idea about Custom Mode until I found this site. It's
                completely transformed how I use Suno for my YouTube content."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Better Music?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start exploring our resources and take your Suno experience to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/meta-tags"
              className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-lg transition duration-300"
            >
              Explore Meta Tags
            </Link>
            <Link
              to="/assistant"
              className="bg-white text-indigo-900 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition duration-300"
            >
              Try AI Assistant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
