import Reveal from "@/components/Reveal";

interface SEOBlock {
  heading: string;
  text: string;
}

interface SEOContentProps {
  eyebrow: string;
  title: string;
  intro?: string;
  blocks: SEOBlock[];
  tone?: "subtle" | "plain";
}

export default function SEOContent({ eyebrow, title, intro, blocks, tone = "subtle" }: SEOContentProps) {
  return (
    <section className={`section border-t border-border ${tone === "subtle" ? "bg-background-subtle" : ""}`}>
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="badge-pill">{eyebrow}</span>
          <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
          {intro && <p className="mt-4 text-foreground-muted">{intro}</p>}
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2">
          {blocks.map((b, i) => (
            <Reveal key={b.heading} delay={(i % 2) * 0.08}>
              <h3 className="font-heading text-lg font-semibold text-foreground">{b.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
