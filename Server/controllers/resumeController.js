// import Resume from "../models/Resume.js";
// import Job from "../models/Job.js";
// import parseResume from "../utils/resumeParser.js";
// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: "./uploads/",
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage });

// export const uploadResume = async (req, res) => {
//   try {
//     const { jobId } = req.body;
//     const resumeFile = req.file;

//     if (!resumeFile)
//       return res.status(400).json({ message: "Resume file required" });

//     const job = await Job.findById(jobId);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     const parsedData = await parseResume(resumeFile.path, job.skillsRequired);
//     if (!parsedData)
//       return res.status(500).json({ message: "Failed to parse resume" });

//     const newResume = new Resume({
//       candidateName: parsedData.candidateName,
//       candidateId: req.user.id,
//       jobId,
//       resumeUrl: `/uploads/${resumeFile.filename}`,
//       extractedSkills: parsedData.extractedSkills,
//       AI_Score: parsedData.AI_Score,
//       status: "Under Review",
//     });

//     await newResume.save();
//     res
//       .status(201)
//       .json({
//         message: "Resume uploaded successfully!",
//         AI_Score: parsedData.AI_Score,
//       });
//   } catch (error) {
//     res.status(500).json({ message: "Error uploading resume" });
//   }
// };

// export const getResumesByJob = async (req, res) => {
//   try {
//     const { jobId } = req.params;
//     const resumes = await Resume.find({ jobId });
//     res.json(resumes);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching resumes" });
//   }
// };

// export const updateResumeStatus = async (req, res) => {
//   try {
//     const { resumeId } = req.params;
//     const { status } = req.body;

//     await Resume.findByIdAndUpdate(resumeId, { status });
//     res.json({ message: "Resume status updated" });
//   } catch (error) {
// res.status(500).json({ message: "Error updating status" });
//   }
// };

import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import parseResume from "../utils/resumeParser.js";
import multer from "multer";
import fs from "fs";
import path from "path";

// Ensure uploads folder exists
const uploadPath = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });

// export const uploadResume = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded!" });
//     }

//     const { jobId } = req.body;
//     const resumeFile = req.file;
//     console.log("Uploaded File Path:", resumeFile.path); // Debugging

//     // Check if job exists
//     const job = await Job.findById(jobId);
//     if (!job) return res.status(404).json({ message: "Job not found" });

//     // Parse resume for skills
//     const parsedData = await parseResume(resumeFile.path, job.skillsRequired);
//     if (!parsedData)
//       return res.status(500).json({ message: "Failed to parse resume" });

//     // Save resume data
//     const newResume = new Resume({
//       candidateName: parsedData.candidateName || "Unknown",
//       candidateId: req.user.id,
//       jobId,
//       resumeUrl: resumeFile.path,
//       extractedSkills: parsedData.extractedSkills,
//       AI_Score: parsedData.AI_Score,
//       status: "Under Review",
//     });

//     await newResume.save();
//     res
//       .status(201)
//       .json({
//         message: "Resume uploaded successfully!",
//         AI_Score: parsedData.AI_Score,
//       });
//   } catch (error) {
//     console.error("Resume Upload Error:", error.message);
//     res.status(500).json({ message: "Server error during resume upload." });
//   }
// };

export const uploadResume = async (req, res) => {
  try {
    console.log("➡️ Request received for resume upload");

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const { jobId } = req.body;
    console.log("📌 Received jobId:", jobId);

    if (!jobId) {
      return res.status(400).json({ message: "jobId is required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    console.log("✅ Job found:", job.title);

    // Debug file path before parsing
    console.log("📂 File Path:", req.file.path);

    // Attempt to parse resume
    const parsedData = await parseResume(req.file.path, job.skillsRequired);
    console.log("📝 Parsed Resume Data:", parsedData);

    if (!parsedData) {
      return res.status(500).json({ message: "Failed to parse resume" });
    }

    const newResume = new Resume({
      candidateName: parsedData.candidateName || "Unknown",
      candidateId: req.user.id,
      jobId,
      resumeUrl: req.file.path,
      extractedSkills: parsedData.extractedSkills,
      AI_Score: parsedData.AI_Score,
      status: "Under Review",
    });

    await newResume.save();
    console.log("✅ Resume saved successfully!");

    res.status(201).json({ message: "Resume uploaded successfully!", AI_Score: parsedData.AI_Score });
  } catch (error) {
    console.error("❌ Resume Upload Error:", error.message);
    res.status(500).json({ message: "Server error during resume upload." });
  }
};


export const getResumesByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const resumes = await Resume.find({ jobId });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching resumes" });
  }
};

export const updateResumeStatus = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { status } = req.body;

    await Resume.findByIdAndUpdate(resumeId, { status });
    res.json({ message: "Resume status updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};
