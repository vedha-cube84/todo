import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context for auth
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const login = () => setIsAuthenticated(true);
  // const logout = () => setIsAuthenticated(false);
  const checkAuth = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true); // Assume token exists, user is authenticated
    } else {
      setIsAuthenticated(false); // No token, user is not authenticated
    }
  };

  // Call checkAuth when the app first loads
  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth state
export const useAuth = () => {
  return useContext(AuthContext);
};
