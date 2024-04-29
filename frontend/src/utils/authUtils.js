import { jwtDecode } from "jwt-decode";
import axios from 'axios';

// Check if access token is expired
export const isAccessTokenExpired = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        const decoded = jwtDecode(accessToken);
        return Date.now() >= decoded.exp * 1000;
    } else {
        return false;
    }
};

// Refresh access token using refresh token
export const refreshAccessToken = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const response = await axios.get('http://localhost:5000/employee/auth/refresh', {
            withCredentials: true
        });

        // If refresh is successful, update the access token in local storage
        if (response.status === 201) {
            const data = response.data;
            localStorage.setItem('accessToken', data.accessToken);
            // You may also want to update other relevant data from the response
        } else {
            // If refresh failed, handle the error accordingly
            throw new Error('Token refresh failed');
        }
    } catch (error) {
        console.error('Token refresh failed', error);
        // Rethrow the error to be caught by the caller if needed
        throw error;
    }
};
