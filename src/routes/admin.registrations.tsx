import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, Circle, Search } from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PDI_REGISTRATIONS, type RegistrationStatus } from "@/MOCK_DATA";

import { RegistrationDetail, StatusBadge } from "@/components/RegistrationDetail";
import { useWorkflows } from "@/lib/workflow-store";

export const Route = createFileRoute("/admin/registrations")({
  head: () => ({ meta: [{ title: "PDI Registrations — ServiceFlow" }] }),
  component: RegistrationQueue,
});

function RegistrationQueue() {
  const workflows = useWorkflows();
  const records = useMemo(
    () =>
      PDI_REGISTRATIONS.map((record) => ({
        ...record,
        status: workflows[record.id]!.stage as RegistrationStatus,
        reviewer: workflows[record.id]!.history.length ? "A. Kumar" : record.reviewer,
      })),
    [workflows],
  );
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedId, setSelectedId] = useState(PDI_REGISTRATIONS[0]!.id);
  const filtered = useMemo(
    () =>
      records.filter(
        (record) =>
          (status === "All" || record.status === status) &&
          `${record.id} ${record.company} ${record.applicant}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [query, status, records],
  );
  const selected = records.find((record) => record.id === selectedId) ?? PDI_REGISTRATIONS[0]!;
  const metrics = [
    ["Submitted", "1", "Awaiting assignment", "text-blue-700"],
    ["Under review", "2", "Active evaluation", "text-amber-700"],
    ["Action required", "1", "Customer response due", "text-red-700"],
    ["Approved", "1", "This week", "text-emerald-700"],
  ];

  return (
    <AdminShell
      title="PDI Registrations"
      description="Review manufacturer profiles, product scope, standards and supporting details."
      actions={
        <Button variant="outline" onClick={() => toast.success("Queue exported")}>
          Export queue
        </Button>
      }
    >
      <section className="grid divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
        {metrics.map(([label, , detail, tone]) => (
          <div key={label} className="p-5">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className={`mt-2 text-2xl font-bold ${tone}`}>
              {
                records.filter((item) =>
                  label === "Under review"
                    ? ["Under review", "Technical review"].includes(item.status)
                    : item.status === label,
                ).length
              }
            </p>
            <p className="mt-1 text-[11px] text-slate-400">{detail}</p>
          </div>
        ))}
      </section>

      <div className="mt-5 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_390px]">
        <section className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-200 p-4">
            <div className="relative min-w-60 flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search registration, company or applicant"
                className="pl-9"
              />
            </div>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 outline-none focus:border-blue-400"
            >
              {[
                "All",
                "Submitted",
                "Under review",
                "Technical review",
                "Action required",
                "Approved",
              ].map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-xs">
              <thead className="bg-slate-50 text-[10px] tracking-wide text-slate-400 uppercase">
                <tr>
                  {[
                    "Registration",
                    "Company",
                    "Scope",
                    "Completeness",
                    "Submitted",
                    "Status",
                    "",
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-3 font-semibold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((record) => (
                  <tr
                    key={record.id}
                    onClick={() => setSelectedId(record.id)}
                    className={`cursor-pointer transition hover:bg-blue-50/50 ${selectedId === record.id ? "bg-blue-50/70" : ""}`}
                  >
                    <td className="px-4 py-4 font-bold text-[#0a2347]">{record.id}</td>
                    <td className="px-4 py-4">
                      <strong className="block font-semibold text-slate-700">
                        {record.company}
                      </strong>
                      <span className="mt-1 block text-[10px] text-slate-400">
                        {record.applicant} · {record.city}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {record.products} products · {record.standards} standards
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-semibold text-slate-700">{record.completeness}%</span>
                      <div className="mt-1.5 h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full bg-blue-600"
                          style={{ width: `${record.completeness}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-500">{record.submitted}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={record.status} />
                    </td>
                    <td className="px-4 py-4">
                      <ChevronRight className="size-4 text-slate-400" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="grid place-items-center px-6 py-16 text-center">
              <Circle className="size-7 text-slate-300" />
              <p className="mt-3 text-sm font-semibold text-slate-600">No registrations found</p>
            </div>
          )}
        </section>
        <RegistrationDetail record={selected} />
      </div>
    </AdminShell>
  );
}
