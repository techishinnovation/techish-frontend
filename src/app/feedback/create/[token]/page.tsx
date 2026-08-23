"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiCheckCircle, FiSend } from "react-icons/fi";

import { api } from "@/lib/api";

type ViewState = "loading" | "form" | "already-submitted" | "not-found" | "success";

export default function ReviewFormPage() {
  const params = useParams<{ token: string }>();
  const token = params.token;
  const [view, setView] = useState<ViewState>("loading");
  const [form, setForm] = useState({ client_name: "", project_title: "", feedback: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    api
      .get(`/reviews/token/${token}/`)
      .then((res) => {
        setView(res.data.status === "pending" ? "form" : "already-submitted");
      })
      .catch(() => setView("not-found"));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.post(`/reviews/token/${token}/submit/`, form);
      setView("success");
    } catch (err: unknown) {
      const status = (err as { response?: { status?: number } })?.response?.status;
      if (status === 409) {
        setView("already-submitted");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-background-subtle px-6 py-16">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
        {view === "loading" && <p className="text-center text-sm text-foreground-muted">Loading...</p>}

        {view === "not-found" && (
          <div className="text-center">
            <h1 className="font-heading text-xl font-bold text-foreground">Link Not Found</h1>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              This feedback link doesn&apos;t appear to be valid. Please check the link from your email, or reach
              out to us directly.
            </p>
            <Link href="/contact" data-cursor-hover="true" className="btn-primary mt-6 inline-flex">
              Contact Us
            </Link>
          </div>
        )}

        {view === "already-submitted" && (
          <div className="text-center">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FiCheckCircle size={26} />
            </span>
            <h1 className="mt-5 font-heading text-xl font-bold text-foreground">Already Submitted</h1>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              Your feedback form has already been submitted. Thank you for sharing your experience with us — this
              link can only be used once.
            </p>
          </div>
        )}

        {view === "success" && (
          <div className="text-center">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FiCheckCircle size={26} />
            </span>
            <h1 className="mt-5 font-heading text-xl font-bold text-foreground">Thank You!</h1>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              Your feedback has been submitted successfully. We really appreciate you taking the time.
            </p>
          </div>
        )}

        {view === "form" && (
          <>
            <span className="badge-pill">Share Your Feedback</span>
            <h1 className="mt-4 font-heading text-2xl font-bold text-foreground">Tell Us About Your Experience</h1>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              Your feedback helps us improve, and helps other businesses know what to expect from working with us.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Your Name</label>
                <input
                  required
                  value={form.client_name}
                  onChange={(e) => setForm({ ...form, client_name: e.target.value })}
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Project Title</label>
                <input
                  required
                  value={form.project_title}
                  onChange={(e) => setForm({ ...form, project_title: e.target.value })}
                  placeholder="e.g. E-Commerce Platform Redesign"
                  className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-foreground">Your Feedback</label>
                <textarea
                  required
                  rows={5}
                  value={form.feedback}
                  onChange={(e) => setForm({ ...form, feedback: e.target.value })}
                  placeholder="Tell us about your experience working with us..."
                  className="w-full resize-none rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={submitting}
                data-cursor-hover="true"
                className="btn-primary w-full justify-center"
              >
                {submitting ? "Submitting..." : "Submit Feedback"} <FiSend size={14} />
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
