import { servizi } from '@/lib/services';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ServiceSectionNav } from '@/components/ServiceSectionNav';
import { ServiceHeroExpertiseNav } from '@/components/ServiceHeroExpertiseNav';
import { ServiceMobileSectionNav } from '@/components/ServiceMobileSectionNav';
import { ServiziSection } from '@/components/sections/ServiziSection';
// shadcn/ui import
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { iconMap } from '@/lib/icon-map';
import { Fragment } from 'react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servizi.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export function generateStaticParams() {
  return servizi.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servizi.find((s) => s.slug === slug);
  if (!service) notFound();

  const ServiceIcon = iconMap[service.icon];
  const ExpertiseList = service.expertise.map((exp) => ({
    slug: exp.slug,
    title: exp.title,
  }));
  return (
    <article>
      {/* Hero Section */}
      <header className="relative bg-primary">
        <div
          className="max-w-7xl mx-auto pt-15 pb-12 grid grid-cols-1 gap-4

        md:pt-30 md:grid-cols-[250px_1fr] md:gap-12

        lg:pt-30"
        >
          <div className="border-b-2 mx-4 md:mx-0 md:border-r-2 md:border-b-0 border-accent pt-8 pl-3 md:pt-2">
            <ServiceIcon
              strokeWidth={1.5}
              className="w-30 h-32 mb-2 md:w-42 md:h-42 text-white"
            />
          </div>
          <div className="pl-4 pr-6">
            <h1
              className="
              font-serif font-medium text-5xl text-white/90 mb-6

              md:font-medium md:text-5xl md:leading-relaxed md:hover:text-white/100 md:transition-colors md:duration-200

              lg:text-6xl lg:leading-relaxed"
            >
              {service.title}
            </h1>
            <ServiceHeroExpertiseNav items={service.expertise} />
            <p className="font-sans text-white/80 text-lg mb-4 whitespace-pre-line">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </header>
      <main className="relative bg-black/1 ">
        <div
          className="max-w-7xl mx-auto pt-15   grid grid-cols-1

        md:pt-30 md:grid-cols-[250px_1fr] gap-12

        lg:pt-15
        "
        >
          {/* Sticky In-Page Navigation */}
          <ServiceSectionNav items={ExpertiseList} />
          <ServiceMobileSectionNav items={ExpertiseList} />

          <div className="px-4">
            <section className="mb-20">
              <h2 className="font-serif text-5xl font-medium text mb-10">
                Introduzione
              </h2>
              {service.longDescription.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-2 font-sans text-base">
                  {paragraph}
                </p>
              ))}
            </section>
            <Separator
              orientation="horizontal"
              className="border-accent border-2"
            />
            {service.expertise.map((item, index) => {
              const ExpertiseIcon = item.icon ? iconMap[item.icon] : null;
              return (
                <Fragment key={item.slug}>
                  <section id={item.slug} className="scroll-mt-24 mt-25 mb-20">
                    <div className="mb-8 mx-2">
                      {ExpertiseIcon && (
                        <ExpertiseIcon
                          className="w-14 h-14 text-accent-dark hover:text-accent hover:-translate-y-0.5 transition-transform  duration-200 mb-10"
                          strokeWidth={1.5}
                        />
                      )}
                      <h2 className="font-serif text-5xl font-medium text mb-10">
                        {item.title}
                      </h2>

                      {item.description.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="mb-4 font-sans text-base">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {/* shadcn/ui Accordion for FAQs */}
                    {item.faq && item.faq.length > 0 && (
                      <div className="rounded-4xl bg-primary/1 py-4 px-6 mt-10 mb-8">
                        <h3 className="font-serif text-3xl font-semibold leading-relaxed text-foreground mb-1">
                          Domande frequenti
                        </h3>
                        <Accordion type="multiple">
                          {item.faq.map((faqItem, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                              <AccordionTrigger>
                                {faqItem.question}
                              </AccordionTrigger>
                              <AccordionContent>
                                {faqItem.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    )}
                  </section>
                  {/* Conditional Horizontal Line */}
                  {index < service.expertise.length - 1 && (
                    <Separator
                      orientation="horizontal"
                      className="border-accent border-2"
                    />
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
        <ServiziSection excludeSlug={slug} />
      </main>
    </article>
  );
}
