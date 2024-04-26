import express from "express"
import { attestationRequest } from "../controllers/attestationController";
const router = express.Router();
router.post("/", attestationRequest);
export default router;
