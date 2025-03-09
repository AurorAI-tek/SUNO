import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaMusic } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <FaMusic className="text-indigo-500 text-xl mr-2" />
            <span className="font-bold text-lg">Suno Helper</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-medium' : 'text-gray-600 hover:text-indigo-500'
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-medium' : 'text-gray-600 hover:text-indigo-500'
              }
            >
              Features
            </NavLink>
            <NavLink
              to="/meta-tags"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-medium' : 'text-gray-600 hover:text-indigo-500'
              }
            >
              Meta Tags
            </NavLink>
            <NavLink
              to="/assistant"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-medium' : 'text-gray-600 hover:text-indigo-500'
              }
            >
              AI Assistant
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-medium' : 'text-gray-600 hover:text-indigo-500'
              }
            >
              About
            </NavLink>
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? 'text-indigo-500 font-medium' : 'text-gray-600 hover:text-indigo-500'
                  }
                >
                  Admin
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-indigo-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'text-indigo-500 font-medium' : 'text-gray-600 hover:text-indigo-500'
                }
              >
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-600 hover:text-indigo-500 focus:outline-none"
            >
              {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-6 text-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-medium text-lg' : 'text-gray-600 hover:text-indigo-500 text-lg'
              }
              end
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-medium text-lg' : 'text-gray-600 hover:text-indigo-500 text-lg'
              }
              onClick={closeMenu}
            >
              Features
            </NavLink>
            <NavLink
              to="/meta-tags"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-medium text-lg' : 'text-gray-600 hover:text-indigo-500 text-lg'
              }
              onClick={closeMenu}
            >
              Meta Tags
            </NavLink>
            <NavLink
              to="/assistant"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-medium text-lg' : 'text-gray-600 hover:text-indigo-500 text-lg'
              }
              onClick={closeMenu}
            >
              AI Assistant
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-indigo-500 font-medium text-lg' : 'text-gray-600 hover:text-indigo-500 text-lg'
              }
              onClick={closeMenu}
            >
              About
            </NavLink>
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? 'text-indigo-500 font-medium text-lg' : 'text-gray-600 hover:text-indigo-500 text-lg'
                  }
                  onClick={closeMenu}
                >
                  Admin
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="text-gray-600 hover:text-indigo-500 text-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? 'text-indigo-500 font-medium text-lg' : 'text-gray-600 hover:text-indigo-500 text-lg'
                }
                onClick={closeMenu}
              >
                Login
              </NavLink>
            )}
            <button 
              onClick={closeMenu}
              className="absolute top-4 right-4 text-gray-600 hover:text-indigo-500"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
