import ChatWidget from '@/components/ChatWidget';
import Hero from '@/components/Hero';
import { ChiSiamoSection } from '@/components/sections/ChiSiamoSection';
import { ServiziSection } from '@/components/sections/ServiziSection';

export default function Home() {
  return (
    <>
      <Hero />

      <ServiziSection />
      <ChiSiamoSection />

      {/* Chat Widget */}
      <ChatWidget />
    </>
  );
}
