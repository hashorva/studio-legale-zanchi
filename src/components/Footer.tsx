// src/components/Footer.tsx

import Link from 'next/link';
import {
  Scale,
  MapPin,
  Phone,
  Send,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';

// Type definition
type NavLink = {
  href: string;
  label: string;
  Icon: LucideIcon;
};

const navLinks: NavLink[] = [
  { href: '/', label: 'Home', Icon: ChevronRight },
  { href: '/chi-siamo', label: 'Chi Siamo ', Icon: ChevronRight },
  { href: '/servizi', label: 'Servizi', Icon: ChevronRight },
  { href: '/contatti', label: 'Contatti', Icon: ChevronRight },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-white" />
              <p className="font-serif font-semibold text-lg tracking-normal pt-0.5 leading-tight">
                Studio Legale Zanchi
              </p>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mr-10">
              Offriamo assistenza legale professionale e personalizzata per
              privati e aziende.
            </p>
          </div>

          {/* Column 2: Contacts */}
          <address className="not-italic space-y-3">
            <p className="font-semibold text-white mb-4">Contatti</p>
            <div className="group flex items-start gap-2 text-sm text-white/70">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-white/50 group-hover:text-white transition-colors" />
              <a
                href="https://maps.google.com/?q=Via+Giuseppe+Ripamonti+114+Milano+20141"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 group-hover:text-white transition-colors"
              >
                Via Giuseppe Ripamonti 114
                <br />
                20141 Milano
              </a>
            </div>
            <div className="group flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 shrink-0 text-white/50 group-hover:text-white transition-colors" />
              <a
                href="tel:+390212345678"
                className="text-white/70 group-hover:text-white transition-colors"
              >
                +39 02 1234567
              </a>
            </div>
            <div className="group flex items-center gap-2 text-sm ">
              <Send className="h-4 w-4 shrink-0 text-white/50 group-hover:text-white transition-colors" />
              <a
                href="mailto:info@studiolegalezanchi.com"
                className="text-white/70 group-hover:text-white transition-colors"
              >
                info@studiolegalezanchi.com
              </a>
            </div>
          </address>

          {/* Column 3: Navigation */}
          <nav aria-label="Footer navigation">
            <p className="font-semibold text-white mb-4">Link utili</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href} className="group flex items-center gap-2">
                  <link.Icon
                    className="h-4 w-4 text-white/50 shrink-0 group-hover:text-white transition-colors"
                    aria-hidden="true"
                  />
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 group-hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Bottom bar: copyright + legal */}
      <div className="border-t border-white/10 mt-10 pt-6 pb-12 text-center text-xs text-white/50 space-y-1">
        <p>
          © {new Date().getFullYear()} Studio Legale Zanchi. Tutti i diritti
          riservati.
        </p>
        <p>P.IVA: 12345678910</p>
        <ul className="flex justify-center gap-4 flex-wrap">
          <li>
            <Link href="/privacy-policy" className="hover:text-white/90">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/cookie-policy" className="hover:text-white/90">
              Cookie Policy
            </Link>
          </li>
          <li>
            <Link href="/termini-e-condizioni" className="hover:text-white/90">
              Termini e Condizioni
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
