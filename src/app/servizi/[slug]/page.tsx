import { servizi } from "@/lib/services";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{service.title}</h1>
      <p className="text-lg mb-8 whitespace-pre-line">{service.longDescription}</p>
      <h2 className="text-xl font-bold mb-4">Aree di competenza</h2>
      <ul className="list-disc pl-6">
        {service.expertise.map((item) => (
          <li key={item} className="text-lg mb-2">{item}</li>
        ))}
      </ul>
    </div>
  );
}
