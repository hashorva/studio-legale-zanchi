import type { Metadata } from 'next';
import { Briefcase } from 'lucide-react';

import { ServiceHeroExpertiseNav } from '@/components/ServiceHeroExpertiseNav';
import { ServiceIndexArticle } from '@/components/ServiceIndexArticle';
import { ServiceMobileSectionNav } from '@/components/ServiceMobileSectionNav';
import { ServiceSectionNav } from '@/components/ServiceSectionNav';
import { getServices } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Servizi Legali a Milano | Studio Legale Zanchi',
  description:
    'Scopri tutti i servizi legali dello Studio Legale Zanchi: consulenza, assistenza in giudizio, diritto di famiglia, immobiliare, recupero crediti e altri ambiti di tutela.',
};

export default function ServiziPage() {
  const servizi = getServices();
  const serviceNavItems = servizi.map((service) => ({
    slug: service.slug,
    title: service.title,
    icon: service.icon,
  }));

  return (
    <main>
      <article>
        <header className="relative bg-primary">
          <div
            className="mx-auto grid max-w-7xl grid-cols-1 gap-4 pt-15 pb-12 md:grid-cols-[250px_1fr] md:gap-12 md:pt-30 lg:pt-30"
          >
            <div className="border-accent mx-4 border-b-2 pt-8 pl-3 md:mx-0 md:border-r-2 md:border-b-0 md:pt-2">
              <Briefcase
                strokeWidth={1.5}
                className="mb-2 h-32 w-30 text-white md:h-42 md:w-42"
                aria-hidden="true"
              />
            </div>
            <div className="pl-4 pr-6">
              <h1 className="mb-6 font-serif text-5xl font-medium text-white/90 md:text-5xl md:leading-relaxed lg:text-6xl lg:leading-relaxed">
                Servizi
              </h1>
              <ServiceHeroExpertiseNav
                items={serviceNavItems}
                ariaLabel="Servizi disponibili"
              />
              <p className="mb-4 whitespace-pre-line font-sans text-lg text-white/80">
                Assistiamo privati, professionisti e imprese con un approccio
                rigoroso, chiaro e personalizzato. In questa pagina trovi una
                panoramica completa dei nostri servizi, con accesso immediato
                ai singoli approfondimenti e alle relative aree di intervento.
              </p>
            </div>
          </div>
        </header>

        <div className="relative bg-black/1">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 pt-15 md:grid-cols-[250px_1fr] md:pt-30 lg:pt-15">
            <ServiceSectionNav
              items={serviceNavItems}
              title="Servizi"
              ariaLabel="Indice dei servizi"
            />
            <ServiceMobileSectionNav
              items={serviceNavItems}
              title="Servizi"
              ariaLabel="Indice dei servizi"
            />

            <section
              aria-labelledby="servizi-overview-heading"
              className="px-4 mb-30"
            >
              <h2 id="servizi-overview-heading" className="sr-only">
                Elenco completo dei servizi legali
              </h2>
              <ul className="space-y-8">
                {servizi.map((service) => (
                  <li key={service.id}>
                    <ServiceIndexArticle service={service} />
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
