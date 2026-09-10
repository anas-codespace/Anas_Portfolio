import { GoogleGenerativeAI } from "@google/generative-ai";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages, currentSection } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing API Key" }), { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

    const systemPrompt = `You are FIZZY, Anas' personal portfolio assistant.

Your job is to help visitors explore and understand Anas' portfolio.

You may answer questions about:
- Anas
- education
- skills
- projects
- company/startup
- services
- current work
- GitHub
- contact information
- portfolio sections

Use ONLY the following portfolio information:
${JSON.stringify(PORTFOLIO_DATA, null, 2)}

The user is currently viewing the ${currentSection || "HOME"} section of the portfolio.

Never fabricate facts.
Never invent companies, clients, work experience, achievements, technologies, project details, URLs, or qualifications.
If a requested detail is not available, clearly state that the information has not been added to the portfolio.

Match the visitor's language:
English -> English
Tamil -> Tamil
Tanglish -> natural Tanglish. Keep words like website, developer, project, coding, AI, GitHub, Python, Java naturally in English.

Be friendly, warm and professional.
Do not use slang such as: machi, da, bro, boss, dude, thala.
Use emojis naturally when appropriate (0-2 emojis).
Keep simple answers concise. For detailed questions, use readable structure.
You are primarily a portfolio assistant. For unrelated questions (like "What is today's weather?", "Write my assignment", etc.), politely redirect the visitor back to Anas' portfolio.`;

    const rawHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Gemini requires the first history message to be from a user.
    // Strip any leading model messages (like the initial greeting).
    while (rawHistory.length > 0 && rawHistory[0].role === "model") {
      rawHistory.shift();
    }

    const chat = model.startChat({
      systemInstruction: {
        role: "system",
        parts: [{ text: systemPrompt }],
      },
      history: rawHistory,
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessageStream(lastMessage);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              controller.enqueue(new TextEncoder().encode(chunkText));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      },
    });
  } catch (error: any) {
    console.error("FIZZY Gemini API error:", error.message);
    
    let status = 500;
    let message = "Unable to connect to the AI service.";
    const errStr = error.message || "";
    
    if (errStr.includes("403") || errStr.includes("API key") || errStr.includes("leaked")) {
      status = 403;
      message = "Authentication error. The API key is invalid or leaked.";
    } else if (errStr.includes("429") || errStr.includes("quota") || errStr.includes("exhausted")) {
      status = 429;
      message = "The AI service is currently busy or out of quota. Please try again later.";
    } else if (errStr.includes("404") || errStr.includes("model")) {
      status = 503;
      message = "The requested AI model is currently unavailable.";
    } else if (errStr.includes("400") || errStr.includes("validation")) {
      status = 400;
      message = "Invalid request format.";
    }

    return Response.json(
      { error: message },
      { status }
    );
  }
}
