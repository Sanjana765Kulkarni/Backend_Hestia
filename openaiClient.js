const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getChatResponse(userInput) {
  const completion = await openai.createChatCompletion({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a kind, empathetic therapy assistant." },
      { role: "user", content: userInput },
    ],
  });
  return completion.data.choices[0].message.content.trim();
}

module.exports = { getChatResponse };