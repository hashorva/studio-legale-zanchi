import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Send, Handshake } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative bg-[#010101] w-full"
      style={{ marginTop: 'calc(-2 * var(--header-height, 5rem))' }}
    >
      <div
        className="max-w-7xl mx-auto"
        style={{ marginTop: 'var(--header-height, 5rem)' }}
      >
        <div
          className="
          relative min-h-[600px] h-[670px]

          md:h-auto md:min-h-[50vh] md:grid md:grid-cols-[1.1fr_1fr] md:items-center

          lg:min-h-[800px] lg:grid-cols-[1.5fr_1fr]
        "
        >
          {/* Right: Photo (bottom-aligned) */}
          <div
            className="
            absolute inset-0 z-0 mt-10 max-w-[600px] ml-auto

            md:relative md:inset-auto md:mt-15 md:max-w-none md:ml-0 md:z-auto md:order-2
            md:h-[60vh] md:min-h-[600px]

            lg:h-[60vh] lg:min-h-[750px] lg:mt-auto"
          >
            <Image
              src="/avvocato-silvio-zanchi.jpeg"
              alt="Avvocato Silvio Zanchi"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 90vw"
              className="
                object-cover object-[25%_0%]

                md:object-[40%_0%]

                lg:object-[50%_0%] "
              priority
            />
          </div>

          {/* Gradient overlay - mobile only */}
          <div
            className="
            absolute bottom-0 left-0 right-0 h-[50vh] z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent

            md:hidden
          "
          />

          {/* Left: Text Content */}
          <div
            className="
            absolute bottom-0 left-0 right-0 z-20 p-6 pb-15 pr-10
            flex flex-col gap-4

            md:relative md:inset-auto md:p-0 md:pl-4 md:z-auto md:order-1
            md:flex md:flex-col md:gap-6

            lg:pb-0
          "
          >
            <h1
              className={`group
              font-serif font-medium text-4xl text-white/80 leading-tight

              md:font-medium md:text-5xl md:leading-14 md:hover:text-white/60 md:transition-all md:duration-200

              lg:text-6xl lg:leading-16`}
            >
              Soluzioni legali{' '}
              <span
                className={`
                  underline underline-offset-6 decoration-5 text-white decoration-accent

                  md:decoration-accent-dark md:group-hover:decoration-accent md:transition-all md:duration-200
                  `}
              >
                personalizzate
              </span>{' '}
              per ogni tua esigenza
            </h1>
            <p className="hidden sm:block font-sans text-base text-white/70 max-w-xl">
              Lo Studio Legale Zanchi offre una consulenza e assistenza legale
              in diversi ambiti del diritto, con un approccio personalizzato e
              orientato alla risoluzione efficace delle problematiche dei
              clienti
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button
                asChild
                size="lg"
                className={`
                    bg-accent-dark

                    active:scale-95
                    active:brightness-90

                    md:hover:bg-accent
                    md:hover:-translate-y-0.5
                    md:hover:shadow-[0_0_20px_rgba(191,21,52,0.5)]

                    transition-all
                    duration-200

                    focus-visible:ring-2
                    focus-visible:ring-accent
                    focus-visible:ring-offset-2
                `}
              >
                <Link href="/contatti">
                  <Send className="w-5 h-5 mr-1" />
                  Contattaci
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                className={`
                    bg-primary-dark
                    text-white
                    shadow-[0_0_15px_rgba(31,59,115,0.4)]

                    active:scale-95
                    active:brightness-125
                    active:shadow-[0_0_25px_rgba(31,59,115,0.6)]

                    md:hover:brightness-110
                    md:hover:-translate-y-0.5
                    md:hover:shadow-[0_0_30px_rgba(31,59,115,0.7)]

                    transition-all
                    duration-200

                    focus-visible:ring-2
                    focus-visible:ring-primary
                    focus-visible:ring-offset-2
                `}
              >
                <Link href="/servizi">
                  <Handshake className="w-5 h-5 mr-1" />I Nostri Servizi
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
