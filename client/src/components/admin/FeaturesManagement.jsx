import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaLightbulb, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaArrowLeft,
  FaSearch,
  FaExclamationCircle
} from 'react-icons/fa';

const FeaturesManagement = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [featureToDelete, setFeatureToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/features');
        setFeatures(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching features:', err);
        setError('Failed to load features. Please try again later.');
        
        // If unauthorized, redirect to login
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, [navigate]);

  // Filter features by search term
  const filteredFeatures = features.filter(feature => 
    feature.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    feature.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (feature) => {
    setFeatureToDelete(feature);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!featureToDelete) return;
    
    try {
      await axios.delete(`/api/features/${featureToDelete._id}`);
      
      // Update the state after successful deletion
      setFeatures(features.filter(feature => feature._id !== featureToDelete._id));
      setShowDeleteModal(false);
      setFeatureToDelete(null);
    } catch (err) {
      console.error('Error deleting feature:', err);
      setError('Failed to delete feature. Please try again.');
      
      // If unauthorized, redirect to login
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/admin/login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-indigo-700 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Features Management</h1>
          <Link 
            to="/admin/dashboard" 
            className="flex items-center bg-indigo-600 hover:bg-indigo-800 px-3 py-1 rounded-md"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
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

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">Features</h2>
            <span className="ml-3 bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {filteredFeatures.length}
            </span>
          </div>
          
          <div className="flex justify-between gap-4 w-full md:w-auto">
            <Link 
              to="/admin/features/new" 
              className="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center px-4 py-2 rounded-md transition duration-300"
            >
              <FaPlus className="mr-2" />
              Add New Feature
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>
        </div>

        {/* Features Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredFeatures.length === 0 ? (
            <div className="p-8 text-center">
              <FaLightbulb className="mx-auto text-4xl text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">No features found matching your criteria.</p>
              <Link 
                to="/admin/features/new" 
                className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Add Your First Feature
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Examples
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFeatures.map((feature) => (
                    <tr key={feature._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaLightbulb className="text-indigo-500 mr-2" />
                          <span className="font-medium text-gray-900">{feature.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {feature.description}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">
                          {feature.examples?.length || 0} examples
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          to={`/admin/features/edit/${feature._id}`}
                          className="text-indigo-500 hover:text-indigo-700 mr-4"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(feature)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">
              Are you sure you want to delete the feature "{featureToDelete?.title}"? 
              This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeaturesManagement;
