import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '../store/UserContext';

// Feature Pages
import Landing from '../pages/Landing';
import Dashboard from '../features/dashboard/pages/Dashboard';
import Records from '../features/transactions/pages/Records';
import Analytics from '../features/analytics/pages/Analytics';
import Profile from '../pages/Profile';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';

const AppRoutes = () => {
  const { user } = useUser();

  return (
    <Routes>
      <Route path="/" element={!user ? <Landing /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={user ? <Dashboard /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/transactions" 
        element={user ? <Records /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/analysis" 
        element={user ? <Analytics /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/settings" 
        element={user ? <Profile /> : <Navigate to="/login" />} 
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
