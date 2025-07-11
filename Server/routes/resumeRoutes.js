import express from "express";
import {
  uploadResume,
  getResumesByJob,
  updateResumeStatus,
} from "../controllers/resumeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import multer from "multer";

const router = express.Router();

// Configure file upload
const upload = multer({ dest: "uploads/" });

router.post(
  "/upload",
  authMiddleware(["HR"]),
  upload.single("resume"),
  uploadResume
);

router.get("/job/:jobId", authMiddleware(["HR"]), getResumesByJob);
router.put("/status/:resumeId", authMiddleware(["HR"]), updateResumeStatus);

export default router;
