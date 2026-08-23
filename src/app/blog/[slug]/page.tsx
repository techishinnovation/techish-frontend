"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { notFound } from "next/navigation";

import staticBlogs from "@/data/blogs.json";
import { api } from "@/lib/api";
import type { AnyBlogPost, BlogPost } from "@/lib/types";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>();
  const [post, setPost] = useState<AnyBlogPost | null | undefined>(undefined);

  useEffect(() => {
    const staticMatch = staticBlogs.find((p) => p.slug === params.slug);
    if (staticMatch) {
      setPost({ ...staticMatch, source: "static" });
      return;
    }

    api
      .get(`/blog/posts/${params.slug}/`)
      .then((res) => setPost({ ...(res.data as BlogPost), source: "api" }))
      .catch(() => setPost(null));
  }, [params.slug]);

  if (post === null) notFound();
  if (post === undefined) {
    return <div className="section container-page">Loading...</div>;
  }

  const image = post.source === "static" ? post.image : post.image || "/images/no-img.png";
  const date = post.source === "static" ? post.date : post.created_at;
  const category = post.source === "static" ? post.category : "Company Update";

  return (
    <article className="section pt-12">
      <div className="container-page max-w-3xl">
        <Link
          href="/blog"
          data-cursor-hover="true"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground-muted hover:text-primary"
        >
          <FiArrowLeft /> Back to Blog
        </Link>

        <span className="mt-6 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
          {category}
        </span>
        <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-foreground-muted">{formatDate(date)}</p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          <Image src={image} alt={post.title} width={900} height={500} className="h-auto w-full object-cover" />
        </div>

        <div className="prose prose-slate mt-8 max-w-none">
          <p className="text-base leading-relaxed text-foreground-muted">{post.description}</p>
        </div>
      </div>
    </article>
  );
}
