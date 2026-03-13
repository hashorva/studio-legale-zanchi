'use client';

import { useEffect, useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlert, LoaderCircle, Send, CheckCircle2 } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
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

const UNSPECIFIED_SERVICE = '__unspecified_service__';
const UNSPECIFIED_EXPERTISE = '__unspecified_expertise__';

function InlineFieldHint({ text }: { text: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={text}
          className="inline-flex h-5 w-5 items-center justify-center rounded-full text-muted-foreground/80 transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-none"
        >
          <CircleAlert className="h-4 w-4" strokeWidth={1.8} />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64">
        {text}
      </PopoverContent>
    </Popover>
  );
}

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
    <div className={cn('space-y-6', className)}>
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
            className={cn(
              'space-y-6 mt-2',
              mode === 'dialog' && 'space-y-5'
            )}
          >
            <div className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cognome</FormLabel>
                      <FormControl>
                        <Input placeholder="Cognome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
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
              </div>
            </div>

            <div className="space-y-5 border-t-1 pt-5">
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="serviceSlug"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative pr-5">
                        <FormLabel>Servizio</FormLabel>
                        <div className="absolute -top-0.5 left-15">
                          <InlineFieldHint text={contactContent.serviceHelperText} />
                        </div>
                      </div>
                      <FormControl>
                        <Select
                          value={field.value || UNSPECIFIED_SERVICE}
                          onValueChange={(value) =>
                            field.onChange(
                              value === UNSPECIFIED_SERVICE ? '' : value
                            )
                          }
                        >
                          <SelectTrigger aria-label="Servizio">
                            <SelectValue placeholder="Non specificato" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={UNSPECIFIED_SERVICE}>
                              Non specificato
                            </SelectItem>
                            {services.map((service) => (
                              <SelectItem key={service.slug} value={service.slug}>
                                {service.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expertiseSlug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area specifica / Expertise</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value || UNSPECIFIED_EXPERTISE}
                          onValueChange={(value) =>
                            field.onChange(
                              value === UNSPECIFIED_EXPERTISE ? '' : value
                            )
                          }
                          disabled={!selectedService}
                        >
                          <SelectTrigger aria-label="Area specifica / Expertise">
                            <SelectValue placeholder="Selezioni se desidera" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={UNSPECIFIED_EXPERTISE}>
                              Selezioni se desidera
                            </SelectItem>
                            {expertiseOptions.map((expertise) => (
                              <SelectItem
                                key={expertise.slug}
                                value={expertise.slug}
                              >
                                {expertise.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-accent"
                        />
                      </FormControl>
                      <div className="space-y-2">
                        <FormLabel className="leading-relaxed">
                          Acconsento al trattamento dei dati per essere
                          ricontattato in merito alla richiesta.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4 border-t border-border/70 pt-5">
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                {contactContent.formPrivacyNote}
              </p>
              <div className="flex flex-wrap items-center justify-end gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent-dark hover:translate-x-0.5 cursor-pointer"
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
