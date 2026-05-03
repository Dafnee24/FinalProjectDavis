/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { Send, Bot } from "lucide-react";
import { 
  getSummaryStats, 
  getRevenueTrend, 
  getProductDistribution 
} from "../data/salesDatabase"; 

export default function AiChatBox({ fullScreen = false }) {
  const [messages, setMessages] = useState([
    { text: "Halo! Saya asisten analisis data Anda. Ada yang bisa saya bantu terkait data supplier atau performa penjualan?", type: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll ke pesan terbaru
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

const sendMessage = async () => {
  const userMessage = input.trim();
  if (!userMessage || isLoading) return;

  setMessages((prev) => [...prev, { text: userMessage, type: "user" }]);
  setInput("");
  setIsLoading(true);

  try {
    // Pastikan fungsi data Anda tidak return undefined
    const stats = typeof getSummaryStats === 'function' ? getSummaryStats() : { totalRevenue: 0 };

    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        message: userMessage,
        contextData: { totalRevenue: stats?.totalRevenue || 0 } 
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.details || "Server Error");
    }

    setMessages((prev) => [...prev, { text: data.reply, type: "bot" }]);
  } catch (error) {
    console.error("Frontend Error:", error);
    setMessages((prev) => [...prev, { 
      text: "⚠️ Gagal: " + error.message, 
      type: "bot" 
    }]);
  } finally {
    setIsLoading(false);
  }
};
  
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden ${fullScreen ? 'h-full' : 'h-[450px]'}`}>
      {/* Header Dashboard Branding */}
      <div className="p-4 border-b border-gray-50 bg-red-50/50 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-sm">
          <Bot size={20} />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800">AI Data Analytics</h3>
          <p className="text-[10px] text-red-500 font-medium">Decision Support System Active</p>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.type === "user" 
                ? "bg-red-600 text-white rounded-tr-none shadow-md" 
                : "bg-white text-gray-700 border border-gray-100 rounded-tl-none shadow-sm"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-gray-400 italic">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            Asisten sedang berpikir...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
            placeholder="Tanyakan analisis data..."
            disabled={isLoading}
          />
          <button 
            onClick={sendMessage} 
            disabled={isLoading}
            className="bg-red-600 text-white p-2.5 rounded-xl hover:bg-red-700 active:scale-95 transition-all disabled:opacity-50 shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
