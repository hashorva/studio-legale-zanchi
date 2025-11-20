import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { servizi } from "@/lib/services";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20 py-20">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Studio Legale Zanchi
          </h1>
          <p className="text-xl text-muted-foreground">
            Competenza, trasparenza e dedizione al servizio dei nostri clienti
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="/contatti">Fissa una consulenza</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/servizi">Scopri i nostri servizi</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <Image
              src="/avvocato-silvio-zanchi.jpeg"
              alt="Avvocato Silvio Zanchi"
              fill
              className="rounded-full object-cover border-4 border-white shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Le nostre aree di competenza
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servizi.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="mb-20">
        <div className="bg-muted/50 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">Chi siamo</h2>
          <p className="text-lg mb-4">
            Lo Studio Legale Zanchi opera a Milano da oltre 15 anni, offrendo
            assistenza legale specializzata in ambito civile e contrattuale a
            privati e aziende.
          </p>
          <p className="text-lg mb-4">
            Il nostro approccio combina competenza giuridica con
            un&apos;attenzione particolare alle esigenze specifiche di ogni
            cliente, garantendo soluzioni personalizzate ed efficaci.
          </p>
          <Button variant="outline" asChild className="mt-4">
            <Link href="/chi-siamo">Scopri di più</Link>
          </Button>
        </div>
      </section>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}
