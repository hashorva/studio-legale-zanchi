'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowUp, MessageCircle, Scale, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = '0px';
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      160
    )}px`;
  }, [input]);

  // Send initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial AI greeting
      setMessages([
        {
          role: 'assistant',
          content:
            "Benvenuto! Sono l'assistente virtuale dello Studio Legale Zanchi. Come posso aiutarla oggi?",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (data.message) {
        setMessages([
          ...newMessages,
          { role: 'assistant', content: data.message },
        ]);
      } else {
        throw new Error('No response from API');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content:
            'Mi dispiace, si è verificato un errore. La prego di riprovare o di contattarci direttamente.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed right-4 bottom-4 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-shadow hover:shadow-xl sm:right-6 sm:bottom-6 sm:p-4"
            aria-label="Apri chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-3 bottom-3 top-[calc(var(--header-height,0px)+0.75rem)] z-50 flex h-[calc(100dvh-var(--header-height,0px)-1.5rem)] max-h-[calc(100dvh-var(--header-height,0px)-1.5rem)] flex-col overflow-hidden rounded-[2rem] bg-background shadow-2xl sm:top-auto sm:right-6 sm:bottom-6 sm:left-auto sm:h-[620px] sm:w-full sm:max-w-lg sm:max-h-[calc(100vh-100px)]"
          >
            {/* Header */}
            <div className="flex items-start justify-between bg-primary/2 px-4 pt-5 pb-4 text-foreground sm:px-5">
              <div className="pr-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent/80">
                  Assistente Virtuale
                </p>
                <h3 className="mt-1 font-serif text-2xl text-primary">
                  Studio Legale Zanchi
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ti posso aiutare a individuare il servizio adatto e a fissare
                  un appuntamento.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="ring-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary/60 opacity-100 transition-all duration-200 hover:bg-primary/20 hover:text-primary/90 focus-visible:ring-2 focus-visible:outline-none"
                aria-label="Chiudi chat"
              >
                <X className="h-5 w-5 shrink-0" strokeWidth={3} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-primary/5 px-4 py-5 sm:px-5">
              <div className="space-y-6">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={
                      message.role === 'user'
                        ? 'flex justify-end'
                        : 'flex gap-3'
                    }
                  >
                    {message.role === 'assistant' ? (
                      <>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Scale className="h-4 w-4" strokeWidth={1.9} />
                        </div>
                        <div className="max-w-[min(100%,34rem)] pt-1 text-sm leading-7 text-foreground sm:text-[15px]">
                          <p className="whitespace-pre-wrap">
                            {message.content}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="max-w-[88%] rounded-[1.4rem] bg-background px-4 py-3 text-sm leading-6 text-foreground shadow-xs sm:max-w-[80%] sm:text-[15px]">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Scale className="h-4 w-4" strokeWidth={1.9} />
                    </div>
                    <div className="rounded-2xl bg-background px-4 py-3 shadow-xs">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce" />
                        <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce delay-100" />
                        <div className="h-2 w-2 rounded-full bg-primary/40 animate-bounce delay-200" />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="bg-primary/5  px-4 py-4 pb-5 sm:px-5">
              <div className="rounded-3xl bg-background p-2 shadow-xs">
                <div className="flex items-end gap-2">
                  <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Scriva un messaggio..."
                    rows={1}
                    className="min-h-0 flex-1 resize-none border-0 bg-transparent px-3 py-2.5 text-sm leading-6 shadow-none focus-visible:ring-0"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex justify-between items-end">
                  <p className="px-3 pt-1 text-[11px] leading-4 text-muted-foreground">
                    Invio con Invio, nuova riga con Maiusc + Invio.
                  </p>
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/92 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Invia messaggio"
                  >
                    <ArrowUp className="h-7 w-7" strokeWidth={2.4} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
