import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      // Restore user state from localStorage
      setUser({ email: savedEmail, name: savedEmail.split('@')[0] });
    }
    setLoading(false);
  }, []);

  const login = (email) => {
    localStorage.setItem('userEmail', email);
    setUser({ email, name: email.split('@')[0] });
  };

  const logout = () => {
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
