import { FiArrowRight } from "react-icons/fi";

import type { JobOpening } from "@/lib/types";

interface JobCardProps {
  job: JobOpening;
  onClick: () => void;
}

export default function JobCard({ job, onClick }: JobCardProps) {
  const tags = job.technology
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <div className="surface-card flex h-full flex-col p-7">
      <h3 className="font-heading text-xl font-bold text-foreground">{job.title}</h3>

      {tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-background-subtle px-3 py-1 text-xs font-medium text-foreground-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground-muted line-clamp-4">
        {job.description}
      </p>

      <button
        type="button"
        onClick={onClick}
        data-cursor-hover="true"
        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        View More <FiArrowRight size={14} />
      </button>
    </div>
  );
}
