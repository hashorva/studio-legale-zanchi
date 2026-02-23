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
  { href: '/chi-siamo', label: 'Chi Siamo', Icon: ChevronRight },
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
            <p className="text-white/70 text-sm leading-relaxed md:mr-10">
              Offriamo assistenza legale professionale e personalizzata per
              privati e aziende.
            </p>
          </div>

          {/* Column 2: Contacts */}
          <address aria-labelledby="footer-contacts" className="not-italic">
            <h3 id="footer-contacts" className="font-semibold text-white mb-4">
              Contatti
            </h3>
            <div className="group flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-white/50 group-hover:text-white group-focus-within:text-white transition-colors" />
              <a
                href="https://maps.google.com/?q=Via+Giuseppe+Ripamonti+114+Milano+20141"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 py-3 group-hover:text-white group-focus-within:text-white transition-colors focus-visible:outline focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:rounded-sm"
              >
                Via Giuseppe Ripamonti 114, 20141 Milano
              </a>
            </div>
            <div className="group flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 shrink-0 text-white/50 group-hover:text-white group-focus-within:text-white transition-colors" />
              <a
                href="tel:+390236504555"
                className="text-white/70 py-3 group-hover:text-white group-focus-within:text-white transition-colors focus-visible:outline focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:rounded-sm"
              >
                +39 02 36504555
              </a>
            </div>
            <div className="group flex items-center gap-2 text-sm">
              <Send className="h-4 w-4 shrink-0 text-white/50 group-hover:text-white group-focus-within:text-white transition-colors" />
              <a
                href="mailto:info@studiolegalezanchi.com"
                className="text-white/70 py-3 group-hover:text-white group-focus-within:text-white transition-colors focus-visible:outline focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:rounded-sm"
              >
                info@studiolegalezanchi.com
              </a>
            </div>
          </address>

          {/* Column 3: Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="font-semibold text-white mb-4">Link utili</h3>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href} className="group flex items-center gap-2">
                  <link.Icon
                    className="h-4 w-4 text-white/50 shrink-0 group-hover:text-white group-focus-within:text-white transition-colors"
                    aria-hidden="true"
                  />
                  <Link
                    href={link.href}
                    className="text-sm py-3 text-white/70 group-hover:text-white group-focus-within:text-white transition-colors focus-visible:outline focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:rounded-sm"
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
      <div className="border-t border-white/10 pt-6 pb-12 text-center text-xs text-white/50 space-y-2">
        <p>
          © {new Date().getFullYear()} Studio Legale Zanchi. Tutti i diritti
          riservati.
        </p>
        <p>P.IVA: 12345678910</p>
        <ul className="flex justify-center gap-4 flex-wrap mt-4">
          <li>
            <Link
              href="/privacy-policy"
              className="py-4 hover:text-white/90 focus-visible:outline focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:rounded-sm"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/cookie-policy"
              className="py-4 hover:text-white/90 focus-visible:outline focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:rounded-sm"
            >
              Cookie Policy
            </Link>
          </li>
          <li>
            <Link
              href="/termini-e-condizioni"
              className="py-4 hover:text-white/90 focus-visible:outline focus-visible:outline-white focus-visible:outline-offset-2 focus-visible:rounded-sm"
            >
              Termini e Condizioni
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
