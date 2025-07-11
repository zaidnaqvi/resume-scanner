import express from "express";
import { createJob, getJobs, deleteJob } from "../controllers/jobController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware(["HR"]), createJob); // Create a job (HR only)
router.get("/", getJobs); // Get all jobs (Public)
router.delete("/:jobId", authMiddleware(["HR"]), deleteJob); // Delete a job (HR only)

export default router;
