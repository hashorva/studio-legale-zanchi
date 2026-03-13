'use client';

import Link from 'next/link';
import { MapPinned } from 'lucide-react';

import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { getContactContent } from '@/lib/content';
import { Button } from '@/components/ui/button';

type CookieAwareMapProps = {
  className?: string;
};

export function CookieAwareMap({ className }: CookieAwareMapProps) {
  const content = getContactContent().map;
  const { consent, openPreferences } = useCookieConsent();

  if (!consent.thirdParty) {
    return (
      <div
        className={className}
      >
        <div className="rounded-[2rem] border border-border/70 bg-background p-6 shadow-xs">
          <MapPinned
            className="mb-4 h-10 w-10 text-accent-dark"
            strokeWidth={1.6}
            aria-hidden="true"
          />
          <h3 className="mb-3 font-serif text-3xl font-semibold text-foreground">
            {content.fallbackTitle}
          </h3>
          <p className="mb-3 font-sans text-sm leading-relaxed text-muted-foreground">
            {content.fallbackDescription[0]}
          </p>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground">
            {content.fallbackDescription[1]}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={openPreferences}
            >
              {content.manageCookiesLabel}
            </Button>
            <Button asChild className="bg-primary hover:bg-primary-dark">
              <Link href={content.mapsUrl} target="_blank" rel="noopener noreferrer">
                {content.openMapsLabel}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-background shadow-xs">
        <iframe
          title={content.title}
          src={content.embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[320px] w-full border-0"
        />
      </div>
    </div>
  );
}
