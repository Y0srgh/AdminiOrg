import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SnackbarProvider, useSnackbar } from "notistack";
import BackButton from "../../../components/BackButton"
import Spinner from "../../../components/Spinner";
import axios from "axios";

const EditDepartment = () => {
    const [department, setDepartment] = useState('');
    const [employees, setEmployees] = useState([]);
    const [chefDepartement, setChefDepartement] = useState(''); // Initialize as an empty string

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:5500/employee");
                console.log("reponse", response);
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();

        axios
            .get(`http://localhost:5500/department/${id}`)
            .then((response) => {
                console.log(response);
                setDepartment(response.data.nom)
                setLoading(false);
            }).catch((error) => {
                setLoading(false);
                navigate("/department");
                enqueueSnackbar("an error has occured", { variant: "error" });
                console.log(error);
            });
    }, []);

    const handleEditDepartment = (e) => {
        e.preventDefault();
        const data = {
            nom: department,
            chefDepartement
        };
        setLoading(true);
        axios
            .put(`http://localhost:5500/department/${id}`, data)
            .then((response) => {
                console.log("response : ", response);
                setLoading(false);
                enqueueSnackbar("Le département a été modifié avec succès", {
                    variant: "success",
                });
                navigate("/department");
            })
            .catch((error) => {
                navigate("/department");
                setLoading(false);
                enqueueSnackbar(error.response.data.message, { variant: "error" });
                console.log(error);
            });
    };

    const validateDepartment = (funct) => {
        // Regular expression for alphabetical function validation
        const functionRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
        return functionRegex.test(funct);
    };

    const validateForm = () => {
        if (!validateDepartment(department) || department.length < 3) {
            // Handle invalid Department
            return false;
        }
        return true;
    }

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Modification de département</h1>
            {loading ? <Spinner /> : ''}
            <form onSubmit={handleEditDepartment}>
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Label de département</label>
                        <input
                            type='text'
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className='border-2 border-gray-500 px-4 py-2 w-full'
                        />
                    </div>
                    {(employees.length > 0) && (
                        <div className='my-4'>
                            <label className='text-xl mr-4 text-gray-500'>Chef de département</label>
                            <select
                                value={chefDepartement}
                                onChange={(e) => setChefDepartement(e.target.value)}
                                className='border-2 border-gray-500 px-4 py-2 w-full'
                            >
                                <option value="">Sélectionnez un chef de département</option>
                                {employees.map(employee => (
                                    <option key={employee.id} value={employee.id}>{employee.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button type="submit" className='p-2 bg-sky-300 m-8' disabled={!validateForm()}>
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditDepartment;
