import React from 'react';
import { FaInfoCircle, FaMusic, FaTools, FaUserFriends } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Suno Music Prompt Helper</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Learn about our mission to help music creators make the most of Suno's AI music generation capabilities.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <FaInfoCircle className="text-3xl text-indigo-500 mr-4" />
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Suno Music Prompt Helper was created to bridge the gap between creative ideas and technical execution in AI music generation. 
                Our mission is to help musicians, content creators, and AI enthusiasts harness the full potential of Suno's advanced music 
                generation capabilities through education, resources, and interactive tools.
              </p>

              <div className="flex items-center mb-6">
                <FaMusic className="text-3xl text-indigo-500 mr-4" />
                <h2 className="text-2xl font-bold">What We Offer</h2>
              </div>
              <div className="mb-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-indigo-500 font-bold mr-2">•</span>
                    <p className="text-gray-700">
                      <span className="font-semibold">Comprehensive Meta Tag Library:</span> Access a complete collection of Suno meta tags with detailed explanations, syntax guides, and practical examples.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 font-bold mr-2">•</span>
                    <p className="text-gray-700">
                      <span className="font-semibold">Advanced Feature Guides:</span> Detailed tutorials and examples of Suno's most powerful features, helping you take your music generation beyond the basics.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 font-bold mr-2">•</span>
                    <p className="text-gray-700">
                      <span className="font-semibold">AI-Powered Assistant:</span> Get real-time help with analyzing and improving your prompts, or generate brand new prompts based on your creative vision.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 font-bold mr-2">•</span>
                    <p className="text-gray-700">
                      <span className="font-semibold">Educational Resources:</span> Step-by-step guides, best practices, and tips to help you create more expressive and precise music with Suno.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="flex items-center mb-6">
                <FaTools className="text-3xl text-indigo-500 mr-4" />
                <h2 className="text-2xl font-bold">Technology Stack</h2>
              </div>
              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Frontend</h3>
                  <ul className="space-y-2">
                    <li className="text-gray-700">• React.js with Vite</li>
                    <li className="text-gray-700">• Tailwind CSS with DaisyUI</li>
                    <li className="text-gray-700">• React Router for navigation</li>
                    <li className="text-gray-700">• React Context for state management</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">Backend</h3>
                  <ul className="space-y-2">
                    <li className="text-gray-700">• Node.js with Express</li>
                    <li className="text-gray-700">• MongoDB for data storage</li>
                    <li className="text-gray-700">• GROQ API for AI assistant capabilities</li>
                    <li className="text-gray-700">• JWT for secure authentication</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <FaUserFriends className="text-3xl text-indigo-500 mr-4" />
                <h2 className="text-2xl font-bold">Who Is This For?</h2>
              </div>
              <div className="mb-8">
                <p className="text-gray-700 mb-4">
                  The Suno Music Prompt Helper is designed for anyone interested in creating music with AI, including:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-indigo-500 font-bold mr-2">•</span>
                    <p className="text-gray-700">
                      <span className="font-semibold">Musicians and composers</span> looking to experiment with AI as a creative tool
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 font-bold mr-2">•</span>
                    <p className="text-gray-700">
                      <span className="font-semibold">Content creators</span> who need custom music for their videos, podcasts, or other media
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 font-bold mr-2">•</span>
                    <p className="text-gray-700">
                      <span className="font-semibold">AI enthusiasts</span> interested in exploring the intersection of artificial intelligence and creativity
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-500 font-bold mr-2">•</span>
                    <p className="text-gray-700">
                      <span className="font-semibold">Beginners</span> who are just getting started with Suno and want to learn best practices
                    </p>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg mb-8">
                <h3 className="font-semibold text-lg mb-3">Disclaimer</h3>
                <p className="text-gray-700 text-sm">
                  This tool is not officially affiliated with Suno. It is an independent educational resource created to help users 
                  better understand and utilize Suno's features. All Suno-related terminology and references are used for educational 
                  purposes only. For official information, please visit Suno's official website and documentation.
                </p>
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-lg mb-4">Ready to create amazing music?</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/" 
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
                  >
                    Start Exploring
                  </a>
                  <a 
                    href="/assistant" 
                    className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
                  >
                    Try Our AI Assistant
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
