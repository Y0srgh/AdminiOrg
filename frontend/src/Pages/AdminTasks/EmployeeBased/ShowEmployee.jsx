//incompleted
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/Spinner';
const ShowEmployee = () => {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [mot_de_passe, setMot_de_passe] = useState("");
    const [dateEmbauche, setDateEmbauche] = useState("");
    const [roles, setRoles] = useState("");
    const [fonctions, setFonctions] = useState("");
    const [departements, setDepartements] = useState("");
    const [role, setRole] = useState("");
    const [fonction, setFonction] = useState("");
    const [departement, setDepartement] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);

        // Fetch roles from the backend
        const fetchRole = async () => {
            try {
                const response = await axios.get("http://localhost:5000/role");
                console.log(response.data);
                setRoles(response.data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };
        // Fetch roles from the backend
        const fetchFunctions = async () => {
            try {
                const response = await axios.get("http://localhost:5000/function");
                console.log(response.data);
                setFonctions(response.data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };
        // Fetch departments from the backend
        const fetchDepartments = async () => {
            try {
                const response = await axios.get("http://localhost:5000/department");
                console.log(response.data);
                setDepartements(response.data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        fetchRole();
        fetchFunctions();
        fetchDepartments();



        axios
            .get(`http://localhost:5000/employee/${id}`)
            .then((response) => {
                console.log("show emp reponse", response);
                setNom(response.data.nom);
                setPrenom(response.data.prenom);
                setEmail(response.data.email);
                setMot_de_passe(response.data.mot_de_passe);
                setDateEmbauche(response.data.dateEmbauche);
                setRole(response.data.role);

                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Détails du département</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Id</span>
                        <span>{employee._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Label</span>
                        <span>{employee.nom}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Label</span>
                        <span>{employee.prenom}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Date de la création</span>
                        <span>{new Date(employee.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Date de la mise à jour</span>
                        <span>{new Date(employee.updatedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowEmployee
