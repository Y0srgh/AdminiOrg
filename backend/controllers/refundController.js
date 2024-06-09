import { Employee } from "../models/Employee.js";
import { Request } from "../models/Request.js";
import express from "express";
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) { return cb(null, './public/refund_files') }, // Destination folder
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`); // Use original filename
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {

    const { employee, department, fonction, nom, prenom } = req.body;
    console.log("------",req.body);
    // Vérifier que tous les champs sont fournis
    if (!employee || !department || !fonction || !nom || !prenom) {
      return res.status(401).json({ message: "Veuillez fournir tous les champs." });
    }

    // Check if file field exists in request
    if (!req.file) {
      return res.status(401).json({ message: "File not provided." });
    }

    console.log("----file ----",req.file);
    // Retrieve file name from multer
    const file = req.file.filename

    console.log("employee, department, fonction, nom, prenom", employee, department, fonction, nom, prenom, file);

    // Vérifier l'existence de l'employé
    const existingEmployee = await Employee.findOne({
      _id: employee,
    });

    console.log(existingEmployee);

    if (!existingEmployee) {
      return res.status(401).json({ message: "Employé non trouvé." });
    }

    // Créer la demande de remboursement
    const newRequest = await Request.create({
      type: "Remboursement",
      employee: employee,
      department: department,
      fonction: fonction,
      nom: nom,
      prenom: prenom,
      documents: file
    });

    return res.status(200).json({ message: "Votre demande a été enregistrée." });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
})

export default router;

