import express from "express";
import { protectedRoute } from "../middleware/authMiddleware.js";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUser,
  updateUser,
  updateTasks,
  getTasks,
} from "../controllers/userController.js";
// Config router
const router = express.Router();

// Paths (/api/users)
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protectedRoute, getUser)
  .put(protectedRoute, updateUser);
router
  .route("/tasks")
  .put(protectedRoute, updateTasks)
  .get(protectedRoute, getTasks);
export default router;
