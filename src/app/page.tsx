import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ChatWidget from '@/components/ChatWidget';
import Hero from '@/components/Hero';
import { ServiziSection } from '@/components/sections/ServiziSection';
import { ClipboardCheck, MessageSquareText, Scale } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Hero />

      <ServiziSection />
      <section className="mx-auto mb-20 max-w-7xl px-4 py-8">
        <div className="rounded-[3.5rem] bg-primary/[0.04] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:grid-rows-[auto_auto]">
            <div className="lg:col-start-1 lg:row-start-1">
              <h2 className="mb-5 font-serif text-5xl font-semibold tracking-tight text-foreground">
                Chi siamo
              </h2>
              <p className="mb-4 max-w-3xl font-sans text-lg leading-relaxed text-foreground/85">
                Studio Legale Zanchi assiste privati, professionisti e imprese
                con un approccio fondato su ascolto, chiarezza e preparazione
                accurata. Ogni questione viene affrontata partendo dai fatti,
                dai documenti e dagli obiettivi concreti del cliente, per
                individuare la strategia piu adatta e sostenibile.
              </p>
              <p className="max-w-3xl font-sans text-lg leading-relaxed text-muted-foreground">
                Crediamo che un&apos;assistenza legale efficace non dipenda
                solo dalla competenza tecnica, ma anche dalla capacita di
                spiegare bene opzioni, tempi e implicazioni pratiche. Per
                questo lavoriamo con attenzione alla qualita del rapporto
                professionale, oltre che alla qualita del caso.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:col-start-2 lg:row-span-2 lg:grid-cols-1">
              <article className="rounded-4xl bg-background p-5">
                <Scale
                  className="mb-4 h-10 w-10 text-accent-dark"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mb-2 font-serif text-2xl font-semibold text-foreground">
                  Analisi chiara
                </h3>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                  Ogni incarico parte da una lettura attenta del problema, dei
                  documenti e dei margini reali di tutela.
                </p>
              </article>

              <article className="rounded-4xl bg-background p-5">
                <ClipboardCheck
                  className="mb-4 h-10 w-10 text-accent-dark"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mb-2 font-serif text-2xl font-semibold text-foreground">
                  Strategia proporzionata
                </h3>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                  Privilegiamo soluzioni ben impostate e sostenibili, in sede
                  stragiudiziale o giudiziale secondo il caso concreto.
                </p>
              </article>

              <article className="rounded-4xl bg-background p-5">
                <MessageSquareText
                  className="mb-4 h-10 w-10 text-accent-dark"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className="mb-2 font-serif text-2xl font-semibold text-foreground">
                  Rapporto trasparente
                </h3>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                  Il cliente viene accompagnato con comunicazione chiara,
                  aggiornamenti sul lavoro svolto e attenzione agli aspetti
                  pratici della scelta legale.
                </p>
              </article>
            </div>

            <div className="lg:col-start-1 lg:row-start-2 lg:self-end">
              <Button asChild className="w-full sm:w-auto bg-accent rounded-full md:bg-primary hover:bg-accent">
                <Link href="/chi-siamo">Scopri di piu sullo studio</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <ChatWidget />
    </>
  );
}
