import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function run() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a therapy assistant who gives short replies" },
        { role: "user", content: "Hello, are you working and tell me about yourself?" }
      ]
    });
    console.log("✅ OpenAI replied:", completion.choices[0].message.content);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}
//comment
run();