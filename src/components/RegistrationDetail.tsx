import type { RegistrationRecord, RegistrationStatus } from "@/data/registrations";
import { WorkflowControls } from "@/components/WorkflowControls";

const statusStyle: Record<RegistrationStatus, string> = {
  Draft: "bg-slate-100 text-slate-600",
  Submitted: "bg-blue-50 text-blue-700",
  "Under review": "bg-amber-50 text-amber-700",
  "Action required": "bg-red-50 text-red-700",
  "Technical review": "bg-violet-50 text-violet-700",
  Approved: "bg-emerald-50 text-emerald-700",
};

export function StatusBadge({ status }: { status: RegistrationStatus }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${statusStyle[status]}`}>
      {status}
    </span>
  );
}

export function RegistrationDetail({ record }: { record: RegistrationRecord }) {
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

        <WorkflowControls key={record.id} id={record.id} kind="pdi" />
      </div>
    </aside>
  );
}
