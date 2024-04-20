import { Department } from "../models/Department.js";
import { Employee } from "./../models/Employee.js";
import { Request } from "./../models/Request.js";
import moment from "moment";
import "moment-timezone";

/*async function isAnotherEmployeePresent(department, date_debut, date_fin) {
  console.log("department : ", department);
  console.log("date deb : ", date_debut);
  console.log("dateFin : ", date_fin);

  try {
    // Recherche des demandes de congé approuvées ou en attente pour le même département
    const demandes = await Request.find({
      department: department,
      type: "Congé",
      status: { $in: ["Approuvée", "En_attente"] },
      $or: [
        { $and: [{ date_debut: { $lte: new Date(date_debut) } }, { date_fin: { $gte: new Date(date_fin) } }] },
        { date_debut: { $gte: new Date(date_debut), $lte: new Date(date_fin) } },
        { date_fin: { $gte: new Date(date_debut), $lte: new Date(date_fin) } }
      ]
    });
    console.log(demandes);
    // Retourne true s'il y a au moins une demande de congé pour un autre employé
    return demandes.length > 0;
  } catch (error) {
    console.error("Erreur lors de la recherche des demandes de congé :", error);
    throw error;
  }
}*/

/**
 * employee : {
  _id: new ObjectId('66065d6f252359a6d1082602'),
  type: 'Congé',
  employee: new ObjectId('6603a9e10299f7a5592ef1f0'),
  department: new ObjectId('66025586b23919a7228c635f'),
  status: 'Approuvée',
  date_creation: 2024-02-01T12:00:00.000Z,
  date_debut: 2024-04-04T00:00:00.000Z,
  date_fin: 2024-04-05T00:00:00.000Z,
  documents: [ 'document1.pdf', 'document2.pdf' ],
  validationRH: true,
  validationChef: true
}
 */

/**
 *     const existingChief = await Employee.findOne({
      departement: existingEmployee.departement,
      fonction: "Chef de département",
    });
 */
/*
function verifierConge(debut, fin, employes) {
  // Créer un objet pour stocker le nombre d'employés en congé pour chaque jour
  const employesParJour = {};

  // Créer un tableau de toutes les dates entre debut et fin
  const dates = new Array(Math.floor((datefin - datedebut) / (1000 * 60 * 60 * 24)) + 1)
    .fill()
    .map((_, index) => new Date(datedebut.getTime() + index * 86400000));

  // Initialiser l'objet avec 0 pour chaque jour
  dates.forEach((date) => {
    employesParJour[date.toISOString().slice(0, 10)] = 0;
  });

  // Compter le nombre d'employés en congé pour chaque jour
  requestDepartX.forEach((employe) => {
    const employeDates = new Array(
      Math.floor(
        (new Date(employe.date_fin) - new Date(employe.date_debut)) /
          (1000 * 60 * 60 * 24)
      ) + 1
    )
      .fill()
      .map(
        (_, index) =>
          new Date(new Date(employe.date_debut).getTime() + index * 86400000)
      );

    employeDates
      .filter((date) => date >= datedebut && date <= datefin)
      .forEach((date) => {
        employesParJour[date.toISOString().slice(0, 10)]++;
      });
  });

  // Vérifier si au moins un employé est présent pour chaque jour de congé
  return Object.values(employesParJour).every((count) => count !== departmentXEmployees.length);
}*/

/* async function isAnotherEmployeePresent(departmentId, datedebut, datefin) {
  const request = await Request.find({});
  if (!request || request.length === 0) {
    // Check if request is empty
    throw new Error("Employee not found");
  }
  const requestDepartX = request.filter(
    (req) =>
      req.department.toString() === departmentId &&
      req.type === "Congé" &&
      (req.status === "Approuvée" || req.status === "En_attente")
  );

  console.log("requeeette", requestDepartX);

  const employees = await Employee.find({});
  const departmentXEmployees = employees.filter(
    (employee) => employee.departement === departmentId
  );

  if (departmentXEmployees.length === 1) {
    return false;
  }

  const employesParJour = {};

  const dates = new Array(
    Math.floor((datefin - datedebut) / (1000 * 60 * 60 * 24)) + 1
  )
    .fill()
    .map((_, index) => new Date(datedebut.getTime() + index * 86400000));
  dates.forEach((date) => {
    employesParJour[date.toISOString().slice(0, 10)] = 0;
  });

  requestDepartX.forEach((employe) => {
    const employeDates = new Array(
      Math.floor(
        (new Date(employe.date_fin) - new Date(employe.date_debut)) /
          (1000 * 60 * 60 * 24)
      ) + 1
    )
      .fill()
      .map(
        (_, index) =>
          new Date(new Date(employe.date_debut).getTime() + index * 86400000)
      );

    employeDates
      .filter((date) => date >= datedebut && date <= datefin)
      .forEach((date) => {
        employesParJour[date.toISOString().slice(0, 10)]++;
      });
  });
  return Object.values(employesParJour).every(
    (count) => count !== departmentXEmployees.length
  );
} */

