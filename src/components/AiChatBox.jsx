import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { getSummaryStats, getRevenueTrend, getProductDistribution, getBarChartData, getChannelDistribution } from "../data/salesDatabase";

export default function AiChatBox({ fullScreen = false }) {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI data assistant. I can help you analyze the dashboard data. How can I help you today? 📊", type: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    const userMessage = { text: userText, type: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Prepare context data
      const summaryStats = getSummaryStats();
      const revenueTrend = getRevenueTrend();
      const productDist = getProductDistribution();
      const regionData = getBarChartData();
      const channelDist = getChannelDistribution();

      const contextData = `
Summary Stats: ${JSON.stringify(summaryStats)}
Top Salespeople by Revenue: ${JSON.stringify(revenueTrend.slice(0, 3))}
Product Distribution: ${JSON.stringify(productDist)}
Revenue by Region: ${JSON.stringify(regionData)}
Revenue by Channel: ${JSON.stringify(channelDist)}
      `;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
          contextData
        }),
      });

      if (!response.ok) {
        let errMsg = 'Network response was not ok';
        try {
          const errData = await response.json();
          errMsg = errData.error || errMsg;
        } catch(e) {}
        throw new Error(errMsg);
      }

      const data = await response.json();
      
      setMessages((prev) => [...prev, { text: data.reply, type: "bot" }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [...prev, { text: `Sorry, I encountered an error: ${error.message}`, type: "bot" }]);
    } finally {
      setIsLoading(false);
    }
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
                : "bg-white text-gray-700 border border-gray-100 rounded-tl-none whitespace-pre-wrap"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm bg-green-100 text-green-600 border border-green-200">
              <Bot size={14} />
            </div>
            <div className="relative max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm bg-white text-gray-700 border border-gray-100 rounded-tl-none flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-green-600" />
              <span>Analyzing data...</span>
            </div>
          </div>
        )}
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
            disabled={!input.trim() || isLoading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:bg-gray-300 text-white w-10 h-10 rounded-lg flex items-center justify-center transition-all shadow-md active:scale-95"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}

