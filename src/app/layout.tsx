// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ChatProvider } from "@/contexts/ChatContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studio Legale Zanchi",
  description: "Assistenza legale in ambito civile e contrattuale a Milano",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={inter.className}>
      <body>
        <ChatProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-20">{children}</main>{" "}
            {/* The top padding should be defined by the height of the menu bar to avoid overlap */}
            <Footer />
          </div>
        </ChatProvider>
      </body>
    </html>
  );
}
