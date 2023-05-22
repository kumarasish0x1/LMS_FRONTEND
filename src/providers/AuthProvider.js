import React from 'react';
import fetchAPI from '../utils/api';
import { useState, useEffect } from 'react';
import Loading from '../components/common/Loading';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetchAPI('/auth/check-authenticated');
        console.log("Response: ", response);
        if (response.status === "success") {
          console.log("User is authenticated");
          setIsAuthenticated(true);
        }
        setCheck(true);   
      } catch (error) {
        console.error('Error checking auth status');
      }
    };

    checkAuth();
  }, []);

  console.log("Hello: ", isAuthenticated);

  if (!check) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
export const useAuthContext = () => React.useContext(AuthContext);
export default AuthProvider;