import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import DCModalCard from './DCModelCard';
import { jwtDecode } from "jwt-decode";

const EmployeeRequests = () => {
    /*try {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
        const decodedData = jwtDecode(storedToken, { header: true });
        const expirationDate = decodedData.exp;
        const current_time = Date.now() / 1000;
        if (expirationDate < current_time) {
            localStorage.removeItem("token");
        }
    }
} catch (e) {
    console.error("Error decoding token:", e);
    localStorage.clear();
}
*/

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState(""); 
    const [filterStatus, setFilterStatus] = useState(""); // New state for filtering by status
    const [filterDate, setFilterDate] = useState(false); 

    try {
        const token = localStorage.getItem("accessToken")
        if(token){
        const decodedToken = jwtDecode(token)
        var id = decodedToken?.UserInfo?.id || "" ;
        }
    } catch (error) {
        //console.error("Error decoding token:", error);
        //localStorage.clear();
        console.log("l erreure menna");
    }

    useEffect(() => {
        setLoading(true);
        localStorage.setItem("role", "employee");
        axios
            .get(`http://localhost:5000/requests/employee/${id}`)
            .then((response) => {
                const filtered = response.data.data;
                setRequests(filtered);

                let filteredRequests = filtered;
                if (filterType) {
                    filteredRequests = filteredRequests.filter(request => request.type === filterType);
                }
                if (filterStatus) {
                    filteredRequests = filteredRequests.filter(request => request.status === filterStatus); // Filter by status
                }
                if (filterDate) {
                    filteredRequests = filteredRequests.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation));
                }
                setRequests(filteredRequests);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Navigate("/login");
            });
    }, [filterType, filterStatus, filterDate]); 

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Liste des demandes non validées</h1>
                <div className="flex space-x-4 items-center">
                    <select
                        className="border border-gray-300 rounded-md py-1 px-2"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="">Tous les types</option>
                        <option value="Congé">Congé</option>
                        <option value="Attestation">Attestation</option>
                        <option value="Avance">Avance</option>
                        <option value="Remboursement">Remboursement</option>
                        <option value="Fiche_Paie">Fiche de paie</option>
                    </select>
                    <select
                        className="border border-gray-300 rounded-md py-1 px-2"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">Tous les états</option>
                        <option value="En_attente">En attente</option>
                        <option value="Annulée">Annulée</option>
                        <option value="Approuvée">Approuvée</option>
                        <option value="Refusée">Refusée</option>
                    </select>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="border border-gray-300 rounded-sm h-4 w-4"
                            checked={filterDate}
                            onChange={(e) => setFilterDate(e.target.checked)}
                        />
                        <span>Trier par date (du plus récent au plus ancien)</span>
                    </label>
                </div>
            </div>
            <DCModalCard model={requests} route={"requests"} />
        </div>
    );
}

export default EmployeeRequests;
