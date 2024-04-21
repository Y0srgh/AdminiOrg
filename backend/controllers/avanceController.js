import { Employee } from "../models/Employee.js";
import { Request } from "../models/Request.js";

export const avanceRequest = async (req, res) => {
  try {
    const { employee, department, fonction, nom, prenom, montant } = req.body;

    // Vérifier que tous les champs sont fournis
    if (!employee || !department || !fonction || !nom || !prenom || !montant) {
      return res.status(400).json({ message: "Veuillez fournir tous les champs." });
    }

    // Vérifier l'existence de l'employé
    const existingEmployee = await Employee.findOne({
      _id: employee,
      department: department,
      fonction: fonction,
      nom: nom,
      prenom: prenom
    });

    if (!existingEmployee) {
      return res.status(400).json({ message: "Employé non trouvé." });
    }

    // Vérifier que le montant est inférieur au salaire de l'employé
    if (montant > existingEmployee.salaire) {
      return res.status(400).json({ message: "Le montant demandé est supérieur au salaire de l'employé." });
    }

    // Créer la demande de remboursement
    const newRequest = await Request.create({
      type: "Remboursement",
      employee: employee,
      department: department,
      fonction: fonction,
      nom: nom,
      prenom: prenom,
      montant: montant
    });

    return res.status(200).json({ message: "Votre demande a été enregistrée." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
