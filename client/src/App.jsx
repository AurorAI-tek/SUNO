import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// Layout Components
import Layout from './components/layout/Layout';

// Public Pages
import HomePage from './components/pages/HomePage';
import FeaturesPage from './components/pages/FeaturesPage';
import MetaTagsPage from './components/pages/MetaTagsPage';
import AssistantPage from './components/pages/AssistantPage';
import AboutPage from './components/pages/AboutPage';
import NotFoundPage from './components/pages/NotFoundPage';

// Admin Components
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import MetaTagsManagement from './components/admin/MetaTagsManagement';
import MetaTagForm from './components/admin/MetaTagForm';
import FeaturesManagement from './components/admin/FeaturesManagement';
import FeatureForm from './components/admin/FeatureForm';

// Utils
import PrivateRoute from './components/utils/PrivateRoute';

// Import our API configuration
import './config/api';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="meta-tags" element={<MetaTagsPage />} />
          <Route path="assistant" element={<AssistantPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        
        <Route path="/admin/meta-tags" element={<PrivateRoute><MetaTagsManagement /></PrivateRoute>} />
        <Route path="/admin/meta-tags/new" element={<PrivateRoute><MetaTagForm /></PrivateRoute>} />
        <Route path="/admin/meta-tags/edit/:id" element={<PrivateRoute><MetaTagForm /></PrivateRoute>} />
        
        <Route path="/admin/features" element={<PrivateRoute><FeaturesManagement /></PrivateRoute>} />
        <Route path="/admin/features/new" element={<PrivateRoute><FeatureForm /></PrivateRoute>} />
        <Route path="/admin/features/edit/:id" element={<PrivateRoute><FeatureForm /></PrivateRoute>} />
        
        {/* 404 Not Found Route - This must be the last route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
