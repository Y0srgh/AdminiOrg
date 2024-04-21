import express from "express"
import { avanceRequest } from "../controllers/avanceController";
const router = express.Router();
router.post("/", avanceRequest);
export default router;
