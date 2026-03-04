'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// The shape of the consent choices
type CookieConsent = {
  essential: true; // always true, hardcoded - cannot be changed
  analytics: boolean;
  maps: boolean;
};

// Everything the context broadcasts
type CookieConsentContextType = {
  consent: CookieConsent;
  hasChosen: boolean;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (consent: CookieConsent) => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>({
    essential: true,
    analytics: false,
    maps: false,
  });
  const [hasChosen, setHasChosen] = useState(false);
  const [isPrecerencesOpen, setIsPreferencesOpen] = useState(false);
}
