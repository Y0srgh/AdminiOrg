import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const UpdatePassword = () => {
    const [formData, setFormData] = useState({
        ancien_mot_de_passe: '',
        mot_de_passe: '',
    })

    const handleChange = e => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //const { id } = useParams();
    const token = localStorage.getItem("accessToken")
    const decodedToken = jwtDecode(token);
    const id = decodedToken.UserInfo.id;
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5500/employee/update-password/${id}`, formData);
            enqueueSnackbar("Le mot de passe a été modifié avec succès", {
                variant: "success",
            });
            navigate("/employee/demandes");
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
            console.error("log error", error);
            console.log("log error resp", error.response); // Check the entire error response object
            console.log(error.response.data.message); // Check the data within the error response
            //navigate("/employee/demandes");
        }
    };


    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center">
            <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">
                            Ancien mot de passe :
                        </label>

                        <div style={{ marginRight: '10px' }}>
                            <input
                                type="password"
                                name="ancien_mot_de_passe"
                                value={formData.ancien_mot_de_passe}
                                onChange={handleChange}
                                className="p-2 border rounded mr-4"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">
                            Nouveau mot de passe :
                        </label>
                        <input
                            type="password"
                            name="mot_de_passe"
                            value={formData.mot_de_passe}
                            onChange={handleChange}
                            className="p-2 border rounded"
                        />
                    </div>


                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Confirmer
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword
