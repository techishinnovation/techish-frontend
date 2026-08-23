"use client";

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const MAX_VISIBLE = 5;

function getVisiblePages(page: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= MAX_VISIBLE) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, totalPages, page]);
  if (page - 1 > 1) pages.add(page - 1);
  if (page + 1 < totalPages) pages.add(page + 1);

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push("ellipsis");
    result.push(p);
  });
  return result;
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(page, totalPages);

  return (
    <div className="mt-12 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
      <button
        type="button"
        data-cursor-hover="true"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 sm:h-10 sm:w-10"
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </button>

      <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
        {pages.map((p, i) =>
          p === "ellipsis" ? (
            <span key={`ellipsis-${i}`} className="px-1 text-sm text-foreground-muted">
              &hellip;
            </span>
          ) : (
            <button
              key={p}
              type="button"
              data-cursor-hover="true"
              onClick={() => onChange(p)}
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 sm:h-10 sm:w-10 ${
                p === page
                  ? "bg-gradient-to-br from-primary to-secondary text-white shadow-md shadow-primary/30"
                  : "text-foreground-muted hover:bg-background-subtle"
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        data-cursor-hover="true"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 sm:h-10 sm:w-10"
        aria-label="Next page"
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
