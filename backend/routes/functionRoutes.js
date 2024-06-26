import express from "express";
import {
  addFunction,
  deleteFunction,
  findAllFunctions,
  findOneFunction,
  updateFunction,
} from "../controllers/functionController.js";

const router = express.Router();

router.post("/", addFunction);

router.get("/", findAllFunctions);
router.get("/:id", findOneFunction);
router.put("/:id", updateFunction);
router.delete("/:id", deleteFunction);

export default router;
