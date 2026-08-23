"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiTrash2, FiUserPlus } from "react-icons/fi";

import { api } from "@/lib/api";
import { getStoredUsername } from "@/lib/auth";
import type { AdminUser } from "@/lib/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ username: "", password: "" });
  const [formOpen, setFormOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const currentUsername = getStoredUsername();

  const load = () => {
    setLoading(true);
    api
      .get<AdminUser[]>("/auth/users/")
      .then((res) => setUsers(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.post("/auth/users/", form);
      setForm({ username: "", password: "" });
      setFormOpen(false);
      load();
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { username?: string[]; password?: string[] } } })?.response?.data;
      setError(message?.username?.[0] || message?.password?.[0] || "Could not create user.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this admin user? This cannot be undone.")) return;
    await api.delete(`/auth/users/${id}/`);
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Admin Users</h1>
          <p className="mt-1 text-sm text-foreground-muted">Manage who can access the control panel.</p>
        </div>
        <button
          type="button"
          onClick={() => setFormOpen((o) => !o)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <FiUserPlus size={16} /> New User
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleCreate} className="mt-6 flex flex-wrap items-end gap-4 rounded-2xl border border-border bg-white p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Username</label>
            <input
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Password</label>
            <input
              required
              type="password"
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            <FiPlus size={15} /> {submitting ? "Creating..." : "Create"}
          </button>
          {error && <p className="w-full text-sm text-red-600">{error}</p>}
        </form>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-background-subtle text-foreground-muted">
            <tr>
              <th className="px-5 py-3 font-medium">Username</th>
              <th className="px-5 py-3 font-medium">Joined</th>
              <th className="px-5 py-3 font-medium">Last Login</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-foreground-muted">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-foreground-muted">
                  No admin users yet.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-t border-border">
                  <td className="px-5 py-3.5 font-medium text-foreground">
                    {u.username}
                    {u.username === currentUsername && (
                      <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">You</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-foreground-muted">
                    {new Date(u.date_joined).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5 text-foreground-muted">
                    {u.last_login ? new Date(u.last_login).toLocaleDateString() : "Never"}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(u.id)}
                      disabled={u.username === currentUsername}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <FiTrash2 size={13} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
