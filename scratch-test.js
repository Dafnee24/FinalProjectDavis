import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

async function test() {
  try {
    const groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });
    
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: "hello" }],
    });
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("ERROR DETECTED:", error.message);
  }
}
test();
