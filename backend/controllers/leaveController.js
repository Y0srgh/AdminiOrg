import { Department } from "../models/Department.js";
import { Employee } from "./../models/Employee.js";
import { Request } from "./../models/Request.js";
import moment from "moment";

async function isAnotherEmployeePresent(departement, dateDebut, dateFin) {
  const demandes = await Request.find({
    departement: departement,
    type: "Congé",
    $or: [
      {
        $and: [
          { date_debut: { $lte: dateDebut } },
          { date_fin: { $gte: dateDebut } },
        ],
      },
      {
        $and: [
          { date_debut: { $lte: dateFin } },
          { date_fin: { $gte: dateFin } },
        ],
      },
      {
        $and: [
          { date_debut: { $gte: dateDebut } },
          { date_fin: { $lte: dateFin } },
        ],
      },
    ],
    status: { $in: ["Approuvée", "En_attente"] },
  });
  return demandes.length > 0;
}

async function getSoldeConge(employeeId) {
  const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new Error("Employee not found");
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
    const { type, employee, department, date_creation, date_debut, date_fin } =
      req.body;

    if (!type || !employee || !department || !date_debut || !date_fin) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs." });
    }

    const diffDays = moment(date_fin).diff(moment(date_debut), "days");
    const soldeConge = await getSoldeConge(employee);
    console.log("days", diffDays);
    console.log("type", soldeConge);
    console.log("dif : ", soldeConge - diffDays);
    const condition1 = soldeConge > diffDays
    if (soldeConge > diffDays) {
      return res.status(200).send("solde valide");
    } else {
      return res
        .status(200)
        .send({ message: "solde invalide", solde: soldeConge });
    }
  } catch (error) {
    console.error("Erreur lors de la demande du congé");
    return res.status(500).json({ message: error.message });
  }
};

/**
  Fonction pour calculer le solde de congé**
function getSoldeConge(employe) {
    const dateEmbauche = employe.dateEmbauche;
    const moisTravailles = moment().diff(dateEmbauche, "months");
    return employe.soldeConge + moisTravailles * 2.5;
    }
    ```
  Fonction pour vérifier la présence d'un autre employé du même département**
    async function isAnotherEmployeePresent(departement, dateDebut, dateFin) {
    const demandes = await Request.find({
    departement: departement,
    type: "Congé",
    $or: [
    {
    $and: [{ date_debut: { $lte: dateDebut } }, { date_fin: { $gte: dateDebut } }],
    },
    {
    $and: [{ date_debut: { $lte: dateFin } }, { date_fin: { $gte: dateFin } }],
    },
    {
    $and: [{ date_debut: { $gte: dateDebut } }, { date_fin: { $lte: dateFin } }],
    },
    ],
    status: { $in: ["Approuvée", "En_attente"] },
    });
    return demandes.length > 0;
    }
    ```
 */
