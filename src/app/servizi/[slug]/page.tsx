import { servizi } from '@/lib/services';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'; // shadcn/ui import

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

  return (
    // Hero Section
    <>
      <header className="mx-auto max-w-7xl px-4 py-12 pt-30">
        <h1 className="font-serif text-3xl font-bold mb-6">{service.title}</h1>
        <p className="font-sans text-lg mb-8 whitespace-pre-line">
          {service.longDescription}
        </p>
      </header>
      <div>
        <h2 className="font-serif font-bold mb-4">Aree di competenza</h2>
      </div>
      <div>
        {service.expertise.map((item) => (
          <section key={item.slug} id={item.slug} className="mb-10">
            <h2 className="font-serif">{item.title}</h2>
            <p>{item.description}</p>
            {/* shadcn/ui Accordion for FAQs */}
            {item.faq && item.faq.length > 0 && (
              <div>
                <h2>Domande frequenti</h2>
                <Accordion type="multiple">
                  {item.faq.map((faqItem, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faqItem.question}</AccordionTrigger>
                      <AccordionContent>{faqItem.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
