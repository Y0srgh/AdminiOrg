import express from "express";
import { Employee } from "../models/Employee.js";
import {
  addEmployee,
  deleteEmployee,
  findAllEmployees,
  findOneEmployee,
  updateEmployee,
  updatePassword,
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", addEmployee);
router.get("/", findAllEmployees);
router.get("/:id", findOneEmployee);
router.put("/update-password/:id", updatePassword);
router.put("/update-details/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
export default router;
