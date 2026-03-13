import { z } from 'zod';

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Inserisca nome e cognome.')
    .max(120, 'Il nome è troppo lungo.'),
  email: z.string().email('Inserisca un indirizzo email valido.'),
  phone: z.string().max(40, 'Il numero è troppo lungo.').optional(),
  serviceSlug: z.string().optional(),
  expertiseSlug: z.string().optional(),
  message: z
    .string()
    .min(20, 'Descriva brevemente la richiesta.')
    .max(4000, 'Il messaggio è troppo lungo.'),
  privacyAccepted: z.literal(true, {
    errorMap: () => ({
      message: 'È necessario accettare il trattamento dei dati per proseguire.',
    }),
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export function getContactFormDefaults(
  defaultServiceSlug?: string,
  defaultExpertiseSlug?: string
): ContactFormValues {
  return {
    fullName: '',
    email: '',
    phone: '',
    serviceSlug: defaultServiceSlug ?? '',
    expertiseSlug: defaultExpertiseSlug ?? '',
    message: '',
    privacyAccepted: false,
  };
}

/**
 * Placeholder submission boundary.
 * Future email integration should happen here so the UI can keep calling the
 * same abstraction when we switch to a real provider/server action.
 */
export async function submitContactRequest(values: ContactFormValues) {
  await new Promise((resolve) => setTimeout(resolve, 900));

  // Future integration:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const payload = values;
  // 1. persist or forward the contact request
  // 2. send notification email to the studio
  // 3. send confirmation email to the visitor
  return { success: true as const };
}
