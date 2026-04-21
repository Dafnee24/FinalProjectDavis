import { useState } from "react";

export default function AiChatBox() {
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me about the data 📊", type: "bot" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, type: "user" };

    // dummy response (nanti diganti backend)
    const botResponse = {
      text: "Based on current data, revenue is trending upward.",
      type: "bot",
    };

    setMessages([...messages, userMessage, botResponse]);
    setInput("");
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">AI Assistant</h3>

      {/* Chat Area */}
      <div className="h-52 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl text-sm max-w-[75%] ${
              msg.type === "user"
                ? "bg-green-500 text-white ml-auto"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg flex-1 text-sm"
          placeholder="Ask something like 'What is the trend?'"
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-lg text-sm"
        >
          Send
        </button>
      </div>
    </div>
  );
}
