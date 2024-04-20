import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SnackbarProvider, useSnackbar } from "notistack";

const AddEmployee = () => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMot_de_passe] = useState("");
  const [dateEmbauche, setDateEmbauche] = useState("");
  const [roles, setRoles] = useState([]);
  const [fonctions, setFonctions] = useState([]);
  const [departements, setDepartements] = useState([]);
  const [role, setSelectedRole] = useState("");
  const [fonction, setSelectedFonction] = useState("");
  const [departement, setSelectedDepartement] = useState("");
  const [solde_conge, setSolde_conge] = useState(0);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roleResponse, fonctionResponse, departementResponse] = await Promise.all([
          axios.get("http://localhost:5000/role"),
          axios.get("http://localhost:5000/function"),
          axios.get("http://localhost:5000/department")
        ]);
        setRoles(roleResponse.data);
        setFonctions(fonctionResponse.data);
        setDepartements(departementResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      prenom,
      nom,
      email,
      mot_de_passe,
      role,
      fonction,
      dateEmbauche,
      departement,
      solde_conge
    };

    try {
      await axios.post("http://localhost:5000/employee", data);
      enqueueSnackbar("L'employé a été ajouté avec succès", {
        variant: "success",
      });
      navigate("/employee");
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen overflow-x-auto  ">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-2xl font-semibold mb-4">Ajouter un employé</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Prénom</label>
            <input
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Le Prénom de l'employé"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Nom</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Le Nom de l'employé"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Adresse Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="L'adresse email de l'employé"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Solde de congé</label>
            <input
              type="number"
              value={solde_conge}
              onChange={(e) => setSolde_conge(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Le solde de congé de l'employé"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mot de passe</label>
            <input
              type="password"
              value={mot_de_passe}
              onChange={(e) => setMot_de_passe(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="Le mot de passe de l'employé"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Date d'embauche</label>
            <input
              type="date"
              value={dateEmbauche}
              onChange={(e) => setDateEmbauche(e.target.value)}
              required
              max={new Date().toISOString().split('T')[0]}
              className="border border-gray-300 p-2 rounded-lg w-full"
              placeholder="La date d'embauche de l'employé"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Choisir un rôle pour l'employé</label>
            <select
              value={role}
              onChange={(e) => setSelectedRole(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded-lg w-full"
            >
              <option value="">Choisissez un rôle</option>
              {roles.map((role) => (
                <option key={role._id} value={role._id}>{role.nom}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Choisir une fonction pour l'employé</label>
            <select
              value={fonction}
              onChange={(e) => setSelectedFonction(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded-lg w-full"
            >
              <option value="">Choisissez une fonction</option>
              {fonctions.map((fonction) => (
                <option key={fonction._id} value={fonction._id}>{fonction.nom}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Choisir un département pour l'employé</label>
            <select
              value={departement}
              onChange={(e) => setSelectedDepartement(e.target.value)}
              required
              className="border border-gray-300 p-2 rounded-lg w-full"
            >
              <option value="">Choisissez un département</option>
              {departements.map((departement) => (
                <option key={departement._id} value={departement._id}>{departement.nom}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
