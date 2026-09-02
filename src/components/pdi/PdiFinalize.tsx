import { BadgeCheck, Building2, CheckCircle2, PackageCheck, ShieldCheck } from "lucide-react";
import type { PdiDraft } from "@/components/pdi/PdiDraft";
import { PdiField, PdiSelect, PdiTitle } from "@/components/pdi/PdiFields";

type Props = { draft: PdiDraft; update: (patch: Partial<PdiDraft>) => void };

export function PdiFinalize({ step, draft, update }: Props & { step: number }) {
  return step === 4 ? (
    <Certification draft={draft} update={update} />
  ) : (
    <Review draft={draft} update={update} />
  );
}

function Choice({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-[#0a2347]">{label}</p>
      <div className="mt-2 flex gap-2">
        {["Yes", "No"].map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => onChange(option)}
            className={`min-w-24 rounded-md border px-4 py-2.5 text-xs font-semibold ${
              value === option
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-slate-200 text-slate-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function Certification({ draft, update }: Props) {
  return (
    <div>
      <PdiTitle
        number={5}
        title="Turnover and certifications"
        text="Complete the company profile used during registration review."
      />
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <PdiSelect
          label="Annual turnover *"
          value={draft.turnover}
          onChange={(turnover) => update({ turnover })}
          options={["0–5 Crore", "5–25 Crore", "25–100 Crore", "Above 100 Crore"]}
        />
        <PdiField
          label="Other certification or accreditation"
          value={draft.certification}
          onChange={(certification) => update({ certification })}
          placeholder="e.g. ISO 14001, product licence"
        />
        <Choice
          label="Is the organisation ISO 9001 certified? *"
          value={draft.iso9001}
          onChange={(iso9001) => update({ iso9001 })}
        />
        <Choice
          label="Have you used inspection services earlier? *"
          value={draft.previousInspection}
          onChange={(previousInspection) => update({ previousInspection })}
        />
      </div>
      <div className="mt-7 flex gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4">
        <ShieldCheck className="size-5 shrink-0 text-emerald-700" />
        <p className="text-xs leading-5 text-slate-600">
          In the live product, certificate files and security verification can be connected during
          backend integration. This demo stores mock form data only.
        </p>
      </div>
    </div>
  );
}

function Review({ draft, update }: Props) {
  const standards = new Set(draft.products.flatMap((product) => product.standards)).size;
  const summaries = [
    { icon: Building2, label: "Manufacturing unit", value: draft.unitName },
    {
      icon: PackageCheck,
      label: "Product scope",
      value: `${draft.products.length} products · ${standards} standards`,
    },
    { icon: BadgeCheck, label: "Annual turnover", value: draft.turnover },
  ];
  return (
    <div>
      <PdiTitle
        number={6}
        title="Review and submit"
        text="Confirm the registration scope before sending it to the review team."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {summaries.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <Icon className="size-5 text-blue-700" />
            <p className="mt-3 text-[10px] font-bold tracking-wide text-slate-400 uppercase">
              {label}
            </p>
            <p className="mt-1 text-sm font-semibold text-[#0a2347]">{value || "Not provided"}</p>
          </div>
        ))}
      </div>
      <section className="mt-6 rounded-md border border-slate-200 p-5">
        <h3 className="text-sm font-bold text-[#0a2347]">Registration summary</h3>
        <dl className="mt-4 grid gap-4 text-xs sm:grid-cols-2">
          <div>
            <dt className="text-slate-400">Applicant</dt>
            <dd className="mt-1 font-semibold text-slate-700">{draft.applicant.name}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Factory location</dt>
            <dd className="mt-1 font-semibold text-slate-700">
              {draft.factory.city}, {draft.factory.state} {draft.factory.pin}
            </dd>
          </div>
          <div>
            <dt className="text-slate-400">Authorised person</dt>
            <dd className="mt-1 font-semibold text-slate-700">{draft.authority.name}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Certification</dt>
            <dd className="mt-1 font-semibold text-slate-700">
              {draft.certification || "No additional certification"}
            </dd>
          </div>
        </dl>
      </section>
      <label className="mt-6 flex cursor-pointer gap-3 rounded-md border border-blue-200 bg-blue-50 p-4">
        <input
          type="checkbox"
          checked={draft.agreed}
          onChange={(event) => update({ agreed: event.target.checked })}
          className="mt-0.5 size-4 accent-blue-600"
        />
        <span className="text-xs leading-5 text-slate-600">
          I confirm that the information provided is accurate and can be used for registration
          review.
        </span>
        {draft.agreed && <CheckCircle2 className="ml-auto size-5 shrink-0 text-emerald-600" />}
      </label>
    </div>
  );
}
