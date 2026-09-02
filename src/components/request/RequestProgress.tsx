import { Check, FlaskConical } from "lucide-react";
import type { LabService } from "@/MOCK_DATA";
import { REQUEST_STEPS } from "@/components/request/requestSteps";

export function RequestProgress({ step, service }: { step: number; service: LabService }) {
  return (
    <div className="border-b border-slate-200">
      <div className="flex items-center gap-4 px-5 py-5 sm:px-7">
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
          <FlaskConical className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-base font-bold text-[#0a2347]">{service.name}</h2>
          <p className="mt-0.5 truncate text-xs text-slate-500">{service.description}</p>
          <button className="mt-1 text-xs font-semibold text-blue-600">Change service</button>
        </div>
      </div>
      <ol className="grid grid-cols-6 overflow-x-auto border-t border-slate-100 px-3 py-5 sm:px-6">
        {REQUEST_STEPS.map((label, index) => (
          <li key={label} className="relative min-w-[82px] text-center">
            {index > 0 && (
              <span
                className={`absolute top-3 right-1/2 h-px w-full ${index <= step ? "bg-blue-600" : "bg-slate-300"}`}
              />
            )}
            <span
              className={`relative z-10 mx-auto grid size-7 place-items-center rounded-full border text-xs font-bold ${index < step ? "border-blue-600 bg-blue-600 text-white" : index === step ? "border-blue-600 bg-white text-blue-700 ring-4 ring-blue-50" : "border-slate-300 bg-white text-slate-400"}`}
            >
              {index < step ? <Check className="size-3.5" /> : index + 1}
            </span>
            <span
              className={`mt-2 block text-[10px] font-semibold sm:text-xs ${index <= step ? "text-blue-700" : "text-slate-400"}`}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
