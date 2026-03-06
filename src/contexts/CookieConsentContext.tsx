'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// The shape of the consent choices
type CookieConsent = {
  essential: true; // always true, hardcoded - cannot be changed
  analytics: boolean;
  thirdParty: boolean;
};

type MutableCookieConsent = {
  analytics: boolean;
  thirdParty: boolean;
};

// Everything the context broadcasts
type CookieConsentContextType = {
  consent: CookieConsent;
  hasChosen: boolean;
  isPreferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (newConsent: MutableCookieConsent) => void;
  openPreferences: () => void;
  closePreferences: () => void;
};

type StoredCookieConsent = {
  analytics: boolean;
  thirdParty: boolean;
  hasChosen: boolean;
};

const defaultConsent: CookieConsent = {
  essential: true as const,
  analytics: false,
  thirdParty: false,
};

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

function isValidStoredConsent(value: unknown): value is StoredCookieConsent {
  if (typeof value !== 'object' || value === null) return false;

  const v = value as Record<string, unknown>;
  return (
    typeof v.analytics === 'boolean' &&
    typeof v.thirdParty === 'boolean' &&
    typeof v.hasChosen === 'boolean'
  );
}

function loadSavedConsent() {
  // Guard against server (Next.js runs on server too)
  if (typeof window === 'undefined') return null;

  // Read from localStorage
  const saved = localStorage.getItem('cookie-consent');

  // If nothing saved, return default
  if (!saved) return null;

  // Validate localStorage content before using it as consent state
  try {
    const parsed: unknown = JSON.parse(saved);
    return isValidStoredConsent(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent>(() => {
    const saved = loadSavedConsent();

    return saved
      ? {
          essential: true as const,
          analytics: saved.analytics,
          thirdParty: saved.thirdParty,
        }
      : defaultConsent;
  });
  const [hasChosen, setHasChosen] = useState<boolean>(() => {
    const saved = loadSavedConsent();
    return saved ? saved.hasChosen : false;
  });
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const acceptAll = () => {
    const newConsent = {
      essential: true as const,
      analytics: true,
      thirdParty: true,
    };

    setConsent(newConsent);
    setHasChosen(true);
    closePreferences();

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
    setConsent(defaultConsent);
    setHasChosen(true);
    closePreferences();

    //Save preferences in localStorage for persistent memory
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        ...defaultConsent,
        hasChosen: true,
      })
    );
  };
  const openPreferences = () => {
    setIsPreferencesOpen(true);
  };

  const closePreferences = () => {
    setIsPreferencesOpen(false);
  };
  const savePreferences = (newConsent: MutableCookieConsent) => {
    const normalizedConsent: CookieConsent = {
      essential: true,
      analytics: newConsent.analytics,
      thirdParty: newConsent.thirdParty,
    };

    setConsent(normalizedConsent);
    setHasChosen(true);

    // Save preferences in localStorage for persistent memory
    localStorage.setItem(
      'cookie-consent',
      JSON.stringify({
        ...normalizedConsent,
        hasChosen: true,
      })
    );

    closePreferences();
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasChosen,
        isPreferencesOpen,
        acceptAll,
        rejectAll,
        savePreferences,
        openPreferences,
        closePreferences,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be within CookieConsentProvider');
  }
  return context;
}