function isDateInRange(date, startDate, endDate) {
  return date >= startDate && date <= endDate;
}

async function isAnotherEmployeePresent(departmentId, datedebut, datefin) {
  const request = await Request.find({});
  if (!request || request.length === 0) {
    throw new Error("Employee not found employee present");
  }

  const requestDepartX = request.filter(
    (req) =>
      req.department.toString() === departmentId &&
      req.type === "Congé" &&
      (req.status === "Approuvée" || req.status === "En_attente")
      
  );

  if (requestDepartX.length === 0) {
    return true; // No requests found for this department
  }

  const employees = await Employee.find({});
  const departmentXEmployees = employees.filter(
    (employee) => employee.departement === departmentId
  );

  //if (departmentXEmployees.length === 1) {
    //return false; // Only one employee in this department
  //}
  console.log("employeee", departmentXEmployees[0]._id.toString());
  //console.log("dates :", datedebut, datefin);
  const startDate = new Date(datedebut);
  const endDate = new Date(datefin);
  console.log("dates :", startDate, endDate);

  // Boucle pour parcourir chaque jour entre la date de début et la date de fin
  for (
    let currentDate = new Date(startDate.getDate() - 1);
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    let nb = 0;
    // Faites quelque chose avec currentDate, par exemple affichez-le
    //console.log(currentDate.toISOString().slice(0, 10)); // Affiche la date au format YYYY-MM-DD
    requestDepartX.forEach((employee)=>{
      if(isDateInRange(currentDate, employee.date_debut, employee.date_fin)){
        console.log(`${currentDate.toISOString().slice(0, 10)} is in the range.`);
        console.log("nb dans la boucle :", nb);
        console.log(employee);
          nb++;
      }
    })
    //console.log("nb outside :", nb);

    if (nb===requestDepartX.length){
       return false }
    nb = 0   
  }

  return true;
}

/*
async function isAnotherEmployeePresent(id, dateDebut, dateFin) {
  try {
    // Récupérer l'employé pour obtenir le département
    const employee = await Employee.findById(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    console.log(id);
    const employee = await Employee.findById(id);

    if (!employee) {
      throw new Error("Employee not found");
    }

    // Récupérer tous les employés du même département
    const employeesInSameDepartment = await Employee.find({ departement: employee.departement });

    // Vérifier si au moins un employé est disponible pendant les dates spécifiées
    const overlappingEmployee = employeesInSameDepartment.find((emp) => {
      // Vérifier si les dates de début et de fin du congé se chevauchent avec les dates de congé de l'autre employé
      return (
        (dateDebut >= emp.date_debut && dateDebut <= emp.date_fin) ||
        (dateFin >= emp.date_debut && dateFin <= emp.date_fin) ||
        (emp.date_debut >= dateDebut && emp.date_debut <= dateFin) ||
        (emp.date_fin >= dateDebut && emp.date_fin <= dateFin)
      );
    });

    // Si aucun employé n'est disponible, renvoyer false
    return !overlappingEmployee;
  } catch (error) {
    console.error("Error while checking employee availability in department:", error);
    throw error;
  }
}
*/

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
    const condition1 = soldeConge > diffDays;
    console.log("dep", department);
    /*const condition2 = await isAnotherEmployeePresent(
      department,
      date_debut,
      date_fin
    );
    console.log(condition2);*/

    if (condition1) {
      return res.status(200).send("Votre demande a été enregistrée");
    } else {
      return res
        .status(200)
        .send({ message: "Vous ne pouvez pas demander un congé" });
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
