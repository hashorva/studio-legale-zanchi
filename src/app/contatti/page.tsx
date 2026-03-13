import type { Metadata } from 'next';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';

import { ContactForm } from '@/components/ContactForm';
import { ContactInfoCards } from '@/components/ContactInfoCards';
import { CookieAwareMap } from '@/components/CookieAwareMap';
import { getContactContent } from '@/lib/content';

const contactContent = getContactContent();

export const metadata: Metadata = {
  title: contactContent.metaTitle,
  description: contactContent.metaDescription,
};

type Props = {
  searchParams: Promise<{
    servizio?: string;
    expertise?: string;
  }>;
};

export default async function ContattiPage({ searchParams }: Props) {
  const params = await searchParams;
  const defaultServiceSlug = params.servizio;
  const defaultExpertiseSlug = params.expertise;

  return (
    <main>
      <article>
        <header className="relative bg-primary">
          <div className="mx-auto max-w-7xl px-4 pt-24 pb-14 md:px-6 md:pt-32 md:pb-18">
            <div className="max-w-4xl">
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                Studio Legale Zanchi
              </p>
              <h1 className="mb-5 font-serif text-5xl font-medium leading-tight text-white/90 md:text-6xl">
                {contactContent.introTitle}
              </h1>
              <p className="max-w-3xl font-sans text-lg leading-relaxed text-white/75">
                {contactContent.introDescription}
              </p>
            </div>
          </div>
        </header>

        <div className="bg-black/1">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
            <ContactInfoCards />

            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
              <section aria-labelledby="contact-form-heading">
                <div className="mb-6 max-w-3xl">
                  <h2
                    id="contact-form-heading"
                    className="mb-3 font-serif text-4xl font-semibold text-foreground md:text-5xl"
                  >
                    {contactContent.formTitle}
                  </h2>
                  <p className="font-sans text-lg leading-relaxed text-muted-foreground">
                    {contactContent.formDescription}
                  </p>
                </div>
                <ContactForm
                  defaultServiceSlug={defaultServiceSlug}
                  defaultExpertiseSlug={defaultExpertiseSlug}
                />
              </section>

              <div className="space-y-6">
                <section aria-labelledby="map-heading">
                  <h2
                    id="map-heading"
                    className="mb-4 font-serif text-3xl font-semibold text-foreground"
                  >
                    {contactContent.map.title}
                  </h2>
                  <CookieAwareMap />
                </section>

                <section className="rounded-[2rem] border border-border/70 bg-background p-6 shadow-xs">
                  <h2 className="mb-4 font-serif text-3xl font-semibold text-foreground">
                    {contactContent.officeHours.title}
                  </h2>
                  <p className="mb-5 font-sans text-sm leading-relaxed text-muted-foreground">
                    {contactContent.officeHours.description}
                  </p>

                  <dl className="space-y-4 border-t border-border/70 pt-4">
                    {contactContent.officeHours.hours.map((item, index) => (
                      <div
                        key={`${item.label}-${index}`}
                        className="flex items-start justify-between gap-4"
                      >
                        <dt className="flex items-center gap-2 font-sans text-sm font-medium text-foreground">
                          <Clock3
                            className="h-4 w-4 text-accent-dark"
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                          {item.label}
                        </dt>
                        <dd className="font-sans text-sm text-muted-foreground">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-6 space-y-3 border-t border-border/70 pt-4 text-sm">
                    <a
                      href={contactContent.cards.phone.actionHref}
                      className="flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                    >
                      <Phone
                        className="h-4 w-4 text-accent-dark"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      {contactContent.cards.phone.actionLabel}
                    </a>
                    <a
                      href={contactContent.cards.email.actionHref}
                      className="flex items-center gap-2 text-foreground transition-colors hover:text-accent"
                    >
                      <Mail
                        className="h-4 w-4 text-accent-dark"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      {contactContent.cards.email.actionLabel}
                    </a>
                    <a
                      href={contactContent.cards.address.actionHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 text-foreground transition-colors hover:text-accent"
                    >
                      <MapPin
                        className="mt-0.5 h-4 w-4 text-accent-dark"
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <span>{contactContent.cards.address.actionLabel}</span>
                    </a>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
