import axios from "axios";

export const askChatbot = async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ message: "Chatbot failed to respond" });
  }
};
