"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCheck, FiEdit2, FiEye, FiSend, FiSettings, FiTrash2, FiX } from "react-icons/fi";

import { api } from "@/lib/api";
import type { ClientReviewAdmin, SiteSettingsAdmin } from "@/lib/types";

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-50 text-amber-600",
  submitted: "bg-primary/10 text-primary",
  approved: "bg-emerald-50 text-emerald-600",
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ClientReviewAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);
  const [modal, setModal] = useState<{ mode: "view" | "edit"; review: ClientReviewAdmin } | null>(null);
  const [mailConfigured, setMailConfigured] = useState<boolean | null>(null);

  const load = () => {
    setLoading(true);
    api
      .get<ClientReviewAdmin[]>("/reviews/admin/")
      .then((res) => setReviews(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  useEffect(() => {
    api
      .get<SiteSettingsAdmin>("/settings/")
      .then((res) => setMailConfigured(Boolean(res.data.mail_config_email && res.data.mail_config_app_password)))
      .catch(() => setMailConfigured(false));
  }, []);

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendError("");
    setSending(true);
    setSendSuccess(false);
    try {
      await api.post("/reviews/request/", { email });
      setEmail("");
      setSendSuccess(true);
      load();
      setTimeout(() => setSendSuccess(false), 4000);
    } catch {
      setSendError("Could not send the review request. Please check the email and try again.");
    } finally {
      setSending(false);
    }
  };

  const handleApprove = async (review: ClientReviewAdmin) => {
    await api.patch(`/reviews/admin/${review.id}/`, { status: "approved" });
    load();
  };

  const handleDelete = async (review: ClientReviewAdmin) => {
    if (!confirm(`Delete the review request for ${review.email}?`)) return;
    await api.delete(`/reviews/admin/${review.id}/`);
    load();
  };

  return (
    <div>
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Client Reviews</h1>
        <p className="mt-1 text-sm text-foreground-muted">
          Send clients a link to leave feedback, then approve the ones you want to publish on the site.
        </p>
      </div>

      <form
        onSubmit={handleSendRequest}
        className="mt-6 flex flex-wrap items-end gap-4 rounded-2xl border border-border bg-white p-6"
      >
        <div className="min-w-[240px] flex-1">
          <label className="mb-1.5 block text-sm font-medium text-foreground">Client Email</label>
          <input
            required
            type="email"
            disabled={!mailConfigured}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="client@company.com"
            className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
        {mailConfigured ? (
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            <FiSend size={14} /> {sending ? "Sending..." : "Send Review Request"}
          </button>
        ) : (
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600"
          >
            <FiSettings size={14} /> Configure Mail
          </Link>
        )}
        {!mailConfigured && mailConfigured !== null && (
          <p className="w-full text-sm text-amber-600">
            Mail isn&apos;t configured yet — add a Gmail address and app password in Settings before sending review
            requests.
          </p>
        )}
        {sendSuccess && <p className="w-full text-sm text-primary">Review request sent.</p>}
        {sendError && <p className="w-full text-sm text-red-600">{sendError}</p>}
      </form>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-background-subtle text-foreground-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Email</th>
                <th className="px-5 py-3 font-medium">Client</th>
                <th className="px-5 py-3 font-medium">Project</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-foreground-muted">
                    Loading...
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-foreground-muted">
                    No review requests yet.
                  </td>
                </tr>
              ) : (
                reviews.map((r) => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="px-5 py-3.5 font-medium text-foreground">{r.email}</td>
                    <td className="px-5 py-3.5 text-foreground-muted">{r.client_name || "—"}</td>
                    <td className="px-5 py-3.5 text-foreground-muted">{r.project_title || "—"}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_STYLES[r.status]}`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setModal({ mode: "view", review: r })}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground-muted hover:bg-background-subtle"
                        >
                          <FiEye size={13} /> View
                        </button>
                        <button
                          type="button"
                          onClick={() => setModal({ mode: "edit", review: r })}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-foreground-muted hover:bg-background-subtle"
                        >
                          <FiEdit2 size={13} /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApprove(r)}
                          disabled={r.status !== "submitted"}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-30"
                        >
                          <FiCheck size={13} /> Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(r)}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          <FiTrash2 size={13} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <ReviewModal
          mode={modal.mode}
          review={modal.review}
          onClose={() => setModal(null)}
          onSaved={() => {
            setModal(null);
            load();
          }}
        />
      )}
    </div>
  );
}

function ReviewModal({
  mode,
  review,
  onClose,
  onSaved,
}: {
  mode: "view" | "edit";
  review: ClientReviewAdmin;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [editing, setEditing] = useState(mode === "edit");
  const [form, setForm] = useState({
    client_name: review.client_name,
    project_title: review.project_title,
    feedback: review.feedback,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.patch(`/reviews/admin/${review.id}/`, form);
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg font-semibold text-foreground">
            {editing ? "Edit Review" : "Review Details"}
          </h3>
          <button type="button" onClick={onClose} className="text-foreground-muted hover:text-foreground">
            <FiX size={18} />
          </button>
        </div>

        <p className="mt-1 text-xs text-foreground-muted">{review.email}</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Client Name</label>
            {editing ? (
              <input
                value={form.client_name}
                onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            ) : (
              <p className="text-sm text-foreground">{review.client_name || "—"}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Project Title</label>
            {editing ? (
              <input
                value={form.project_title}
                onChange={(e) => setForm({ ...form, project_title: e.target.value })}
                className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            ) : (
              <p className="text-sm text-foreground">{review.project_title || "—"}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Feedback</label>
            {editing ? (
              <textarea
                rows={5}
                value={form.feedback}
                onChange={(e) => setForm({ ...form, feedback: e.target.value })}
                className="w-full resize-none rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            ) : (
              <p className="text-sm leading-relaxed text-foreground-muted">{review.feedback || "—"}</p>
            )}
          </div>
        </div>

        <div className="mt-7 flex justify-end gap-3">
          {editing ? (
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-white"
            >
              <FiEdit2 size={14} /> Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
