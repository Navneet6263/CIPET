import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BellRing, CheckCircle2, Download, Search, XCircle } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminShell } from "@/components/PageShell";
import { StatusBadge } from "@/components/StatusBadge";
import { cn } from "@/lib/utils";
import { LABS, TODAY_APPOINTMENTS, type Appointment } from "@/MOCK_DATA";

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
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [lab, setLab] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [detail, setDetail] = useState<Appointment | null>(null);
  const [page, setPage] = useState(1);

  const rows = useMemo(
    () =>
      TODAY_APPOINTMENTS.filter(
        (a) =>
          (status === "all" || a.status === status) &&
          (lab === "all" || a.lab === lab) &&
          `${a.sampleId} ${a.customer} ${a.service}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [query, status, lab],
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
              toast.success(`${selected.length} appointments marked complete`);
              setSelected([]);
            }}
          >
            <CheckCircle2 /> Mark All Complete
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
                    <Button size="sm" variant="outline" onClick={() => setDetail(a)}>
                      Details
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toast.success(`${a.sampleId} marked complete`)}
                    >
                      <CheckCircle2 />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toast.success(`Notification sent to ${a.customer}`)}
                    >
                      <BellRing />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toast.error(`${a.sampleId} cancellation requested`)}
                    >
                      <XCircle />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">Showing 1-{rows.length} of 150 appointments</p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="grid place-items-center px-2 text-sm text-muted-foreground">
            Page {page}
          </span>
          <Button variant="outline" size="sm" onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      </div>

      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{detail?.sampleId}</DialogTitle>
            <DialogDescription>{detail?.service}</DialogDescription>
          </DialogHeader>
          {detail && (
            <dl className="space-y-2 text-sm">
              {[
                ["Customer", detail.customer],
                ["Laboratory", detail.lab],
                ["Slot", detail.time],
                ["Technician", detail.technician],
                ["ETA", detail.eta],
                ["Priority", detail.priority],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetail(null)}>
              Close
            </Button>
            <Button
              onClick={() => {
                toast.success("Appointment updated");
                setDetail(null);
              }}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminShell>
  );
}
