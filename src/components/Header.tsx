"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import SocialIcons from "./SocialIcons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/our-craft", label: "Our Craft" },
  { href: "/our-work", label: "Our Work" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact Us" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/feedback")) return null;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "glass-panel border-b border-border shadow-[0_8px_30px_-16px_rgba(79,70,229,0.2)]"
          : "bg-white/30 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container-page flex items-center justify-between h-18 py-3">
        <Link href="/" className="group flex items-center gap-2.5" data-cursor-hover="true">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-secondary text-white font-heading font-bold text-lg shadow-md shadow-primary/30 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105">
            T
          </span>
          <span className="font-heading text-lg font-bold tracking-tight text-foreground">
            Techish <span className="gradient-text">Innovation</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-cursor-hover="true"
                className={`relative py-1 text-sm font-medium transition-colors duration-300 ${
                  active ? "text-primary" : "text-foreground-muted hover:text-foreground"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <SocialIcons variant="header" />
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          data-cursor-hover="true"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-white border-b border-border"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground-muted hover:bg-background-subtle"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 px-3">
                <SocialIcons variant="header" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
