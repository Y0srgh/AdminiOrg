import express from "express";
import {
  addDepartment,
  deleteDepartment,
  findAllDepartments,
  findOneDepartment,
  updateDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

import { verifyJWT } from "../middleware/verifyJWT.js";
router.use(verifyJWT);
// Route pour ajouter un département
router.post("/", addDepartment);

// Route pour récupérer tous les départements
router.get("/", findAllDepartments);
router.get("/:id", findOneDepartment);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);


export default router;
