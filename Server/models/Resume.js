import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  candidateName: String,
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
  resumeUrl: String,
  extractedSkills: [String],
  AI_Score: Number,
  status: {
    type: String,
    enum: ["Under Review", "Shortlisted", "Rejected", "Interview Scheduled"],
    default: "Under Review",
  },
});

export default mongoose.model("Resume", ResumeSchema);
