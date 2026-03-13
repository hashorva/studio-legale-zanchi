export type ChatRole = 'user' | 'assistant';

export type AppointmentSlot = {
  id: string;
  iso: string;
  dateLabel: string;
  timeLabel: string;
  fullLabel: string;
};

export type ChatMessage = {
  role: ChatRole;
  content: string;
  suggestedSlots?: AppointmentSlot[];
};

export type ChatRequestBody = {
  messages: ChatMessage[];
  activeSuggestedSlots?: AppointmentSlot[];
};

export type ChatResponseBody = {
  message: string;
  role: 'assistant';
  suggestedSlots?: AppointmentSlot[];
  activeSuggestedSlots?: AppointmentSlot[];
};
