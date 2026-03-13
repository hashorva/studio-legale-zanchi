'use client';

import { useState, useRef, useEffect } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUp, CalendarDays, MessageCircle, Scale } from 'lucide-react';
import { motion } from 'framer-motion';
import type {
  AppointmentSlot,
  ChatMessage,
  ChatResponseBody,
} from '@/lib/chat';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSuggestedSlots, setActiveSuggestedSlots] = useState<
    AppointmentSlot[]
  >([]);
  const [viewportHeight, setViewportHeight] = useState<number | null>(null);
  const [viewportOffsetTop, setViewportOffsetTop] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const focusTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.focus({ preventScroll: true });
  };

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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateViewportMetrics = () => {
      const visualViewport = window.visualViewport;
      const width = visualViewport?.width ?? window.innerWidth;

      setIsMobileViewport(width < 640);
      setViewportHeight(visualViewport?.height ?? window.innerHeight);
      setViewportOffsetTop(visualViewport?.offsetTop ?? 0);
    };

    updateViewportMetrics();

    const visualViewport = window.visualViewport;
    visualViewport?.addEventListener('resize', updateViewportMetrics);
    visualViewport?.addEventListener('scroll', updateViewportMetrics);
    window.addEventListener('resize', updateViewportMetrics);

    return () => {
      visualViewport?.removeEventListener('resize', updateViewportMetrics);
      visualViewport?.removeEventListener('scroll', updateViewportMetrics);
      window.removeEventListener('resize', updateViewportMetrics);
    };
  }, []);

  // Send initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add initial AI greeting
      setMessages([
        {
          role: 'assistant',
          content:
            "Benvenuto! Sono l'assistente virtuale dello Studio Legale Zanchi. Come posso aiutarla oggi?",
          suggestedSlots: [],
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = async (content = input) => {
    if (!content.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    window.setTimeout(() => {
      focusTextarea();
      scrollToBottom();
    }, 0);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          activeSuggestedSlots,
        }),
      });

      const data = (await response.json()) as ChatResponseBody;

      if (data.message) {
        const assistantMessage: ChatMessage = {
          role: 'assistant',
          content: data.message,
          suggestedSlots: data.suggestedSlots,
        };

        setMessages([
          ...newMessages,
          assistantMessage,
        ]);
        setActiveSuggestedSlots(data.activeSuggestedSlots ?? []);
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
          suggestedSlots: [],
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

  const handleInputFocus = () => {
    window.setTimeout(scrollToBottom, 250);
  };

  const canSend = input.trim().length > 0 && !isLoading;

  const handleSendButtonPointerDown = (
    e: React.PointerEvent<HTMLButtonElement>
  ) => {
    if (!isMobileViewport) return;

    e.preventDefault();
    focusTextarea();
  };

  const handleSendButtonTouchEnd = (
    e: React.TouchEvent<HTMLButtonElement>
  ) => {
    if (!isMobileViewport) return;

    e.preventDefault();
    if (canSend) {
      sendMessage();
    } else {
      focusTextarea();
    }
  };

  const handleSendButtonClick = () => {
    if (canSend) {
      sendMessage();
      return;
    }

    focusTextarea();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setIsOpen(nextOpen);

    if (!nextOpen) {
      textareaRef.current?.blur();
      return;
    }

    window.setTimeout(() => {
      focusTextarea();
      scrollToBottom();
    }, 0);
  };

  const handleSuggestedSlotSelect = (slot: AppointmentSlot) => {
    if (isLoading) return;

    sendMessage(`Scelgo ${slot.dateLabel} alle ${slot.timeLabel}.`);
  };

  const dialogStyle: CSSProperties | undefined = isMobileViewport && viewportHeight
    ? {
        top: `${Math.max(viewportOffsetTop, 0) + 4}px`,
        height: `${Math.max(viewportHeight - 8, 420)}px`,
      }
    : undefined;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="fixed right-4 bottom-4 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-lg transition-shadow hover:shadow-xl sm:right-6 sm:bottom-6 sm:p-4"
          aria-label="Apri chat"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      </DialogTrigger>

      <DialogContent
        style={dialogStyle}
        className="left-1/2 top-1 -translate-x-1/2 translate-y-0 flex h-[calc(100dvh-0.5rem)] max-h-[calc(100dvh-0.5rem)] w-[calc(100%-0.5rem)] max-w-none flex-col gap-0 overflow-hidden rounded-[1.75rem] border-0 bg-background p-0 shadow-2xl sm:top-[50%] sm:h-[620px] sm:max-h-[calc(100vh-100px)] sm:w-full sm:max-w-lg sm:-translate-y-1/2 sm:rounded-[2rem] [&>[data-slot=dialog-close]]:top-3 [&>[data-slot=dialog-close]]:right-3 [&>[data-slot=dialog-close]]:h-9 [&>[data-slot=dialog-close]]:w-9 [&>[data-slot=dialog-close]]:sm:top-5 [&>[data-slot=dialog-close]]:sm:right-5 [&>[data-slot=dialog-close]]:sm:h-10 [&>[data-slot=dialog-close]]:sm:w-10"
      >
        <DialogHeader className="shrink-0 bg-primary/2 px-4 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-4">
          <p className="pl-2 text-[10px] font-medium uppercase tracking-[0.16em] text-primary leading-tight sm:pr-14 sm:text-xs sm:tracking-[0.18em]">
            Studio Legale Zanchi
          </p>
          <DialogTitle className="pr-12 font-serif text-[1.45rem] leading-none text-accent/80 sm:pr-14 sm:text-2xl">
            Assistente Virtuale
          </DialogTitle>
          <DialogDescription className="pr-12 text-[13px] leading-5 sm:pr-14 sm:text-sm sm:leading-6">
            Ti posso aiutare a individuare il servizio adatto e a fissare un
            appuntamento.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto bg-primary/5 px-3 py-4 sm:px-5 sm:py-5">
          <div className="space-y-5 sm:space-y-6">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  message.role === 'user' ? 'flex justify-end' : 'flex gap-3'
                }
              >
                {message.role === 'assistant' ? (
                  <>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:h-9 sm:w-9">
                      <Scale className="h-4 w-4" strokeWidth={1.9} />
                    </div>
                    <div className="max-w-[min(100%,34rem)] pt-0.5 text-[15px] leading-7 text-foreground sm:pt-1 sm:text-[15px]">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.suggestedSlots && message.suggestedSlots.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestedSlots.map((slot) => (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => handleSuggestedSlotSelect(slot)}
                              onMouseDown={(e) => e.preventDefault()}
                              onTouchStart={(e) => e.preventDefault()}
                              className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background px-3 py-2 text-[13px] font-medium leading-none text-primary transition-colors hover:bg-primary/5"
                              aria-label={`Seleziona ${slot.fullLabel}`}
                            >
                              <CalendarDays className="h-3.5 w-3.5" />
                              <span>{slot.dateLabel}</span>
                              <span className="text-primary/60">·</span>
                              <span>{slot.timeLabel}</span>
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </>
                ) : (
                  <div className="max-w-[90%] rounded-[1.25rem] bg-background px-4 py-3 text-[15px] leading-6 text-foreground shadow-xs sm:max-w-[80%] sm:rounded-[1.4rem] sm:text-[15px]">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                )}
              </motion.div>
            ))}

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

        <div className="bg-primary/5 px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5 sm:py-4 sm:pb-5">
          <div className="rounded-[1.6rem] bg-background p-2 shadow-xs sm:rounded-3xl">
            <div className="flex items-end gap-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                placeholder="Scriva un messaggio..."
                rows={1}
                className="min-h-0 flex-1 resize-none border-0 bg-transparent px-3 py-2 text-base leading-6 shadow-none focus-visible:ring-0 sm:py-2.5 sm:text-sm"
                aria-disabled={isLoading}
              />
            </div>
            <div className="flex items-end justify-end sm:justify-between">
              <p className="hidden sm:block px-3 pt-1 text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
                Invio con Invio, nuova riga con Maiusc + Invio.
              </p>
              <button
                type="button"
                tabIndex={isMobileViewport ? -1 : 0}
                onClick={handleSendButtonClick}
                onPointerDown={handleSendButtonPointerDown}
                onTouchEnd={handleSendButtonTouchEnd}
                aria-disabled={!canSend}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/92 aria-disabled:cursor-not-allowed aria-disabled:opacity-40 sm:h-11 sm:w-11"
                aria-label="Invia messaggio"
              >
                <ArrowUp className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2.4} />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
