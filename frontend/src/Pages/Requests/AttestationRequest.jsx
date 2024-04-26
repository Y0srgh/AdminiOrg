import React, { useState, useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AttestationRequest = () => {
    const { id, department } = useParams();

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            employee: id,
            department: department,           
            type: "Attestation",
        };

        console.log("employee",id, "depart",department);

        try {
            await axios.post("http://localhost:5000/attestation", requestData);
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
                <h2 className="text-2xl font-semibold mb-4">Demander une Attestation de travail</h2>
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

export default AttestationRequest
