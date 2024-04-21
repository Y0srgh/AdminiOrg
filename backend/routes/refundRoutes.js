import express from "express"
import { refundRequest } from "../controllers/refundController.js";

const router = express.Router();
router.post("/", refundRequest);
export default router;
