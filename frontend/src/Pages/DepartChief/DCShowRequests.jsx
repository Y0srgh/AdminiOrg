import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';

const DCShowRequests = () => {
    const [request, setRequest] = useState(null);
    const [departmentName, setDepartmentName] = useState("");
    const [functionName, setFunctionName] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5000/requests/${id}`)
            .then((response) => {
                console.log(response);
                setRequest(response.data);
                axios.get(`http://localhost:5000/department/${response.data.departement}`)
                    .then((departmentResponse) => {
                        setDepartmentName(departmentResponse.data.nom);
                    })
                    .catch((error) => {
                        console.error("Error fetching department:", error);
                    });

                axios.get(`http://localhost:5000/function/${response.data.fonction}`)
                    .then((functionResponse) => {
                        setFunctionName(functionResponse.data.nom);
                    })
                    .catch((error) => {
                        console.error("Error fetching function:", error);
                    });



                setLoading(false);
            }

            )

    }, [])

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Détails de la demande </h1>
            {loading ? (
                <Spinner />
            ) : request ? (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>ID de la demande</span>
                        <span>{request._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Type de la demande</span>
                        <span>{request.type}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Nom de l'mployé</span>
                        <span>{request.nom}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Prénom</span>
                        <span>{request.prenom}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Fonction</span>
                        <span>{functionName}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Département</span>
                        <span>{departmentName}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Date de la création de la demande</span>
                        <span>{request.date_creation}</span>
                    </div>
                    {request.type === "Congé" && (<>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Type de congé</span>
                            <span>{request.typeConge}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Date de début</span>
                            <span>{request.date_debut}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Date fin </span>
                            <span>{request.date_fin}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Date de reprise </span>
                            <span>{request.date_reprise}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Remplaçant </span>
                            <span>{request.remplaçant}</span>
                        </div>
                    </>
                    )
                    }
                    {request.type === "Avance" && (<>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>montant</span>
                            <span>{request.typeConge}</span>
                        </div>
                    </>
                    )
                    }
                </div>
            ) : (
                <p>Aucun employé trouvé avec cet ID.</p>
            )}

        </div>
    )
}

export default DCShowRequests
