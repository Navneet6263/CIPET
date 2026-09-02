import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  ClipboardCheck,
  Search,
  Send,
  UserRoundCheck,
} from "lucide-react";
import { toast } from "sonner";
import { AdminShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PDI_REGISTRATIONS, type RegistrationRecord, type RegistrationStatus } from "@/MOCK_DATA";

export const Route = createFileRoute("/admin/registrations")({
  head: () => ({ meta: [{ title: "PDI Registrations — ServiceFlow" }] }),
  component: RegistrationQueue,
});

const statusStyle: Record<RegistrationStatus, string> = {
  Draft: "bg-slate-100 text-slate-600",
  Submitted: "bg-blue-50 text-blue-700",
  "Under review": "bg-amber-50 text-amber-700",
  "Action required": "bg-red-50 text-red-700",
  Approved: "bg-emerald-50 text-emerald-700",
};

const checks = [
  ["Company and applicant details", true],
  ["Factory and office addresses", true],
  ["Authority and key personnel", true],
  ["Products mapped to standards", true],
  ["Certification evidence", false],
] as const;

function StatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle[status]}`}>
      {status}
    </span>
  );
}

function RegistrationDetail({ record }: { record: RegistrationRecord }) {
  return (
    <aside className="overflow-hidden rounded-lg border border-slate-200 bg-white xl:sticky xl:top-24 xl:self-start">
      <div className="border-b border-slate-200 bg-[#0a2347] px-5 py-5 text-white">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold tracking-wider text-cyan-300 uppercase">
              Registration detail
            </p>
            <h2 className="mt-1 text-lg font-bold">{record.id}</h2>
          </div>
          <StatusBadge status={record.status} />
        </div>
        <p className="mt-3 text-sm font-semibold">{record.company}</p>
        <p className="mt-1 text-xs text-slate-300">
          {record.applicant} · {record.city}
        </p>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#0a2347]">Application completeness</span>
          <strong className="text-blue-700">{record.completeness}%</strong>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600"
            style={{ width: `${record.completeness}%` }}
          />
        </div>

        <dl className="mt-5 grid grid-cols-2 gap-4 rounded-md bg-slate-50 p-4 text-xs">
          <div>
            <dt className="text-slate-400">Products</dt>
            <dd className="mt-1 text-lg font-bold text-[#0a2347]">{record.products}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Standards</dt>
            <dd className="mt-1 text-lg font-bold text-[#0a2347]">{record.standards}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Submitted</dt>
            <dd className="mt-1 font-semibold text-slate-700">{record.submitted}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Reviewer</dt>
            <dd className="mt-1 font-semibold text-slate-700">{record.reviewer}</dd>
          </div>
        </dl>

        <section className="mt-6">
          <h3 className="flex items-center gap-2 text-sm font-bold text-[#0a2347]">
            <ClipboardCheck className="size-4 text-blue-700" /> Review checklist
          </h3>
          <ul className="mt-3 divide-y divide-slate-100 text-xs">
            {checks.map(([label, complete]) => (
              <li key={label} className="flex items-center gap-3 py-3">
                {complete ? (
                  <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="size-4 shrink-0 text-amber-500" />
                )}
                <span className="text-slate-600">{label}</span>
                <span className="ml-auto text-[10px] font-semibold text-slate-400">
                  {complete ? "Complete" : "Check"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-5 rounded-md border border-blue-100 bg-blue-50 p-4">
          <p className="text-xs font-bold text-[#0a2347]">Product scope preview</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Pipe Fittings", "PE Pipes", "UPVC Pipes"].slice(0, record.products).map((item) => (
              <span
                key={item}
                className="rounded-full border border-blue-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-blue-700"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          <Button
            variant="outline"
            onClick={() => toast.success(`Clarification request prepared for ${record.id}`)}
          >
            <Send /> Request clarification
          </Button>
          <Button onClick={() => toast.success(`${record.id} moved to technical review`)}>
            <UserRoundCheck /> Start review
          </Button>
        </div>
      </div>
    </aside>
  );
}

function RegistrationQueue() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedId, setSelectedId] = useState(PDI_REGISTRATIONS[0].id);
  const filtered = useMemo(
    () =>
      PDI_REGISTRATIONS.filter(
        (record) =>
          (status === "All" || record.status === status) &&
          `${record.id} ${record.company} ${record.applicant}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [query, status],
  );
  const selected =
    PDI_REGISTRATIONS.find((record) => record.id === selectedId) ?? PDI_REGISTRATIONS[0];
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
        {metrics.map(([label, value, detail, tone]) => (
          <div key={label} className="p-5">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className={`mt-2 text-2xl font-bold ${tone}`}>{value}</p>
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
              {["All", "Submitted", "Under review", "Action required", "Approved"].map((option) => (
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
