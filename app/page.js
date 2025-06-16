"use client";
import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([{ role: "system", content: "You are a helpful assistant." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages }),
    });

    const data = await res.json();
    const botMessage = { role: "assistant", content: data.output };
    setMessages([...updatedMessages, botMessage]);
    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">MK Codex Chat</h1>
      <div className="bg-gray-800 p-4 rounded-lg h-[60vh] overflow-y-auto space-y-3">
        {messages.slice(1).map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-blue-400" : "text-green-400"}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div className="text-gray-400">Typing...</div>}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded bg-gray-700 text-white"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">Send</button>
      </div>
    </main>
  );
}