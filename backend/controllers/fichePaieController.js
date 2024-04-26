import { Department } from "../models/Department.js";
import { Employee } from "../models/Employee.js";
import { Request } from "../models/Request.js";
import moment from "moment";
import "moment-timezone";

export const fichePaieRequest = async (req, res) => {
  try {
    const { employee, department } = req.body;
    console.log("req.body from fichePaie", req.body);

    if (!employee || !department) {
      return res
        .status(400)
        .json({ message: "Veuillez fournir tous les champs." });
    }

    const findEmployee = await Employee.findOne({
      _id: employee,
      departement: department
    })

    if (!findEmployee) {
      return res.status(404).send("Veuillez fournir des informations valides !")
    }

    // Vérifier la disponibilité du remplaçant
    const lastRequest = await Request.findOne({
      employee: employee,
      type: "Fiche_Paie",
    }).sort({ createdAt: -1 });;

    console.log("lasreq", lastRequest);
    if (lastRequest) {
      // Si une demande existe
      const lastRequestDate = moment(lastRequest.createdAt);
      const currentDate = moment();
      console.log("lastRequestDate", lastRequestDate);
      console.log("current", currentDate);

      // Vérifier si la dernière demande a été faite ce mois-ci
      if (lastRequestDate.month() === currentDate.month()) {
        // Si oui, renvoyer un message d'erreur
        return res.status(400).json({
          message: "Vous ne pouvez poser une demande de fiche de paie qu'une fois par mois.",
        });
      }


    }
    // Créer une nouvelle demande si tout est conforme
    const newReq = await Request.create({
      type: "Fiche_Paie",
      employee,
      department,
    })
    console.log("new req", newReq);
    return res.status(200).send("Votre demande a été enregistrée");

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
