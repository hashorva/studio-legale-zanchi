'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MessageCircle, BookOpen, Plus, X } from 'lucide-react';
import { iconMap } from '@/lib/icon-maps';
import type { Service } from '@/lib/services';

/ ─── TIMING CONSTANTS ───
// Single source of truth for the animation sequence.
//
// The sequence:
// EXPAND:  container grows (EXPAND) → then buttons fade in (FADE, delayed by EXPAND)
// COLLAPSE: buttons fade out (COLLAPSE_FADE) → then container shrinks (delayed by COLLAPSE_FADE)
const TIMING = {
  expand: 350,        // ms — container width animation
  fade: 200,          // ms — button opacity animation
  collapseFade:150,   // ms — button fade-out on close
  stagger:60,         // ms — delay between first and second button
} as const;

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  //Icon Resolution
  const Icon = iconMap[service.icon];

  //Pills are three, use slice to three
  const pills = service.expertise.slice(0, 3);

  return (
    <article
      className="
    relative flex flex-col
    w-80 min-w-[320px] min-h-[380px]
    p-7 pb-5
    rounded-2xl bg-black/[0.03]
    snap-start
    shrink-0
    "
    >
      {/* --- Icon --- */}
      {Icon && (
        <div className="mb-5">
          <Icon
            className="w-11 h-11 text-primary"
            strokeWidth={1.3}
            aria-hidden="true"
          />
        </div>
      )}
      {/* --- Tite --- */}
      <h3 className="text-[22px] font-bold leading-tight tracking-tight text-foreground mb-3">
        {service.title}
      </h3>

      {/* --- Pills --- */}
      <div className="flex flex-wrap gap-1.5 mb-3.5">
        {pills.map((item) => (
          <span
            key={item}
            className="inline-block px-3 py-1 rounded-full text-xs font-medium text-primary/75 bg-primary/[0.06] hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
      {/* --- Description --- */}
      <p className="text-sm leading-relaxed text-muted-foreground flex-1">
        {service.shortDescription}
      </p>

      {/* --- CTA Toolbar */}
      <div className="mt-4">
        <div
          className="
        flex items-center
        rounded-full bg-black/[0.06]
        p-0.5
        overflow-hidden
        ml-auto"
          style={{
            width: isExpanded ? '100%' : 42,
            maxWidth: isExpanded ? 320 : 42,
            transition: isExpanded
              ? `width ${TIMING.expand}ms cubic-beizer(0.4, 0, 0.2, 1), max-width ${TIMING.expand}ms cubic-beizer(0.4, 0, 0.2, 1)'
              : 'width 300ms cubic-beizer(0.4, 0, 0.2, 1) ${TIMING.collapseFade}ms, max-width 300ms cubic-beizer(0.4, 0, 0.2, 1) ${TIMING.collapseFade}ms`,
          }}
        >
          {/* --- Contattaci --- */}
          <Link
          href={'/contatti?servizio=${servizio.slug}'}
          tabIndex={isExpanded ? 0 : -1}
          className='px-3.5 py-1.5 rounded-full shrink-0
          bg-accent text-accent-foreground
          text-sm font-semibold whitespace-nowrap
          hover:bg-accent-dark
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-accent/50 focus-visible:ring-offset-1'
          style={{
            opacity: isExpanded ? 1 : 0,
            transform: isExpanded ? 'scale(1)' : 'scale(0.92)',
            transition: isExpanded ? `opacity ${TIMING.fade}ms ease ${TIMING.expand}ms, transform ${TIMING.fade}ms ease ${TIMING.expand}ms`
                : `opacity ${TIMING.collapseFade}ms ease, transform ${TIMING.collapseFade}ms ease`,
            pointerEvents: isExpanded ? 'auto' : 'none',
          }}>Contattaci</Link>
          {/* --- Approfondisci --- */}
          <Link
          href={'/servizi/${servizio.slug}'}
          tabIndex={isExpanded ? 0 : -1}
          className='px-3.5 py-1.5 rounded-full shrink-0
          bg-primary text-primary-foreground
          text-sm font-semibold whitespace-nowrap
          hover:bg-primary-dark
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-primary/50 focus-visible:ring-offset-1'
          style={{
            opacity: isExpanded ? 1 : 0,
            transform: isExpanded ? 'scale(1)' : 'scale(0.92)',
            transition: isExpanded ? `opacity ${TIMING.fade}ms ease ${TIMING.expand}ms, transform ${TIMING.fade}ms ease ${TIMING.expand}ms`
                : `opacity ${TIMING.collapseFade}ms ease, transform ${TIMING.collapseFade}ms ease`,
            pointerEvents: isExpanded ? 'auto' : 'none',
          }}>Approfondisci</Link>

          {/* --- Button --- */}
          <button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-label={
            isExpanded ? 'Chiudi opzioni' : 'Opzioni per ${servizi.title}'
          }
          className='
          ml-auto w-9 h-9 rounded-full shrink-0
          bg-foreground text-background
          flex items-center justify-center
          cursor-pointer
          hover:bg-primary
          transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2
          focus-visible:ring-ring focus-visible:ring-offset-2'
          >
            <Plus className='w-[18px] h-[18px]' />
          </button>
        </div>
      </div>
    </article>
  );
}
