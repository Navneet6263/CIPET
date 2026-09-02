import { Link } from "@tanstack/react-router";
import { MapPin, Clock, Layers, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR, type Lab } from "@/MOCK_DATA";

export function LabCard({ lab }: { lab: Lab }) {
  const avgPrice = Math.round(lab.services.reduce((a, s) => a + s.price, 0) / lab.services.length);

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-elevated">
      <div className="flex items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-gradient-hero text-sm font-bold text-primary-foreground">
          {lab.shortName
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-foreground">{lab.shortName}</h3>
          <p className="mt-1 text-xs text-muted-foreground">Industry services centre</p>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-1.5 text-sm text-muted-foreground">
        <MapPin className="mt-0.5 size-4 shrink-0" />
        <span>{lab.address}</span>
      </p>

      <dl className="mt-4 grid grid-cols-3 gap-2 rounded-lg bg-muted p-3 text-center">
        <div>
          <dt className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
            <Layers className="size-3" /> Services
          </dt>
          <dd className="text-sm font-bold text-foreground">{lab.services.length}</dd>
        </div>
        <div>
          <dt className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="size-3" /> Avg TAT
          </dt>
          <dd className="text-sm font-bold text-foreground">{lab.avgTat} d</dd>
        </div>
        <div>
          <dt className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
            <IndianRupee className="size-3" /> Avg Price
          </dt>
          <dd className="text-sm font-bold text-foreground">{formatINR(avgPrice)}</dd>
        </div>
      </dl>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {lab.credentials.map((c) => (
          <span
            key={c}
            className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground"
          >
            {c}
          </span>
        ))}
      </div>

      <Link to="/lab/$id" params={{ id: lab.id }} className="mt-5">
        <Button className="w-full">View Lab</Button>
      </Link>
    </article>
  );
}
