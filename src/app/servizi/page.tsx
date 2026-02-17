import { servizi } from "@/lib/services";
import Link from "next/link";

export default function ServiziPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">I nostri servizi legali</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servizi.map((service) => (
          <Link
            key={service.slug}
            href={`/servizi/${service.slug}`}
            className="border p-6 rounded-lg hover:shadow-md block"
          >
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-muted-foreground">{service.shortDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
