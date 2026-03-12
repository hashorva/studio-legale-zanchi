import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ClipboardCheck,
  MessageSquareText,
  Scale,
  Send,
  ShieldCheck,
  Briefcase,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description:
    'Scopri l\'approccio dello Studio Legale Zanchi: rigore, chiarezza e attenzione al caso concreto per privati, professionisti e imprese a Milano.',
};

const clientExperience = [
  {
    title: 'Ascolto e analisi accurata',
    description:
      'Ogni caso viene esaminato con attenzione ai fatti, ai documenti e agli obiettivi concreti del cliente, evitando letture superficiali o strategie standardizzate.',
    Icon: Scale,
  },
  {
    title: 'Comunicazione chiara',
    description:
      'Riteniamo essenziale spiegare in modo comprensibile le opzioni disponibili, i possibili rischi, i tempi prevedibili e il significato pratico delle scelte da compiere.',
    Icon: MessageSquareText,
  },
  {
    title: 'Strategie proporzionate',
    description:
      'Non ogni questione richiede la stessa risposta. Per questo costruiamo il percorso piu adatto alla situazione concreta, valutando con serieta quando trattare, quando diffidare e quando agire in giudizio.',
    Icon: ClipboardCheck,
  },
  {
    title: 'Rapporto professionale trasparente',
    description:
      'Il cliente viene accompagnato nel lavoro con ordine, aggiornamenti e attenzione agli aspetti pratici del caso, cosi da poter prendere decisioni piu consapevoli.',
    Icon: ShieldCheck,
  },
];

export default function ChiSiamoPage() {
  return (
    <main>
      <article>
        <header className="relative bg-primary">
          <div className="mx-auto max-w-7xl px-4 pt-24 pb-14 md:px-6 md:pt-32 md:pb-18">
            <div className="max-w-4xl">
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                Studio Legale Zanchi
              </p>
              <h1 className="mb-5 font-serif text-5xl font-medium leading-tight text-white/90 md:text-6xl">
                Chi siamo
              </h1>
              <p className="mb-4 font-serif text-2xl underline-offset-4 decoration-3 decoration-accent underline leading-relaxed text-white/80 md:text-3xl">
                Esperienza e competenza al tuo servizio
              </p>
              <p className="max-w-3xl font-sans text-lg leading-relaxed text-white/75">
                Studio Legale Zanchi offre assistenza legale a Milano con un
                approccio fondato su rigore, chiarezza e attenzione al caso
                concreto. Assistiamo privati, professionisti e imprese
                costruendo ogni strategia a partire dai fatti, dai documenti e
                dagli obiettivi reali del cliente.
              </p>
            </div>
          </div>
        </header>

        <div className="bg-black/1">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
            <section className="mb-20 max-w-4xl">
              <h2 className="mb-6 font-serif text-4xl font-semibold text-foreground md:text-5xl">
                Lo studio
              </h2>
              <p className="mb-4 font-sans text-lg leading-relaxed text-foreground/85">
                Studio Legale Zanchi nasce con l&apos;obiettivo di offrire
                un&apos;assistenza legale seria, accessibile e costruita sulle
                reali esigenze del cliente. Lavoriamo con attenzione alla
                qualita tecnica della questione, ma anche alla chiarezza del
                rapporto professionale, perche comprendere bene un problema
                giuridico e gia parte della tutela.
              </p>
              <p className="font-sans text-lg leading-relaxed text-muted-foreground">
                Lo studio assiste privati, professionisti e imprese in diversi
                ambiti del diritto civile, affiancando il cliente sia nella
                consulenza e nella fase stragiudiziale, sia
                nell&apos;assistenza in giudizio quando il contenzioso diventa
                necessario. L&apos;obiettivo non e complicare il problema, ma
                affrontarlo con metodo, precisione e senso pratico.
              </p>
            </section>
<Separator
                      orientation="horizontal"
                      className="max-w-3xl border-accent border-2"
                    />
            <section className="mt-20 mb-20 max-w-4xl">
              <h2 className="mb-6 font-serif text-4xl font-semibold text-foreground md:text-5xl">
                Come lavoriamo
              </h2>
              <p className="mb-4 font-sans text-lg leading-relaxed text-foreground/85">
                Ogni incarico parte da un principio semplice: prima capire
                bene, poi scegliere come agire. Analizziamo i fatti, leggiamo i
                documenti, valutiamo i rischi e individuiamo il percorso piu
                adatto, privilegiando quando possibile soluzioni chiare,
                sostenibili e ben impostate anche fuori dal giudizio.
              </p>
              <p className="font-sans text-lg leading-relaxed text-muted-foreground">
                Quando il contenzioso e necessario, lo affrontiamo con la stessa
                logica: preparazione accurata, obiettivi realistici e
                aggiornamento costante del cliente. Crediamo che la qualita
                dell&apos;assistenza non dipenda solo dalla competenza tecnica,
                ma anche dalla capacita di spiegare bene opzioni, tempi e
                implicazioni concrete.
              </p>
            </section>

            <section className="mb-20">
              <h2 className="mb-15 max-w-5xl font-serif text-4xl font-semibold text-foreground md:text-5xl">
                Cosa puo aspettarsi chi si rivolge allo studio
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                {clientExperience.map(({ title, description, Icon }) => (
                  <article
                    key={title}
                    className="rounded-[2rem] bg-background p-6 shadow-xs"
                  >
                    <Icon
                      className="mb-4 h-11 w-11 text-accent-dark"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <h3 className="mb-3 font-serif text-3xl font-semibold text-foreground">
                      {title}
                    </h3>
                    <p className="font-sans text-base leading-relaxed text-muted-foreground">
                      {description}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mb-20 max-w-4xl">
              <h2 className="mb-8 font-serif text-4xl font-semibold text-foreground md:text-5xl">
                Un&apos;assistenza costruita sul caso concreto
              </h2>
              <p className="mb-4 font-sans text-lg leading-relaxed text-foreground/85">
                Lo studio opera in diversi ambiti del diritto civile, dalla
                consulenza legale all&apos;assistenza stragiudiziale, fino alla
                difesa in giudizio quando necessaria. Ogni area di intervento
                viene affrontata con lo stesso metodo: analisi accurata,
                chiarezza nel rapporto con il cliente e ricerca della soluzione
                piu efficace in relazione al caso specifico.
              </p>
              <p className="font-sans text-lg leading-relaxed text-muted-foreground">
                Per una panoramica completa dei servizi e delle relative aree di
                intervento, e possibile consultare la sezione dedicata.
              </p>
            </section>

            <section className="rounded-[2.5rem] bg-primary/[0.05] px-6 py-8 md:px-10 md:py-10 max-w-4xl">
              <div className="">
                <h2 className="mb-4 font-serif text-4xl font-semibold text-foreground md:text-5xl">
                  Vuole conoscere meglio come possiamo aiutarla?
                </h2>
                <p className="font-sans text-lg leading-relaxed text-muted-foreground">
                  Se desidera approfondire i servizi offerti dallo studio o
                  richiedere un primo contatto, puo consultare la sezione
                  dedicata oppure contattarci direttamente.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 justify-end">
                <Button asChild size="lg" className="bg-primary hover:bg-primary-dark hover:translate-x-0.5">

                  <Link href="/servizi">
                    <Briefcase
                strokeWidth={1.5}
                className="mr-1 h-5 w-5"
                aria-hidden="true"
              />Scopri i servizi</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent-dark hover:translate-x-0.5"
                >
                  <Link href="/contatti">
                    <Send className="mr-1 h-5 w-5" />
                    Contatta lo studio
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
