import { Role } from './../models/Role.js';

export const addRole = async (req, res) => {
    try {
        const { nom } = req.body;
        console.log(req);
        // Validation des données
        if (!nom) {
            return res.status(400).json({ message: 'Veuillez fournir un nom de rôle.' });
        }
        const existingRole = await Role.findOne({ nom });
        if (existingRole) {
            return res.status(400).json({ message: 'Ce rôle existe déjà.' });
        }
        // Création du rôle
        const newRole = await Role.create({ nom });
        return res.status(201).json(newRole);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du rôle :', error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout du rôle.' });
    }
}

export const findAllRoles = async (req, res) => {
    try {
        const roles = await Role.find({});
        return res.status(200).json(roles);
    } catch (error) {
        console.error('Erreur lors de la récupération des rôles :', error);
        return res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des rôles.' });
    }
}


export const findOneRole = async (req, res) => {
    try {
      const { id } = req.params;
      const role = await Role.findById(id);
      return res.status(200).json(role);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  };
  
  // Modifier un Role
  export const updateRole = async (req, res) => {
    try {
      const { id } = req.params;
      //const { nom } = req.body;
  
      const role = await Role.findByIdAndUpdate(id, req.body);
      if (!role) {
        return res.status(404).json({ message: "Role non trouvé." });
      }
      return res
        .status(200)
        .json({ message: "Role mis à jour avec succès." });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du Role :", error);
      return res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteRole = async (req, res) => {
    try {
      const { id } = req.params;
  
      const role = await Role.findByIdAndDelete(id);
      if (!role) {
        return res.status(404).json({ message: "Role non trouvé." });
      }
      return res
        .status(200)
        .json({ message: "Role supprimé avec succès." });
    } catch (error) {
      console.error("Erreur lors de la suppression du Role :", error);
      return res
        .status(500)
        .json({
          message:
            "Une erreur est survenue lors de la suppression du Role.",
        });
    }
  };
  
