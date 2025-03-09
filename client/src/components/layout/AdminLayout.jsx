import { Outlet, NavLink } from 'react-router-dom';
import { FaHome, FaTags, FaLightbulb, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-indigo-200 text-sm mt-1">Suno Music Prompt Helper</p>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <NavLink
                to="/admin"
                end
                className={({ isActive }) =>
                  `flex items-center py-3 px-6 ${
                    isActive ? 'bg-indigo-900 border-r-4 border-pink-500' : 'hover:bg-indigo-700'
                  }`
                }
              >
                <FaHome className="mr-3" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/meta-tags"
                className={({ isActive }) =>
                  `flex items-center py-3 px-6 ${
                    isActive ? 'bg-indigo-900 border-r-4 border-pink-500' : 'hover:bg-indigo-700'
                  }`
                }
              >
                <FaTags className="mr-3" />
                Meta Tags
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/features"
                className={({ isActive }) =>
                  `flex items-center py-3 px-6 ${
                    isActive ? 'bg-indigo-900 border-r-4 border-pink-500' : 'hover:bg-indigo-700'
                  }`
                }
              >
                <FaLightbulb className="mr-3" />
                Features
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center py-3 px-6 hover:bg-indigo-700"
              >
                <FaSignOutAlt className="mr-3" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <a href="/" className="text-indigo-600 hover:text-indigo-800 text-sm">
              ← Back to Website
            </a>
          </div>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
