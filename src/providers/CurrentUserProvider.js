import React from 'react';
import fetchAPI from '../utils/api';
import { useState, useEffect } from 'react';

const CurrentUserContext = React.createContext();

const CurrentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                const response = await fetchAPI('/users/me');
                setCurrentUser(response.userId);
            } catch (error) {
                console.error('Error fetching current user');
            }
        };

        getCurrentUser();
    }, []);

    return (
        <CurrentUserContext.Provider value={{ currentUser }}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export const useCurrentUserContext = () => React.useContext(CurrentUserContext);

export default CurrentUserProvider;