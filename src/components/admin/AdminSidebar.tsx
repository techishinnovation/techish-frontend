"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiBriefcase,
  FiFileText,
  FiGrid,
  FiLogOut,
  FiSettings,
  FiStar,
  FiUserPlus,
  FiUsers,
  FiX,
} from "react-icons/fi";

import { clearSession, getStoredUsername } from "@/lib/auth";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: FiGrid, exact: true },
  { href: "/admin/users", label: "Admin Users", icon: FiUsers },
  { href: "/admin/blogs", label: "Blog Posts", icon: FiFileText },
  { href: "/admin/work", label: "Our Work", icon: FiBriefcase },
  { href: "/admin/careers", label: "Careers", icon: FiUserPlus },
  { href: "/admin/reviews", label: "Client Reviews", icon: FiStar },
  { href: "/admin/settings", label: "Settings", icon: FiSettings },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const username = getStoredUsername();

  const handleLogout = () => {
    clearSession();
    router.replace("/admin/login");
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 shrink-0 flex-col border-r border-border bg-white transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-border px-6 py-5">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white font-heading font-bold">
              T
            </span>
            <div>
              <p className="font-heading text-sm font-bold text-foreground">Techish Admin</p>
              <p className="text-xs text-foreground-muted">Control Panel</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground-muted hover:bg-background-subtle lg:hidden"
          >
            <FiX size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {LINKS.map((link) => {
            const active = link.exact ? pathname === link.href : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-primary/10 text-primary" : "text-foreground-muted hover:bg-background-subtle"
                }`}
              >
                <link.icon size={16} /> {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <p className="mb-2 truncate px-1 text-xs text-foreground-muted">
            Signed in as <span className="font-medium text-foreground">{username}</span>
          </p>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-sm font-medium text-foreground-muted hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut size={15} /> Log Out
          </button>
        </div>
      </aside>
    </>
  );
}
