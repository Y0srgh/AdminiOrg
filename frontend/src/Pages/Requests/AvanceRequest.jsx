import React, { useState, useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const AvanceRequest = () => {
    /**
     *  nom prénom

        département

        fonction

        date (sera automatique date du jour)

        montant qui doit être inférieur au salaire
     */
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        montant: 0,
    });
    //const { id, department, fonction } = useParams();
    const token = localStorage.accessToken
    console.log("hellooo",localStorage.accessToken);
    try {
        if(token){
        const decodedToken = jwtDecode(token)
        var id = decodedToken?.UserInfo?.id || "" ;
        var department = decodedToken?.UserInfo?.department || "" ;
        var fonction = decodedToken?.UserInfo?.fonction || "" ;
        console.log("mel form mtaa conge",  decodedToken);
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        //localStorage.clear();
        console.log("l erreure menna");
    }

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = e => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            nom: formData.nom,
            prenom: formData.prenom,
            montant: formData.montant,
            employee: id,
            department: department,
            fonction: fonction,
            type: "Avance",
        };

        console.log(formData, "employee",id, "depart",department,"fonction", fonction);

        try {
            await axios.post("http://localhost:5500/avance", requestData);
            enqueueSnackbar("Votre demande a été enregistrée", {
                variant: "success",
            });
            window.location.href = "/employee/demandes";
        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
            console.error(error);
            //window.location = "/employee/demandes";
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
                            Montant :
                        </label>
                        <input
                            type="number"
                            name="montant"
                            value={formData.montant}
                            onChange={handleChange}
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

export default AvanceRequest
