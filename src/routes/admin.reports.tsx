import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Download, FileCheck2, FileUp, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AdminShell, SectionHeading } from "@/components/PageShell";
import { StatusBadge } from "@/components/StatusBadge";
import { useDemoAppointments, advanceWorkflow } from "@/lib/workflow-store";
import { ServiceWorkflowDialog } from "@/components/ServiceWorkflowDialog";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({
    meta: [
      { title: "Report Generation — CIPET Lab Admin" },
      {
        name: "description",
        content:
          "Generate, review and dispatch digitally signed CIPET test reports and certificates to customers.",
      },
      { property: "og:title", content: "CIPET Report Generation" },
      { property: "og:description", content: "Draft, sign and dispatch laboratory reports." },
    ],
  }),
  component: AdminReports,
});

function AdminReports() {
  const appointments = useDemoAppointments();
  const [selected, setSelected] = useState<string | null>(null);
  const queue = appointments.filter((item) =>
    ["Technical review", "Report ready", "Dispatched", "Closed"].includes(item.stage),
  );
  const dispatch = () => {
    try {
      const ready = queue.filter((item) => item.stage === "Report ready");
      ready.forEach((item) =>
        advanceWorkflow(item.id, "service", "Dispatched", "Report dispatched"),
      );
      toast.success(`${ready.length} reports dispatched`);
    } catch (error) {
      toast.error(String(error));
    }
  };

  return (
    <AdminShell
      title="Reports"
      description="Draft, sign and dispatch laboratory test reports"
      actions={
        <>
          <Button variant="outline" onClick={() => toast.success("Scanned report uploaded")}>
            <FileUp /> Upload Scanned
          </Button>
          <Button
            onClick={dispatch}
            disabled={!queue.some((item) => item.stage === "Report ready")}
          >
            <Send /> Dispatch All Ready
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "Technical review",
            value: queue.filter((item) => item.stage === "Technical review").length,
          },
          {
            label: "Ready to dispatch",
            value: queue.filter((item) => item.stage === "Report ready").length,
          },
          {
            label: "Dispatched / closed",
            value: queue.filter((item) => ["Dispatched", "Closed"].includes(item.stage)).length,
          },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className="mt-2 text-2xl font-bold text-[#0a2347]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <SectionHeading
          title="Report queue"
          description="Reports pending generation, signature or dispatch"
        />
        <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-slate-50 text-[10px] tracking-wide text-slate-400 uppercase">
              <tr>
                <th className="px-4 py-3 font-semibold">Sample ID</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Service</th>
                <th className="px-4 py-3 font-semibold">Technician</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {queue.map((a) => (
                <tr key={a.sampleId} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-foreground">{a.sampleId}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.customer}</td>
                  <td className="px-4 py-3 text-foreground">{a.service}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.technician}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={a.status} />
                    <p className="mt-1 text-xs text-slate-500">{a.stage}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button size="sm" variant="outline" onClick={() => setSelected(a.id)}>
                        <FileCheck2 /> Update status
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toast.success("PDF downloaded")}
                      >
                        <Download />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={a.stage !== "Report ready"}
                        aria-label={`Dispatch ${a.id}`}
                        onClick={() => {
                          try {
                            advanceWorkflow(a.id, "service", "Dispatched", "Report dispatched");
                            toast.success("Report dispatched");
                          } catch (error) {
                            toast.error(String(error));
                          }
                        }}
                      >
                        <Send />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ServiceWorkflowDialog id={selected} onClose={() => setSelected(null)} />
    </AdminShell>
  );
}
