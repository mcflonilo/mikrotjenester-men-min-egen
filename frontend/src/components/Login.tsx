import React from 'react';
import { useUser } from './UserContext';

const Login: React.FC = () => {
    const { user, setUser } = useUser();

    const handleLogin = () => {
        window.location.href = 'http://localhost:8000/api/login/oauth2/authorization/google';
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/login/logout', {
                method: 'POST',
                credentials: 'include',
            });
            if (response.ok) {
                setUser(null);
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div>
            {!user && <button onClick={handleLogin}>Login with Google</button>}
            {user && (
                <div>
                    <h2>Welcome, {user.fullName}</h2>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Login;