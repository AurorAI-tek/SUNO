import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTag, FaCopy, FaCheck } from 'react-icons/fa';

const MetaTagsPage = () => {
  const [metaTags, setMetaTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  // Categories for filtering
  const categories = ['All', 'Structure', 'Mood', 'Instrumental', 'Vocals', 'Genre', 'Other'];

  useEffect(() => {
    const fetchMetaTags = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/meta-tags');
        setMetaTags(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching meta tags:', err);
        setError('Failed to load meta tags. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchMetaTags();
  }, []);

  // Handle copy to clipboard
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Filter meta tags by category and search term
  const filteredMetaTags = metaTags.filter(tag => {
    const matchesCategory = activeCategory === 'All' || tag.category === activeCategory;
    const matchesSearch = tag.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tag.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Meta Tags Library</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Enhance your Suno prompts with meta tags to control structure, mood, vocals, and more.
            Browse our comprehensive collection below.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white shadow-md sticky top-[64px] z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex overflow-x-auto pb-2 md:pb-0 whitespace-nowrap w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-md mr-2 text-sm font-medium ${
                    activeCategory === category
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search meta tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Meta Tags Display */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-4 py-2 rounded"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-8">
                {activeCategory === 'All' ? 'All Meta Tags' : `${activeCategory} Meta Tags`}
                {searchTerm && ` - Search: "${searchTerm}"`}
                <span className="text-gray-500 ml-2 text-lg">({filteredMetaTags.length})</span>
              </h2>

              {filteredMetaTags.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No meta tags found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMetaTags.map((tag) => (
                    <div key={tag._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                      <div className="bg-indigo-50 px-4 py-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <FaTag className="text-indigo-500 mr-2" />
                          <h3 className="font-bold">{tag.name}</h3>
                        </div>
                        <span className="text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full">
                          {tag.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <p className="text-gray-700 mb-4">{tag.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="font-semibold text-sm mb-2">Syntax:</h4>
                          <div className="flex">
                            <code className="bg-gray-100 px-3 py-1 rounded-md text-sm flex-grow">
                              {tag.syntax}
                            </code>
                            <button
                              onClick={() => handleCopy(tag.syntax, `syntax-${tag._id}`)}
                              className="ml-2 text-gray-500 hover:text-indigo-500"
                              title="Copy to clipboard"
                            >
                              {copiedId === `syntax-${tag._id}` ? (
                                <FaCheck className="text-green-500" />
                              ) : (
                                <FaCopy />
                              )}
                            </button>
                          </div>
                        </div>

                        {tag.examples && tag.examples.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Examples:</h4>
                            {tag.examples.map((example, index) => (
                              <div key={index} className="mb-3 bg-gray-50 p-3 rounded-md">
                                <div className="flex">
                                  <p className="text-sm font-medium text-gray-800 flex-grow">
                                    {example.prompt}
                                  </p>
                                  <button
                                    onClick={() => handleCopy(example.prompt, `example-${tag._id}-${index}`)}
                                    className="ml-2 text-gray-500 hover:text-indigo-500"
                                    title="Copy to clipboard"
                                  >
                                    {copiedId === `example-${tag._id}-${index}` ? (
                                      <FaCheck className="text-green-500" />
                                    ) : (
                                      <FaCopy />
                                    )}
                                  </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">{example.description}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Usage Tips */}
      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Tips for Using Meta Tags</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <ul className="space-y-4">
                <li className="flex">
                  <span className="text-indigo-500 font-bold mr-2">1.</span>
                  <p>
                    <span className="font-semibold">Combine multiple tags</span> - You can use several meta tags in a single prompt to precisely control different aspects of your song.
                  </p>
                </li>
                <li className="flex">
                  <span className="text-indigo-500 font-bold mr-2">2.</span>
                  <p>
                    <span className="font-semibold">Order matters</span> - Place structure tags ([Verse], [Chorus], etc.) in the order you want them to appear in your song.
                  </p>
                </li>
                <li className="flex">
                  <span className="text-indigo-500 font-bold mr-2">3.</span>
                  <p>
                    <span className="font-semibold">Be specific</span> - The more specific your meta tags, the more control you have over the generated music.
                  </p>
                </li>
                <li className="flex">
                  <span className="text-indigo-500 font-bold mr-2">4.</span>
                  <p>
                    <span className="font-semibold">Experiment</span> - Try different combinations of meta tags to discover unique sounds and styles.
                  </p>
                </li>
                <li className="flex">
                  <span className="text-indigo-500 font-bold mr-2">5.</span>
                  <p>
                    <span className="font-semibold">Use the AI Assistant</span> - Need help crafting the perfect prompt with meta tags? Our AI Assistant can provide suggestions and analyze your prompts.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MetaTagsPage;
