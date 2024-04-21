import React, { useState } from 'react'

const UpdatePassword = () => {
    const [formData, setFormData] = useState({
        ancien_mot_de_passe: '',
        mot_de_passe: '',
    })
    const { id } = useParams();
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

        try {
            await axios.post(`http://localhost:5000/employee/update-password/${id}`, { ...formData, employee: id });
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
