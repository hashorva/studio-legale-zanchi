import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { aboutContent } from '@/lib/about';
import type {
  AppointmentSlot,
  ChatMessage,
  ChatRequestBody,
  ChatResponseBody,
} from '@/lib/chat';
import { contactContent } from '@/lib/contact';
import { servizi } from '@/lib/services';

const FALLBACK_OFFICE_WINDOWS = [
  { startMinutes: 9 * 60, endMinutes: 13 * 60 },
  { startMinutes: 15 * 60, endMinutes: 19 * 60 + 30 },
];

const APPOINTMENT_PROMPT_KEYWORDS = [
  'appuntamento',
  'appuntamenti',
  'consulenza',
  'data',
  'date',
  'orario',
  'orari',
  'disponibil',
  'incontro',
  'vederci',
  'vediamoci',
  'prenot',
];

const ALTERNATIVE_SLOT_KEYWORDS = [
  'altra data',
  'altro giorno',
  'altro orario',
  'altre date',
  'altro slot',
  'diverso',
  'spostare',
  'cambiare',
  'preferirei',
];

const TIME_OPTIONS_BY_WINDOW = new Map<number, string[]>([
  [9 * 60, ['09:30', '10:00', '10:30', '11:00', '11:30', '12:00']],
  [15 * 60, ['15:30', '16:00', '16:30', '17:00', '17:30', '18:00']],
]);

const TIME_ZONE = 'Europe/Rome';
const DATE_FORMATTER = new Intl.DateTimeFormat('it-IT', {
  timeZone: TIME_ZONE,
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});
const TIME_FORMATTER = new Intl.DateTimeFormat('it-IT', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});
const WEEKDAY_FORMATTER = new Intl.DateTimeFormat('it-IT', {
  timeZone: TIME_ZONE,
  weekday: 'long',
});
const MONTH_FORMATTER = new Intl.DateTimeFormat('it-IT', {
  timeZone: TIME_ZONE,
  month: 'long',
});

const BASE_SYSTEM_PROMPT = `Sei l'assistente virtuale dello Studio Legale Zanchi.

OBIETTIVO
- Accogli il visitatore con tono professionale, chiaro e cordiale.
- Comprendi il problema legale con domande mirate.
- Verifica se lo studio può aiutare usando solo il contesto fornito.
- Riassumi la situazione prima di proporre un appuntamento.
- Se la richiesta non rientra chiaramente nelle competenze, dichiaralo con onestà e invita al contatto diretto.

STILE
- Tono formale ma accessibile.
- Empatia per questioni delicate.
- Nessuna informazione inventata.
- Risposte concise ma utili.

REGOLE APPUNTAMENTI
- Non inventare mai date o orari.
- Se ti vengono forniti slot disponibili, usa solo quelli.
- Se uno slot già proposto viene scelto anche con formulazione abbreviata, conferma esattamente quello slot.
- Se l'utente chiede un orario o un giorno diverso dagli slot attivi, non confermare autonomamente la disponibilità: spiega che puoi proporre nuove disponibilità e resta coerente con gli slot forniti dal sistema.
- Raccogli l'email solo dopo che la data è stata concordata.
- Quando confermi una scelta, mantieni il formato completo della data e dell'orario.`;

function normaliseText(value: string) {
  return value.toLowerCase();
}

function formatHoursForPrompt() {
  return contactContent.officeHours.hours
    .map((item) => `${item.label}: ${item.value}`)
    .join('; ');
}

function buildGroundingContext() {
  const serviceLines = servizi
    .map((service) => {
      const expertiseTitles = service.expertise
        .slice(0, 4)
        .map((item) => item.title)
        .join(', ');
      const faqLines = service.expertise
        .flatMap((item) =>
          (item.faq ?? []).slice(0, 1).map((faq) => `Q: ${faq.question} A: ${faq.answer}`)
        )
        .slice(0, 2)
        .join(' ');

      return `- ${service.title}: ${service.shortDescription} Ambiti: ${expertiseTitles}. ${faqLines}`;
    })
    .join('\n');

  const toneParagraphs = aboutContent.page.sections.method.paragraphs.join(' ');

  return `CONTESTO STUDIO
Studio Legale Zanchi opera a Milano con approccio fondato su rigore, chiarezza e attenzione al caso concreto.
Metodo: ${toneParagraphs}

CONTATTI
Telefono: ${contactContent.cards.phone.actionLabel}
Email: ${contactContent.cards.email.actionLabel}
Indirizzo: ${contactContent.cards.address.actionLabel}
Orari di studio: ${formatHoursForPrompt()}

SERVIZI E FAQ
${serviceLines}`;
}

