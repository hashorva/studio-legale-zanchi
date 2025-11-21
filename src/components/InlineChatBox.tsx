"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useChat } from "@/contexts/ChatContext";

export default function InlineChatBox() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    addMessage,
    openModal,
    isModalOpen,
    isLoading,
    setIsLoading,
  } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Only scroll if there's more than just the initial greeting
    if (messages.length > 1) {
      scrollToBottom();
    }
    // scrollToBottom(); // IGNORE ---
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    addMessage(userMessage);
    setInput("");
    setIsLoading(true);

    // Open modal on first message
    if (messages.length === 1) {
      openModal();
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();

      if (data.message) {
        addMessage({ role: "assistant", content: data.message });
      } else {
        throw new Error("No response from API");
      }
    } catch (error) {
      console.error("Chat error:", error);
      addMessage({
        role: "assistant",
        content:
          "Mi dispiace, si è verificato un errore. La prego di riprovare o di contattarci direttamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputClick = () => {
    // If modal was closed and conversation exists, reopen modal
    if (messages.length > 1 && !isModalOpen) {
      openModal();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto my-12 px-4"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2" style={{ color: "#182E59" }}>
          Hai una domanda legale?
        </h2>
        <p className="text-gray-600">
          Parla con il nostro assistente virtuale - ti aiuteremo a capire se
          possiamo risolvere il tuo problema
        </p>
      </div>

      {/* Chat Container - Compact */}
      <div
        className="bg-white rounded-3xl shadow-xl overflow-hidden"
        style={{
          maxHeight: messages.length === 1 ? "220px" : "400px",
          transition: "max-height 0.3s ease",
        }}
      >
        {/* Messages Area */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: "300px" }}>
          {/* Only show initial greeting or last few messages */}
          {messages
            .slice(0, messages.length === 1 ? 1 : -2)
            .map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex mb-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className="rounded-2xl px-4 py-3 max-w-[66%]"
                  style={{
                    backgroundColor:
                      message.role === "user" ? "#47699e" : "#e1e5ea",
                    color: message.role === "user" ? "white" : "#2D3748",
                  }}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </motion.div>
            ))}

          {/* Typing indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start mb-4"
            >
              <div
                className="rounded-2xl px-4 py-3"
                style={{ backgroundColor: "#e1e5ea" }}
              >
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: "#47699e",
                      animationDelay: "0ms",
                    }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: "#47699e",
                      animationDelay: "150ms",
                    }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{
                      backgroundColor: "#47699e",
                      animationDelay: "300ms",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Styled as Bubble */}
        <div className="px-6 pb-6">
          <div
            className="rounded-3xl px-4 py-3 flex items-center gap-3"
            style={{ backgroundColor: "#ebeef2" }}
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              onClick={handleInputClick}
              placeholder="Scrivi la tua domanda..."
              className="flex-1 bg-transparent focus:outline-none text-sm placeholder-gray-400"
              style={{ color: "#2D3748" }}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="rounded-full p-2 transition-all disabled:opacity-40 hover:scale-110 active:scale-95"
              style={{
                backgroundColor: "#47699e",
                color: "white",
              }}
              aria-label="Invia messaggio"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
