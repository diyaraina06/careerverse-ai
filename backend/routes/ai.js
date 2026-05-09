import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/career", async (req, res) => {
  try {
    const { selected } = req.body;

    if (!selected) {
      return res.status(400).json({ error: "selected is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
User enjoys: ${selected}

Suggest 3 career options.
For each career give:
1. Career Title
2. Why it matches
3. Roadmap (3 steps)
Return in JSON format only.
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    res.json({ result: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Gemini failed" });
  }
});

export default router;