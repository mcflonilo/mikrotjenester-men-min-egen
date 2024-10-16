// File: frontend/src/components/UserInfo.tsx

import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../services/userService';

const UserInfo: React.FC = () => {
    const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await getUserInfo();
                setUserInfo(data);

            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>Welcome, {userInfo.name}</p>
        </div>
    );
};

export default UserInfo;