import { Function } from "./../models/Function.js";

export const addFunction = async (req, res) => {
  try {
    const { nom } = req.body;
    // Validation des données
    if (!nom) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir un nom de fonction." });
    }
    const existingFunction = await Function.findOne({ nom });
    if (existingFunction) {
      return res.status(400).json({ message: "Cette fonction existe déjà." });
    }
    // Création de la fonction
    const newFunction = await Function.create({ nom });
    return res.status(201).json(newFunction);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la fonction :", error);
    return res
      .status(500)
      .json({
        message: "Une erreur est survenue lors de l'ajout de la fonction.",
      });
  }
};

export const findAllFunctions = async (req, res) => {
  try {
    const functions = await Function.find({});
    return res.status(200).json(functions);
  } catch (error) {
    console.error("Erreur lors de la récupération des fonctions :", error);
    return res
      .status(500)
      .json({
        message:
          "Une erreur est survenue lors de la récupération des fonctions.",
      });
  }
};


export const findOneFunction = async (req, res) => {
  try {
    const { id } = req.params;
    const func = await Function.findById(id);
    return res.status(200).json(func);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const updateFunction = async (req, res) => {
  try {
    const { id } = req.params;
    //const { nom } = req.body;

    const func = await Function.findByIdAndUpdate(id, req.body);
    if (!func) {
      return res.status(404).json({ message: "Fonction non trouvée." });
    }
    return res
      .status(200)
      .json({ message: "Fonction mise à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la Fonction :", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteFunction = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérification si le Fonction existe
    const func = await Function.findByIdAndDelete(id);
    if (!func) {
      return res.status(404).json({ message: "Fonction non trouvée." });
    }
    return res
      .status(200)
      .json({ message: "Fonction supprimée avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de le Fonction :", error);
    return res
      .status(500)
      .json({
        message:
          "Une erreur est survenue lors de la suppression de le Fonction.",
      });
  }
};
