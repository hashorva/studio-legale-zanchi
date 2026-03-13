'use client';

import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle, Send, CheckCircle2 } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';

import {
  type ContactFormValues,
  contactFormSchema,
  getContactFormDefaults,
  submitContactRequest,
} from '@/lib/contact-form';
import { getContactContent, getServices } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';

type ContactFormProps = {
  defaultServiceSlug?: string;
  defaultExpertiseSlug?: string;
  mode?: 'page' | 'dialog';
  onSuccess?: () => void;
  className?: string;
};

const selectClassName =
  'border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive dark:bg-input/30 flex h-11 w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50';

export function ContactForm({
  defaultServiceSlug,
  defaultExpertiseSlug,
  mode = 'page',
  onSuccess,
  className,
}: ContactFormProps) {
  const contactContent = getContactContent();
  const services = getServices();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: getContactFormDefaults(
      defaultServiceSlug,
      defaultExpertiseSlug
    ),
  });

  const selectedServiceSlug = useWatch({
    control: form.control,
    name: 'serviceSlug',
  });

  const selectedService = useMemo(
    () => services.find((service) => service.slug === selectedServiceSlug),
    [selectedServiceSlug, services]
  );

  const expertiseOptions = useMemo(
    () => selectedService?.expertise ?? [],
    [selectedService]
  );

  useEffect(() => {
    const currentExpertise = form.getValues('expertiseSlug');

    if (!selectedServiceSlug) {
      if (currentExpertise) {
        form.setValue('expertiseSlug', '', { shouldValidate: true });
      }
      return;
    }

    const isValidExpertise = expertiseOptions.some(
      (item) => item.slug === currentExpertise
    );

    if (!isValidExpertise) {
      form.setValue('expertiseSlug', '', { shouldValidate: true });
    }
  }, [expertiseOptions, form, selectedServiceSlug]);

  async function onSubmit(values: ContactFormValues) {
    setIsSuccess(false);

    const result = await submitContactRequest(values);
    if (!result.success) return;

    setIsSuccess(true);
    onSuccess?.();
    form.reset(
      getContactFormDefaults(defaultServiceSlug, defaultExpertiseSlug)
    );
  }

  return (
    <div className={cn('rounded-[2rem] bg-background p-6 shadow-xs md:p-8', className)}>
      {isSuccess ? (
        <div className="flex min-h-72 flex-col items-start justify-center gap-4">
          <CheckCircle2
            className="h-12 w-12 text-accent-dark"
            strokeWidth={1.8}
            aria-hidden="true"
          />
          <h3 className="font-serif text-3xl font-semibold text-foreground">
            Richiesta inviata
          </h3>
          <p className="max-w-2xl font-sans text-base leading-relaxed text-muted-foreground">
            {contactContent.formSuccessMessage}
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsSuccess(false)}
          >
            Invia un&apos;altra richiesta
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn('space-y-6', mode === 'dialog' && 'space-y-5')}
          >
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome e cognome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome e cognome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        inputMode="email"
                        placeholder="nome@email.it"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefono</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        inputMode="tel"
                        placeholder="Facoltativo"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="serviceSlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servizio</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className={selectClassName}
                        aria-label="Servizio"
                      >
                        <option value="">Non specificato</option>
                        {services.map((service) => (
                          <option key={service.slug} value={service.slug}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormDescription>
                      {contactContent.serviceHelperText}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="expertiseSlug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area specifica / Expertise</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      disabled={!selectedService}
                      className={selectClassName}
                      aria-label="Area specifica / Expertise"
                    >
                      <option value="">Selezioni se desidera</option>
                      {expertiseOptions.map((expertise) => (
                        <option key={expertise.slug} value={expertise.slug}>
                          {expertise.title}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Messaggio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descriva brevemente la sua richiesta."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="privacyAccepted"
              render={({ field }) => (
                <FormItem className="rounded-2xl border border-border/70 bg-primary/[0.03] p-4">
                  <div className="flex items-start gap-3">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(event) =>
                          field.onChange(event.currentTarget.checked)
                        }
                        className="mt-1 h-4 w-4 rounded border-border accent-accent"
                      />
                    </FormControl>
                    <div className="space-y-2">
                      <FormLabel>
                        Acconsento al trattamento dei dati per essere
                        ricontattato in merito alla richiesta.
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4 border-t border-border/70 pt-5">
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                {contactContent.formPrivacyNote}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent-dark"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <Send className="mr-1 h-4 w-4" />
                  )}
                  {contactContent.formSubmitLabel}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
