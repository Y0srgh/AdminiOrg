import { Department } from "../models/Department.js";
import { Employee } from "../models/Employee.js";
import { Request } from "../models/Request.js";

export const attestationRequest = async (req, res) => {
  try {
    const { employee, department } = req.body;
    console.log("req.body from attestation", req.body);

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


    // Créer une nouvelle demande si tout est conforme
    const newReq = await Request.create({
      type: "Attestation",
      employee,
      department,
      nom: findEmployee.nom,
      prenom: findEmployee.prenom,
      fonction: findEmployee.fonction
    })
    console.log("new req", newReq);
    return res.status(200).send("Votre demande a été enregistrée");

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
