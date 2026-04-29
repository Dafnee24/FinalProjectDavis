/* eslint-env node */
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// We will use gemini-1.5-flash since it's the standard for general chat
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, contextData } = req.body;
    
    // Construct the prompt
    let prompt = `You are a helpful AI data assistant for a sales dashboard. 
You must answer questions based ONLY on the provided context data below. Do not use outside knowledge. 
If the user asks something not related to the data, politely decline and say you can only answer questions about the dashboard data.

Here is the current dashboard data context:
${contextData}

Conversation History:
`;

    // Append conversation history
    for (const msg of messages) {
      if (msg.type === 'user') {
        prompt += `User: ${msg.text}\n`;
      } else {
        prompt += `Assistant: ${msg.text}\n`;
      }
    }
    
    prompt += `\nAssistant:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: error.message || "Failed to generate response" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
