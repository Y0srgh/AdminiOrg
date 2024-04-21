import React, { useState, useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from 'axios';
import { useParams } from 'react-router-dom';


const RefundRequest = () => {

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        file: null,
    });
    const { id, department, fonction } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = e => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = e => {
        setFormData({
            ...formData,
            file: e.target.files[0], // Update file state with the selected file
        });
    };

    /*const handleSubmit = async (e) => {
        e.preventDefault();
        

        console.log(formData, "employee",id, "depart",department,"fonction", fonction, "file",formData.file);

        try {
            await axios.post("http://localhost:5000/refund", { nom:formData.nom,prenom:formData.prenom,file:formData.file.name, employee: id, department, type: "Remboursement", fonction});
            enqueueSnackbar("Votre demande a été enregistrée", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
            console.error(error);
        }
    };*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        formDataToSend.append("nom", formData.nom);
        formDataToSend.append("prenom", formData.prenom);
        formDataToSend.append("employee", id);
        formDataToSend.append("department", department);
        formDataToSend.append("fonction", fonction);
        formDataToSend.append("type", "Remboursement");
        formDataToSend.append("file", formData.file); // Append file to FormData
        
        console.log(formData, "employee",id, "depart",department,"fonction", fonction, "file",formData.file);
    
        try {
            await axios.post("http://localhost:5000/refund", formDataToSend);
            enqueueSnackbar("Votre demande a été enregistrée", {
                variant: "success",
            });
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
            console.error(error);
        }
    };
    

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center">
            <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Avance Request Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">
                            Prénom :
                        </label>

                        <div style={{ marginRight: '10px' }}>
                            <input
                                type="text"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                className="p-2 border rounded mr-4"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">
                            Nom :
                        </label>
                        <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            className="p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2">
                            Upload File:
                        </label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="p-2 border rounded"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RefundRequest
