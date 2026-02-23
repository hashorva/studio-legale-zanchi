// src/app/layout.tsx
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChatProvider } from '@/contexts/ChatContext';
import { ThemeProvider } from 'next-themes';

// Serif for headings/brand
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

// Serif for body/nav
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Studio Legale Zanchi',
    default: 'Studio Legale Zanchi | Avvocato Civile Milano',
  },
  description: 'Assistenza legale in ambito civile e contrattuale a Milano',
};

function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Studio Legale Zanchi',
    description: 'Assistenza legale in ambito civile e contrattuale a Milano',
    url: 'https://studiolegalezanchi.com',
    telephone: '+390236504555',
    email: 'info@studiolegalezanchi.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Giuseppe Ripamonti 114',
      addressLocality: 'Milano',
      postalCode: '20141',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.43931607042396,
      longitude: 9.199419275085615,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '15:00',
        closes: '19:30',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'Milano',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ChatProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main
                className="flex-grow"
                style={{ paddingTop: 'var(--header-height, 5rem)' }}
              >
                {children}
              </main>
              {/* The top padding should be defined by the height of the menu bar to avoid overlap */}
              <Footer />
            </div>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
