"use client";

import { useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

import { api } from "@/lib/api";
import type { JobOpening, PaginatedResponse } from "@/lib/types";

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technology, setTechnology] = useState("");
  const [applicationEmail, setApplicationEmail] = useState("");

  const load = () => {
    setLoading(true);
    api
      .get<PaginatedResponse<JobOpening>>("/careers/openings/?page_size=100")
      .then((res) => setJobs(res.data.results))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTechnology("");
    setApplicationEmail("");
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.post("/careers/openings/", {
        title,
        description,
        technology,
        application_email: applicationEmail,
      });
      resetForm();
      setFormOpen(false);
      load();
    } catch {
      setError("Could not publish this opening. Please check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this job opening?")) return;
    await api.delete(`/careers/openings/${id}/`);
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Careers</h1>
          <p className="mt-1 text-sm text-foreground-muted">Publish and manage open positions on the Careers page.</p>
        </div>
        <button
          type="button"
          onClick={() => setFormOpen((o) => !o)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <FiPlus size={16} /> New Opening
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleCreate} className="mt-6 space-y-4 rounded-2xl border border-border bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Job Title</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Senior Backend Engineer"
                className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Application Email</label>
              <input
                required
                type="email"
                value={applicationEmail}
                onChange={(e) => setApplicationEmail(e.target.value)}
                placeholder="careers@techishinnovation.com"
                className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Technology / Skills <span className="text-foreground-muted font-normal">(comma-separated)</span>
            </label>
            <input
              required
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
              placeholder="e.g. Backend Development, APIs, Databases"
              className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
            <textarea
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Publishing..." : "Publish Opening"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      )}

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-sm text-foreground-muted">Loading...</p>
        ) : jobs.length === 0 ? (
          <p className="text-sm text-foreground-muted">No job openings yet.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="rounded-2xl border border-border bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground">{job.title}</h3>
                  <p className="mt-1 text-xs text-foreground-muted">{job.application_email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(job.id)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                >
                  <FiTrash2 size={12} /> Delete
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {job.technology.split(",").map((t) => t.trim()).filter(Boolean).map((tag) => (
                  <span key={tag} className="rounded-full bg-background-subtle px-2.5 py-1 text-xs font-medium text-foreground-muted">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-foreground-muted">{job.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
