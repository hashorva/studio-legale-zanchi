import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ChatWidget from '@/components/ChatWidget';
import Hero from '@/components/Hero';
import { ServiziSection } from '@/components/sections/ServiziSection';

export default function Home() {
  return (
    <>
      <Hero />

      <ServiziSection />
      {/* About Section */}
      <section className="mb-20 max-w-7xl mx-auto px-4">
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
