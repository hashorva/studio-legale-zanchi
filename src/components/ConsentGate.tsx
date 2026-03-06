'use client';

import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Button } from '@/components/ui/button';

type ConsentCategory = 'analytics' | 'thirdParty';

interface ConsentGateProps {
  category: ConsentCategory;
  placeholder?: string;
  children: React.ReactNode;
}

export default function ConsentGate({
  category,
  placeholder = 'Questo contenuto richiede il tuo consenso per essere visualizzato.',
  children,
}: ConsentGateProps) {
  const { consent, openPreferences } = useCookieConsent();

  if (consent[category]) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-muted/30 p-8 text-center">
      <p className="text-sm text-muted-foreground">{placeholder}</p>
      <Button variant={'outline'} size={'sm'} onClick={openPreferences}>
        Gestisci preferenze
      </Button>
    </div>
  );
}
