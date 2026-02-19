import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { servizi } from "@/lib/services";
import ChatWidget from "@/components/ChatWidget";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>

      <Hero />

      {/* Services Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-serif font-medium mb-8 text-center">
          Le nostre aree di competenza
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servizi.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.shortDescription}</p>
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
    </>
  );
}
