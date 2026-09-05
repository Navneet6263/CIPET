import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BellRing, CheckCircle2, Download, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminShell } from "@/components/PageShell";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import { LABS } from "@/MOCK_DATA";
import { useDemoAppointments, advanceWorkflow } from "@/lib/workflow-store";
import { nextStages } from "@/lib/workflow";
import { ServiceWorkflowDialog } from "@/components/ServiceWorkflowDialog";

export const Route = createFileRoute("/admin/appointments")({
  head: () => ({
    meta: [
      { title: "Appointments — CIPET Lab Admin" },
      {
        name: "description",
        content:
          "Filter, update and bulk-manage laboratory appointments with status, priority and customer notifications.",
      },
      { property: "og:title", content: "CIPET Appointment Management" },
      {
        property: "og:description",
        content: "Daily appointment queue with bulk actions and notifications.",
      },
    ],
  }),
  component: AdminAppointments,
});

function AdminAppointments() {
  const appointments = useDemoAppointments();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [lab, setLab] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [detail, setDetail] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      appointments.filter(
        (a) =>
          (status === "all" || a.status === status) &&
          (lab === "all" || a.lab === lab) &&
          `${a.sampleId} ${a.customer} ${a.service}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [query, status, lab, appointments],
  );

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <AdminShell
      title="Appointments"
      description="Manage today's sample intake queue across laboratories"
      actions={
        <Button variant="outline" onClick={() => toast.success("Excel export started")}>
          <Download /> Export to Excel
        </Button>
      }
    >
      <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-[1fr_180px_200px_auto]">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sample ID, customer or service"
            className="pl-9"
          />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="ready">Ready</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={lab} onValueChange={setLab}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All labs</SelectItem>
            {LABS.slice(0, 3).map((l) => (
              <SelectItem key={l.id} value={l.shortName}>
                {l.shortName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => toast.success(`${rows.length} appointments matched`)}>
          Apply Filters
        </Button>
      </div>

      {selected.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <span className="text-sm font-semibold text-foreground">{selected.length} selected</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              try {
                selected.forEach((sampleId) => {
                  const item = appointments.find((row) => row.sampleId === sampleId)!;
                  const next = nextStages("service", item.stage)[0];
                  if (next) advanceWorkflow(item.id, "service", next, "Bulk next-stage update");
                });
                toast.success("Selected requests advanced to their next stage");
              } catch (error) {
                toast.error(String(error));
              }
              setSelected([]);
            }}
          >
            <CheckCircle2 /> Advance selected
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toast.success("Bulk notification sent")}
          >
            <BellRing /> Send Bulk Notification
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setSelected([])}>
            Clear
          </Button>
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-50 text-[10px] tracking-wide text-slate-400 uppercase">
            <tr>
              <th className="px-4 py-3">
                <Checkbox
                  checked={selected.length === rows.length && rows.length > 0}
                  onCheckedChange={(v) =>
                    setSelected(v === true ? rows.map((r) => r.sampleId) : [])
                  }
                />
              </th>
              <th className="px-4 py-3 font-semibold">Time</th>
              <th className="px-4 py-3 font-semibold">Sample ID</th>
              <th className="px-4 py-3 font-semibold">Customer</th>
              <th className="px-4 py-3 font-semibold">Service</th>
              <th className="px-4 py-3 font-semibold">Lab</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Priority</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((a) => (
              <tr key={a.sampleId} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selected.includes(a.sampleId)}
                    onCheckedChange={() => toggle(a.sampleId)}
                  />
                </td>
                <td className="px-4 py-3 font-medium text-foreground">{a.time}</td>
                <td className="px-4 py-3 text-muted-foreground">{a.sampleId}</td>
                <td className="px-4 py-3 text-foreground">{a.customer}</td>
                <td className="px-4 py-3 text-muted-foreground">{a.service}</td>
                <td className="px-4 py-3 text-muted-foreground">{a.lab}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={a.status} />
                  <p className="mt-1 text-xs text-slate-500">{a.stage}</p>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-xs font-semibold",
                      a.priority === "Urgent" &&
                        "border-destructive/40 bg-destructive/10 text-destructive",
                      a.priority === "High" &&
                        "border-warning/40 bg-warning/15 text-warning-foreground",
                      a.priority === "Normal" && "border-slate-200 bg-slate-50 text-slate-500",
                    )}
                  >
                    {a.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Button size="sm" variant="outline" onClick={() => setDetail(a.id)}>
                      Update status
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toast.success(`Notification sent to ${a.customer}`)}
                    >
                      <BellRing />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Showing {rows.length} of {appointments.length} appointments
      </p>
      <ServiceWorkflowDialog id={detail} onClose={() => setDetail(null)} />
    </AdminShell>
  );
}
