// src/components/ServiceCard.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { iconMap } from '@/lib/icon-map';
import type { Service } from '@/lib/services';

const TIMING = {
  // Tailwind classes — used in className
  expandDuration: 'duration-300',
  fadeDuration: 'duration-200',
  buttonDuration: 'duration-400',

  // Milliseconds — used in style for conditional delays
  expandMs: 300,
  stagger: 50,
} as const;

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const Icon = iconMap[service.icon];
  const pills = service.expertise.slice(0, 3);

  return (
    <article
      className="
        relative flex flex-col
        w-90 min-w-[320px] h-full
        p-4
        rounded-4xl bg-black/[0.03]
      "
    >
      <div className="p-1 flex-1 flex flex-col">
        {/* ── Icon ── */}
        {Icon && (
          <div className="mb-5">
            <Icon
              className="w-14 h-14 text-accent-dark hover:text-accent"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
        )}

        {/* ── Title ── */}
        <h3 className="font-serif text-3xl font-semibold leading-relaxed text-foreground mb-3">
          {service.title}
        </h3>

        {/* ── Pills ── */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {pills.map((item) => (
            <span
              key={item}
              className="
              inline-block px-3 py-1 rounded-full text-xs font-medium
              text-primary/90 bg-primary/[0.06]
              hover:bg-primary hover:text-primary-foreground
              transition-colors duration-200 cursor-pointer
            "
            >
              {item}
            </span>
          ))}
        </div>

        {/* ── Description ── */}
        <p className="mt-3 pt-2 font-sans text-base leading-relaxed text-muted-foreground flex-1 border-t border-accent/40">
          {service.shortDescription}
        </p>
      </div>

      {/* ── Expanding CTA Toolbar ── */}
      <div className={`mt-4 flex justify-end`}>
        <div
          className={`rounded-full bg-black/[0.06] transition-all ${TIMING.expandDuration} ease-in-out flex items-center relative`}
          style={{
            width: isExpanded ? '100%' : 44,
          }}
        >
          {/* Links — absolute, no impact on button position */}
          <div className="absolute inset-0 overflow-hidden flex items-center gap-1.5 pl-2 pr-12 rounded-full">
            <Link
              href={`/contatti?servizio=${service.slug}`}
              tabIndex={isExpanded ? 0 : -1}
              className={`px-3.5 py-1.5 rounded-full shrink-0 bg-accent text-accent-foreground text-sm font-semibold whitespace-nowrap transition-opacity ${TIMING.fadeDuration}`}
              style={{
                opacity: isExpanded ? 1 : 0,
                transitionDelay: isExpanded ? `${TIMING.expandMs}ms` : '0ms',
                pointerEvents: isExpanded ? 'auto' : 'none',
              }}
            >
              Contattaci
            </Link>
            <Link
              href={`/servizi/${service.slug}`}
              tabIndex={isExpanded ? 0 : -1}
              className={`px-3.5 py-1.5 rounded-full shrink-0 bg-primary text-primary-foreground text-sm font-semibold whitespace-nowrap transition-opacity ${TIMING.fadeDuration}`}
              style={{
                opacity: isExpanded ? 1 : 0,
                transitionDelay: isExpanded
                  ? `${TIMING.expandMs + TIMING.stagger}ms`
                  : '0ms',
                pointerEvents: isExpanded ? 'auto' : 'none',
              }}
            >
              Approfondisci
            </Link>
          </div>

          {/* + Button — only element in flow, always at the right */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-11 h-11 rounded-full shrink-0 ml-auto flex items-center justify-center cursor-pointer transition-colors ${TIMING.buttonDuration} relative z-10 ${isExpanded ? 'bg-primary/0' : 'bg-primary'}`}
          >
            <Plus
              className={`w-6 h-6 transition-transform ${TIMING.buttonDuration} ${isExpanded ? 'rotate-45 text-primary' : 'rotate-0 text-white'}`}
              strokeWidth={3}
            />
          </button>
        </div>
      </div>
    </article>
  );
}
