interface MarqueeProps {
  items: string[];
  fadeFrom?: string;
}

export default function Marquee({ items, fadeFrom = "from-white" }: MarqueeProps) {
  const loop = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-border bg-white py-5">
      <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r ${fadeFrom} to-transparent sm:w-28`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l ${fadeFrom} to-transparent sm:w-28`} />
      <div className="flex w-max animate-marquee gap-10">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-2.5 whitespace-nowrap text-sm font-semibold text-foreground-muted"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
