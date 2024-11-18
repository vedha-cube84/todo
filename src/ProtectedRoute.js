import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './authContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, checkAuth  } = useAuth();
  const [loading, setLoading] = useState(true);
  console.log('bn', isAuthenticated);

  useEffect(() => {
    const checkAuthStatus = async () => {
      await checkAuth();  // Assume checkAuth is an async function that checks auth status
      setLoading(false);   // Set loading to false once the auth check is complete
    };
    checkAuthStatus();
  }, [checkAuth]);
  
  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
