import express from "express";
import { findAllRequests } from "../controllers/requestController.js";

const router = express.Router();
router.get("/", findAllRequests);
export default router;