function parseOfficeWindows() {
  const parsed = contactContent.officeHours.hours.flatMap((entry) => {
    const match = entry.value.match(/(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})/);
    if (!match) {
      return [];
    }

    const [, startHour, startMinute, endHour, endMinute] = match;
    return [
      {
        startMinutes: Number(startHour) * 60 + Number(startMinute),
        endMinutes: Number(endHour) * 60 + Number(endMinute),
      },
    ];
  });

  if (parsed.length > 0) {
    return parsed;
  }

  console.warn('Chat route: failed to parse office hours, using fallback windows');
  return FALLBACK_OFFICE_WINDOWS;
}

function makeDateAtMinutes(baseDate: Date, minutes: number) {
  const nextDate = new Date(baseDate);
  nextDate.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0);
  return nextDate;
}

function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function addBusinessDays(baseDate: Date, businessDays: number) {
  const nextDate = new Date(baseDate);
  let added = 0;

  while (added < businessDays) {
    nextDate.setDate(nextDate.getDate() + 1);
    if (!isWeekend(nextDate)) {
      added += 1;
    }
  }

  return nextDate;
}

function hashSeed(input: string) {
  let hash = 0;

  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function buildSlotCandidates(baseDate: Date) {
  const officeWindows = parseOfficeWindows();
  const targetDates = [
    addBusinessDays(baseDate, 2),
    addBusinessDays(baseDate, 3),
    addBusinessDays(baseDate, 4),
  ];

  return targetDates.flatMap((date) =>
    officeWindows.flatMap((window) => {
      const presetTimes = TIME_OPTIONS_BY_WINDOW.get(window.startMinutes) ?? [];
      const candidateTimes = presetTimes.filter((timeLabel) => {
        const [hours, minutes] = timeLabel.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        return (
          totalMinutes >= window.startMinutes &&
          totalMinutes <= window.endMinutes
        );
      });

      return candidateTimes.map((timeLabel) => {
        const [hours, minutes] = timeLabel.split(':').map(Number);
        return makeDateAtMinutes(date, hours * 60 + minutes);
      });
    })
  );
}

function formatFullSlotLabel(date: Date) {
  const weekday = WEEKDAY_FORMATTER.format(date);
  const day = date.getDate();
  const month = MONTH_FORMATTER.format(date);
  const time = TIME_FORMATTER.format(date);

  return `${weekday} ${day} ${month} alle ${time}`;
}

function serialiseSlot(date: Date, index: number): AppointmentSlot {
  const iso = date.toISOString();
  const dateLabel = DATE_FORMATTER.format(date);
  const timeLabel = TIME_FORMATTER.format(date);

  return {
    id: `slot-${date.getTime()}-${index}`,
    iso,
    dateLabel,
    timeLabel,
    fullLabel: formatFullSlotLabel(date),
  };
}

function generateAppointmentSlots(messages: ChatMessage[]) {
  const now = new Date();
  const candidates = buildSlotCandidates(now);
  const seedSource = `${DATE_FORMATTER.format(now)}|${messages
    .map((message) => `${message.role}:${message.content}`)
    .join('|')}`;
  const seed = hashSeed(seedSource);
  const indexedCandidates = candidates.map((date, index) => ({ date, index }));
  indexedCandidates.sort((left, right) => {
    const leftHash = hashSeed(`${seed}-${left.date.toISOString()}-${left.index}`);
    const rightHash = hashSeed(`${seed}-${right.date.toISOString()}-${right.index}`);
    return leftHash - rightHash;
  });

  return indexedCandidates
    .slice(0, 3)
    .sort((left, right) => left.date.getTime() - right.date.getTime())
    .map((item, index) => serialiseSlot(item.date, index));
}

function matchesExistingSlot(
  content: string,
  activeSuggestedSlots: AppointmentSlot[]
) {
  const normalisedContent = normaliseText(content);

  return activeSuggestedSlots.find((slot) => {
    const dateFragments = [
      slot.dateLabel,
      slot.timeLabel,
      slot.fullLabel,
      slot.fullLabel.replace(' alle ', ' '),
      `alle ${slot.timeLabel}`,
      `${slot.dateLabel} ${slot.timeLabel}`,
      `${slot.dateLabel} alle ${slot.timeLabel}`,
    ].map(normaliseText);

    return dateFragments.some((fragment) => normalisedContent.includes(fragment));
  });
}

function userAskedForAppointment(messages: ChatMessage[]) {
  const lastUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === 'user');

  if (!lastUserMessage) {
    return false;
  }

  const content = normaliseText(lastUserMessage.content);
  return APPOINTMENT_PROMPT_KEYWORDS.some((keyword) => content.includes(keyword));
}

