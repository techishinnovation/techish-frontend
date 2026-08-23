import { FiArrowUpRight, FiPlayCircle } from "react-icons/fi";

import type { WorkItem } from "@/lib/types";

interface WorkCardProps {
  item: WorkItem;
  onClick: () => void;
}

function getThumbnail(item: WorkItem): { src: string; isVideo: boolean } {
  const firstImage = item.media.find((m) => m.media_type === "image");
  if (firstImage) return { src: firstImage.file, isVideo: false };

  const firstVideo = item.media.find((m) => m.media_type === "video");
  if (firstVideo) return { src: "/videos/no-video.png", isVideo: true };

  return { src: "/images/no-img.png", isVideo: false };
}

export default function WorkCard({ item, onClick }: WorkCardProps) {
  const { src, isVideo } = getThumbnail(item);

  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor-hover="true"
      className="surface-card group flex h-full w-full flex-col overflow-hidden text-left"
    >
      <div className="card-media-square">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={item.title}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {isVideo && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/20">
            <FiPlayCircle className="text-white drop-shadow" size={40} />
          </span>
        )}
        {item.media.length > 1 && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
            +{item.media.length - 1} more
          </span>
        )}
        <span className="absolute right-3 bottom-3 inline-flex h-8 w-8 translate-y-2 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <FiArrowUpRight size={15} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-semibold text-foreground line-clamp-2 min-h-[3rem] mb-2 transition-colors group-hover:text-primary">
          {item.title}
        </h3>
        <p className="text-sm text-foreground-muted line-clamp-3 min-h-[4rem]">{item.description}</p>
        {item.project_url && (
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
            Visit project <FiArrowUpRight size={12} />
          </span>
        )}
      </div>
    </button>
  );
}
