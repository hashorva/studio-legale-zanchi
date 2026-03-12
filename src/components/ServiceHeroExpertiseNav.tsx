'use client';

import { iconMap, type IconName } from '@/lib/icon-map';
import { cn } from '@/lib/utils';
import { useSectionNavigation } from '@/components/useSectionNavigation';

type ExpertiseNavItem = {
  slug: string;
  title: string;
  icon?: IconName;
};

type ServiceHeroExpertiseNavProps = {
  items: ExpertiseNavItem[];
  ariaLabel?: string;
};

export function ServiceHeroExpertiseNav({
  items,
  ariaLabel = 'Argomenti di questa pagina',
}: ServiceHeroExpertiseNavProps) {
  const { activeSlug, handleAnchorClick } = useSectionNavigation();

  return (
    <nav aria-label={ariaLabel} className="mb-3">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => {
          const ExpertiseIcon = item.icon ? iconMap[item.icon] : null;
          const isActive = activeSlug === item.slug;

          return (
            <li key={item.slug}>
              <a
                href={`#${item.slug}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => handleAnchorClick(event, item.slug)}
                className={cn(
                  'inline-flex h-8 items-center gap-1.5 rounded-full bg-white/10 px-3 pr-5 text-sm font-medium text-white shadow-xs transition-all hover:bg-accent hover:text-accent-foreground md:hover:-translate-y-0.5',
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
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
