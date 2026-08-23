import type { IconType } from "react-icons";
import { FiCheck } from "react-icons/fi";

import Reveal from "@/components/Reveal";

export interface FeatureRowItem {
  icon: IconType;
  title: string;
  desc: string;
}

interface FeatureRowsProps {
  items: FeatureRowItem[];
  variant?: "rows" | "checklist" | "rail";
}

const ACCENTS = ["bg-primary", "bg-secondary", "bg-accent"];

function RowsVariant({ items }: FeatureRowsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <Reveal key={item.title} delay={(i % 3) * 0.08}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-white p-6 transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl">
              <span className={`absolute inset-x-0 top-0 h-1 ${ACCENTS[i % ACCENTS.length]}`} />
              <div className="flex items-center gap-3.5">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background-subtle text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon size={19} />
                </span>
                <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="mt-3.5 text-sm leading-relaxed text-foreground-muted">{item.desc}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

function ChecklistVariant({ items }: FeatureRowsProps) {
  const mid = Math.ceil(items.length / 2);
  const columns = [items.slice(0, mid), items.slice(mid)];
  return (
    <div className="mx-auto grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
      {columns.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-px bg-border">
          {col.map((item, i) => {
            const Icon = item.icon;
            const globalIndex = colIdx * mid + i;
            return (
              <Reveal key={item.title} delay={globalIndex * 0.06}>
                <div className="flex items-start gap-4 bg-white px-6 py-6">
                  <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <FiCheck size={15} />
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2 font-heading text-sm font-semibold text-foreground">
                      <Icon className="text-primary" size={14} /> {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function RailVariant({ items }: FeatureRowsProps) {
  return (
    <div className="mx-auto grid max-w-3xl gap-3">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <Reveal key={item.title} delay={i * 0.06}>
            <div className="flex items-center gap-4 rounded-xl border-l-4 border-primary bg-background-subtle py-4 pl-5 pr-6 transition-colors hover:bg-white hover:shadow-md">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                <Icon size={16} />
              </span>
              <div>
                <h3 className="font-heading text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-foreground-muted sm:text-sm">{item.desc}</p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

export default function FeatureRows({ items, variant = "rows" }: FeatureRowsProps) {
  if (variant === "checklist") return <ChecklistVariant items={items} />;
  if (variant === "rail") return <RailVariant items={items} />;
  return <RowsVariant items={items} />;
}
