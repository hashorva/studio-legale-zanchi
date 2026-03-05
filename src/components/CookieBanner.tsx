'use client';

import { useState } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Switch } from '@/components/ui/switch';

const cookieCategories = [
  {
    key: 'essential',
    label: 'Cokkie essenziali',
    description: 'Necessari per il funzionamento del sito.',
    locked: true,
  },
  {
    key: 'analytics',
    label: 'Cokkie analitici',
    description: 'Ci aiutano a capire come viene usato il sito.',
    locked: false,
  },
  {
    key: 'maps',
    label: 'Google Maps',
    description: 'Necessari per mostrare la mappa dello studio.',
    locked: false,
  },
];
export default function CookieBanner() {
  const {
    consent,
    hasChosen,
    acceptAll,
    rejectAll,
    savePreferences,
    isPreferencesOpen,
    openPreferences,
  } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [localConsent, setLocalConsent] = useState(consent);
  const handleToggle = (key: 'analytics' | 'maps') => {
    setLocalConsent((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Don't render if user has already chosen
  if (hasChosen && !isPreferencesOpen) return null;

  return (
    <div>
      <div>
        <h2> La tua Privacy</h2>
        <p>
          Utilizziamo cookie per migliorare la tua esperienza, analizzare il
          traffico e mostrare contenuti personalizzati. Puoi scegliere quali
          cookie accettare.
        </p>

        {/* Preferences Panel - only visible when showPreferences is true */}
        {showPreferences && (
          <div>
            {/* Cookie Category row */}
            <div>
              {cookieCategories.map((categorie) => (
                <div key={categorie.key}>
                  <div>
                    <span>{categorie.label}</span>
                    <Switch
                      checked={
                        localConsent[
                          categorie.key as keyof typeof localConsent
                        ] as boolean
                      }
                      onCheckedChange={() => {
                        if (!categorie.locked) {
                          handleToggle(categorie.key as 'analytics' | 'maps');
                        }
                      }}
                      disabled={categorie.locked}
                    />
                  </div>
                  <p>{categorie.description}</p>
                </div>
              ))}
            </div>
            <button onClick={() => savePreferences(localConsent)}>
              Salva Preferenze
            </button>
          </div>
        )}
        {/* Action buttons */}
        <div>
          <button onClick={() => setShowPreferences(!showPreferences)}>
            Preferenze
          </button>
          <button onClick={rejectAll}>Rifiuta tutti</button>
          <button onClick={acceptAll}>Accetta tutti</button>
        </div>
      </div>
      {/* Layer 2 — positioning (fixed bottom) */}
      {/* Layer 3 — styling and colors */}
      {/* Layer 4 — the preferences panel */}
    </div>
  );
}
