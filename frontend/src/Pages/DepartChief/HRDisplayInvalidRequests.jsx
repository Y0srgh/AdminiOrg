import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import DCModalCard from './DCModelCard';

const HRDisplayInvalidRequests = () => {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState(""); 
    const [filterStatus, setFilterStatus] = useState(""); // New state for filtering by status

    const [filterDate, setFilterDate] = useState(false); 

    useEffect(() => {
        setLoading(true);
        //localStorage.setItem("userRole","admin")
        axios
            .get(`http://localhost:5500/requests`)
            .then((response) => {

                const filtered = response.data.data.filter(request => ((request.type === "Congé")&&((request.validationChef)&&(request.status!=="Refusée")))||((request.type === "Attestation")&&((request.validationChef)&&(request.status!=="Refusée")))||((request.type === "Avance")&&((request.validationChef)&&(request.status!=="Refusée")))||((request.type === "Remboursement")&&(!request.validationRH))||((request.type === "Fiche_Paie")&&(!request.validationRH)));
                //const filtered = response.data.data.filter(request => (request.type === "Remboursement"));
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
            });
    }, [filterType, filterStatus, filterDate]); 

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Liste des demandes</h1>
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
  )
}

export default HRDisplayInvalidRequests
