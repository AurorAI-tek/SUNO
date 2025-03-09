import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaTag, 
  FaEdit, 
  FaTrash, 
  FaPlus, 
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaExclamationCircle
} from 'react-icons/fa';

const MetaTagsManagement = () => {
  const [metaTags, setMetaTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tagToDelete, setTagToDelete] = useState(null);
  const navigate = useNavigate();

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
        
        // If unauthorized, redirect to login
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMetaTags();
  }, [navigate]);

  // Filter meta tags by category and search term
  const filteredMetaTags = metaTags.filter(tag => {
    const matchesCategory = filterCategory === 'All' || tag.category === filterCategory;
    const matchesSearch = 
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tag.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDeleteClick = (tag) => {
    setTagToDelete(tag);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!tagToDelete) return;
    
    try {
      await axios.delete(`/api/meta-tags/${tagToDelete._id}`);
      
      // Update the state after successful deletion
      setMetaTags(metaTags.filter(tag => tag._id !== tagToDelete._id));
      setShowDeleteModal(false);
      setTagToDelete(null);
    } catch (err) {
      console.error('Error deleting meta tag:', err);
      setError('Failed to delete meta tag. Please try again.');
      
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
          <h1 className="text-xl font-bold">Meta Tags Management</h1>
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
            <h2 className="text-2xl font-bold">Meta Tags</h2>
            <span className="ml-3 bg-indigo-100 text-indigo-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {filteredMetaTags.length}
            </span>
          </div>
          
          <div className="flex justify-between gap-4 w-full md:w-auto">
            <Link 
              to="/admin/meta-tags/new" 
              className="bg-indigo-500 hover:bg-indigo-600 text-white flex items-center justify-center px-4 py-2 rounded-md transition duration-300"
            >
              <FaPlus className="mr-2" />
              Add New Meta Tag
            </Link>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search meta tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>
            
            <div className="w-full md:w-64">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 appearance-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Meta Tags Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : filteredMetaTags.length === 0 ? (
            <div className="p-8 text-center">
              <FaTag className="mx-auto text-4xl text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">No meta tags found matching your criteria.</p>
              <Link 
                to="/admin/meta-tags/new" 
                className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Add Your First Meta Tag
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Syntax
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMetaTags.map((tag) => (
                    <tr key={tag._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaTag className="text-indigo-500 mr-2" />
                          <span className="font-medium text-gray-900">{tag.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          {tag.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {tag.syntax}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {tag.description}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          to={`/admin/meta-tags/edit/${tag._id}`}
                          className="text-indigo-500 hover:text-indigo-700 mr-4"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(tag)}
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
              Are you sure you want to delete the meta tag "{tagToDelete?.name}"? 
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

export default MetaTagsManagement;
