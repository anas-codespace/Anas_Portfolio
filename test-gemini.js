const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = fs.readFileSync('.env.local', 'utf-8');
const keyMatch = env.match(/GEMINI_API_KEY=(.+)/);
const key = keyMatch ? keyMatch[1] : '';

const genAI = new GoogleGenerativeAI(key);
async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessageStream("hi");
    for await (const chunk of result.stream) {
      console.log(chunk.text());
    }
  } catch (e) {
    console.error("ACTUAL ERROR:", e.message);
  }
}
test();