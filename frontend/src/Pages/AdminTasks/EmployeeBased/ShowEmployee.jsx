import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/Spinner';

const ShowEmployee = () => {
    const [employee, setEmployee] = useState(null);
    const [departmentName, setDepartmentName] = useState("");
    const [functionName, setFunctionName] = useState("");
    const [roleName, setRoleName] = useState("");
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);

        // Fetch employee details from the backend
        axios.get(`http://localhost:5000/employee/${id}`)
            .then((response) => {
                console.log("show emp response", response);
                setEmployee(response.data);
                // Fetch department details
                axios.get(`http://localhost:5000/department/${response.data.departement}`)
                    .then((departmentResponse) => {
                        setDepartmentName(departmentResponse.data.nom);
                    })
                    .catch((error) => {
                        console.error("Error fetching department:", error);
                    });
                // Fetch function details
                c
                // Fetch role details
                axios.get(`http://localhost:5000/role/${response.data.role}`)
                    .then((roleResponse) => {
                        setRoleName(roleResponse.data.nom);
                    })
                    .catch((error) => {
                        console.error("Error fetching role:", error);
                    });
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, [id]);

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Détails de l'employé</h1>
            {loading ? (
                <Spinner />
            ) : employee ? (
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>ID</span>
                        <span>{employee._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Nom</span>
                        <span>{employee.nom}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Prénom</span>
                        <span>{employee.prenom}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Email</span>
                        <span>{employee.email}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Date d'embauche</span>
                        <span>{employee.dateEmbauche}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Role</span>
                        <span>{roleName}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Fonction</span>
                        <span>{functionName}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Département</span>
                        <span>{departmentName}</span>
                    </div>
                </div>
            ) : (
                <p>Aucun employé trouvé avec cet ID.</p>
            )}
        </div>
    )
}

export default ShowEmployee;
