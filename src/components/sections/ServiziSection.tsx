// src/components/sections/ServiziSection.tsx
//
// Server Component — no 'use client', zero JS shipped.
//
// Apple's structure:
// <section>
//   <div class="section-content">  ← constrained header
//     <h2 id="...">
//   </div>
//   <div class="Gallery">          ← unconstrained gallery
//     <div class="scrollContainer"> + <ul aria-labelledby="...">
//   </div>
// </section>
//
// We mirror this: header in max-w-7xl, ScrollRow breaks out.
// The h2 id connects to ScrollRow's aria-labelledby.

import { servizi } from '@/lib/services';
import { ServiceCard } from '@/components/ServiceCard';
import { ScrollRow } from '@/components/ScrollRow';

export function ServiziSection() {
  return (
    <section className="py-16 sm:py-20">
      {/* ── Constrained Header ──
          Apple: <div class="section-content">
          max-w-7xl + mx-auto + px-5 constrains the text.
          The id on h2 is referenced by ScrollRow's aria-labelledby.
      */}
      <div className="max-w-7xl mx-auto px-5 mb-12">
        <h2
          id="servizi-heading"
          className={`font-serif text-5xl font-semibold tracking-tighter leading-none text-foreground mb-2`}
        >
          I Nostri Servizi
        </h2>
        <p className="text-base sm:text-[17px] leading-relaxed text-muted-foreground max-w-md">
          Assistenza legale specializzata con un approccio personalizzato per
          ogni cliente.
        </p>
      </div>

      {/* ── Gallery ──
          Apple: <div class="Gallery_gallery">
          No constrained width. ScrollRow goes edge-to-edge.
          labelledBy connects the card list to the heading above.
      */}
      <ScrollRow labelledBy="servizi-heading">
        {servizi.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </ScrollRow>
    </section>
  );
}
