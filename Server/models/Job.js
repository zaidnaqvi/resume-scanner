import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  skillsRequired: [String],
  company: String,
  location: String,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resume" }],
});

export default mongoose.model("Job", JobSchema);
