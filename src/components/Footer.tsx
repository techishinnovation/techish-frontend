"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import useSWR from "swr";

import { api } from "@/lib/api";
import type { SiteSettingsPublic } from "@/lib/types";

import SocialIcons from "./SocialIcons";

const fetcher = (url: string) => api.get(url).then((res) => res.data as SiteSettingsPublic);

const EXPLORE_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/our-craft", label: "Our Craft" },
  { href: "/our-work", label: "Our Work" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
];

export default function Footer() {
  const pathname = usePathname();
  const { data: settings } = useSWR("/settings/public/", fetcher, { revalidateOnFocus: false });

  if (pathname?.startsWith("/admin") || pathname?.startsWith("/feedback")) return null;

  const contactItems = [
    settings?.contact_address ? { icon: FiMapPin, content: settings.contact_address } : null,
    settings?.contact_email
      ? { icon: FiMail, content: settings.contact_email, href: `mailto:${settings.contact_email}` }
      : null,
    settings?.contact_phone
      ? { icon: FiPhone, content: settings.contact_phone, href: `tel:${settings.contact_phone.replace(/[^+\d]/g, "")}` }
      : null,
  ].filter((item): item is { icon: typeof FiMapPin; content: string; href?: string } => Boolean(item));

  return (
    <footer className="relative mt-auto border-t border-border bg-background-subtle">
      <div className="h-0.5 w-full bg-gradient-to-r from-primary via-secondary to-accent" />
      <div className="container-page py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4" data-cursor-hover="true">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white font-heading font-bold text-lg">
              T
            </span>
            <span className="font-heading text-lg font-bold text-foreground">
              Techish Innovation
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-foreground-muted max-w-xs">
            We design, build, and scale digital products — engineering
            excellence for startups and enterprises alike.
          </p>
          <div className="mt-5">
            <SocialIcons variant="footer" />
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground mb-4">Explore</h4>
          <ul className="space-y-2.5">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  data-cursor-hover="true"
                  className="text-sm text-foreground-muted hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground mb-4">Services</h4>
          <ul className="space-y-2.5 text-sm text-foreground-muted">
            <li>Web Application Development</li>
            <li>Mobile App Development</li>
            <li>Cloud & DevOps Engineering</li>
            <li>AI & Data Solutions</li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-foreground mb-4">Get in Touch</h4>
          {contactItems.length > 0 ? (
            <ul className="space-y-3 text-sm text-foreground-muted">
              {contactItems.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <c.icon className="mt-0.5 shrink-0 text-primary" />
                  {c.href ? (
                    <a href={c.href} data-cursor-hover="true" className="hover:text-primary">
                      {c.content}
                    </a>
                  ) : (
                    <span>{c.content}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-foreground-muted">
              Contact details are being updated — please reach out through our Contact page and we&apos;ll get back
              to you shortly.
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-foreground-muted">
          <p>&copy; {new Date().getFullYear()} Techish Innovation. All rights reserved.</p>
          <p>Engineering digital excellence.</p>
        </div>
      </div>
    </footer>
  );
}
