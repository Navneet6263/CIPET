import { CalendarDays } from "lucide-react";
import type { LabService } from "@/MOCK_DATA";
import { Field, SectionTitle, SelectField } from "@/components/request/RequestControls";
import type { RequestDraft } from "@/components/request/RequestDraft";

export function RequestDetails({
  step,
  draft,
  update,
  service,
}: {
  step: number;
  draft: RequestDraft;
  update: (patch: Partial<RequestDraft>) => void;
  service: LabService;
}) {
  if (step === 2) return <SampleStep draft={draft} update={update} />;
  return <ScheduleStep draft={draft} update={update} service={service} />;
}

function SampleStep({
  draft,
  update,
}: {
  draft: RequestDraft;
  update: (patch: Partial<RequestDraft>) => void;
}) {
  return (
    <div>
      <SectionTitle
        number={3}
        title="Plan the sample handover"
        text="Tell the team what will arrive and how you want to hand it over."
      />
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          id="dimensions"
          label="Dimensions or condition *"
          value={draft.dimensions}
          onChange={(dimensions) => update({ dimensions })}
          placeholder="Example: 165 × 13 × 3 mm, conditioned"
        />
        <SelectField
          label="Preferred handover *"
          value={draft.delivery}
          onChange={(delivery) => update({ delivery })}
          placeholder="Choose handover method"
          options={[
            "Self-drop at centre",
            "Courier",
            "Pickup coordination",
            "Already available at centre",
          ]}
        />
      </div>
      <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
        Final specimen count, preparation and retention conditions will be confirmed during team
        review.
      </div>
    </div>
  );
}

function ScheduleStep({
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
        number={4}
        title="Choose a preferred schedule"
        text="Select a convenient handover date. The final slot is confirmed after review."
      />
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          id="preferredDate"
          label="Preferred date *"
          type="date"
          value={draft.preferredDate}
          onChange={(preferredDate) => update({ preferredDate })}
        />
        <SelectField
          label="Preferred time window *"
          value={draft.timeWindow}
          onChange={(timeWindow) => update({ timeWindow })}
          placeholder="Choose a time window"
          options={["09:30 AM – 11:30 AM", "11:30 AM – 01:30 PM", "02:00 PM – 04:00 PM"]}
        />
      </div>
      <div className="mt-6 flex gap-3 rounded-md border border-blue-100 bg-blue-50 p-4">
        <CalendarDays className="size-5 shrink-0 text-blue-700" />
        <p className="text-xs leading-5 text-slate-600">
          Indicative turnaround is <strong className="text-[#0a2347]">{service.tat}</strong> from
          accepted sample and confirmed payment.
        </p>
      </div>
    </div>
  );
}
