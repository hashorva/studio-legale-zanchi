import { servizi } from '@/lib/services';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // shadcn/ui import
import { Separator } from '@/components/ui/separator';
import { iconMap } from '@/lib/icon-map';

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

  return (
    // Hero Section
    <>
      <section className="relative bg-primary">
        <div
          className="max-w-7xl mx-auto pt-15 pb-12 grid grid-cols-1

        md:pt-30 md:grid-cols-[250px_1fr] gap-12

        lg:pt-30"
        >
          <div className="md:border-r-2 border-accent pt-2">
            <ServiceIcon size={164} strokeWidth={1.5} className="text-white" />
          </div>
          <header className="pl-4 pr-6">
            <h1
              className="
              font-serif font-medium text-4xl text-white/90 leading-relaxed

              md:font-medium md:text-5xl md:leading-relaxed md:hover:text-white/100 md:transition-colors md:duration-200

              lg:text-6xl lg:leading-relaxed"
            >
              {service.title}
            </h1>

            <p className="font-sans text-white/80 text-lg mb-4 whitespace-pre-line">
              {service.shortDescription}
            </p>

            <div className="prose  ">
              {service.longDescription.split('\n\n').map((paragraph, i) => (
                <p key={i} className="mb-2 font-sans text-base  text-white/50">
                  {paragraph}
                </p>
              ))}
            </div>
          </header>
        </div>
      </section>
      <section className="relative bg-black/5 ">
        <div
          className="max-w-7xl mx-auto pt-15   grid grid-cols-1

        md:pt-30 md:grid-cols-[250px_1fr] gap-12

        lg:pt-15
        "
        >
          {/* Sticky In-Page Navigation */}
          <aside className="hidden md:block sticky top-24 self-start">
            <nav aria-label="Table of Contents">
              <h2 className="font-semibold text-right text-lg mb-4">
                Aree di competenza
              </h2>
              <ul className="space-y-3 border-r-2 border-muted pr-4 text-right">
                {service.expertise.map((exp) => (
                  <li key={exp.slug}>
                    <a
                      href={`#${exp.slug}`}
                      className="text-muted-foreground hover:text-primary hover:pr-1 transition-all text-sm font-medium"
                    >
                      {exp.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="px-4">
            {service.expertise.map((item, index) => {
              const ExpertiseIcon = item.icon ? iconMap[item.icon] : null;
              return (
                <section
                  key={item.slug}
                  id={item.slug}
                  className="mb-10 scroll-mt-24"
                >
                  {ExpertiseIcon && (

                      <ExpertiseIcon className="w-14 h-14 text-accent-dark hover:text-accent hover:-translate-0.5 transition-transform transition-colors duration-200 mb-4" strokeWidth={1.5} />

                  )}
                  <h2 className="font-serif text-5xl font-medium text mb-4">
                    {item.title}
                  </h2>
                  <p className="mb-8 font-sans text-base">{item.description}</p>
                  {/* shadcn/ui Accordion for FAQs */}
                  {item.faq && item.faq.length > 0 && (
                    <div className="rounded-4xl bg-white/30 py-4 px-6 mt-5 mb-8">
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

                  {/* Conditional Horizontal Line */}
                  {index < service.expertise.length - 1 && (
                    <Separator
                      orientation="horizontal"
                      className="border-accent border-2 mt-15 mb-20"
                    />
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
