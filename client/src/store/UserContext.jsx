import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    const savedToken = localStorage.getItem('authToken');
    
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Failed to parse saved user data:', err);
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('authToken', token);
    setUser(userData);
  };

  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const logout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    localStorage.removeItem('chatMessages');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
