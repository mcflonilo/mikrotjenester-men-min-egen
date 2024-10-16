import React, { createContext, useState, useEffect } from 'react';
import { getUserInfo } from '../services/userService';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                setUsername(userInfo.name);
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <LoginContext.Provider value={{ username }}>
            {children}
        </LoginContext.Provider>
    );
};