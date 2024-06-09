import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import BackButton from "../../../components/BackButton"
import Spinner from "../../../components/Spinner";
import axios from "axios";

const CreateDepartment = () => {
    const [departmentName, setDepartmentName] = useState("");
    const [employees, setEmployees] = useState([]);
    const [chefDepartement, setChefDepartement] = useState({});

    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:5500/employee");
                console.log("reponse",response);
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }

        }
        fetchEmployees();
    }, []);

    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            nom: departmentName,
            chefDepartement
        }
        setLoading(true);
        await axios
            .post("http://localhost:5500/department", data)
            .then(() => {
                setLoading(false);

                enqueueSnackbar("Un nouveau departement a été ajouté avec succès", {
                    variant: "success",
                });
                navigate("/department");
                setDepartmentName("");
            })
            .catch((error) => {
                setLoading(false);
                enqueueSnackbar(error.response.data.message, { variant: "error" });
                console.log(error);
                navigate("/department");
            });
    }

    const validateDepartmentName = (department) => {
        // Regular expression for alphabetical department validation
        const departmentRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
        return departmentRegex.test(department);
    };

    const validateForm = () => {
        if (!validateDepartmentName(departmentName) || departmentName.length < 3) {
            // Handle invalid departmentName
            return false;
        }
        return true;
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Ajoutez un nouveau département</h1>
            {loading ? <Spinner /> : ''}
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Label du département</label>
                        <input
                            type='text'
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                    </div>

                    {/* Dropdown list pour choisir le chef de département */
                    (employees.length>0)&&(<div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Chef de département</label>
                        <select
                            value={chefDepartement} // La valeur sélectionnée dans la liste déroulante
                            onChange={(e) => setChefDepartement(e.target.value)} // Met à jour l'état du chef de département lorsqu'une option est sélectionnée
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        >
                            {/* Option par défaut */}
                            <option value="">Sélectionnez un chef de département</option>
                            {/* Boucle à travers les employés pour afficher une option pour chacun */}
                            {employees.map(employee => (
                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>)}


                    <button type="submit" className='p-2 bg-sky-300 m-8' disabled={!validateForm()}>
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateDepartment;