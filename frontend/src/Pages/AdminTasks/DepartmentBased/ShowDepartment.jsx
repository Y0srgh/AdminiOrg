import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../../components/BackButton';
import Spinner from '../../../components/Spinner';
const ShowDepartment = () => {
    const [department, setDepartment] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5500/department/${id}`)
            .then((response) => {
                setDepartment(response.data);
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
                        <span>{department._id}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Label</span>
                        <span>{department.nom}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Date de la création</span>
                        <span>{new Date(department.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-gray-500'>Date de la mise à jour</span>
                        <span>{new Date(department.updatedAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ShowDepartment
