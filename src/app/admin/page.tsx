"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiBriefcase, FiFileText, FiUserPlus, FiUsers } from "react-icons/fi";

import { api } from "@/lib/api";

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({ users: 0, blogs: 0, work: 0, careers: 0 });

  useEffect(() => {
    Promise.all([
      api.get("/auth/users/").then((r) => r.data.length).catch(() => 0),
      api.get("/blog/posts/?page_size=1").then((r) => r.data.count).catch(() => 0),
      api.get("/work/items/?page_size=1").then((r) => r.data.count).catch(() => 0),
      api.get("/careers/openings/?page_size=1").then((r) => r.data.count).catch(() => 0),
    ]).then(([users, blogs, work, careers]) => setCounts({ users, blogs, work, careers }));
  }, []);

  const cards = [
    { label: "Admin Users", value: counts.users, href: "/admin/users", icon: FiUsers },
    { label: "Blog Posts", value: counts.blogs, href: "/admin/blogs", icon: FiFileText },
    { label: "Work Items", value: counts.work, href: "/admin/work", icon: FiBriefcase },
    { label: "Job Openings", value: counts.careers, href: "/admin/careers", icon: FiUserPlus },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-foreground-muted">Welcome back to the Techish Innovation control panel.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <c.icon size={20} />
              </span>
              <FiArrowRight className="text-foreground-muted opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <p className="mt-4 text-3xl font-bold text-foreground">{c.value}</p>
            <p className="mt-1 text-sm text-foreground-muted">{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
