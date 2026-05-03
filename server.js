/* eslint-env node */
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Initialize OpenAI client configured for Groq
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || process.env.API_KEY || process.env.GEMINI_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, contextData } = req.body;
    
    // Construct the system prompt
    const systemPrompt = `You are a helpful AI data assistant for a sales dashboard. 
You must answer questions based ONLY on the provided context data below. Do not use outside knowledge. 
If the user asks something not related to the data, politely decline and say you can only answer questions about the dashboard data.

Here is the current dashboard data context:
${contextData}`;

    // Convert messages to Groq format (same as OpenAI format)
    const apiMessages = [
      { role: 'system', content: systemPrompt }
    ];

    for (const msg of messages) {
      if (msg.type === 'user') {
        apiMessages.push({ role: 'user', content: msg.text });
      } else if (msg.type === 'bot') {
        apiMessages.push({ role: 'assistant', content: msg.text });
      }
    }

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: apiMessages,
    });

    const text = response.choices[0].message.content;

    res.json({ reply: text });
  } catch (error) {
    console.error("Error calling AI API:", error);
    res.status(500).json({ error: error.message || "Failed to generate response" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
