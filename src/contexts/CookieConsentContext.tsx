'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';

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
  const [consent, setConsent] = useState<CookieConsent>(() => {
    const defaultConsent = {
      essential: true as const,
      analytics: false,
      maps: false,
    }

    // Guard against server (Next.js runs on server too)
    if (typeof window === 'undefined') return defaultConsent

    // Read from localStorage
    const saved = localStorage.getItem('cookie-consent')

    // If nothing saved, return default
    if (!saved) return defaultConsent

    // Parse and return saved value
    const parsed = JSON.parse(saved)
    return {
      essential: true as const,
      analytics: parsed.analytics,
      maps: parsed.maps,
    }
  });
  const [hasChosen, setHasChosen] = useState<boolean>(() => {
    // Guard against server (Next.js runs on server too)
    if (typeof window === 'undefined') return false

    // Read from localStorage
    const saved = localStorage.getItem('cookie-consent')

    // If nothing saved, return default
    if (!saved) return false

    // Parse and return saved value
    const parsed = JSON.parse(saved)
    return parsed.hasChosen ?? false
  });
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const acceptAll = () => {
    const newConsent = {
      essential: true as const,
      analytics: true,
      maps: true,
    };

    setConsent(newConsent);
    setHasChosen(true);

    // Save preferences in localStorage for persistent memory
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        ...newConsent,
        hasChosen: true,
      })
    );
  };
  const rejectAll = () => {
    const newConsent = {
      essential: true as const,
      analytics: false,
      maps: false,
    };
    setConsent(newConsent);
    setHasChosen(true);

    //Save preferences in localStorage for persistent memory
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        ...newConsent,
        hasChosen: true,
      })
    );
  };
}
