import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaSave, FaPlus, FaTrash, FaExclamationCircle, FaImage } from 'react-icons/fa';

const FeatureForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    howToUse: '',
    imageUrl: '',
    examples: [{ prompt: '', description: '' }]
  });
  
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // If in edit mode, fetch the feature data
    if (isEditMode) {
      const fetchFeature = async () => {
        try {
          setFetchLoading(true);
          const response = await axios.get(`/api/features/${id}`);
          setFormData(response.data);
          setError(null);
        } catch (err) {
          console.error('Error fetching feature:', err);
          setError('Failed to load feature data. Please try again.');
          
          // If not found, redirect back to management page
          if (err.response && err.response.status === 404) {
            navigate('/admin/features');
          }
          
          // If unauthorized, redirect to login
          if (err.response && err.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/admin/login');
          }
        } finally {
          setFetchLoading(false);
        }
      };

      fetchFeature();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExampleChange = (index, field, value) => {
    const updatedExamples = [...formData.examples];
    updatedExamples[index] = {
      ...updatedExamples[index],
      [field]: value
    };
    
    setFormData(prev => ({
      ...prev,
      examples: updatedExamples
    }));
  };

  const addExample = () => {
    setFormData(prev => ({
      ...prev,
      examples: [...prev.examples, { prompt: '', description: '' }]
    }));
  };

  const removeExample = (index) => {
    const updatedExamples = [...formData.examples];
    updatedExamples.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      examples: updatedExamples
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.description || !formData.howToUse) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      if (isEditMode) {
        // Update existing feature
        await axios.put(`/api/features/${id}`, formData);
        setSuccessMessage('Feature updated successfully');
      } else {
        // Create new feature
        await axios.post('/api/features', formData);
        setSuccessMessage('Feature created successfully');
        
        // Clear form after successful creation
        setFormData({
          title: '',
          description: '',
          howToUse: '',
          imageUrl: '',
          examples: [{ prompt: '', description: '' }]
        });
      }
      
      // Redirect after a brief delay to show success message
      setTimeout(() => {
        navigate('/admin/features');
      }, 1500);
    } catch (err) {
      console.error('Error saving feature:', err);
      setError(
        err.response?.data?.message || 
        'Failed to save feature. Please try again.'
      );
      
      // If unauthorized, redirect to login
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-indigo-700 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            {isEditMode ? 'Edit Feature' : 'Add New Feature'}
          </h1>
          <Link 
            to="/admin/features" 
            className="flex items-center bg-indigo-600 hover:bg-indigo-800 px-3 py-1 rounded-md"
          >
            <FaArrowLeft className="mr-2" />
            Back to Features
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 bg-red-50 text-red-500 px-4 py-3 rounded-md flex items-center">
            <FaExclamationCircle className="mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        {successMessage && (
          <div className="mb-6 bg-green-50 text-green-500 px-4 py-3 rounded-md">
            {successMessage}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-6">
              <label 
                htmlFor="title" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Feature Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Custom Mode, Voice Type Selection"
                required
              />
            </div>
            
            <div className="mb-6">
              <label 
                htmlFor="description" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Provide a detailed description of this feature"
                required
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label 
                htmlFor="howToUse" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                How To Use <span className="text-red-500">*</span>
              </label>
              <textarea
                id="howToUse"
                name="howToUse"
                value={formData.howToUse}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Explain step-by-step how to use this feature"
                required
              ></textarea>
            </div>
            
            <div className="mb-6">
              <label 
                htmlFor="imageUrl" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL
              </label>
              <div className="flex items-center">
                <div className="flex-grow">
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter URL for a screenshot or illustration of this feature"
                  />
                </div>
                {formData.imageUrl && (
                  <div className="ml-4">
                    <button
                      type="button"
                      onClick={() => window.open(formData.imageUrl, '_blank')}
                      className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md"
                    >
                      <FaImage className="mr-2" />
                      Preview
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Optional. Link to an image showing this feature in action
              </p>
            </div>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Example Prompts
                </label>
                <button
                  type="button"
                  onClick={addExample}
                  className="flex items-center text-sm text-indigo-500 hover:text-indigo-700"
                >
                  <FaPlus className="mr-1" />
                  Add Example
                </button>
              </div>
              
              {formData.examples.map((example, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 p-4 rounded-md mb-3 border border-gray-200"
                >
                  <div className="flex justify-between mb-2">
                    <h4 className="text-sm font-medium">Example {index + 1}</h4>
                    {formData.examples.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExample(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                  
                  <div className="mb-3">
                    <label 
                      htmlFor={`example-prompt-${index}`} 
                      className="block text-sm text-gray-600 mb-1"
                    >
                      Prompt Example
                    </label>
                    <input
                      type="text"
                      id={`example-prompt-${index}`}
                      value={example.prompt}
                      onChange={(e) => handleExampleChange(index, 'prompt', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Example of how to use this feature in a prompt"
                    />
                  </div>
                  
                  <div>
                    <label 
                      htmlFor={`example-description-${index}`} 
                      className="block text-sm text-gray-600 mb-1"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      id={`example-description-${index}`}
                      value={example.description}
                      onChange={(e) => handleExampleChange(index, 'description', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Brief explanation of this example"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end space-x-3">
              <Link
                to="/admin/features"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    {isEditMode ? 'Update Feature' : 'Create Feature'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default FeatureForm;
