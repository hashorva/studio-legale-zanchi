'use client';

import { useState } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';

export default function CookieBanner() {
  const {
    hasChosen,
    acceptAll,
    rejectAll,
    savePreferences,
    isPreferencesOpen,
    openPreferences,
  } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);

  // Don't render if user has already chosen
  if (hasChosen && !isPreferencesOpen) return null;

  return <div>
    {/* Layer 1 — structure and content, no styling */}
    {/* Layer 2 — positioning (fixed bottom) */}
    {/* Layer 3 — styling and colors */}
    {/* Layer 4 — the preferences panel */}
    </div>;
}
