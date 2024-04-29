// src/utils/authUtils.js
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

// Check if access token is expired
export const isAccessTokenExpired = () => {
    const accessToken = localStorage.getItem('accessToken');
    //const decoded = jwt.decode(accessToken);
    /* const decoded = jwtDecode(accessToken);
     return Date.now() >= decoded.exp * 1000;*/
    if (accessToken) {
        const decoded = jwtDecode(accessToken);
        return Date.now() >= decoded.exp * 1000;
    } else {
        return false
    }
};

// Refresh access token using refresh token
// Refresh access token using refresh token
export const refreshAccessToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        //const response = await fetch('http://localhost:5000/employee/auth/refresh', {
        //  method: 'GET',
        /*headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken }),*/
        //});

        //const response = await axios.get('http://localhost:5000/employee/auth/refresh')
        axios.get('http://localhost:5000/employee/auth/refresh', {
            withCredentials: true
        }).then((resp) => {
                console.log(resp);
            }).catch((error) => {

                console.log("hani hneeee ----", error);
                console.log("hani hneeee 2----", error.response.data.message);
            })
        //console.log("response mel auth", response);

        /*if (response.status === 201) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('userRole', role.data.nom)

        } else {
            // Remove the access token from local storage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userRole');
        }*/
    } catch (error) {
        console.error('Token refresh failed', error);
    }
};

