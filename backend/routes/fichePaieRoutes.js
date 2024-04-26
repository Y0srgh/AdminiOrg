import express from "express"
import { fichePaieRequest } from "../controllers/fichePaieController.js";
const router = express.Router();
router.post("/", fichePaieRequest);
export default router;
