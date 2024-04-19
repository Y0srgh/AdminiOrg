import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import BackButton from "../../../components/BackButton"
import Spinner from "../../../components/Spinner";
import axios from "axios";

const EditFunction = () => {
    const [functionName, setFunctionName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/function/${id}`)
            .then((response) => {
                console.log(response);
                setFunctionName(response.data.nom)
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                navigate("/function");
                enqueueSnackbar("an error has occured", { variant: "error" });

                //alert('An error happened. Please Chack console');
                console.log(error);
            });
    }, []);

    const handleEditFunction = () => {
        const data = {
            nom: functionName,
        };
        setLoading(true);
        axios
            .put(`http://localhost:5000/function/${id}`, data)
            .then((response) => {
                console.log("response : ", response);
                setLoading(false);
                enqueueSnackbar("La fonction a été modifiée avec succès", {
                    variant: "success",
                });
            })
            .catch((error) => {
                navigate("/");
                setLoading(false);
                // alert('An error happened. Please Chack console');
                enqueueSnackbar(error.response.data.message, { variant: "error" });
                console.log(error);
            });
    };

    const validateFunctionName = (funct) => {
        // Regular expression for alphabetical function validation
        const functionRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
        return functionRegex.test(funct);
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
            <h1 className='text-3xl my-4'>Modification de la fonction</h1>
            {loading ? <Spinner /> : ''}
            <form onSubmit={handleEditFunction}>
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

export default EditFunction

