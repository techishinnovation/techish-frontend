import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

import type { AnyBlogPost } from "@/lib/types";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface BlogCardProps {
  post: AnyBlogPost;
  onClick: () => void;
}

export default function BlogCard({ post, onClick }: BlogCardProps) {
  const image = post.source === "static" ? post.image : post.image || "/images/no-img.png";
  const date = post.source === "static" ? post.date : post.created_at;
  const category = post.source === "static" ? post.category : "Company Update";

  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor-hover="true"
      className="surface-card group flex h-full w-full flex-col overflow-hidden text-left"
    >
      <div className="card-media-square">
        <Image
          src={image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary shadow-sm backdrop-blur-sm">
          {category}
        </span>
        <span className="absolute right-3 bottom-3 inline-flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <FiArrowUpRight size={15} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-foreground-muted mb-2">{formatDate(date)}</p>
        <h3 className="font-heading text-base font-semibold text-foreground line-clamp-2 min-h-[3rem] mb-2 transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="text-sm text-foreground-muted line-clamp-3 min-h-[4rem]">{post.description}</p>
      </div>
    </button>
  );
}
