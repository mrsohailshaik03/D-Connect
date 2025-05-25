const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeDonationText(description) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: `Categorize donation urgency from description: ${description}. Respond with only one word: "high", "medium", or "low".` }] }]
  });
  const text = result.response.text().toLowerCase().trim();
  if (text.includes("high")) return "high";
  if (text.includes("medium")) return "medium";
  return "low";
}

module.exports = { analyzeDonationText };
