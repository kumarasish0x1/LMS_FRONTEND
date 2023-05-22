import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../providers/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated);
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return children;
};

export default ProtectedRoute;