import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import BackButton from "../../BackButton";
import Spinner from "../../Spinner";
import axios from "axios";
import './Role.css'

const EditRole = () => {
    const [roleName, setRoleName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/role/${id}`)
            .then((response) => {
                console.log(response);
                setRoleName(response.data.nom)
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                alert('An error happened. Please Chack console');
                console.log(error);
            });
    }, []);

    const handleEditRole = () => {
        const data = {
            nom: roleName,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5000/role/${id}`, data)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('Le nom de ce rôle a été modifié avec succès', { variant: 'success' });
                //navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                // alert('An error happened. Please Chack console');
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
    };

    const validateRoleName = (role) => {
        // Regular expression for alphabetical role validation
        const roleRegex = /^[a-zA-Z]+$/;
        return roleRegex.test(role);
    };

    const validateForm = () => {
        if (!validateRoleName(roleName) || roleName.length < 3) {
            // Handle invalid roleName
            return false;
        }
        return true;
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Modification du rôle</h1>
            {loading ? <Spinner /> : ''}
            <form onSubmit={handleEditRole}>
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Label du rôle</label>
                        <input
                            type='text'
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                    </div>


                    <button type="submit" className='p-2 bg-sky-300 m-8' disabled={!validateForm()}>
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditRole

