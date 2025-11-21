"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatContextType = {
  messages: Message[];
  addMessage: (message: Message) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Benvenuto! Sono l'assistente virtuale dello Studio Legale Zanchi. Come posso aiutarla oggi?",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        isModalOpen,
        openModal,
        closeModal,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within ChatProvider");
  }
  return context;
}
