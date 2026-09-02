import type { Lab, LabService } from "@/MOCK_DATA";
import { RequestBasics } from "@/components/request/RequestBasics";
import { RequestDetails } from "@/components/request/RequestDetails";
import { RequestFinalize } from "@/components/request/RequestFinalize";
import type { RequestDraft } from "@/components/request/RequestDraft";

export type { RequestDraft } from "@/components/request/RequestDraft";

export function RequestSection({
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
  if (step === 0) return <RequestBasics draft={draft} update={update} service={service} />;
  if (step < 3)
    return <RequestDetails step={step + 1} draft={draft} update={update} service={service} />;
  return (
    <RequestFinalize step={step + 1} draft={draft} update={update} lab={lab} service={service} />
  );
}
