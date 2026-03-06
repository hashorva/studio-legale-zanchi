'use client';

import { useState, useEffect } from 'react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type ConsentKey = 'essential' | 'analytics' | 'thirdParty';

type CookieCategory = {
  key: ConsentKey;
  label: string;
  description: string;
  locked: boolean;
};

const cookieCategories: CookieCategory[] = [
  {
    key: 'essential',
    label: 'Cookie tecnici necessari',
    description:
      'Sempre attivi. Necessari per il corretto funzionamento del sito.',
    locked: true,
  },
  {
    key: 'analytics',
    label: 'Cookie analitici',
    description:
      'Ci aiutano a capire, in forma aggregata, come viene utilizzato il sito per migliorarne contenuti e prestazioni.',
    locked: false,
  },
  {
    key: 'thirdParty',
    label: 'Contenuti esterni',
    description:
      'Consentono di visualizzare contenuti esterni, come Google Maps. Questi servizi di terze parti possono raccogliere dati di navigazione solo se attivati.',
    locked: false,
  },
];
export default function CookieBanner() {
  const prefersReducedMotion = useReducedMotion();
  const {
    consent,
    hasChosen,
    acceptAll,
    rejectAll,
    savePreferences,
    isPreferencesOpen,
  } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [localConsent, setLocalConsent] = useState(consent);
  // Sync localConsent when context consent changes
  useEffect(() => {
    setLocalConsent(consent);
  }, [consent]);

  useEffect(() => {
    if (isPreferencesOpen) {
      setShowPreferences(true);
    }
  }, [isPreferencesOpen]);

  const handleSavePreferences = () => {
    savePreferences(localConsent);
    setShowPreferences(false);
  };

  const handleToggle = (key: Exclude<ConsentKey, 'essential'>) => {
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
                  La tua privacy
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Utilizziamo cookie tecnici necessari al funzionamento del sito
                  e, solo con il tuo consenso, cookie analitici e servizi di
                  terze parti. Puoi accettare tutti, rifiutare quelli non
                  necessari oppure gestire le tue preferenze in modo granulare.
                </p>
                <p className="text-xs text-muted-foreground/70 mb-4">
                  Per maggiori informazioni consulta la{' '}
                  <Link
                    href="/cookie-policy"
                    className="underline hover:text-primary"
                  >
                    Cookie Policy
                  </Link>{' '}
                  e la{' '}
                  <Link
                    href="/privacy-policy"
                    className="underline hover:text-primary"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
                {/* Preferences Panel - only visible when showPreferences is true */}
                <AnimatePresence>
                  {showPreferences && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        height: prefersReducedMotion ? 'auto' : 0,
                      }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{
                        opacity: 0,
                        height: prefersReducedMotion ? 'auto' : 0,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.25,
                        ease: 'easeInOut',
                      }}
                      className="mb-4 rounded-xl border border-border bg-muted/30 overflow-hidden"
                    >
                      <div className="px-4 pt-4 pb-3 border-b border-border">
                        <h3 className="text-sm font-semibold text-foreground">
                          Gestisci le preferenze
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          I cookie tecnici sono sempre attivi. Tutte le altre
                          categorie sono facoltative e vengono attivate solo con
                          il tuo consenso.
                        </p>
                      </div>
                      {/* Cookie Category row */}
                      <div>
                        {cookieCategories.map((category, index) => (
                          <div
                            key={category.key}
                            className={`flex flex-col px-4 py-3 ${index !== cookieCategories.length - 1 ? 'border-b border-border' : ''}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-foreground">
                                  {category.label}
                                </span>
                                {category.locked && (
                                  <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full">
                                    Sempre attivi
                                  </span>
                                )}
                              </div>
                              <Switch
                                checked={Boolean(localConsent[category.key])}
                                onCheckedChange={() => {
                                  if (
                                    !category.locked &&
                                    category.key !== 'essential'
                                  ) {
                                    handleToggle(category.key);
                                  }
                                }}
                                disabled={category.locked}
                                aria-label={category.label}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {category.description}
                            </p>
                          </div>
                        ))}
                      </div>
                      {/* Panel actions */}
                      <div className="flex justify-end gap-2 px-4 py-4 border-t border-border">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowPreferences(false)}
                        >
                          Annulla
                        </Button>
                        <Button
                          size="sm"
                          className=" bg-primary hover:bg-primary-dark text-white"
                          onClick={handleSavePreferences}
                        >
                          Salva preferenze
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Action buttons */}
                <div className="flex gap-2 mt-4 justify-between">
                  <Button
                    variant="subtle"
                    onClick={() => setShowPreferences((prev) => !prev)}
                  >
                    {showPreferences ? 'Chiudi preferenze' : 'Personalizza'}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="subtle" onClick={rejectAll}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
