/* import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice.js';
import {jwtDecode} from 'jwt-decode'; // Corrected import statement for jwtDecode
import axios from 'axios';

const fetchRoleDetails = async (id) => {
    try {
        const roleResponse = await axios.get(`http://localhost:5500/role/${id}`);
        if (!roleResponse.data) { // Adjusted condition to check roleResponse.data
            throw new Error('Failed to fetch role details');
        }
        console.log("roleResponse", roleResponse);
        const roleName = roleResponse.data.nom;
        return roleName;
    } catch (error) {
        console.error('Error fetching role details:', error);
        return null;
    }
};

const useAuth = async () => {
    const token = useSelector(selectCurrentToken);

    let isEmployee = false;
    let isAdmin = false;
    let isChief = false;
    let status = "employé";

    if (token) {
        const decoded = jwtDecode(token);
        const { email, id, role, department } = decoded.UserInfo;

        const roleName = await fetchRoleDetails(role);
        isChief = roleName === 'depChief';
        isAdmin = roleName === 'admin';
        isEmployee = roleName === 'employé'; // Corrected assignment from isAdmin to isEmployee

        if (isChief) status = "depChief";
        if (isAdmin) status = "admin"; // Corrected status assignment for isAdmin

        return { email, department, id, status, isChief, isAdmin, isEmployee }; // Corrected return object
    }

    return { email: '', id: '', department:'', status, isChief, isAdmin, isEmployee }; // Corrected return object
};

export default useAuth;
 */

import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode'; // Corrected import statement for jwtDecode
import axios from 'axios';
import { useEffect, useState } from 'react';

const useAuth = () => {
    /*const [roles, setRoles] = useState([]); // Moved useState inside the functional component

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const roleResponse = await axios.get("http://localhost:5500/role");
                if (!roleResponse.data) {
                    throw new Error('Failed to fetch role details');
                }
                console.log("roleResponse", roleResponse);
                setRoles(roleResponse.data.data);
            } catch (error) {
                console.error('Error fetching role details:', error);
            }
        };
        fetchRoles(); // Call fetchRoles inside useEffect
    }, []);

    console.log("les roles",roles);
*/
    const token = useSelector(selectCurrentToken);
    let isEmployee = false;
    let isAdmin = false;
    let isChief = false;
    let status = "employé";
    console.log("token",token);
    if (token) {
        //console.log("roles", roles);
        const decoded = jwtDecode(token);
        const { email, id, role, department } = decoded.UserInfo;

        //const roleName = roles.find(r => r.id === role)?.nom || ""; // Find the role name from roles array
        //console.log("roleeee", roleName);
        roleName="employé"
        isChief = roleName === 'depChief';
        isAdmin = roleName === 'admin';
        isEmployee = roleName === 'employé';

        if (isChief) status = "depChief";
        if (isAdmin) status = "admin";
        
        return { email, department, id, status, isChief, isAdmin, isEmployee };
    }

    return { email: '', id: '', department: '', status, isChief, isAdmin, isEmployee };
};

export default useAuth;
