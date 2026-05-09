import model from "../config/gemini.js";

export const getCareerRecommendations = async (req, res) => {
  try {
    const { profile } = req.body;

    if (!profile) {
      return res.status(400).json({ error: "Profile data is required" });
    }

    const prompt = `
You are CareerGuide AI — a friendly career counselor for Indian students (grades 8-12).

Student profile:
- Grade: ${profile.grade}
- Activities: ${profile.activity}
- Subject: ${profile.subject}
- Weekend: ${profile.weekend}
- Style: ${profile.workStyle}
- Workplace: ${profile.workplace}
- Thinking: ${profile.thinkingStyle}
- Values: ${profile.values}
- Approach: ${profile.approach}
- Awareness: ${profile.awareness}

RULES:
- Return ONLY a raw JSON array with exactly 3 careers.
- Do NOT wrap output in markdown or triple backticks.
- Do NOT include extra commentary text.
- reason must mention specific profile answers.
- salaryRange in Indian Rupees (₹) per year.
- education must mention Indian exams/degrees (JEE, NEET, CLAT, NID, etc.).

Return this exact JSON structure:
[{
  "title": "Career title",
  "emoji": "emoji",
  "fitScore": 9,
  "tagline": "6-word summary",
  "reason": "2-3 sentences referencing quiz answers",
  "salaryRange": "₹X – ₹Y per year",
  "education": "Specific Indian degrees/exams",
  "skills": ["skill 1", "skill 2"],
  "simulationPreview": "One exciting sentence in 2nd person"
}]
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const careers = JSON.parse(cleanText);

    res.status(200).json(careers);

  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: "Failed to generate career paths" });
  }
};