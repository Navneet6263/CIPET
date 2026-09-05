import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  Filter,
  FlaskConical,
  Plus,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminShell } from "@/components/PageShell";
import { EQUIPMENT_STATUS, TODAY_APPOINTMENTS } from "@/MOCK_DATA";

import { useDemoAppointments } from "@/lib/workflow-store";
import { SERVICE_STAGES } from "@/lib/workflow";
import { ServiceWorkflowDialog } from "@/components/ServiceWorkflowDialog";

export const Route = createFileRoute("/admin/samples")({
  head: () => ({ meta: [{ title: "Sample Flow Control — CIPET ServiceFlow" }] }),
  component: SampleFlowControl,
});

const columns = [
  {
    title: "Intake & scheduling",
    stages: ["Request review", "Quotation", "Payment", "Sample planned", "Received"],
    tone: "text-slate-700",
  },
  { title: "In testing", stages: ["Testing"], tone: "text-blue-700" },
  { title: "Review queue", stages: ["Technical review"], tone: "text-amber-700" },
  {
    title: "Delivery & closed",
    stages: ["Report ready", "Dispatched", "Closed", "Cancelled"],
    tone: "text-emerald-700",
  },
];

function WorkCard({
  item,
  index,
  onOpen,
}: {
  item: ReturnType<typeof useDemoAppointments>[number];
  index: number;
  onOpen: () => void;
}) {
  const priority = index % 4 === 0 ? "High" : index % 3 === 0 ? "Low" : "Medium";
  return (
    <button
      onClick={onOpen}
      className="w-full rounded-md border border-slate-200 bg-white p-3 text-left transition hover:border-blue-300 hover:shadow-sm"
    >
      <span className="text-[10px] font-semibold text-slate-400">{item.id}</span>
      <strong className="mt-1 block text-sm text-[#0a2347]">{item.customer}</strong>
      <span className="mt-0.5 block text-xs text-slate-500">{item.service}</span>
      <span className="mt-2 inline-block rounded bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700">
        {item.stage} · Update status
      </span>
      <span className="mt-3 flex flex-wrap items-center gap-3 text-[10px] text-slate-500">
        <span className="flex items-center gap-1">
          <Clock3 className="size-3" /> {index % 2 ? "2 days" : "1 day"}
        </span>
        <span
          className={
            priority === "High"
              ? "text-red-500"
              : priority === "Low"
                ? "text-emerald-600"
                : "text-amber-600"
          }
        >
          ● {priority}
        </span>
        <span>{(index % 3) + 1} samples</span>
      </span>
      <span className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
        <span className="grid size-5 place-items-center rounded-full bg-[#0a2347] text-[8px] font-bold text-white">
          {item.technician
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)}
        </span>
        {item.technician}
      </span>
    </button>
  );
}

