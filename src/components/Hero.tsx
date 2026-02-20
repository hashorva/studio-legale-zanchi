import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Send, Handshake } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-[#010101] w-full -mt-40">
      {/* Desktop layout: Side-by-side (lg: and above) */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto mt-20 pt-20 min-h-[50vh] lg:min-h-[800px] grid md:grid-cols-[1.1fr_1fr] lg:grid-cols-[1.5fr_1fr] ">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center pl-4 gap-6 pb-20 lg:pb-0">
            <h1 className="group font-serif text-4xl lg:text-6xl font-medium text-white/80 hover:text-white/60 transition-all duration-200 leading-none">
              Soluzioni legali{' '}
              <span className="underline underline-offset-6 decoration-accent-dark group-hover:decoration-accent transition-all duration-200 decoration-5 text-white">
                personalizzate
              </span>{' '}
              per ogni tua esigenza
            </h1>
            <p className="font-sans text-base text-white/70 max-w-xl">
              Lo Studio Legale Zanchi offre una consulenza e assistenza legale
              in diversi ambiti del diritto, con un approccio personalizzato e
              orientato alla risoluzione efficace delle problematiche dei
              clienti
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/contatti">
                <Button
                  size="lg"
                  className="
                    bg-accent-dark

                    /* Mobile: Tap feedback */
                    active:scale-95
                    active:brightness-90

                    /* Desktop: Hover effects */
                    md:hover:bg-accent
                    md:hover:-translate-y-0.5
                    md:hover:shadow-[0_0_20px_rgba(191,21,52,0.5)]

                    /* Smooth transitions */
                    transition-all
                    duration-200

                    /* Accessibility */
                    focus-visible:ring-2
                    focus-visible:ring-accent
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-black
                  "
                >
                  <Send className="w-5 h-5 mr-0" />
                  Contattaci
                </Button>
              </Link>
              <Link href="/servizi">
                <Button
                  size="lg"
                  className="
                    bg-primary-dark
                    text-white

                    /* Enhanced glow always visible */
                    shadow-[0_0_15px_rgba(31,59,115,0.4)]

                    /* Mobile: Tap feedback */
                    active:scale-95
                    active:brightness-125
                    active:shadow-[0_0_25px_rgba(31,59,115,0.6)]

                    /* Desktop: Hover effects */
                    md:hover:brightness-110
                    md:hover:-translate-y-0.5
                    md:hover:shadow-[0_0_30px_rgba(31,59,115,0.7)]

                    /* Smooth transitions */
                    transition-all
                    duration-200

                    /* Accessibility */
                    focus-visible:ring-2
                    focus-visible:ring-primary
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-black
                  "
                >
                  <Handshake className="w-5 h-5 mr-0" />I Nostri Servizi
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Photo (bottom-aligned) */}
          <div className="relative md:h-[60vh] md:min-h-[700px] lg:h-[60vh] lg:min-h-[750px]">
            <Image
              src="/avvocato-silvio-zanchi.jpeg"
              alt="Avvocato Silvio Zanchi"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover md:object-[35%_0%] lg:object-bottom "
              priority
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout: Photo background + Text overlay (below lg:) */}
      <div className="md:hidden">
        <div className="relative min-h-[600px] h-[750px] sm:h-[70vh] mt-20 flex flex-col items-end justify-end">
          {/* Background Photo Layer */}
          <div className="absolute inset-0 z-0 mt-10 max-w-[600px] ml-auto">
            <Image
              src="/avvocato-silvio-zanchi.jpeg"
              alt="Avvocato Silvio Zanchi"
              fill
              sizes="100vw"
              className="object-cover object-[30%] "
              priority
            />
          </div>

          {/* Dark Gradient Overlay for Text Readability */}
          <div className="absolute bottom-0 left-0 right-0 h-[50vh] z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Text Content Overlay (bottom-anchored) */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 pb-16 pr-10">
            <div className="flex flex-col gap-4">
              <div
                aria-level="1"
                role="heading"
                className="font-serif font-bold text-4xl text-white/80 leading-tight"
              >
                Soluzioni legali{' '}
                <span className="underline underline-offset-6 decoration-accent decoration-5 text-white">
                  personalizzate
                </span>{' '}
                per ogni tua esigenza
              </div>
              <p className="font-sans text-base text-white/90">
                Lo Studio Legale Zanchi offre una consulenza e assistenza legale
                in diversi ambiti del diritto, con un approccio personalizzato
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <Link href="/contatti">
                  <Button size="lg" className="bg-accent hover:bg-accent-dark">
                    <Send className="w-5 h-5 mr-0" />
                    Contattaci
                  </Button>
                </Link>
                <Link href="/servizi">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white bg-white/20 text-white hover:bg-white/10"
                  >
                    <Handshake className="w-5 h-5 mr-0" />I Nostri Servizi
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
