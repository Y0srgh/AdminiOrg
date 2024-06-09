import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { SnackbarProvider, useSnackbar } from "notistack";
import { Document, Page } from '@react-pdf/renderer';

const DCShowRequests = () => {
    const [request, setRequest] = useState(null);
    const [departmentName, setDepartmentName] = useState("");
    const [functionName, setFunctionName] = useState("");
    const [remplacant, setRemplacant] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();
    //const [previousRoute, setPreviousRoute] = useState("");
    console.log("id mel show", id);

    const previousRoute = localStorage.userRole;

    useEffect(() => {
        setLoading(true);
        const role = localStorage.getItem("role");
        axios.get(`http://localhost:5500/requests/${id}`)
            .then((response) => {
                console.log("reponse mtaa req id", response.data);
                console.log("Route précédente:", role);
                //setPreviousRoute(role)
                setRequest(response.data);
                axios.get(`http://localhost:5500/department/${response.data.department}`)
                    .then((departmentResponse) => {
                        setDepartmentName(departmentResponse.data.nom);
                    })
                    .catch((error) => {
                        console.error("Error fetching department:", error);
                    });

                response.data.type === "Congé" && (axios.get(`http://localhost:5500/employee/${response.data.remplaçant}`)
                    .then((remplacantResponse) => {
                        console.log("remplaçant",);
                        setRemplacant(remplacantResponse.data.prenom + " " + remplacantResponse.data.nom);
                    })
                    .catch((error) => {
                        console.error("Error fetching department:", error);
                    }));

                response.data.fonction && (
                    axios.get(`http://localhost:5500/function/${response.data.fonction}`)
                        .then((functionResponse) => {
                            setFunctionName(functionResponse.data.nom);
                        })
                        .catch((error) => {
                            console.error("Error fetching function:", error);
                        }));

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching function:", error);
            });

    }, []);

    const handleReject = async (e) => {
        e.preventDefault();
        const data = {
            etat: "Refusée",
            //previous: previousRoute,
        }

        axios
            .put(`http://localhost:5500/requests/${id}`, data)
            .then((response) => {
                console.log("response : ", response);
                setLoading(false);
                enqueueSnackbar("Le demande a été refusée aveec succès avec succès", {
                    variant: "success",
                });
                navigate(-1); // Utilisation de la méthode goBack()
            })
            .catch((error) => {
                navigate(-1); // Utilisation de la méthode goBack()
                setLoading(false);
                enqueueSnackbar(error.response.data.message, { variant: "error" });
                console.log(error);
            });

    }
    const handleValidate = async (e) => {
        e.preventDefault();
        const data = {
            etat: "Approuvée",
            //previous: previousRoute,
        }

        axios
            .put(`http://localhost:5500/requests/${id}`, data)
            .then((response) => {
                console.log("response : ", response);
                setLoading(false);
                enqueueSnackbar("Le demande a été approuvée aveec succès avec succès", {
                    variant: "success",
                });
                navigate(-1); // Utilisation de la méthode goBack()
            })
            .catch((error) => {
                navigate(-1); // Utilisation de la méthode goBack()
                setLoading(false);
                enqueueSnackbar(error.response.data.message, { variant: "error" });
                console.log(error);
            });

    }
    const handleCancel = async (e) => {
        e.preventDefault();
        const data = {
            etat: "Annulée",
            previous: previousRoute,
        }

        axios
            .put(`http://localhost:5500/requests/${id}`, data)
            .then((response) => {
                console.log("response : ", response);
                setLoading(false);
                enqueueSnackbar("Le demande a été annulée aveec succès avec succès", {
                    variant: "success",
                });
                navigate(-1); // Utilisation de la méthode goBack()
            })
            .catch((error) => {
                navigate(-1); // Utilisation de la méthode goBack()
                setLoading(false);
                enqueueSnackbar(error.response.data.message, { variant: "error" });
                console.log(error);
            });

    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Détails de la demande </h1>
            <div>
                <p>Route précédente : {previousRoute}</p>
            </div>
            {loading ? (
                <Spinner />
            ) : request ? (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Etat de la demande</span>
                        <span>{request.status}</span>
                    </div>
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
                        <span className='text-xl mr-4 text-gray-500'>RH response</span>
                        <span>{request.validationRH.toString()}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Chef response</span>
                        <span>{request.validationChef.toString()}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Date de la création de la demande</span>
                        <span>{new Date(request.date_creation).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                    </div>

                    {request.type === "Congé" && (
                        <>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Type de congé</span>
                                <span>{request.typeConge}</span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Date de début</span>
                                <span>
                                    {new Date(request.date_debut).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}

                                </span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Date fin </span>
                                <span>
                                    {new Date(request.date_fin).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}

                                </span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Date de reprise </span>
                                <span>
                                    {new Date(request.date_reprise).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>Remplaçant </span>
                                <span>{remplacant}</span>
                            </div>
                        </>
                    )}

                    {request.type === "Avance" && (
                        <>
                            <div className='my-4'>
                                <span className='text-xl mr-4 text-gray-500'>montant</span>
                                <span>{request.typeConge}</span>
                            </div>
                        </>
                    )}
                    {request.type === "Remboursement" && (
                        <div className="my-4">
                            <span className="text-xl mr-4 text-gray-500">Justification (PDF):</span>
                            <iframe src={`http://localhost:5500/${request.documents}`} width="700" height="400"></iframe>
                        </div>
                    )}

                    {(previousRoute && (((previousRoute === "admin")||(previousRoute === "depChief"))&&(request.status!=="Approuvée"))) && (<div className="flex">
                        <button
                            type="submit"
                            onClick={handleValidate}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2 text-sm"
                        >
                            Valider
                        </button>
                        <button
                            type="submit"
                            onClick={handleReject}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm"
                        >
                            Refuser
                        </button>
                    </div>
                    )}

                    {(previousRoute && (previousRoute === "employé")&&(request.status==="En_attente")) && (<div className="flex">
                        <button
                            type="submit"
                            onClick={handleCancel}
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-1 px-2 rounded mr-2 text-sm"
                        >
                            Annuler
                        </button>
                        
                    </div>
                    )}

                </div>
            ) : (
                <p>Aucun employé trouvé avec cet ID.</p>
            )}
        </div>
    );
};

export default DCShowRequests;
