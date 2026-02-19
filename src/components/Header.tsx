// src/components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // ← NEW: reads current URL
import { Menu, X, Scale } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldRenderOverlay, setShouldRenderOverlay] = useState(false);
  const closeOverlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname(); // ← NEW: "/servizi" when on services page

  const openMenu = useCallback(() => {
    if (closeOverlayTimeoutRef.current) {
      clearTimeout(closeOverlayTimeoutRef.current);
      closeOverlayTimeoutRef.current = null;
    }
    setIsMenuOpen(true);
    setShouldRenderOverlay(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    if (closeOverlayTimeoutRef.current) {
      clearTimeout(closeOverlayTimeoutRef.current);
    }
    closeOverlayTimeoutRef.current = setTimeout(() => {
      setShouldRenderOverlay(false);
      closeOverlayTimeoutRef.current = null;
    }, 100);
  }, []);

  // Close mobile menu with Escape key (accessibility)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isMenuOpen, closeMenu]);

  useEffect(() => {
    return () => {
      if (closeOverlayTimeoutRef.current) {
        clearTimeout(closeOverlayTimeoutRef.current);
      }
    };
  }, []);


  return (
    <>
      {/* Backdrop Overlay — only shows when mobile menu open */}
      <AnimatePresence>
        {shouldRenderOverlay && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Header — fixed to top, full width */}
      <motion.header
        layout
        className="fixed top-0 z-50 w-full bg-background/90 backdrop-blur"
        initial={false}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

          {/* Logo — left side */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            {/* Scale icon */}
            <Scale className="w-10 h-10 text-primary flex-shrink-0" strokeWidth={1.5} />

            {/* Text stack */}
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-foreground font-serif">
                Studio Legale Zanchi
              </span>
              <span className="text-xs italic text-muted-foreground hidden sm:block font-sans">
                Esperienza e competenza al tuo servizio
              </span>
            </div>
          </Link>

          {/* Desktop Nav — hidden on mobile, visible lg+ */}
          <nav className="hidden lg:flex gap-8 items-center">
            <NavLink href="/servizi" currentPath={pathname}>
              Servizi
            </NavLink>
            <NavLink href="/chi-siamo" currentPath={pathname}>
              Chi Siamo
            </NavLink>
            <NavLink href="/contatti" currentPath={pathname}>
              Contatti
            </NavLink>
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Toggle — visible on mobile only */}
          <button
            className="lg:hidden z-50 relative p-2 rounded-md hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={isMenuOpen ? closeMenu : openMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu — slides down when open */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              layout
              key="mobile-menu"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden lg:hidden"
            >
              <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-4 pb-6 flex flex-col items-center gap-4 border-t border-border"
              >
                <NavLink href="/servizi" currentPath={pathname} mobile onClick={closeMenu}>
                  Servizi
                </NavLink>
                <NavLink href="/chi-siamo" currentPath={pathname} mobile onClick={closeMenu}>
                  Chi Siamo
                </NavLink>
                <NavLink href="/contatti" currentPath={pathname} mobile onClick={closeMenu}>
                  Contatti
                </NavLink>
                <ThemeToggle/>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}

// ========================================
// NavLink Component — reusable nav link
// ========================================
function NavLink({
  href,
  currentPath,
  children,
  mobile = false,
  onClick,
}: {
  href: string;
  currentPath: string;
  children: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void;
}) {
  const isActive = currentPath === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        ${mobile ? "text-lg py-2" : "text-sm"}
        transition-colors
        font-medium
        focus:outline-none focus:underline focus:underline-offset-4
        ${
          isActive
            ? "text-accent font-semibold" // Active: red + bold
            : "text-foreground hover:text-accent" // Inactive: navy → red on hover
        }
      `}
    >
      {children}
    </Link>
  );
}
