'use client';

import { useEffect, useState, type MouseEvent } from 'react';

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

  useEffect(() => {
    function syncActiveSlug() {
      setActiveSlug(getActiveSlug());
    }

    syncActiveSlug();
    window.addEventListener('hashchange', syncActiveSlug);

    return () => window.removeEventListener('hashchange', syncActiveSlug);
  }, []);

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
                aria-current={activeSlug === item.slug ? 'location' : undefined}
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
  );
}
