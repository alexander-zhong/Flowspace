import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import { getTasks } from "../controllers/AIController.js";
// Config router
const router = express.Router();

// Paths (/api/openai)
router.route("/tasks").post(protectedRoute, getTasks);
export default router;
