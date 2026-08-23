"use client";

import { useEffect, useState } from "react";
import { FiFilm, FiPlus, FiTrash2 } from "react-icons/fi";

import { api } from "@/lib/api";
import type { PaginatedResponse, WorkItem } from "@/lib/types";

export default function AdminWorkPage() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState<FileList | null>(null);

  const load = () => {
    setLoading(true);
    api
      .get<PaginatedResponse<WorkItem>>("/work/items/?page_size=100")
      .then((res) => setItems(res.data.results))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const resetForm = () => {
    setTitle("");
    setProjectUrl("");
    setVideoUrl("");
    setDescription("");
    setMedia(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("project_url", projectUrl);
      fd.append("video_url", videoUrl);
      fd.append("description", description);
      if (media) {
        Array.from(media).forEach((f) => fd.append("media", f));
      }
      await api.post("/work/items/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      setFormOpen(false);
      load();
    } catch {
      setError("Could not save this work item. Please check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this work item and all its media?")) return;
    await api.delete(`/work/items/${id}/`);
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Our Work</h1>
          <p className="mt-1 text-sm text-foreground-muted">Showcase projects with photos and a video link.</p>
        </div>
        <button
          type="button"
          onClick={() => setFormOpen((o) => !o)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <FiPlus size={16} /> New Work Item
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleCreate} className="mt-6 space-y-4 rounded-2xl border border-border bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Title</label>
              <input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Project URL <span className="text-foreground-muted font-normal">(optional)</span>
              </label>
              <input
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Photos <span className="text-foreground-muted font-normal">(optional, multiple)</span>
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setMedia(e.target.files)}
                className="block w-full text-sm text-foreground-muted file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Video URL <span className="text-foreground-muted font-normal">(optional)</span>
              </label>
              <input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
          <p className="text-xs text-foreground-muted">
            If neither a photo nor a video URL is added, a placeholder image is shown automatically.
          </p>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Work Item"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-sm text-foreground-muted">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-foreground-muted">No work items yet.</p>
        ) : (
          items.map((item) => {
            const thumb = item.media.find((m) => m.media_type === "image");
            const hasVideoOnly = !thumb && item.media.some((m) => m.media_type === "video");
            return (
              <div key={item.id} className="overflow-hidden rounded-2xl border border-border bg-white">
                <div className="relative h-40 w-full bg-background-subtle">
                  {hasVideoOnly ? (
                    <div className="flex h-full w-full items-center justify-center text-foreground-muted">
                      <FiFilm size={28} />
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumb?.file || "/images/no-img.png"}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                  {item.media.length > 0 && (
                    <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium">
                      {item.media.length} file{item.media.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="line-clamp-1 font-heading text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-foreground-muted">{item.description}</p>
                  <div className="mt-3 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      <FiTrash2 size={12} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
