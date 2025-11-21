"use client";

import { useState, useRef, useEffect } from "react";
import { Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@/contexts/ChatContext";

export default function ChatModal() {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userClickedOutside, setUserClickedOutside] = useState(false);

  const {
    messages,
    addMessage,
    isModalOpen,
    closeModal,
    isLoading,
    setIsLoading,
  } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-refocus input after AI responds (unless user clicked elsewhere)
  useEffect(() => {
    if (!isLoading && isModalOpen && !userClickedOutside) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isLoading, isModalOpen, userClickedOutside]);

  // Reset userClickedOutside when modal opens
  useEffect(() => {
    if (isModalOpen) {
      setUserClickedOutside(false);
      inputRef.current?.focus();
    }
  }, [isModalOpen]);

  // Detect clicks outside input
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setUserClickedOutside(true);
      }
    };

    if (isModalOpen) {
      document.addEventListener("click", handleClick);
    }

    return () => document.removeEventListener("click", handleClick);
  }, [isModalOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
      };
    }
  }, [isModalOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    addMessage(userMessage);
    setInput("");
    setIsLoading(true);
    setUserClickedOutside(false);

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
    setUserClickedOutside(false);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <>
          {/* Dark Overlay with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50"
            style={{
              backgroundColor: "rgba(24, 46, 89, 0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
            onClick={closeModal}
          />

          {/* Chat Modal - CENTERED */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{
              width: "min(90vw, 700px)",
              height: "min(80vh, 600px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex justify-between items-center px-6 py-4 shrink-0"
              style={{
                backgroundColor: "#1F3B73",
              }}
            >
              <div className="text-white">
                <h3 className="font-semibold text-base">
                  Studio Legale Zanchi
                </h3>
                <p className="text-xs opacity-90">Assistente virtuale</p>
              </div>
              <button
                onClick={closeModal}
                className="hover:bg-white/10 rounded-full p-2 transition-colors"
                aria-label="Chiudi chat"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 relative">
              {/* Fade gradient at top */}
              <div
                className="sticky top-0 left-0 right-0 h-8 pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(to bottom, white 0%, transparent 100%)",
                }}
              />

              {/* Messages */}
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${
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
                    className="flex justify-start"
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
            </div>

            {/* Input Area - Fixed at Bottom */}
            <div className="px-6 pb-6 pt-2 shrink-0">
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
                  placeholder="Scrivi un messaggio..."
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
          </motion.div>

          {/* Mobile Fullscreen Override */}
          <style jsx>{`
            @media (max-width: 768px) {
              .fixed.top-1\\/2 {
                top: 0 !important;
                left: 0 !important;
                transform: none !important;
                width: 100vw !important;
                height: 100vh !important;
                max-width: 100vw !important;
                max-height: 100vh !important;
                border-radius: 0 !important;
              }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}
