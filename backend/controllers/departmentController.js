import { Department } from "../models/Department.js";

export const addDepartment = async (req, res) => {
  try {
    const { nom } = req.body;
    // Validation des données
    if (!nom) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir un nom de département." });
    }
    const existingDepartment = await Department.findOne({ nom });
    if (existingDepartment) {
      return res.status(400).json({ message: "Ce département existe déjà." });
    }
    // Création du département
    const newDepartment = await Department.create({ nom });
    return res.status(201).json(newDepartment);
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
    //const { nom } = req.body;

    const department = await Department.findByIdAndUpdate(id, req.body);
    if (!department) {
      return res.status(404).json({ message: "Département non trouvé." });
    }
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
    return res
      .status(500)
      .json({
        message:
          "Une erreur est survenue lors de la suppression du département.",
      });
  }
};
