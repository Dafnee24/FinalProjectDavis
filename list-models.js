// untuk cek model yang tersedia untuk API

/* eslint-disable no-undef */
import dotenv from 'dotenv';
dotenv.config();

async function checkAvailableModels() {
  const API_KEY = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.models) {
      console.log("✅ Model yang tersedia untuk API Key Anda:");
      data.models.forEach(m => {
        if (m.supportedGenerationMethods.includes("generateContent")) {
          console.log(`- ${m.name.replace('models/', '')}`);
        }
      });
    } else {
      console.log("❌ Tidak ada model ditemukan. Error:", data);
    }
  } catch (e) {
    console.error("❌ Gagal menghubungi API:", e.message);
  }
}

checkAvailableModels();
