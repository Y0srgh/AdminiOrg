import express from "express";
import { Employee } from "../models/Employee.js";
import {
  addEmployee,
  authEmployee,
  deleteEmployee,
  findAllEmployees,
  findOneEmployee,
  updateEmployee,
  updatePassword,
  refresh,
  logout
} from "../controllers/employeeController.js";

const router = express.Router();


router.post("/", addEmployee);
router.post("/auth", authEmployee);
router.get("/", findAllEmployees);
router.get("/:id", findOneEmployee);
router.put("/update-password/:id", updatePassword);
router.put("/update-details/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

//router.route('/auth/refresh').get(refresh)

router.get("/auth/refresh",refresh);
router.route('/auth/logout')
    .post(logout)
export default router;
