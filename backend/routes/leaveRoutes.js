import express from "express"
import { leaveRequest } from "../controllers/leaveController.js";

const router = express.Router();
router.post("/", leaveRequest);
export default router;
