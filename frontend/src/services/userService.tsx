// File: frontend/src/services/userService.ts

export const getUserInfo = async () => {
    const response = await fetch('http://localhost:8080/user', {
        method: 'GET',
        credentials: 'include', // Include cookies for session management
    });
    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Failed to fetch user info');
    }
};