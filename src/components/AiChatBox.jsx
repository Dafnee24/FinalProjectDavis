import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

export default function AiChatBox({ fullScreen = false }) {
  const [messages, setMessages] = useState([

    { text: "Hi! I'm your data assistant. How can I help you today? 📊", type: "bot" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, type: "user" };
    setMessages((prev) => [...prev, userMessage]);
    
    setInput("");

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = {
        text: "Analyzing current trends... Based on the data, revenue in the 'West' region has increased by 15% this quarter.",
        type: "bot",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden ${fullScreen ? 'h-full' : 'h-[450px]'}`}>
      {/* Header */}

      <div className="p-4 border-b border-gray-50 bg-green-50/50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white shadow-lg shadow-green-200">
          <Bot size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1">
            AI Data Analytics <Sparkles size={14} className="text-green-600" />
          </h3>
          <p className="text-[10px] text-green-600 font-medium animate-pulse">Online & Ready</p>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white to-gray-50/30 scrollbar-hide"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${msg.type === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
              msg.type === "user" ? "bg-gray-800 text-white" : "bg-green-100 text-green-600 border border-green-200"
            }`}>
              {msg.type === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>
            
            <div className={`relative max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.type === "user"
                ? "bg-green-600 text-white rounded-tr-none"
                : "bg-white text-gray-700 border border-gray-100 rounded-tl-none"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-50">
        <div className="flex gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100 focus-within:border-green-300 focus-within:ring-2 focus-within:ring-green-100 transition-all">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="bg-transparent px-3 py-2 flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
            placeholder="Ask about revenue, trends, or regions..."
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:bg-gray-300 text-white w-10 h-10 rounded-lg flex items-center justify-center transition-all shadow-md active:scale-95"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