function SampleFlowControl() {
  const appointments = useDemoAppointments();
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const rows = appointments.filter((item) =>
    `${item.id} ${item.customer} ${item.service}`.toLowerCase().includes(query.toLowerCase()),
  );
  const flow = SERVICE_STAGES.map(
    (stage) => [stage, appointments.filter((item) => item.stage === stage).length] as const,
  );
  return (
    <AdminShell
      title="Today at Lucknow Centre"
      description="Live sample flow · updated a few moments ago"
      actions={
        <Link to="/admin/analytics">
          <Button variant="outline">View flow analytics</Button>
        </Link>
      }
    >
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <ol className="grid gap-4 sm:grid-cols-4 xl:grid-cols-10">
          {flow.map(([label, count], index) => (
            <li key={label} className="relative text-center">
              {index < flow.length - 1 && (
                <span
                  className={`absolute top-5 left-1/2 hidden h-px w-full xl:block ${index === 0 || index === 3 ? "bg-emerald-500" : "bg-slate-300"}`}
                />
              )}
              <span
                className={`relative z-10 mx-auto grid size-10 place-items-center rounded-full border-2 ${index === 0 ? "border-emerald-500 bg-white text-emerald-600" : index === 4 ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white text-slate-500"}`}
              >
                {index === 0 ? (
                  <Check className="size-4" />
                ) : index === 4 ? (
                  <FlaskConical className="size-4" />
                ) : (
                  index + 1
                )}
              </span>
              <p
                className={`mt-2 text-xs font-semibold ${index === 4 ? "text-blue-700" : "text-slate-700"}`}
              >
                {label}
              </p>
              <p
                className={`mt-2 text-2xl font-bold ${index === 4 ? "text-blue-700" : "text-[#0a2347]"}`}
              >
                {count}
              </p>
            </li>
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-slate-200 pt-4 text-xs">
          <strong className="text-[#0a2347]">SLA at a glance</strong>
          <span className="text-emerald-600">● On track 82</span>
          <span className="text-amber-600">● At risk 11</span>
          <span className="text-red-500">● Overdue 3</span>
          <span className="ml-auto text-slate-500">Target ≥90% · Current 86%</span>
        </div>
      </section>

      <div className="mt-5 grid gap-5 2xl:grid-cols-[1fr_260px]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => toast.success("Demo work order created")}>
              <Plus /> Create work order
            </Button>
            <Button variant="outline">
              <Filter /> All services
            </Button>
            <Button variant="outline">All priorities</Button>
            <div className="relative min-w-56 flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                className="pl-9"
                placeholder="Search request, client or service"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <section className="mt-4 grid gap-4 xl:grid-cols-4">
            {columns.map((column) => (
              <div
                key={column.title}
                className="rounded-lg border border-slate-200 bg-slate-50/70 p-3"
              >
                <div className="flex items-center justify-between px-1 pb-3">
                  <h2 className={`text-sm font-bold ${column.tone}`}>{column.title}</h2>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-slate-500">
                    {rows.filter((item) => column.stages.includes(item.stage)).length}
                  </span>
                </div>
                <div className="space-y-3">
                  {rows
                    .filter((item) => column.stages.includes(item.stage))
                    .map((item, index) => (
                      <WorkCard
                        key={item.id}
                        item={item}
                        index={index}
                        onOpen={() => setSelected(item.id)}
                      />
                    ))}
                </div>
              </div>
            ))}
          </section>
        </div>

        <aside className="space-y-4">
          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex justify-between">
              <h2 className="text-sm font-bold text-[#0a2347]">Today’s appointments</h2>
              <span className="text-[10px] text-blue-700">View all</span>
            </div>
            <ul className="mt-3 divide-y divide-slate-100 text-xs">
              {TODAY_APPOINTMENTS.slice(0, 3).map((item) => (
                <li key={item.sampleId} className="py-3">
                  <strong className="text-[#0a2347]">{item.time}</strong>
                  <span className="ml-3 text-slate-600">{item.customer}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-bold text-[#0a2347]">Equipment availability</h2>
            <ul className="mt-3 divide-y divide-slate-100 text-xs">
              {EQUIPMENT_STATUS.slice(0, 5).map((item) => (
                <li key={item.id} className="flex justify-between gap-2 py-3">
                  <span className="text-slate-600">{item.name}</span>
                  <span
                    className={item.status === "Operational" ? "text-emerald-600" : "text-red-500"}
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-bold text-[#0a2347]">Escalations</h2>
            <ul className="mt-3 divide-y divide-slate-100 text-xs">
              {[
                "CIP-LKO-26091 · overdue",
                "CIP-LKO-26093 · due in 1 day",
                "CIP-LKO-26095 · due in 2 days",
              ].map((item, index) => (
                <li key={item} className="flex items-center gap-2 py-3 text-slate-600">
                  <AlertTriangle
                    className={index === 0 ? "size-4 text-red-500" : "size-4 text-amber-500"}
                  />
                  {item}
                  <ChevronRight className="ml-auto size-3" />
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
      <ServiceWorkflowDialog id={selected} onClose={() => setSelected(null)} />
    </AdminShell>
  );
}
