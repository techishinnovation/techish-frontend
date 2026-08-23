"use client";

import { FaFacebookF, FaInstagram, FaLinkedinIn, FaThreads } from "react-icons/fa6";
import useSWR from "swr";

import { api } from "@/lib/api";
import type { SiteSettingsPublic } from "@/lib/types";

import ClutchIcon from "./icons/ClutchIcon";

const fetcher = (url: string) => api.get(url).then((res) => res.data as SiteSettingsPublic);

interface SocialIconsProps {
  variant?: "header" | "footer";
}

export default function SocialIcons({ variant = "header" }: SocialIconsProps) {
  const { data } = useSWR("/settings/public/", fetcher, {
    revalidateOnFocus: false,
  });

  const links: { key: string; url: string; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "instagram", url: data?.instagram_url ?? "", label: "Instagram", Icon: FaInstagram },
    { key: "linkedin", url: data?.linkedin_url ?? "", label: "LinkedIn", Icon: FaLinkedinIn },
    { key: "threads", url: data?.threads_url ?? "", label: "Threads", Icon: FaThreads },
    { key: "facebook", url: data?.facebook_url ?? "", label: "Facebook", Icon: FaFacebookF },
  ];

  const sizeClass =
    variant === "header"
      ? "w-8 h-8 text-sm"
      : "w-9 h-9 text-base";

  return (
    <div className="flex items-center gap-2">
      {links.map(({ key, url, label, Icon }) => {
        const active = Boolean(url);
        return (
          <a
            key={key}
            href={active ? url : undefined}
            target={active ? "_blank" : undefined}
            rel={active ? "noopener noreferrer" : undefined}
            aria-label={label}
            aria-disabled={!active}
            data-cursor-hover={active ? "true" : undefined}
            className={`${sizeClass} inline-flex items-center justify-center rounded-full border transition-colors ${
              active
                ? "border-border text-foreground hover:bg-primary hover:text-white hover:border-primary cursor-pointer"
                : "border-border/60 text-foreground-muted/40 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (!active) e.preventDefault();
            }}
          >
            <Icon className="w-3.5 h-3.5" />
          </a>
        );
      })}

      {/* Clutch is entirely hidden until an admin publishes a URL */}
      {data?.clutch_url ? (
        <a
          href={data.clutch_url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Clutch"
          data-cursor-hover="true"
          className={`${sizeClass} inline-flex items-center justify-center rounded-full border border-border text-foreground hover:bg-primary hover:text-white hover:border-primary transition-colors`}
        >
          <ClutchIcon className="w-3.5 h-3.5" />
        </a>
      ) : null}
    </div>
  );
}
