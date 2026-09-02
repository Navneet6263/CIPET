import { Clock3, FileText, IndianRupee, MapPin, ShieldCheck } from "lucide-react";
import type { Lab, LabService } from "@/MOCK_DATA";
import { formatINR } from "@/MOCK_DATA";
import type { RequestDraft } from "@/components/request/RequestDraft";

const nextSteps = [
  ["Team review", "Requirement and sample details are checked."],
  ["Scope & quotation", "Final scope, fee and turnaround are confirmed."],
  ["Payment", "Choose a payment method after approval."],
  ["Schedule & testing", "The job is planned and progress is tracked."],
  ["Report delivery", "Receive the report and completion record."],
];

export function RequestSummary({
  lab,
  service,
  draft,
}: {
  lab: Lab;
  service: LabService;
  draft: RequestDraft;
}) {
  return (
    <aside className="h-fit min-w-0 lg:sticky lg:top-24">
      <h2 className="text-sm font-bold text-[#0a2347]">Request summary</h2>
      <section className="mt-3 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <dl className="divide-y divide-slate-100 px-4 text-sm">
          <div className="py-4">
            <dt className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin className="size-3.5" /> Centre
            </dt>
            <dd className="mt-1 font-semibold text-[#0a2347]">{lab.shortName}</dd>
          </div>
          <div className="py-4">
            <dt className="text-xs text-slate-400">Service</dt>
            <dd className="mt-1 font-semibold text-[#0a2347]">{service.name}</dd>
          </div>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <dt className="flex items-center gap-1 text-xs text-slate-400">
                <Clock3 className="size-3.5" /> Turnaround
              </dt>
              <dd className="mt-1 font-semibold text-blue-700">{service.tat}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1 text-xs text-slate-400">
                <IndianRupee className="size-3.5" /> Indicative fee
              </dt>
              <dd className="mt-1 font-semibold text-blue-700">{formatINR(service.price)}</dd>
            </div>
          </div>
          <div className="py-4">
            <dt className="flex items-center gap-2 text-xs text-slate-400">
              <FileText className="size-3.5" /> Documents
            </dt>
            <dd className="mt-1 text-xs font-semibold text-slate-600">
              {draft.files.length ? `${draft.files.length} attached` : "Not uploaded yet"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-4 overflow-hidden rounded-lg border border-blue-100 bg-blue-50/50">
        <h3 className="px-4 pt-4 text-sm font-bold text-[#0a2347]">What happens next</h3>
        <ol className="px-4 py-4">
          {nextSteps.map(([title, text], index) => (
            <li key={title} className="relative flex gap-3 pb-4 last:pb-0">
              {index < nextSteps.length - 1 && (
                <span className="absolute top-5 left-2.5 h-full border-l border-dashed border-blue-300" />
              )}
              <span className="relative z-10 grid size-5 shrink-0 place-items-center rounded-full border border-blue-500 bg-white text-[9px] font-bold text-blue-700">
                {index + 1}
              </span>
              <span>
                <strong className="block text-xs text-[#0a2347]">{title}</strong>
                <span className="mt-0.5 block text-[10px] leading-4 text-slate-500">{text}</span>
              </span>
            </li>
          ))}
        </ol>
        <p className="flex gap-2 border-t border-blue-100 bg-white/50 px-4 py-3 text-[10px] leading-4 text-slate-500">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-blue-600" /> Your information is
          used only to process this request.
        </p>
      </section>
    </aside>
  );
}
