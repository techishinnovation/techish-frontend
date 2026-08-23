export interface VideoEmbedInfo {
  type: "youtube" | "vimeo" | "direct";
  embedUrl: string;
}

/**
 * YouTube/Vimeo pages don't serve a raw video file, so a plain <video> tag
 * can't play them — they need an iframe embed. Direct file URLs (.mp4 etc.)
 * play fine in <video> as-is.
 */
export function getVideoEmbedInfo(url: string): VideoEmbedInfo {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\.|^m\./, "");

    if (host === "youtube.com") {
      const id = u.searchParams.get("v");
      if (id) return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${id}` };
      const match = u.pathname.match(/\/(shorts|embed)\/([\w-]+)/);
      if (match) return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${match[2]}` };
    }
    if (host === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id) return { type: "youtube", embedUrl: `https://www.youtube.com/embed/${id}` };
    }
    if (host === "vimeo.com") {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id && /^\d+$/.test(id)) return { type: "vimeo", embedUrl: `https://player.vimeo.com/video/${id}` };
    }
  } catch {
    // not a valid URL — fall through and let it try as a direct link
  }
  return { type: "direct", embedUrl: url };
}
