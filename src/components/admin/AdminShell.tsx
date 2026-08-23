"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";

import { api } from "@/lib/api";
import { clearSession, getAccessToken } from "@/lib/auth";

import AdminSidebar from "./AdminSidebar";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const [checking, setChecking] = useState(!isLogin);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLogin) return;

    const token = getAccessToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    api
      .get("/auth/me/")
      .then(() => setChecking(false))
      .catch(() => {
        clearSession();
        router.replace("/admin/login");
      });
  }, [isLogin, router]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (isLogin) {
    return <div className="min-h-screen bg-background-subtle">{children}</div>;
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background-subtle text-sm text-foreground-muted">
        Checking session...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background-subtle">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-white px-4 py-3.5 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground-muted hover:bg-background-subtle"
          >
            <FiMenu size={18} />
          </button>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white font-heading text-sm font-bold">
            T
          </span>
          <p className="font-heading text-sm font-bold text-foreground">Techish Admin</p>
        </header>

        <main className="flex-1 overflow-x-hidden p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
