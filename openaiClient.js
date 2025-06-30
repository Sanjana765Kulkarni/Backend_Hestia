const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatResponse(userInput) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a kind, empathetic therapy assistant." },
      { role: "user", content: userInput },
    ],
  });
  return completion.choices[0].message.content.trim();
}

module.exports = { getChatResponse };