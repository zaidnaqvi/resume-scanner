import express from "express";
import { askChatbot } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/ask", askChatbot); // Ask chatbot a question

export default router;
