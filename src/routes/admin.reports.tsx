import { createFileRoute } from "@tanstack/react-router";
import { Download, FileCheck2, FileUp, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AdminShell, SectionHeading } from "@/components/PageShell";
import { StatusBadge } from "@/components/StatusBadge";
import { TODAY_APPOINTMENTS } from "@/MOCK_DATA";

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
  const queue = TODAY_APPOINTMENTS.slice(0, 6);

  return (
    <AdminShell
      title="Reports"
      description="Draft, sign and dispatch laboratory test reports"
      actions={
        <>
          <Button variant="outline" onClick={() => toast.success("Scanned report uploaded")}>
            <FileUp /> Upload Scanned
          </Button>
          <Button onClick={() => toast.success("5 reports dispatched to customers")}>
            <Send /> Dispatch All Ready
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Drafts in progress", value: "4" },
          { label: "Awaiting signature", value: "3" },
          { label: "Dispatched today", value: "9" },
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
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toast.success(`Report generated for ${a.sampleId}`)}
                      >
                        <FileCheck2 /> Generate
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
                        onClick={() => toast.success(`Report sent to ${a.customer}`)}
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
    </AdminShell>
  );
}
