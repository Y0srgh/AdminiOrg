import { Department } from "../models/Department.js";
import { Employee } from './../models/Employee.js';

export const addDepartment = async (req, res) => {
  try {
    const { nom, chefDepartement } = req.body;
    // Validation des données
    if (!nom || !chefDepartement) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs." });
    }

    //verification de l'existence du depart
    const existingDepartment = await Department.findOne({ nom });
    if (existingDepartment) {
      return res.status(400).json({ message: "Ce département existe déjà." });
    }

    // Vérifier si l'employé désigné comme chef de département existe
    const existingEmployee = await Employee.findById(chefDepartement);
    if (!existingEmployee) {
      return res.status(404).json({
        message: "Employé désigné comme chef de département non trouvé.",
      });
    }

    // Mettre à jour la fonction de l'employé désigné comme Chef de département si nécessaire
    if (existingEmployee.fonction !== "Chef de département") {
      existingEmployee.fonction = "Chef de département";
      await existingEmployee.save();
    }

    // Création du département
    const department = await Department.create({ nom, chefDepartement });
    return res.status(201).json(department);
  } catch (error) {
    console.error("Erreur lors de l'ajout du département :", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de l'ajout du département.",
    });
  }
};

export const findAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    return res.status(200).json(departments);
  } catch (error) {
    console.error("Erreur lors de la récupération des départements :", error);
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la récupération des départements.",
    });
  }
};

export const findOneDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById(id);
    return res.status(200).json(department);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Modifier un département
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, chefDepartement } = req.body;

    if (!nom || !chefDepartement) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs." });
    }

    // Vérification si le département existe
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: "Département non trouvé." });
    }

    // Vérifier si l'employé désigné comme chef de département existe
    const existingEmployee = await Employee.findById(chefDepartement);
    if (!existingEmployee) {
      return res.status(404).json({
        message: "Employé désigné comme chef de département non trouvé.",
      });
    }

    // Vérifier s'il existe un autre employé dans le même département avec la fonction de "chef de département"
    const existingChief = await Employee.findOne({
      departement: existingEmployee.departement,
      fonction: "Chef de département",
    });
    if (existingChief) {
      // Mettre à jour la fonction de l'ancien chef de département
      existingChief.fonction = existingEmployee.fonction; // Remplacez "autre fonction" par la fonction que vous souhaitez attribuer à l'ancien chef
      await existingChief.save();
    }

    // Mettre à jour la fonction de l'employé désigné comme chef de département si nécessaire
    if (existingEmployee.fonction !== "chef de département") {
      existingEmployee.fonction = "chef de département";
      await existingEmployee.save();
    }

    // Mettre à jour les informations du département
    department.nom = nom;
    department.chefDepartement = chefDepartement;
    await department.save();

    return res
      .status(200)
      .json({ message: "Département mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du département :", error);
    return res.status(500).json({ message: error.message });
  }
};

// Supprimer un département
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérification si le département existe
    const department = await Department.findByIdAndDelete(id);
    if (!department) {
      return res.status(404).json({ message: "Département non trouvé." });
    }
    return res
      .status(200)
      .json({ message: "Département supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression du département :", error);
    return res.status(500).json({
      message: "Une erreur est survenue lors de la suppression du département.",
    });
  }
};
