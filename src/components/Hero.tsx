import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative bg-[#010101] w-full -mt-40">
      {/* Desktop layout: Side-by-side (lg: and above) */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto mt-20 pt-20 min-h-[50vh] lg:min-h-[800px] grid md:grid-cols-[1.1fr_1fr] lg:grid-cols-[1.5fr_1fr] ">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-center pl-4 gap-6 pb-20 lg:pb-0">
            <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white leading-tight">
              Soluzioni legali personalizzate per ogni tua esigenza
            </h1>
            <p className="font-sans text-md text-white/90 max-w-xl">
              Lo Studio Legale Zanchi offre una consulenza e assistenza legale
              in diversi ambiti del diritto, con un approccio personalizzato e
              orientato alla risoluzione efficace delle problematiche dei
              clienti
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/contatti">
                <Button size="lg" className="bg-accent hover:bg-accent-dark">
                  Contattaci
                </Button>
              </Link>
              <Link href="/servizi">
                <Button
                  size="lg"
                  className="border-primary text-white hover:bg-primary/80"
                >
                  I Nostri Servizi
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
              className="object-cover md:object-[35%_0%] lg:object-bottom "
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout: Photo background + Text overlay (below lg:) */}
      <div className="md:hidden">
      <div className='relative min-h-[600px] h-[750px] sm:h-[70vh] md:h-[80vh] mt-20 flex flex-col items-end justify-end'>
        {/* Background Photo Layer */}
        <div className='absolute inset-0 z-0 mt-10'>
          <Image
            src='/avvocato-silvio-zanchi.jpeg'
            alt='Avvocato Silvio Zanchi'
            fill
            className='object-cover object-[30%] max-w-[600px] ml-auto'
            priority
          />
        </div>

        {/* Dark Gradaient Overlay for Text Readability */}
        <div className='absolute bottom-0 left-0 right-0 h-[50vh] z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent' />

        {/* Text Content Overlay (bottom-anchored) */}
        <div className='absolute bottom-0 left-0 right-0 z-20 p-6 pb-16 pr-10'>
          <div className='flex flex-col gap-4'>
            <h1 className='font-serif font-bold text-4xl text-white leading-tight'>
              Soluzioni legali personalizzate per ogni tua esigenza
            </h1>
            <p className='font-sans text-base text-white/90'>Lo Studio Legale Zanchi offre una consulenza e assistenza legale in diversi ambiti del diritto, con un approccio personalizzato</p>
            <div className='flex flex-wrap gap-3 mt-2'>
              <Link href="/contatti">
                <Button size="lg" className='bg-accent hover:bg-accent-dark'>
                  Contattaci
                </Button>
              </Link>
              <Link href="/servizi">
                <Button size="lg" variant="outline" className='border-white bg-white/20 text-white hover:bg-white/10'>
                  I Nostri Servizi
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
