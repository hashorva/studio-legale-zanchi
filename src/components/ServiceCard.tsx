// src/components/ServiceCard.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { iconMap } from '@/lib/icon-map';
import type { Service } from '@/lib/services';

const TIMING = {
  expand: 350,
  fade: 200,
  collapseFade: 150,
  stagger: 60,
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
        w-80 min-w-[320px] h-full
        p-4
        rounded-4xl bg-black/[0.03]
      "
    >
      {/* ── Icon ── */}
      {Icon && (
        <div className="mb-5">
          <Icon
            className="w-11 h-11 text-primary"
            strokeWidth={1.3}
            aria-hidden="true"
          />
        </div>
      )}

      {/* ── Title ── */}
      <h3 className="text-[22px] font-bold leading-tight tracking-tight text-foreground mb-3">
        {service.title}
      </h3>

      {/* ── Pills ── */}
      <div className="flex flex-wrap gap-1.5 mb-3.5">
        {pills.map((item) => (
          <span
            key={item}
            className="
              inline-block px-3 py-1 rounded-full text-xs font-medium
              text-primary/75 bg-primary/[0.06]
              hover:bg-primary hover:text-primary-foreground
              transition-colors duration-200 cursor-default
            "
          >
            {item}
          </span>
        ))}
      </div>

      {/* ── Description ── */}
      <p className="text-sm leading-relaxed text-muted-foreground flex-1">
        {service.shortDescription}
      </p>

      {/* ── Expanding CTA Toolbar ── */}
<div
  className={`mt-4 flex justify-end`}
>
  <div
    className="h-11 rounded-full bg-black/[0.06] transition-all duration-350"
    style={{
      width: isExpanded ? '100%' : 44,
    }}
  >
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="w-11 h-11 rounded-full bg-foreground text-background flex items-center justify-center cursor-pointer float-right ml-auto"
    >
      <Plus className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'}`}
      style={{
        transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)'
      }}/>
    </button>
  </div>
</div>
    </article>
  );
}
