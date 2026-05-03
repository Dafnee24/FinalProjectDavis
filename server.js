/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { message, contextData } = req.body;
    const API_KEY = process.env.GEMINI_API_KEY;

    if (!API_KEY) {
      return res.status(500).json({ error: "API Key tidak ditemui dalam .env" });
    }

    // MENGGUNAKAN MODEL gemini-2.0-flash YANG TERSEDIA DALAM AKAUN ANDA
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Anda adalah asisten analisis data. 
                  Data Revenue: $${contextData?.totalRevenue || 0}. 
                  Pertanyaan: ${message}`
          }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("🚨 Error dari Google API:", data);
      return res.status(response.status).json({ 
        error: "Google API Error", 
        details: data.error?.message || "Model tidak menyokong permintaan ini." 
      });
    }

    // Mengambil teks daripada respon JSON Google
    const aiResponse = data.candidates[0].content.parts[0].text;
    res.json({ reply: aiResponse });

  } catch (error) {
    console.error("🚨 Backend Crash:", error.message);
    res.status(500).json({ error: "Server Error", details: error.message });
  }
});

app.listen(3000, () => console.log('✅ Server Berjalan! Menggunakan model: gemini-2.5-flash'));
