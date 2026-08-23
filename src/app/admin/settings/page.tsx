"use client";

import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";

import { api } from "@/lib/api";
import type { SiteSettingsAdmin } from "@/lib/types";

const EMPTY: SiteSettingsAdmin = {
  gemini_api_key: "",
  instagram_url: "",
  linkedin_url: "",
  threads_url: "",
  facebook_url: "",
  clutch_url: "",
  contact_email: "",
  contact_phone: "",
  contact_address: "",
  mail_config_email: "",
  mail_config_app_password: "",
  updated_at: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SiteSettingsAdmin>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api
      .get<SiteSettingsAdmin>("/settings/")
      .then((res) => setForm(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      const res = await api.put<SiteSettingsAdmin>("/settings/", form);
      setForm(res.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const field = (key: keyof SiteSettingsAdmin, label: string, placeholder: string, type = "text") => (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        value={form[key] as string}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
      />
    </div>
  );

  if (loading) {
    return <p className="text-sm text-foreground-muted">Loading settings...</p>;
  }

  return (
    <div className="max-w-5xl">
      <h1 className="font-heading text-2xl font-bold text-foreground">Settings</h1>
      <p className="mt-1 text-sm text-foreground-muted">
        Configure the AI assistant, mail sending, and social links shown on the public site.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-border bg-white p-6">
          <h2 className="font-heading text-base font-semibold text-foreground">AI Chatbot</h2>
          <p className="mt-1 text-sm text-foreground-muted">
            Add a Gemini API key to activate the assistant on the public site. Leave empty to keep it disabled.
          </p>
          <div className="mt-4">
            {field("gemini_api_key", "Gemini API Key", "AIza...", "password")}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-6">
          <h2 className="font-heading text-base font-semibold text-foreground">Mail Configuration</h2>
          <p className="mt-1 text-sm text-foreground-muted">
            Gmail address + app password used to send client review request emails. Required before
            &quot;Send Review Request&quot; can be used on the Client Reviews page.
          </p>
          <div className="mt-4 space-y-4">
            {field("mail_config_email", "Gmail Address", "you@gmail.com", "email")}
            {field("mail_config_app_password", "Gmail App Password", "16-character app password", "password")}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-6">
          <h2 className="font-heading text-base font-semibold text-foreground">Contact Information</h2>
          <p className="mt-1 text-sm text-foreground-muted">
            Shown on the Contact Us page. Leave a field empty and the site will show a professional
            fallback message instead of a broken or blank value.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {field("contact_email", "Email", "hello@techishinnovation.com", "email")}
            {field("contact_phone", "Phone", "+1 (000) 000-0000")}
            <div className="sm:col-span-2">{field("contact_address", "Address", "Remote-first, serving clients worldwide")}</div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-white p-6">
          <h2 className="font-heading text-base font-semibold text-foreground">Social Links</h2>
          <p className="mt-1 text-sm text-foreground-muted">
            Each icon activates on the public site only once its URL is set. Clutch stays hidden until filled in.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {field("instagram_url", "Instagram", "https://instagram.com/...")}
            {field("linkedin_url", "LinkedIn", "https://linkedin.com/company/...")}
            {field("threads_url", "Threads", "https://threads.net/...")}
            {field("facebook_url", "Facebook", "https://facebook.com/...")}
            <div className="sm:col-span-2">{field("clutch_url", "Clutch", "https://clutch.co/profile/...")}</div>
          </div>
        </section>

        <div className="flex items-center gap-4 lg:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-60"
          >
            <FiSave size={15} /> {saving ? "Saving..." : "Save Settings"}
          </button>
          {saved && <span className="text-sm text-primary">Saved successfully.</span>}
        </div>
      </form>
    </div>
  );
}
