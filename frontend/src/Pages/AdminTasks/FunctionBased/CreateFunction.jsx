import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import BackButton from "../../../components/BackButton"
import Spinner from "../../../components/Spinner";
import axios from "axios";

const CreateFunction = () => {
    const [functionName, setFunctionName] = useState("");
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nom: functionName,
        }
        setLoading(true);
        await axios
            .post("http://localhost:5500/function", data)
            .then(() => {
                setLoading(false);

                enqueueSnackbar("Une nouvelle fonction a ete ajoutée avec succès", {
                    variant: "success",
                });
                navigate("/function");
                setFunctionName("");
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar(error.response.data.message, { variant: "error" });
                console.log(error);
                navigate("/function");
            });
    }

    const validateFunctionName = (role) => {
        // Regular expression for alphabetical role validation
        const roleRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
        return roleRegex.test(role);
    };

    const validateForm = () => {
        if (!validateFunctionName(functionName) || functionName.length < 3) {
            // Handle invalid functionName
            return false;
        }
        return true;
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Ajoutez une nouvelle fonction</h1>
            {loading ? <Spinner /> : ''}
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Label de la fonction</label>
                        <input
                            type='text'
                            value={functionName}
                            onChange={(e) => setFunctionName(e.target.value)}
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

export default CreateFunction
