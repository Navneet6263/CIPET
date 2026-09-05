import { Label } from "@/components/ui/label";
import type { LabService } from "@/MOCK_DATA";
import { Field, InfoBox, SectionTitle, SelectField } from "@/components/request/RequestControls";
import type { RequestDraft } from "@/components/request/RequestDraft";

const purposes = [
  ["Quality assurance", "Verify product quality and specifications"],
  ["R&D / Product development", "Evaluate and improve material or product"],
  ["Compliance testing", "Meet industry or regulatory standards"],
  ["Failure analysis", "Identify the root cause of product failure"],
  ["Other", "Custom testing or technical requirement"],
] as const;

export function RequestBasics({
  draft,
  update,
  service,
}: {
  draft: RequestDraft;
  update: (patch: Partial<RequestDraft>) => void;
  service: LabService;
}) {
  return (
    <div>
      <SectionTitle
        number={1}
        title="Tell us about your requirement"
        text="Add the purpose and technical details used to confirm scope, cost and turnaround."
      />
      <Label className="mt-6 block text-xs font-semibold text-[#0a2347]">Purpose of testing</Label>
      <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
        {purposes.map(([title, text]) => (
          <button
            key={title}
            type="button"
            onClick={() => update({ purpose: title })}
            className={`min-h-24 rounded-md border p-3 text-left transition ${draft.purpose === title ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" : "border-slate-200 bg-white hover:border-blue-300"}`}
          >
            <span className="flex items-start gap-2">
              <span
                className={`mt-0.5 size-4 shrink-0 rounded-full border-4 ${draft.purpose === title ? "border-blue-600 bg-white" : "border-slate-300"}`}
              />
              <span>
                <strong className="block text-xs text-[#0a2347]">{title}</strong>
                <span className="mt-1 block text-[10px] leading-4 text-slate-500">{text}</span>
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <SelectField
          label="Testing standard / method *"
          value={draft.method}
          onChange={(method) => update({ method })}
          placeholder="Select a method"
          options={[
            service.standard,
            "ASTM D638",
            "ISO 527",
            "Client specification",
            "Team recommendation",
          ]}
        />
        <SelectField
          label="Material / product *"
          value={draft.material}
          onChange={(material) => update({ material })}
          placeholder="Select material or product"
          options={[
            "Thermoplastic specimen",
            "Polymer granules",
            "Plastic component",
            "Composite material",
            "Other product",
          ]}
        />
        <div className="grid grid-cols-[1fr_110px] gap-3">
          <Field
            id="quantity"
            label="Quantity *"
            value={draft.quantity}
            onChange={(quantity) => update({ quantity })}
            placeholder="Enter quantity"
          />
          <SelectField
            label="Unit"
            value={draft.unit}
            onChange={(unit) => update({ unit })}
            placeholder="Unit"
            options={["pcs", "grams", "kg", "sets"]}
          />
        </div>
        <div>
          <Label className="text-xs font-semibold text-[#0a2347]">Sample form *</Label>
          <div className="mt-2 flex min-h-11 flex-wrap gap-2">
            {["Dog-bone", "Sheet", "Film", "Rod", "Other"].map((form) => (
              <button
                key={form}
                type="button"
                onClick={() => update({ sampleForm: form })}
                className={`rounded-md border px-3 py-2 text-xs font-semibold ${draft.sampleForm === form ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-600"}`}
              >
                {form}
              </button>
            ))}
          </div>
        </div>
      </div>
      <InfoBox text="Accurate details help the team estimate scope, fee and turnaround without extra follow-ups." />
    </div>
  );
}
