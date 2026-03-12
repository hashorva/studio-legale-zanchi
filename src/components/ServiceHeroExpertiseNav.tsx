'use client';

import Link from 'next/link';
import { useEffect, useState, type MouseEvent } from 'react';

import { iconMap, type IconName } from '@/lib/icon-map';
import { cn } from '@/lib/utils';

type ExpertiseNavItem = {
  slug: string;
  title: string;
  icon?: IconName;
};

type ServiceHeroExpertiseNavProps = {
  items: ExpertiseNavItem[];
};

function getActiveSlug() {
  return window.location.hash.replace(/^#/, '');
}

export function ServiceHeroExpertiseNav({
  items,
}: ServiceHeroExpertiseNavProps) {
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
    <nav aria-label="Argomenti di questa pagina" className="mb-3">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => {
          const ExpertiseIcon = item.icon ? iconMap[item.icon] : null;
          const isActive = activeSlug === item.slug;

          return (
            <li key={item.slug}>
              <Link
                href={`#${item.slug}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => handleAnchorClick(event, item.slug)}
                className={cn(
                  'inline-flex h-8 items-center gap-1.5 rounded-full bg-white/30 px-3 pr-5 text-sm font-medium text-white shadow-xs transition-all hover:bg-accent hover:text-accent-foreground md:hover:-translate-y-0.5',
                  isActive && 'bg-white/30 text-white shadow-sm'
                )}
              >
                {ExpertiseIcon && (
                  <ExpertiseIcon
                    className="ml-1 h-4 w-4 shrink-0"
                    strokeWidth={1.5}
                  />
                )}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
