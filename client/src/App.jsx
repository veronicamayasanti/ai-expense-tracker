import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useUser } from './store/UserContext';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  const { loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
