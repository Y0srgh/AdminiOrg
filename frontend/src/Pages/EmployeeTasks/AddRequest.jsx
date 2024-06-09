import React from 'react'
import { Link } from 'react-router-dom'

const AddRequest = () => {
    return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100"> 
        <div className="bg-white p-8 rounded-lg shadow-lg"> 
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Choose a Request</h2> 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
                <RequestLink to="/leave" title="Leave Request" /> 
                <RequestLink to="/avance" title="Avance Request" /> 
                <RequestLink to="/refund" title="Refund Request" /> 
                <RequestLink to="/fiche_paie" title="Fiche Paie Request" /> 
                <RequestLink to="/attestationDeTravail" title="Attestation de Travail Request" /> 
            </div> 
        </div> 
    </div>);
}
// Reusable component for request links 
const RequestLink = ({ to, title }) => { 
    return ( <Link to={to} className="bg-gray-600 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg block text-center transition duration-300"> {title} </Link> ); };
export default AddRequest

