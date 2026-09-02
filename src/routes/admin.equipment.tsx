import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Wrench } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AdminShell } from "@/components/PageShell";
import { cn } from "@/lib/utils";
import { EQUIPMENT_STATUS } from "@/MOCK_DATA";

export const Route = createFileRoute("/admin/equipment")({
  head: () => ({
    meta: [
      { title: "Equipment & Maintenance — CIPET Lab Admin" },
      {
        name: "description",
        content:
          "Track laboratory instrument health, utilisation hours, calibration and upcoming maintenance schedules.",
      },
      { property: "og:title", content: "CIPET Equipment Monitoring" },
      { property: "og:description", content: "Instrument health and maintenance planning." },
    ],
  }),
  component: AdminEquipment,
});

function AdminEquipment() {
  return (
    <AdminShell
      title="Equipment"
      description="Instrument health, utilisation and maintenance"
      actions={
        <Button onClick={() => toast.success("Maintenance window scheduled")}>
          <CalendarClock /> Schedule Maintenance
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {EQUIPMENT_STATUS.map((e) => {
          const pct = Math.round((e.usedHours / e.totalHours) * 100);
          return (
            <div key={e.id} className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-foreground">{e.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">Health: {e.health}</p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-semibold",
                    e.status === "Operational" && "bg-success/15 text-success",
                    e.status === "Maintenance" && "bg-warning/20 text-warning-foreground",
                    e.status === "Down" && "bg-destructive/10 text-destructive",
                  )}
                >
                  {e.status}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Utilisation</span>
                  <span>
                    {e.usedHours}/{e.totalHours} hrs
                  </span>
                </div>
                <Progress value={pct} className="mt-2 h-2" />
              </div>

              <dl className="mt-4 space-y-1.5 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Last service</dt>
                  <dd className="font-medium text-foreground">{e.lastService}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">Next service</dt>
                  <dd className="font-medium text-foreground">{e.nextService}</dd>
                </div>
              </dl>

              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.success(`${e.name} calibration logged`)}
                >
                  Log Calibration
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toast.success(`Maintenance requested for ${e.name}`)}
                >
                  <Wrench /> Request Service
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </AdminShell>
  );
}
