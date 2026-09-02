import { FileText, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Lab, LabService } from "@/MOCK_DATA";
import { SectionTitle } from "@/components/request/RequestControls";
import type { RequestDraft } from "@/components/request/RequestDraft";

export function RequestFinalize({
  step,
  draft,
  update,
  lab,
  service,
}: {
  step: number;
  draft: RequestDraft;
  update: (patch: Partial<RequestDraft>) => void;
  lab: Lab;
  service: LabService;
}) {
  if (step === 4) return <DocumentsStep draft={draft} update={update} />;
  return <ReviewStep draft={draft} update={update} lab={lab} service={service} />;
}

function DocumentsStep({
  draft,
  update,
}: {
  draft: RequestDraft;
  update: (patch: Partial<RequestDraft>) => void;
}) {
  return (
    <div>
      <SectionTitle
        number={5}
        title="Add supporting documents"
        text="Attach specifications, drawings or images that help the team review your request."
      />
      <div className="mt-6 rounded-md border border-dashed border-blue-300 bg-blue-50/40 p-8 text-center">
        <Upload className="mx-auto size-6 text-blue-700" />
        <p className="mt-3 text-sm font-semibold text-[#0a2347]">
          Drop files here or choose from your device
        </p>
        <p className="mt-1 text-[10px] text-slate-500">PDF, JPG or PNG · Maximum 10 MB per file</p>
        <Button
          variant="outline"
          className="mt-4 bg-white"
          onClick={() =>
            update({ files: [...draft.files, `supporting-document-${draft.files.length + 1}.pdf`] })
          }
        >
          Choose file
        </Button>
      </div>
      <ul className="mt-4 divide-y divide-slate-100 rounded-md border border-slate-200 bg-white px-4">
        {draft.files.map((file) => (
          <li key={file} className="flex items-center justify-between py-3 text-xs">
            <span className="flex min-w-0 items-center gap-2">
              <FileText className="size-4 shrink-0 text-blue-700" />
              <span className="truncate">{file}</span>
            </span>
            <button
              onClick={() => update({ files: draft.files.filter((item) => item !== file) })}
              aria-label={`Remove ${file}`}
            >
              <Trash2 className="size-4 text-slate-400" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReviewStep({
  draft,
  update,
  lab,
  service,
}: {
  draft: RequestDraft;
  update: (patch: Partial<RequestDraft>) => void;
  lab: Lab;
  service: LabService;
}) {
  const rows = [
    ["Centre", lab.shortName],
    ["Service", service.name],
    ["Purpose", draft.purpose],
    ["Method", draft.method],
    ["Sample", `${draft.quantity} ${draft.unit} · ${draft.material} · ${draft.sampleForm}`],
    ["Handover", `${draft.delivery} · ${draft.preferredDate} · ${draft.timeWindow}`],
    ["Documents", `${draft.files.length} attached`],
  ];
  return (
    <div>
      <SectionTitle
        number={6}
        title="Review and submit"
        text="Confirm the information before the request enters the service review queue."
      />
      <dl className="mt-6 divide-y divide-slate-100 rounded-md border border-slate-200 bg-white px-4 text-xs">
        {rows.map(([label, value]) => (
          <div key={label} className="grid gap-1 py-3 sm:grid-cols-[150px_1fr]">
            <dt className="text-slate-400">{label}</dt>
            <dd className="font-semibold text-[#0a2347]">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5">
        <Label htmlFor="notes" className="text-xs font-semibold text-[#0a2347]">
          Additional notes
        </Label>
        <Textarea
          id="notes"
          value={draft.notes}
          onChange={(event) => update({ notes: event.target.value })}
          rows={3}
          className="mt-2 bg-white"
          placeholder="Add acceptance criteria or special handling instructions."
        />
      </div>
      <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-slate-600">
        <Checkbox
          checked={draft.agreed}
          onCheckedChange={(value) => update({ agreed: value === true })}
          className="mt-0.5"
        />
        <span>
          I confirm these details are correct and understand that the final scope, quotation and
          schedule will be confirmed after review.
        </span>
      </label>
    </div>
  );
}
