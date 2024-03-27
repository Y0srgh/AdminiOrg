import express from "express";
import {
  addRole,
  deleteRole,
  findAllRoles,
  findOneRole,
  updateRole,
} from "../controllers/roleController.js";

const router = express.Router();

router.post("/", addRole);
router.get("/", findAllRoles);
router.get("/:id", findOneRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

export default router;