function userAskedForAlternativeSlots(content: string) {
  const normalisedContent = normaliseText(content);
  return ALTERNATIVE_SLOT_KEYWORDS.some((keyword) =>
    normalisedContent.includes(keyword)
  );
}

function shouldSuggestAppointments(
  messages: ChatMessage[],
  activeSuggestedSlots: AppointmentSlot[]
) {
  const userMessages = messages.filter((message) => message.role === 'user');
  const lastUserMessage = userMessages.at(-1);

  if (!lastUserMessage) {
    return false;
  }

  if (activeSuggestedSlots.length > 0 && !userAskedForAlternativeSlots(lastUserMessage.content)) {
    return false;
  }

  return userAskedForAppointment(messages) || userMessages.length >= 2;
}

function buildDynamicPrompt(
  messages: ChatMessage[],
  activeSuggestedSlots: AppointmentSlot[],
  nextSuggestedSlots: AppointmentSlot[]
) {
  const lastUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === 'user');
  const matchedSlot =
    lastUserMessage && activeSuggestedSlots.length > 0
      ? matchesExistingSlot(lastUserMessage.content, activeSuggestedSlots)
      : undefined;

  const activeSlotsSection =
    activeSuggestedSlots.length > 0
      ? `SLOT ATTIVI
${activeSuggestedSlots
  .map((slot) => `- ${slot.fullLabel} (${slot.dateLabel} · ${slot.timeLabel})`)
  .join('\n')}`
      : 'SLOT ATTIVI\n- Nessuno.';

  const nextSlotsSection =
    nextSuggestedSlots.length > 0
      ? `NUOVI SLOT DA PROPORRE
${nextSuggestedSlots
  .map((slot) => `- ${slot.fullLabel} (${slot.dateLabel} · ${slot.timeLabel})`)
  .join('\n')}

ISTRUZIONE
- In questo turno puoi proporre esattamente questi tre slot nel testo della risposta.
- Presentali in una frase naturale e chiudi chiedendo quale preferisce.`
      : `NUOVI SLOT DA PROPORRE
- Nessuno in questo turno.

ISTRUZIONE
- In questo turno non proporre nuove date.`;

  const matchedSlotSection = matchedSlot
    ? `SCELTA RICONOSCIUTA
- L'ultimo messaggio dell'utente corrisponde a questo slot già proposto: ${matchedSlot.fullLabel}.
- Conferma esattamente questo slot e prosegui chiedendo l'indirizzo email per la conferma.`
    : 'SCELTA RICONOSCIUTA\n- Nessuna scelta certa rilevata.';

  return `${buildGroundingContext()}

${activeSlotsSection}

${nextSlotsSection}

${matchedSlotSection}`;
}

function sanitiseMessages(messages: ChatMessage[]) {
  return messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    const body = (await request.json()) as ChatRequestBody;
    const messages = Array.isArray(body.messages) ? body.messages : undefined;
    const activeSuggestedSlots = Array.isArray(body.activeSuggestedSlots)
      ? body.activeSuggestedSlots
      : [];

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey });
    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === 'user');

    const matchedExistingSlot =
      lastUserMessage && activeSuggestedSlots.length > 0
        ? matchesExistingSlot(lastUserMessage.content, activeSuggestedSlots)
        : undefined;

    const shouldOfferSlots =
      !matchedExistingSlot &&
      shouldSuggestAppointments(messages, activeSuggestedSlots);

    const nextSuggestedSlots = shouldOfferSlots
      ? generateAppointmentSlots(messages)
      : [];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: BASE_SYSTEM_PROMPT },
        {
          role: 'system',
          content: buildDynamicPrompt(
            messages,
            activeSuggestedSlots,
            nextSuggestedSlots
          ),
        },
        ...sanitiseMessages(messages),
      ],
      temperature: 0.5,
      max_tokens: 500,
    });

    const assistantMessage = completion.choices[0]?.message?.content?.trim();

    if (!assistantMessage) {
      throw new Error('No response from API');
    }

    const responseBody: ChatResponseBody = {
      message: assistantMessage,
      role: 'assistant',
      suggestedSlots: nextSuggestedSlots.length > 0 ? nextSuggestedSlots : undefined,
      activeSuggestedSlots:
        nextSuggestedSlots.length > 0 ? nextSuggestedSlots : activeSuggestedSlots,
    };

    return NextResponse.json(responseBody);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
