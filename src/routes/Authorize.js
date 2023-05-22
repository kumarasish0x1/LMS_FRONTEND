import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUserContext } from "../providers/CurrentUserProvider";

const Authorized = ({ component: Component, allowedRoles }) => {
  const { currentUserRole } = useCurrentUserContext();
  const navigate = useNavigate();

  let userRole = '';
  if (currentUserRole === 1) {
    userRole = 'admin';
  } else if (currentUserRole === 2) {
    userRole = 'instructor';
  } else if (currentUserRole === 3) {
    userRole = 'student';
  }

  useEffect(() => {
    console.log("Current User Role: ", allowedRoles, userRole);
    if (!allowedRoles.includes(userRole)) {
        console.log("Access Denied");
        navigate('/access-denied');
    }
  }, []);

  return <Component />;
};

export default Authorized;