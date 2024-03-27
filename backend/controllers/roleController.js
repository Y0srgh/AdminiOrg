import { Role } from './../models/Role.js';

export const addRole = async (req, res) => {
    try {
        const { nom } = req.body;
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
