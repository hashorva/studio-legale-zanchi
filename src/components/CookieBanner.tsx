'use client';

import { useState } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

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
    <>
      {/* Overlay - covers entire screen */}
      <div className="fixed inset-0 z-40 bg-primary-dark/60" />
      {/* Banner - floating card, fixed to bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          {/* Card */}
          <div className="rounded-2xl border border-white/20 bg-white/50 backdrop-blur-md [-webkit-backdrop-filter:blur(12px)]  shadow-2xl p-6">
            <div>
              <div>
                <h2 className="font-serif text-xl font-semibold text-primary mb-2">
                  {' '}
                  La tua Privacy
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Utilizziamo cookie per migliorare la tua esperienza,
                  analizzare il traffico e mostrare contenuti personalizzati.
                  Puoi scegliere quali cookie accettare.
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
                                  handleToggle(
                                    categorie.key as 'analytics' | 'maps'
                                  );
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
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button
                    variant="subtle"
                    onClick={() => setShowPreferences(!showPreferences)}
                  >
                    Preferenze
                  </Button>
                  <Button variant="subtle" onClick={rejectAll} >
                    Rifiuta tutti
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary-dark text-white"
                    onClick={acceptAll}
                  >
                    Accetta tutti
                  </Button>
                </div>
              </div>
              {/* Layer 2 — positioning (fixed bottom) */}
              {/* Layer 3 — styling and colors */}
              {/* Layer 4 — the preferences panel */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
