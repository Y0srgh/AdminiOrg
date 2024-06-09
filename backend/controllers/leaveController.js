import { Department } from "../models/Department.js";
import { Employee } from "./../models/Employee.js";
import { Request } from "./../models/Request.js";
import moment from "moment";
import "moment-timezone";
async function getSoldeConge(employeeId) {
  const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new Error("Employee not found solde");
  }
  const dateEmbauche = employee.dateEmbauche;
  const moisTravailles = moment().diff(dateEmbauche, "months");
  console.log("total :", moisTravailles * 2.5 - employee.solde_conge);
  console.log("mois travailles :", moisTravailles);
  console.log("solde ", employee.solde_conge);
  return moisTravailles * 2.5 - employee.solde_conge;
}

export const leaveRequest = async (req, res) => {
  try {
    const { type, employee, department, date_creation, date_debut, date_fin, typeConge, remplaçant, date_reprise } =
      req.body;

    console.log("leave body", req.body);

    if (!employee || !department || !date_debut || !date_fin || !typeConge || !remplaçant || !date_reprise) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs." });
    }

    console.log("employee fel leave", employee);

    const findEmployee = await Employee.findOne({
      _id: employee,
      departement: department
    })

    if (!findEmployee) {
      return res.status(404).send("Veuillez fournir des informations valides !")
    }

    // Check remaining leave balance
    const diffDays = moment(date_fin).diff(moment(date_debut), "days");
    const soldeConge = await getSoldeConge(employee);

    if (soldeConge < diffDays) {
      return res.status(400).json({ message: "Vous ne disposez pas d'assez de jours de congé." });
    }

    // Vérifier la disponibilité du remplaçant
    const existingRequests = await Request.find({
      employee: remplaçant,
      date_debut: { $lte: date_fin },
      date_fin: { $gte: date_debut }
    });

    if (existingRequests.length > 0) {
      return res.status(400).json({ message: "Le remplaçant n'est pas disponible pendant cette période." });
    }

    // Vérifier les demandes de congé précédentes de l'employé
    const previousRequests = await Request.find({
      employee: employee,
      date_debut: { $lte: date_fin },
      date_fin: { $gte: date_debut }
    });

    if (previousRequests.length > 0) {
      return res.status(400).json({ message: "L'employé a déjà une demande de congé pendant cette période." });
    }

    // Vérifier que la date de début est supérieure à aujourd'hui de deux jours
    const twoDaysLater = new Date();
    twoDaysLater.setDate(twoDaysLater.getDate() + 1);

    if (new Date(date_debut) < twoDaysLater) {
      return res.status(400).json({ message: "La date de début doit être supérieure à aujourd'hui de deux jours." });
    }

    // Créer la demande de congé
    const newReq = await Request.create({ 
      type:"Congé", 
      employee, 
      department,
      nom: findEmployee.nom,
      prenom: findEmployee.prenom,
      fonction: findEmployee.fonction, 
      date_debut, 
      date_fin, 
      typeConge, 
      remplaçant, 
      date_reprise });
    return res.status(200).send("Votre demande a été enregistrée");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};


