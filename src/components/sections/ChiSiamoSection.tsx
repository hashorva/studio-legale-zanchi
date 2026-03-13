import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getHomeAboutTeaser } from '@/lib/content';
import { iconMap } from '@/lib/icon-map';

export function ChiSiamoSection() {
  const aboutTeaser = getHomeAboutTeaser();

  return (
    <section className="mx-auto mb-20 max-w-7xl px-4 py-8">
      <div className="rounded-[3.5rem] bg-primary/[0.04] p-8 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:grid-rows-[auto_auto]">
          <div className="lg:col-start-1 lg:row-start-1">
            <h2 className="mb-5 font-serif text-5xl font-semibold tracking-tight text-foreground">
              {aboutTeaser.title}
            </h2>
            <p className="mb-4 max-w-3xl font-sans text-lg leading-relaxed text-foreground/85">
              {aboutTeaser.paragraphs[0]}
            </p>
            <p className="max-w-3xl font-sans text-lg leading-relaxed text-muted-foreground">
              {aboutTeaser.paragraphs[1]}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:col-start-2 lg:row-span-2 lg:grid-cols-1">
            {aboutTeaser.features.map((feature) => {
              const Icon = iconMap[feature.icon];

              return (
                <article key={feature.title} className="rounded-4xl bg-background p-5">
                  <Icon
                    className="mb-4 h-10 w-10 text-accent-dark"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="mb-2 font-serif text-2xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="lg:col-start-1 lg:row-start-2 lg:self-end">
            <Button
              asChild
              className="w-full rounded-full bg-accent hover:bg-accent sm:w-auto md:bg-primary"
            >
              <Link href={aboutTeaser.ctaHref}>{aboutTeaser.ctaLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
