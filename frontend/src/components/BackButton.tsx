// src/components/BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNav } from '../NavContext';

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const { setShowNav } = useNav();

    const handleBackClick = () => {
        setShowNav(true);
        navigate(-1);
    };

    return (
        <button onClick={handleBackClick} style={{ padding: '10px', fontSize: '16px' }}>
            Back
        </button>
    );
};

export default BackButton;