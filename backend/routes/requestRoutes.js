import express from "express";
import path from "path";
import { findAllRequests, findOneRequest, updateRequest } from "../controllers/requestController.js";

const router = express.Router();
router.get("/", findAllRequests);
router.get("/:id", findOneRequest);
router.put("/:id", updateRequest);

// Route pour récupérer le fichier PDF par son nom de fichier
router.get('/pdf/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.resolve(__dirname, `../public/refund_files/${filename}`);
    res.download(filePath); // Envoie le fichier en téléchargement
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur lors du téléchargement du fichier." });
  }
});

export default router;
