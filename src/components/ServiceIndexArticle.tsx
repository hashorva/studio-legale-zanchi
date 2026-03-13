import Link from 'next/link';
import { Send } from 'lucide-react';

import { ContactDialog } from '@/components/ContactDialog';
import { iconMap } from '@/lib/icon-map';
import type { Service } from '@/lib/services';

type ServiceIndexArticleProps = {
  service: Service;
};

export function ServiceIndexArticle({ service }: ServiceIndexArticleProps) {
  const Icon = iconMap[service.icon] ?? null;

  return (
    <article
      id={service.slug}
      className="scroll-mt-24 rounded-4xl bg-black/[0.03] p-6 md:p-8"
    >
      <div className="flex flex-col gap-8">
        <div>
          {Icon && (
            <div className="mb-5">
              <Icon
                className="h-14 w-14 text-accent-dark"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          )}

          <h2 className="mb-4 font-serif text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            {service.title}
          </h2>

          <ul className="mb-5 flex flex-wrap gap-2" aria-label={service.title}>
            {service.expertise.map((item) => {
              const ExpertiseIcon = item.icon ? iconMap[item.icon] : null;

              return (
                <li key={item.slug}>
                  <Link
                    href={`/servizi/${service.slug}#${item.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary/[0.06] px-3 py-1 pr-4 text-xs font-medium text-primary/90 transition-colors duration-200 hover:bg-accent hover:text-accent-foreground"
                  >
                    {ExpertiseIcon && (
                      <ExpertiseIcon
                        className="h-4 w-4 shrink-0"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    )}
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>

          <p className="font-sans text-lg leading-relaxed text-foreground/85">
            {service.shortDescription}
          </p>
        </div>

        <div className="border-t border-accent/40 pt-6">
          {service.longDescription.split('\n\n').map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 font-sans text-base leading-relaxed text-muted-foreground last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <ContactDialog defaultServiceSlug={service.slug}>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-dark"
            >
              <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Contattaci
            </button>
          </ContactDialog>
          <Link
            href={`/servizi/${service.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
          >
            {Icon && (
              <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            )}
            Approfondisci
          </Link>
        </div>
      </div>
    </article>
  );
}
