// src/NavContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface NavContextProps {
    showNav: boolean;
    setShowNav: (show: boolean) => void;
}

const NavContext = createContext<NavContextProps | undefined>(undefined);

interface NavProviderProps {
    children: ReactNode;
}

export const NavProvider: React.FC<NavProviderProps> = ({ children }) => {
    const [showNav, setShowNav] = useState(true);
    return (
        <NavContext.Provider value={{ showNav, setShowNav }}>
            {children}
        </NavContext.Provider>
    );
};

export const useNav = () => {
    const context = useContext(NavContext);
    if (!context) {
        throw new Error('useNav must be used within a NavProvider');
    }
    return context;
};