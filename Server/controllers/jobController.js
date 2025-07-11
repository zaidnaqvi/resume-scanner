import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const { title, description, skillsRequired, company, location } = req.body;

    const newJob = new Job({
      title,
      description,
      skillsRequired,
      company,
      location,
      postedBy: req.user.id,
    });

    await newJob.save();
    res.status(201).json({ message: "Job posted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error creating job" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    await Job.findByIdAndDelete(jobId);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job" });
  }
};
