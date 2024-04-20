import React, { useState, useEffect } from 'react';
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const LeaveRequest = () => {
  const [formData, setFormData] = useState({
    typeConge: '',
    date_debut: '',
    date_fin: '',
    date_reprise: '',
    remplaçant: '', // Corrected key name
  });

  const [employees, setEmployees] = useState([]);
  const { id, department } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Load employees from the API when the component mounts
    axios.get('http://localhost:5000/employee')
      .then(response => {
        setEmployees(response.data.data);
      })
      .catch(error => {
        console.error('Error loading employees:', error);
      });
  }, []);

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
      await axios.post("http://localhost:5000/leave", {...formData,employee:id,department,type:"Congé"});
      enqueueSnackbar("Votre demande a été enregistrée", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      console.error(error);
    }
  };

  // Function to get the date two days from today
  const getMinDate = () => {
    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);
    return twoDaysLater.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center">
      <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Leave Request Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">
              Type of Leave:
            </label>
            <div>
              <label className="inline-flex items-center mr-4">
                <input 
                  type="radio"
                  name="typeConge"
                  value="payé"
                  checked={formData.typeConge === "payé"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Congé payé
              </label>
              <label className="inline-flex items-center">
                <input 
                  type="radio"
                  name="typeConge"
                  value="sans_solde"
                  checked={formData.typeConge === "sans_solde"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Congé sans solde
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Leave Dates:
            </label>
            <div className="flex">
              <div style={{ marginRight: '10px' }}>
                <input 
                  type="date"
                  name="date_debut"
                  value={formData.date_debut}
                  onChange={handleChange}
                  min={getMinDate()} // Set min date
                  className="p-2 border rounded mr-4"
                />
              </div>
              <input 
                type="date"
                name="date_fin"
                value={formData.date_fin}
                onChange={handleChange}
                min={getMinDate()} // Set min date
                className="p-2 border rounded"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Return Date:
            </label>
            <input 
              type="date"
              name="date_reprise"
              value={formData.date_reprise}
              onChange={handleChange}
              min={getMinDate()} // Set min date
              className="p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              Substitute:
            </label>
            <select 
              name="remplaçant"
              value={formData.remplaçant}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option value="">Select an employee</option>
              {employees.map(employee => (
                <option key={employee._id} value={employee._id}>
                  {employee.nom} {employee.prenom}
                </option>
              ))}
            </select>
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

export default LeaveRequest;
