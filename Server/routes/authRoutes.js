import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register); // Register new users (Admin/HR)
router.post("/login", login); // User login

export default router;
