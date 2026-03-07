'use client';

import { useCookieConsent } from '@/contexts/CookieConsentContext';

export default function CookiePreferencesButton() {
  const { openPreferences } = useCookieConsent();

  return (
    <li>
      <button
        onClick={openPreferences}
        className="text-white/50 py-4 hover:text-white/90 focus-visible:outline focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:rounded-sm cursor-pointer"
      >
        Gestisci Cookie
      </button>
    </li>
  );
}
