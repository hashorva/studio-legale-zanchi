'use client';

import { useEffect, useRef } from 'react';

import { cn } from '@/lib/utils';
import {
  useSectionNavigation,
  type SectionNavItem,
} from '@/components/useSectionNavigation';

type ServiceMobileSectionNavProps = {
  items: SectionNavItem[];
};

export function ServiceMobileSectionNav({
  items,
}: ServiceMobileSectionNavProps) {
  const { activeSlug, handleAnchorClick } = useSectionNavigation();
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    if (!activeSlug) return;

    linkRefs.current[activeSlug]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeSlug]);

  return (
    <>
      <div className="h-22 md:hidden" aria-hidden="true" />
      <nav
        aria-label="Aree di competenza"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur md:hidden"
      >
        <p className="mb-4 text-center text-lg font-semibold">
          Aree di competenza
        </p>
        <div className="scrollbar-none overflow-x-auto px-4">
          <ul className="flex w-max min-w-full gap-2">
            {items.map((item) => (
              <li key={item.slug}>
                <a
                  ref={(element) => {
                    linkRefs.current[item.slug] = element;
                  }}
                  href={`#${item.slug}`}
                  aria-current={activeSlug === item.slug ? 'location' : undefined}
                  onClick={(event) => handleAnchorClick(event, item.slug)}
                  className={cn(
                    'inline-flex h-9 items-center whitespace-nowrap rounded-full border border-primary/15 bg-card px-4 text-sm font-medium text-foreground shadow-xs transition-colors',
                    activeSlug === item.slug
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'hover:border-accent/40 hover:bg-accent/8'
                  )}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
