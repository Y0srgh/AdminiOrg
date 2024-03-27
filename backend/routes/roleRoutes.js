import express from "express";
import { addRole, findAllRoles } from "../controllers/roleController.js";

const router = express.Router();

// Route pour ajouter un rôle
router.post("/", addRole);

// Route pour récupérer tous les rôles
router.get("/", findAllRoles);

export default router;
