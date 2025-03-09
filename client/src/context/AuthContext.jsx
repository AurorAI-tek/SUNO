import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('sunoToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to load user data from token
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Set auth header
        axios.defaults.headers.common['x-auth-token'] = token;
        
        // Get user data
        const res = await axios.get('/api/auth/me');
        setUser(res.data);
      } catch (error) {
        console.error('Error loading user', error);
        // Clear token in case it's invalid
        localStorage.removeItem('sunoToken');
        setToken(null);
        delete axios.defaults.headers.common['x-auth-token'];
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [token]);

  // Login function
  const login = async (username, password) => {
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      
      // Store token and set user
      const newToken = res.data.token;
      localStorage.setItem('sunoToken', newToken);
      setToken(newToken);
      
      // Set auth header
      axios.defaults.headers.common['x-auth-token'] = newToken;
      
      // Load user data
      const userRes = await axios.get('/api/auth/me');
      setUser(userRes.data);
      
      return true;
    } catch (error) {
      console.error('Login error', error);
      throw error.response?.data?.msg || 'Failed to login';
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('sunoToken');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['x-auth-token'];
  };

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  // Context value
  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
