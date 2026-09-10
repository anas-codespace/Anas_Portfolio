"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2, Mic, Volume2, VolumeX } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  id: string;
  role: "user" | "model";
  content: string;
};

import FizzyMascot from "./FizzyMascot";

const QUICK_PROMPTS = [
  "Who is Anas?",
  "Show me his projects",
  "What does Anas do?",
  "What is he currently building?",
  "How can I contact him?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState("HOME");
  
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      role: "model",
      content: "Hey 👋 I'm FIZZY, Anas' portfolio assistant.\n\nI can help you explore his projects, skills, current work and more.\n\nWhat would you like to know?",
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  // Track current section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["contact", "startup", "projects", "skills", "services", "about"];
      let found = "HOME";
      
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          found = id.toUpperCase();
          break;
        }
      }
      setCurrentSection(found);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const speakText = (msgId: string, text: string) => {
    if (!("speechSynthesis" in window)) return;
    
    // If clicking play on the currently speaking message, stop it.
    if (currentlySpeakingId === msgId) {
      window.speechSynthesis.cancel();
      setCurrentlySpeakingId(null);
      return;
    }
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    setCurrentlySpeakingId(msgId);
    
    // Clean markdown syntax for better speech
    const cleanText = text.replace(/[*_#`~]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Match Fizzy's specific tone from Mascot
    utterance.pitch = 1.15; 
    utterance.rate = 0.92; 
    utterance.volume = 0.95;
    
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find((v) => v.name === "Google US English") ||
        voices.find((v) => v.name === "Samantha") ||
        voices.find((v) => v.name === "Karen") ||
        voices.find((v) => v.name.includes("Google") && v.lang.startsWith("en")) ||
        voices.find((v) => v.lang === "en-US" && !v.name.toLowerCase().includes("male"));
      
      if (preferred) {
        utterance.voice = preferred;
      }
      
      utterance.onend = () => setCurrentlySpeakingId(null);
      utterance.onerror = () => setCurrentlySpeakingId(null);
      
      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      pickVoice();
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        pickVoice();
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice input.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = inputValue;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let newFinal = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          newFinal += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      
      if (newFinal) {
        finalTranscript += (finalTranscript ? " " : "") + newFinal;
      }
      
      setInputValue(finalTranscript + (interimTranscript ? " " + interimTranscript : ""));
    };

    recognition.start();
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsLoading(true);

    // Stop speaking if user sends a new message
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setCurrentlySpeakingId(null);
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, newUserMsg].map(m => ({ role: m.role, content: m.content })),
          currentSection,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "API response not ok");
      }

      if (!response.body) throw new Error("No readable stream");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      const botMsgId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: botMsgId, role: "model", content: "" }]);

      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) => 
            prev.map((msg) => 
              msg.id === botMsgId ? { ...msg, content: msg.content + chunk } : msg
            )
          );
        }
      }
      
    } catch (error: any) {
      console.error(error);
      let errorMsg = error.message;
      if (!errorMsg || errorMsg === "API response not ok") {
        errorMsg = "Sorry, I'm having a little trouble connecting right now. Please try again in a moment. 😊";
      }
      
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "model", content: "⚠️ " + errorMsg }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    sendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <>
      <FizzyMascot 
        isOpen={isOpen} 
        isLoading={isLoading} 
        toggleChat={() => setIsOpen(!isOpen)} 
        currentSection={currentSection}
      />

      <div
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 w-[calc(100vw-3rem)] md:w-[420px] h-[520px] max-h-[80vh] bg-zinc-950/98 backdrop-blur-sm border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.8)] z-50 transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="relative flex justify-center items-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 overflow-hidden">
              <img src="/fizzy-avatar.png" alt="FIZZY" className="w-full h-full object-cover" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-zinc-950 z-10" />
            </div>
            <div>
              <h3 className="text-white font-bold tracking-widest text-sm flex items-center gap-2">
                FIZZY
                <span className="text-[9px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                  AI
                </span>
              </h3>
              <p className="text-xs text-gray-400">Anas' Portfolio Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1"
              aria-label="Close Chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div 
          className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
          onWheel={(e) => e.stopPropagation()}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex justify-center items-center mt-1 overflow-hidden ${
                  msg.role === "user"
                    ? "bg-white/10 text-white"
                    : "bg-blue-600/20 text-white border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                }`}
              >
                {msg.role === "user" ? (
                  <User size={14} />
                ) : (
                  <img src="/fizzy-avatar.png" alt="FIZZY" className="w-full h-full object-cover scale-110" />
                )}
              </div>

              <div className="flex flex-col gap-1 max-w-[80%]">
                <div
                  className={`p-3.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-white/10 text-white rounded-2xl rounded-tr-sm"
                      : "bg-blue-500/10 border border-blue-500/20 text-gray-200 rounded-2xl rounded-tl-sm prose prose-invert prose-p:my-1 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white"
                  }`}
                >
                  {msg.role === "user" ? (
                    <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
                  ) : (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  )}
                </div>
                
                {/* On-demand Play/Stop button for AI messages */}
                {msg.role === "model" && msg.content && (
                  <button
                    onClick={() => speakText(msg.id, msg.content)}
                    className="flex items-center gap-1.5 self-start px-2 py-1 mt-0.5 text-[10px] uppercase tracking-wider font-bold text-gray-500 hover:text-white hover:bg-white/10 rounded transition-colors"
                  >
                    {currentlySpeakingId === msg.id ? (
                      <>
                        <VolumeX size={12} /> Stop
                      </>
                    ) : (
                      <>
                        <Volume2 size={12} /> Play
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}

          {messages.length === 1 && (
            <div className="flex flex-col gap-2 mt-2">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold ml-11 mb-1">Quick Prompts</p>
              {QUICK_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(prompt)}
                  className="ml-11 text-left px-4 py-2 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition-colors w-fit"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex justify-center items-center mt-1 bg-blue-600/20 text-white border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.3)] overflow-hidden">
                <img src="/fizzy-avatar.png" alt="FIZZY" className="w-full h-full object-cover scale-110 grayscale brightness-125 animate-pulse" />
              </div>
              <div className="p-3 text-sm text-blue-400 flex items-center gap-2 font-medium">
                <Loader2 size={14} className="animate-spin" />
                FIZZY is thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white/5 border-t border-white/10">
          <form
            onSubmit={handleSend}
            className="relative flex items-center bg-black/40 border border-white/10 rounded-xl overflow-hidden focus-within:border-blue-500/50 transition-colors"
          >
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask FIZZY something..."
              className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 px-4 py-3.5 pr-20 outline-none resize-none max-h-32 scrollbar-thin"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              <button
                type="button"
                onClick={toggleListening}
                className={`w-8 h-8 rounded-lg flex justify-center items-center transition-colors ${
                  isListening ? "bg-red-500/20 text-red-500 animate-pulse" : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
                aria-label="Voice input"
                title="Speak to FIZZY"
              >
                <Mic size={16} />
              </button>
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-8 h-8 rounded-lg bg-blue-500 text-white flex justify-center items-center disabled:opacity-50 disabled:bg-white/10 transition-colors"
                aria-label="Send message"
              >
                <Send size={14} className="ml-0.5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
