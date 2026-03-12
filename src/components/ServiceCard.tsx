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
  fadeDuration: 'duration-150',
  buttonDuration: 'duration-500',

  // Milliseconds — used in style for conditional delays
  expandMs: 300,
  stagger: 35,
} as const;

const toolbarEasing = 'cubic-bezier(0.22, 1, 0.36, 1)';

type ServiceCardProps = {
  service: Service;
};

export function ServiceCard({ service }: ServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const Icon = iconMap[service.icon] ?? null;
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
              className="w-14 h-14 text-accent-dark transition-colors duration-200 hover:text-accent"
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
            <Link
              key={item.slug}
              href={`/servizi/${service.slug}#${item.slug}`}
              className="
              inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
              text-primary/90 bg-primary/[0.06]
              hover:bg-accent hover:text-primary-foreground
              transition-colors duration-200 cursor-pointer
            "
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* ── Description ── */}
        <p className="mt-3 pt-2 font-sans text-base leading-relaxed text-muted-foreground flex-1 border-t border-accent/40">
          {service.shortDescription}
        </p>
      </div>

      {/* ── Expanding CTA Toolbar ── */}
      <div className={`mt-4 flex justify-end`}>
        <div className="relative h-11 w-full">
          <div
            className={`absolute inset-0 rounded-full bg-primary/[0.06] transition-[clip-path,opacity] ${TIMING.expandDuration}`}
            style={{
              clipPath: isExpanded
                ? 'inset(0 0 0 0 round 9999px)'
                : 'inset(0 0 0 calc(100% - 44px) round 9999px)',
              opacity: isExpanded ? 1 : 0.92,
              transitionTimingFunction: toolbarEasing,
            }}
          />

          {/* Links — positioned independently from the reveal rail */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="flex h-full items-center gap-1.5 pl-2 pr-12">
            <Link
              href={`/contatti?servizio=${service.slug}`}
              tabIndex={isExpanded ? 0 : -1}
              className={`antialiased px-3.5 py-1.5 rounded-full shrink-0 bg-accent text-accent-foreground text-sm font-semibold whitespace-nowrap transition-[opacity,transform] ${TIMING.fadeDuration}`}
              style={{
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded
                  ? 'translate3d(0, 0, 0)'
                  : 'translate3d(6px, 0, 0)',
                transitionDelay: isExpanded ? '90ms' : '0ms',
                pointerEvents: isExpanded ? 'auto' : 'none',
                transitionTimingFunction: toolbarEasing,
              }}
            >
              Contattaci
            </Link>
            <Link
              href={`/servizi/${service.slug}`}
              tabIndex={isExpanded ? 0 : -1}
              className={`antialiased px-3.5 py-1.5 rounded-full shrink-0 bg-primary text-primary-foreground text-sm font-semibold whitespace-nowrap transition-[opacity,transform] ${TIMING.fadeDuration}`}
              style={{
                opacity: isExpanded ? 1 : 0,
                transform: isExpanded
                  ? 'translate3d(0, 0, 0)'
                  : 'translate3d(10px, 0, 0)',
                transitionDelay: isExpanded
                  ? `${90 + TIMING.stagger}ms`
                  : '0ms',
                pointerEvents: isExpanded ? 'auto' : 'none',
                transitionTimingFunction: toolbarEasing,
              }}
            >
              Approfondisci
            </Link>
            </div>
          </div>

          {/* + Button — only element in flow, always at the right */}
          <button
            type="button"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`absolute top-0 right-0 z-10 flex h-11 w-11 items-center justify-center rounded-full cursor-pointer transition-colors ${TIMING.buttonDuration} ${isExpanded ? 'bg-primary/0' : 'bg-primary'}`}
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
