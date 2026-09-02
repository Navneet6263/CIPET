import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatINR, type Lab } from "@/MOCK_DATA";

export function ServiceTable({ lab }: { lab: Lab }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-semibold">Service</th>
            <th className="px-4 py-3 font-semibold">Price</th>
            <th className="px-4 py-3 font-semibold">TAT</th>
            <th className="px-4 py-3 font-semibold">Availability</th>
            <th className="px-4 py-3 text-right font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {lab.services.map((service) => (
            <tr key={service.id} className="transition-colors hover:bg-muted/60">
              <td className="px-4 py-3">
                <p className="font-semibold text-foreground">{service.name}</p>
                <p className="text-xs text-muted-foreground">
                  {service.standard} • {service.category}
                </p>
              </td>
              <td className="px-4 py-3 font-semibold text-foreground">
                {formatINR(service.price)}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{service.tat}</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 text-xs font-semibold",
                    service.availability === "Available" &&
                      "border-success/40 bg-success/15 text-success",
                    service.availability === "Limited" &&
                      "border-warning/40 bg-warning/15 text-warning-foreground",
                    service.availability === "Planned" &&
                      "border-border bg-muted text-muted-foreground",
                  )}
                >
                  {service.availability}
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <Link
                  to="/booking/$labId/$serviceId"
                  params={{ labId: lab.id, serviceId: service.id }}
                >
                  <Button size="sm">Create request</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
