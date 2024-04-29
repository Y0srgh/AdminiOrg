// src/utils/authUtils.js

// Check if access token is expired
export const isAccessTokenExpired = () => {
    const accessToken = localStorage.getItem('accessToken');
    const decoded = jwt.decode(accessToken);
    return Date.now() >= decoded.exp * 1000;
};

// Refresh access token using refresh token
// Refresh access token using refresh token
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
        const response = await fetch('/auth/refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
        });

        if (response.status === 201) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
        } else {
            // Remove the access token from local storage
            localStorage.removeItem('accessToken');
        }
    } catch (error) {
        console.error('Token refresh failed', error);
    }
};

