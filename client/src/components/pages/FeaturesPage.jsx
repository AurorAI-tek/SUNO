import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLightbulb, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FeaturesPage = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/features');
        setFeatures(response.data);
        // Expand the first feature by default
        if (response.data.length > 0) {
          setExpandedId(response.data[0]._id);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching features:', err);
        setError('Failed to load features. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Advanced Suno Features</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover powerful features to take your music generation to the next level.
            Learn how to use Custom Mode, song extension, and more.
          </p>
        </div>
      </section>

      {/* Features Display */}
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
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">
                Unlock Suno's Full Potential
              </h2>

              {features.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No features available at the moment.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {features.map((feature) => (
                    <div 
                      key={feature._id} 
                      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                    >
                      <div 
                        className={`px-6 py-4 flex justify-between items-center cursor-pointer ${
                          expandedId === feature._id ? 'bg-indigo-50' : ''
                        }`}
                        onClick={() => toggleExpand(feature._id)}
                      >
                        <div className="flex items-center">
                          <FaLightbulb className="text-indigo-500 mr-3" />
                          <h3 className="font-bold text-xl">{feature.title}</h3>
                        </div>
                        {expandedId === feature._id ? (
                          <FaChevronUp className="text-indigo-500" />
                        ) : (
                          <FaChevronDown className="text-gray-500" />
                        )}
                      </div>
                      
                      {expandedId === feature._id && (
                        <div className="px-6 py-4 border-t border-gray-100">
                          <div className="prose max-w-none">
                            <div className="mb-6">
                              <h4 className="font-semibold text-lg mb-2">Description</h4>
                              <p className="text-gray-700">{feature.description}</p>
                            </div>
                            
                            <div className="mb-6">
                              <h4 className="font-semibold text-lg mb-2">How to Use</h4>
                              <p className="text-gray-700">{feature.howToUse}</p>
                            </div>
                            
                            {feature.examples && feature.examples.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-lg mb-2">Examples</h4>
                                {feature.examples.map((example, index) => (
                                  <div key={index} className="mb-4 bg-gray-50 p-4 rounded-md">
                                    <p className="text-gray-800 font-medium mb-2">
                                      {example.prompt}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      {example.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {feature.imageUrl && (
                              <div className="mt-4">
                                <img 
                                  src={feature.imageUrl} 
                                  alt={feature.title}
                                  className="rounded-md shadow-sm w-full object-cover max-h-96" 
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Tutorial Section */}
      <section className="py-12 bg-indigo-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Step-by-Step Guide to Effective Prompts
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <ol className="space-y-6">
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Start with a Clear Structure</h3>
                    <p className="text-gray-700">
                      Begin by outlining the structure of your song using meta tags like [Verse], [Chorus], and [Bridge]. 
                      This helps Suno understand how to organize your song sections.
                    </p>
                    <div className="mt-2 bg-gray-50 p-3 rounded text-sm">
                      <strong>Example:</strong> [Verse] A day in the sunshine [Chorus] Feeling alive, feeling divine
                    </div>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Add Mood and Genre Tags</h3>
                    <p className="text-gray-700">
                      Specify the mood and genre to set the emotional tone and musical style of your song.
                      These tags significantly influence how your lyrics are interpreted.
                    </p>
                    <div className="mt-2 bg-gray-50 p-3 rounded text-sm">
                      <strong>Example:</strong> [Genre: indie folk] [Mood: nostalgic] Memories of summer days
                    </div>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Refine with Vocal and Instrumental Instructions</h3>
                    <p className="text-gray-700">
                      Further customize your song by specifying vocal types and instrumental sections.
                      You can indicate voice types, harmonies, and solo sections.
                    </p>
                    <div className="mt-2 bg-gray-50 p-3 rounded text-sm">
                      <strong>Example:</strong> [Vocals: female alto] [Instrumental] Gentle piano with subtle violin
                    </div>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Use Custom Mode for Advanced Control</h3>
                    <p className="text-gray-700">
                      Access Custom Mode to gain more precise control over your music generation.
                      This allows for specialized adjustments to make your song truly unique.
                    </p>
                    <div className="mt-2 bg-gray-50 p-3 rounded text-sm">
                      <strong>Tip:</strong> Experiment with different combinations of tags in Custom Mode to discover unique sounds and styles.
                    </div>
                  </div>
                </li>
                
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold mr-3">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Extend and Refine Your Song</h3>
                    <p className="text-gray-700">
                      After generating your initial song, use the Song Extension feature to add new sections 
                      or try uploading your own audio for reinterpretation.
                    </p>
                    <div className="mt-2 bg-gray-50 p-3 rounded text-sm">
                      <strong>Example:</strong> Extend with [Bridge] A moment of reflection [Instrumental] Dreamy synth solo
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Try These Features?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Experiment with these advanced features to create more sophisticated and personalized music with Suno.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/meta-tags" 
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
            >
              Explore Meta Tags
            </a>
            <a 
              href="/assistant" 
              className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-300"
            >
              Get Help from AI Assistant
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
