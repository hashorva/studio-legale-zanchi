import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getContactContent } from '@/lib/content';

const icons = {
  phone: Phone,
  email: Mail,
  address: MapPin,
} as const;

export function ContactInfoCards() {
  const content = getContactContent();
  const cards = [
    { key: 'phone', ...content.cards.phone },
    { key: 'email', ...content.cards.email },
    { key: 'address', ...content.cards.address },
  ] as const;

  return (
    <section aria-labelledby="contact-info-heading" className="mb-12">
      <h2 id="contact-info-heading" className="sr-only">
        Contatti rapidi
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => {
          const Icon = icons[card.key];

          return (
            <Card
              key={card.key}
              className="rounded-[2rem] border-border/70 bg-background py-0 shadow-xs"
            >
              <CardHeader className="px-6 pt-6">
                <Icon
                  className="mb-3 h-10 w-10 text-accent-dark"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <CardTitle className="font-serif text-3xl">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
                <Link
                  href={card.actionHref}
                  target={card.key === 'address' ? '_blank' : undefined}
                  rel={card.key === 'address' ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center rounded-full bg-primary/[0.06] px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {card.actionLabel}
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
