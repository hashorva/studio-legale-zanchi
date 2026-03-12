'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';

import { cn } from '@/lib/utils';

type SectionNavItem = {
  slug: string;
  title: string;
};

type ServiceSectionNavProps = {
  items: SectionNavItem[];
};

function getActiveSlug() {
  return window.location.hash.replace(/^#/, '');
}

export function ServiceSectionNav({ items }: ServiceSectionNavProps) {
  const [activeSlug, setActiveSlug] = useState('');
  const mobileLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    function syncActiveSlug() {
      setActiveSlug(getActiveSlug());
    }

    syncActiveSlug();
    window.addEventListener('hashchange', syncActiveSlug);

    return () => window.removeEventListener('hashchange', syncActiveSlug);
  }, []);

  useEffect(() => {
    if (!activeSlug) return;

    mobileLinkRefs.current[activeSlug]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [activeSlug]);

  function handleAnchorClick(
    event: MouseEvent<HTMLAnchorElement>,
    slug: string
  ) {
    event.preventDefault();

    const target = document.getElementById(slug);
    if (!target) return;

    setActiveSlug(slug);
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    window.history.pushState(null, '', `#${slug}`);
  }
  return (
    <>
      <aside className="hidden md:block sticky top-24 self-start">
        <nav aria-label="Table of Contents">
          <p className="font-semibold text-right text-lg mb-4">
            Aree di competenza
          </p>
          <ul className="space-y-3 border-r-2 border-muted pr-4 text-right">
            {items.map((item) => (
              <li key={item.slug}>
                <a
                  href={`#${item.slug}`}
                  aria-current={
                    activeSlug === item.slug ? 'location' : undefined
                  }
                  onClick={(event) => handleAnchorClick(event, item.slug)}
                  className={cn(
                    'text-sm font-medium text-muted-foreground transition-all hover:text-accent hover:-translate-x-1',
                    activeSlug === item.slug && 'text-accent -translate-x-1'
                  )}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <div className="h-22 md:hidden" aria-hidden="true" />
      <nav
        aria-label="Aree di competenza"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 backdrop-blur md:hidden"
      >
        <div className="scrollbar-none overflow-x-auto px-4">
          <ul className="flex w-max min-w-full gap-2">
            {items.map((item) => (
              <li key={item.slug}>
                <a
                  ref={(element) => {
                    mobileLinkRefs.current[item.slug] = element;
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
