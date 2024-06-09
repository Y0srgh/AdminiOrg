import { Department } from "../models/Department.js";
import { Employee } from './../models/Employee.js';

export const addDepartment = async (req, res) => {
  try {
    const { nom, chefDepartement } = req.body;

    // Validation des données
    if (!nom) {
      return res.status(400).json({ message: "Veuillez fournir le nom du département." });
    }

    let departmentData = { nom };

    const dep = await Department.findOne({nom});
    if (dep)
    return res.status(404).json({ message: "Department désigné existe deja" });

    // Vérification si chefDepartement est fourni et s'il est non vide
    if (chefDepartement && Object.keys(chefDepartement).length !== 0) {
      const existingEmployee = await Employee.findById(chefDepartement);
      if (!existingEmployee) {
        return res.status(404).json({ message: "Employé désigné comme chef de département non trouvé." });
      }
      // Mettre à jour la fonction de l'employé désigné comme Chef de département si nécessaire
      existingEmployee.fonction = "Chef de département";
      await existingEmployee.save();

      // Inclure chefDepartement seulement s'il est valide
      departmentData.chefDepartement = chefDepartement;
    }

    // Création du département
    const department = await Department.create(departmentData);
    return res.status(201).json(department);
  } catch (error) {
    console.error("Erreur lors de l'ajout du département :", error);
    return res.status(500).json({ message: "Une erreur est survenue lors de l'ajout du département." });
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

    if (!nom) {
      return res.status(400).json({ message: "Veuillez fournir le nom du département." });
    }

    // Vérification si le département existe
    const department = await Department.findById(id);
    if (!department) {
      return res.status(404).json({ message: "Département non trouvé." });
    }

    // Mettre à jour les informations du département
    department.nom = nom;

    // Si chefDepartement est fourni, vérifier s'il existe
    if (chefDepartement) {
      const existingEmployee = await Employee.findById(chefDepartement);
      if (!existingEmployee) {
        return res.status(404).json({
          message: "Employé désigné comme chef de département non trouvé.",
        });
      }
      // Mettre à jour la fonction de l'employé désigné comme chef de département si nécessaire
      if (existingEmployee.fonction !== "chef de département") {
        existingEmployee.fonction = "chef de département";
        await existingEmployee.save();
      }
      // Mettre à jour le chef du département
      department.chefDepartement = chefDepartement;
    } else {
      // Si chefDepartement n'est pas fourni, supprimer le chef actuel du département
      department.chefDepartement = undefined;
    }

    await department.save();

    return res.status(200).json({ message: "Département mis à jour avec succès." });
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
