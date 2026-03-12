'use client';

import { cn } from '@/lib/utils';
import { useSectionNavigation, type SectionNavItem } from '@/components/useSectionNavigation';

type ServiceSectionNavProps = {
  items: SectionNavItem[];
};

export function ServiceSectionNav({ items }: ServiceSectionNavProps) {
  const { activeSlug, handleAnchorClick } = useSectionNavigation();

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
