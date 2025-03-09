import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FaTag, 
  FaLightbulb, 
  FaSignOutAlt, 
  FaChartBar, 
  FaComment,
  FaExclamationCircle
} from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    metaTags: 0,
    features: 0,
    // You can add more stats here as needed
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Get user information
        const userResponse = await axios.get('/api/auth/me');
        setUser(userResponse.data);
        
        // Get meta tags count
        const metaTagsResponse = await axios.get('/api/meta-tags');
        
        // Get features count
        const featuresResponse = await axios.get('/api/features');
        
        setStats({
          metaTags: metaTagsResponse.data.length,
          features: featuresResponse.data.length,
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Error loading dashboard data. Please try again or check your connection.');
        
        // If unauthorized, redirect to login
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/admin/login');
  };

  if (loading) {
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
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          {user && (
            <div className="flex items-center">
              <span className="mr-4">Welcome, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="flex items-center bg-indigo-600 hover:bg-indigo-800 px-3 py-1 rounded-md"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          )}
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

        <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-indigo-100 text-indigo-500 mr-4">
                <FaTag className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase">Meta Tags</p>
                <p className="text-2xl font-semibold">{stats.metaTags}</p>
              </div>
            </div>
            <Link 
              to="/admin/meta-tags" 
              className="mt-4 inline-block text-indigo-500 hover:text-indigo-700"
            >
              Manage Meta Tags →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                <FaLightbulb className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase">Features</p>
                <p className="text-2xl font-semibold">{stats.features}</p>
              </div>
            </div>
            <Link 
              to="/admin/features" 
              className="mt-4 inline-block text-indigo-500 hover:text-indigo-700"
            >
              Manage Features →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                <FaChartBar className="text-xl" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase">Activity</p>
                <p className="text-2xl font-semibold">View Activity</p>
              </div>
            </div>
            <Link 
              to="/admin/activities" 
              className="mt-4 inline-block text-indigo-500 hover:text-indigo-700"
            >
              View Activity Logs →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link 
            to="/admin/meta-tags/new" 
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-300"
          >
            <div className="flex items-center text-indigo-600">
              <FaTag className="mr-2" />
              <span>Add New Meta Tag</span>
            </div>
          </Link>
          
          <Link 
            to="/admin/features/new" 
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-300"
          >
            <div className="flex items-center text-purple-600">
              <FaLightbulb className="mr-2" />
              <span>Add New Feature</span>
            </div>
          </Link>
          
          <Link 
            to="/" 
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition duration-300"
            target="_blank"
          >
            <div className="flex items-center text-green-600">
              <FaComment className="mr-2" />
              <span>View Public Site</span>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <p className="text-gray-500 text-center py-4">
              Activity logging will be implemented in future updates
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
