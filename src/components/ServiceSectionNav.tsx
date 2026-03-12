'use client';

import { cn } from '@/lib/utils';
import { useSectionNavigation, type SectionNavItem } from '@/components/useSectionNavigation';

type ServiceSectionNavProps = {
  items: SectionNavItem[];
  title?: string;
  ariaLabel?: string;
};

export function ServiceSectionNav({
  items,
  title = 'Aree di competenza',
  ariaLabel = 'Table of Contents',
}: ServiceSectionNavProps) {
  const { activeSlug, handleAnchorClick } = useSectionNavigation();

  return (
    <aside className="hidden md:block sticky top-24 self-start">
      <nav aria-label={ariaLabel}>
        <p className="font-semibold text-right text-lg mb-4">{title}</p>
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
