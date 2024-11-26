import React, { useState, useEffect } from 'react';

const Login: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    const handleLogin = () => {
        window.location.href = 'http://localhost:8000/api/login/oauth2/authorization/google ';
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/login', {
                    credentials: 'include',

                });
                if (response.ok) {
                    const userData = await response.json();
                    console.log('User data:', userData);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            {!user && <button onClick={handleLogin}>Login with Google</button>}
            {user && (
                <div>
                    <h2>Welcome, {user.fullName}</h2>
                    <p>Email: {user.email}</p>
                </div>
            )}
        </div>
    );
};

export default Login;