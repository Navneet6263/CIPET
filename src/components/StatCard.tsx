import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  deltaDirection = "up",
  icon: Icon,
  tone = "primary",
  note,
}: {
  label: string;
  value: string;
  delta?: string;
  deltaDirection?: "up" | "down" | "flat";
  icon: LucideIcon;
  tone?: "primary" | "success" | "warning" | "info";
  note?: string;
}) {
  const tones = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/20 text-warning-foreground",
    info: "bg-info/15 text-info",
  } as const;

  const Trend = deltaDirection === "down" ? TrendingDown : TrendingUp;

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span className={cn("grid size-9 place-items-center rounded-lg", tones[tone])}>
          <Icon className="size-4.5" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">{value}</p>
      {delta && (
        <p
          className={cn(
            "mt-2 flex items-center gap-1 text-xs font-semibold",
            deltaDirection === "down" ? "text-destructive" : "text-success",
          )}
        >
          <Trend className="size-3.5" /> {delta}
        </p>
      )}
      {note && <p className="mt-2 text-xs text-muted-foreground">{note}</p>}
    </div>
  );
}
