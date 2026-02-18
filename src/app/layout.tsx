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
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// Serif for body/nav
const inter = Inter({
  subsets: ['latin'],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: '%s | Studio Legale Zanchi',
    default: 'Studio Legale Zanchi | Avvocato Civile Milano',
  },
  description: 'Assistenza legale in ambito civile e contrattuale a Milano',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${playfair.variable} ${inter.variable}`}>
      <body className='font-sans'>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ChatProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow pt-20">{children}</main>{' '}
              {/* The top padding should be defined by the height of the menu bar to avoid overlap */}
              <Footer />
            </div>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
