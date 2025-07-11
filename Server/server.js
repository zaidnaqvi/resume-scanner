import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";  // Add this
import "./deprecationWarningHandler.js";

dotenv.config();
connectDB();

const port = 4000;
const app = express();

app.get("/", (req, resp) => {
  resp.send("API WORKING");
});

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/jobs", jobRoutes);  // Add this


app.listen(port, () => console.log(`Server running on port ${port}`));
