import type { Metadata } from 'next';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

import { Button } from '@/components/ui/button';
import { getAboutContent, getAboutPageContent } from '@/lib/content';
import { iconMap } from '@/lib/icon-map';

const aboutContent = getAboutContent();
const aboutPage = getAboutPageContent();

export const metadata: Metadata = {
  title: aboutContent.metaTitle,
  description: aboutContent.metaDescription,
};

export default function ChiSiamoPage() {
  const PrimaryCtaIcon = iconMap[aboutPage.cta.primaryIcon];
  const SecondaryCtaIcon = iconMap[aboutPage.cta.secondaryIcon];

  return (
    <main>
      <article>
        <header className="relative bg-primary">
          <div className="mx-auto max-w-7xl px-4 pt-24 pb-14 md:px-6 md:pt-32 md:pb-18">
            <div className="max-w-4xl">
              <p className="mb-3 font-sans text-sm font-semibold uppercase tracking-[0.18em] text-white/60">
                {aboutPage.hero.eyebrow}
              </p>
              <h1 className="mb-5 font-serif text-5xl font-medium leading-tight text-white/90 md:text-6xl">
                {aboutPage.hero.title}
              </h1>
              <p className="mb-4 font-serif text-2xl underline-offset-4 decoration-3 decoration-accent underline leading-relaxed text-white/80 md:text-3xl">
                {aboutPage.hero.subtitle}
              </p>
              <p className="max-w-3xl font-sans text-lg leading-relaxed text-white/75">
                {aboutPage.hero.description}
              </p>
            </div>
          </div>
        </header>

        <div className="bg-black/1">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
            <section className="mb-20 max-w-4xl">
              <h2 className="mb-6 font-serif text-4xl font-semibold text-foreground md:text-5xl">
                {aboutPage.sections.studio.title}
              </h2>
              <p className="mb-4 font-sans text-lg leading-relaxed text-foreground/85">
                {aboutPage.sections.studio.paragraphs[0]}
              </p>
              <p className="font-sans text-lg leading-relaxed text-muted-foreground">
                {aboutPage.sections.studio.paragraphs[1]}
              </p>
            </section>
            <Separator
              orientation="horizontal"
              className="max-w-3xl border-accent border-2"
            />
            <section className="mt-20 mb-20 max-w-4xl">
              <h2 className="mb-6 font-serif text-4xl font-semibold text-foreground md:text-5xl">
                {aboutPage.sections.method.title}
              </h2>
              <p className="mb-4 font-sans text-lg leading-relaxed text-foreground/85">
                {aboutPage.sections.method.paragraphs[0]}
              </p>
              <p className="font-sans text-lg leading-relaxed text-muted-foreground">
                {aboutPage.sections.method.paragraphs[1]}
              </p>
            </section>

            <section className="mb-20">
              <h2 className="mb-15 max-w-5xl font-serif text-4xl font-semibold text-foreground md:text-5xl">
                {aboutPage.sections.clientExpectations.title}
              </h2>
              <div className="grid gap-5 md:grid-cols-2">
                {aboutPage.sections.clientExpectations.items.map((item) => {
                  const Icon = iconMap[item.icon];

                  return (
                    <article
                      key={item.title}
                      className="rounded-[2rem] bg-background p-6 shadow-xs"
                    >
                      <Icon
                        className="mb-4 h-11 w-11 text-accent-dark"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <h3 className="mb-3 font-serif text-3xl font-semibold text-foreground">
                        {item.title}
                      </h3>
                      <p className="font-sans text-base leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="mb-20 max-w-4xl">
              <h2 className="mb-8 font-serif text-4xl font-semibold text-foreground md:text-5xl">
                {aboutPage.sections.caseBasedSupport.title}
              </h2>
              <p className="mb-4 font-sans text-lg leading-relaxed text-foreground/85">
                {aboutPage.sections.caseBasedSupport.paragraphs[0]}
              </p>
              <p className="font-sans text-lg leading-relaxed text-muted-foreground">
                {aboutPage.sections.caseBasedSupport.paragraphs[1]}
              </p>
            </section>

            <section className="rounded-[2.5rem] bg-primary/[0.05] px-6 py-8 md:px-10 md:py-10 max-w-4xl">
              <div className="">
                <h2 className="mb-4 font-serif text-4xl font-semibold text-foreground md:text-5xl">
                  {aboutPage.cta.title}
                </h2>
                <p className="font-sans text-lg leading-relaxed text-muted-foreground">
                  {aboutPage.cta.description}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4 justify-end">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary-dark hover:translate-x-0.5"
                >
                  <Link href={aboutPage.cta.primaryHref}>
                    <PrimaryCtaIcon
                      strokeWidth={1.5}
                      className="mr-1 h-5 w-5"
                      aria-hidden="true"
                    />
                    {aboutPage.cta.primaryLabel}
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent-dark hover:translate-x-0.5"
                >
                  <Link href={aboutPage.cta.secondaryHref}>
                    <SecondaryCtaIcon className="mr-1 h-5 w-5" />
                    {aboutPage.cta.secondaryLabel}
                  </Link>
                </Button>
              </div>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
