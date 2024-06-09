import React, { useState, useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const FichePaieRequest = () => {
    //const { id, department } = useParams();
    const token = localStorage.accessToken
    console.log("hellooo",localStorage.accessToken);
    try {
        if(token){
        const decodedToken = jwtDecode(token)
        var id = decodedToken?.UserInfo?.id || "" ;
        var department = decodedToken?.UserInfo?.department || "" ;
        console.log("mel form mtaa conge",  decodedToken);
        }
    } catch (error) {
        console.error("Error decoding token:", error);
        //localStorage.clear();
        console.log("l erreure menna");
    }

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            employee: id,
            department: department,           
            type: "Fiche_Paie",
        };

        console.log("employee",id, "depart",department);

        try {
            await axios.post("http://localhost:5500/fiche-paie", requestData);
            enqueueSnackbar("Votre demande a été enregistrée", {
                variant: "success",
            });
            //navigate("/employee/demandes");
            window.location.href = "/employee/demandes";

        } catch (error) {
            enqueueSnackbar(error.response.data.message, { variant: "error" });
            console.error(error);
            //navigate("/employee/demandes");

        }
    };


    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center">
            <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Demander une fiche de paie</h2>
                <form onSubmit={handleSubmit}>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Postler
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FichePaieRequest
