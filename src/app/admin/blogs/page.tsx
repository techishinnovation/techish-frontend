"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

import { api } from "@/lib/api";
import type { BlogPost, PaginatedResponse } from "@/lib/types";

export default function AdminBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const load = () => {
    setLoading(true);
    api
      .get<PaginatedResponse<BlogPost>>("/blog/posts/?page_size=100")
      .then((res) => setPosts(res.data.results))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImage(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      if (image) fd.append("image", image);
      await api.post("/blog/posts/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      resetForm();
      setFormOpen(false);
      load();
    } catch {
      setError("Could not publish this post. Please check the fields and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this blog post?")) return;
    await api.delete(`/blog/posts/${slug}/`);
    load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Blog Posts</h1>
          <p className="mt-1 text-sm text-foreground-muted">Publish updates and articles to your blog.</p>
        </div>
        <button
          type="button"
          onClick={() => setFormOpen((o) => !o)}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
        >
          <FiPlus size={16} /> New Post
        </button>
      </div>

      {formOpen && (
        <form onSubmit={handleCreate} className="mt-6 space-y-4 rounded-2xl border border-border bg-white p-6">
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
            <label className="mb-1.5 block text-sm font-medium text-foreground">Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full resize-none rounded-xl border border-border bg-background-subtle px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Image <span className="text-foreground-muted font-normal">(optional — defaults to placeholder)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-foreground-muted file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {submitting ? "Publishing..." : "Publish Post"}
          </button>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </form>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="text-sm text-foreground-muted">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-foreground-muted">No blog posts yet.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="overflow-hidden rounded-2xl border border-border bg-white">
              <div className="relative h-40 w-full bg-background-subtle">
                <Image
                  src={post.image || "/images/no-img.png"}
                  alt={post.title}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="line-clamp-1 font-heading text-sm font-semibold text-foreground">{post.title}</h3>
                <p className="mt-1 line-clamp-2 text-xs text-foreground-muted">{post.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-foreground-muted">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(post.slug)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50"
                  >
                    <FiTrash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
