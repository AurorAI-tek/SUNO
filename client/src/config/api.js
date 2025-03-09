import axios from 'axios';

// Set the base URL for all Axios requests
const backendUrl = process.env.NODE_ENV === 'production' 
  ? '/api' // In production, we'll use relative path (handled by Nginx)
  : 'http://localhost:5000'; // In development, we connect directly to the backend

axios.defaults.baseURL = backendUrl;

// Set the auth token in headers if it exists
const token = localStorage.getItem('sunoToken');
if (token) {
  axios.defaults.headers.common['x-auth-token'] = token;
}

export default axios;
