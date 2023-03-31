import React, { useEffect, useState } from 'react';
import fetchAPI from '../utils/api';
import Loading from '../components/common/Loading';

const withGuest = (WrappedComponent) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      fetchAPI('/auth/check-authenticated')
        .then((response) => {
          if (response.status === 'success') {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }, []);

    if (loading) {
      return <Loading />;
    }

    if (authenticated) {
      window.location.replace('/profile');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withGuest;
