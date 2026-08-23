"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLock, FiUser } from "react-icons/fi";

import { api } from "@/lib/api";
import { setSession } from "@/lib/auth";
import { encryptPayload } from "@/lib/crypto";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = encryptPayload({ username, password });
      const res = await api.post("/auth/login/", { payload });
      setSession(res.data.access, res.data.refresh, res.data.username);
      router.replace("/admin");
    } catch {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-white p-8 shadow-xl">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white font-heading font-bold text-xl">
            T
          </span>
          <h1 className="font-heading text-xl font-bold text-foreground">Techish Admin</h1>
          <p className="mt-1 text-sm text-foreground-muted">Sign in to manage your site</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Username</label>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background-subtle px-3.5 py-2.5">
              <FiUser className="text-foreground-muted" size={16} />
              <input
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
                placeholder="admin"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-background-subtle px-3.5 py-2.5">
              <FiLock className="text-foreground-muted" size={16} />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
