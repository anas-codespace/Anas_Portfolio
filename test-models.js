const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = fs.readFileSync('.env.local', 'utf-8');
const keyMatch = env.match(/GEMINI_API_KEY=(.+)/);
const key = keyMatch ? keyMatch[1] : '';

async function test() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await res.json();
    console.log(JSON.stringify(data.models.map(m => m.name), null, 2));
  } catch (e) {
    console.error("ACTUAL ERROR:", e.message);
  }
}
test();