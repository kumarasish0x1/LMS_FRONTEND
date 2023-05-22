import React from 'react';
import fetchAPI from '../utils/api';
import { useState, useEffect } from 'react';
import Loading from '../components/common/Loading';

const CurrentUserContext = React.createContext();

const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserRole, setCurrentUserRole] = useState(null);
    const [check, setCheck] = useState(false);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await fetchAPI('/users/me');
                setCurrentUser(response.user.userId);
                setCurrentUserRole(response.user.userRole);
            } catch (error) {
                console.error('Error fetching current user');
            }
            setCheck(true);
        };

        getCurrentUser();
    }, []);

    if (!check) {
        return <Loading />;
    }

    return (
        <CurrentUserContext.Provider value={{ currentUser, currentUserRole }}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export const useCurrentUserContext = () => React.useContext(CurrentUserContext);

export default CurrentUserProvider;