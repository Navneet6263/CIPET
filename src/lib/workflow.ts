export const SERVICE_STAGES = [
  "Request review",
  "Quotation",
  "Payment",
  "Sample planned",
  "Received",
  "Testing",
  "Technical review",
  "Report ready",
  "Dispatched",
  "Closed",
] as const;
export const PDI_STAGES = ["Submitted", "Under review", "Technical review", "Approved"] as const;
export const REVIEW_CHECKS = [
  "Company and applicant details",
  "Factory and office addresses",
  "Authority and key personnel",
  "Products mapped to standards",
  "Certification evidence",
] as const;
export type WorkflowKind = "service" | "pdi";
export interface WorkflowEvent {
  stage: string;
  at: string;
  note: string;
}
export interface WorkflowRecord {
  stage: string;
  paid: boolean;
  checks: string[];
  history: WorkflowEvent[];
}

export function nextStages(kind: WorkflowKind, stage: string): string[] {
  if (kind === "pdi" && stage === "Action required") return ["Under review"];
  const stages: readonly string[] = kind === "service" ? SERVICE_STAGES : PDI_STAGES;
  const index = stages.indexOf(stage);
  if (index < 0 || index === stages.length - 1) return [];
  const next = stages[index + 1]!;
  return kind === "service" ? [next, "Cancelled"] : [next, "Action required"];
}

export function transition(
  record: WorkflowRecord,
  kind: WorkflowKind,
  target: string,
  note: string,
  at: string,
): WorkflowRecord {
  if (!nextStages(kind, record.stage).includes(target))
    throw new Error("Choose the next available stage.");
  if (["Action required", "Cancelled"].includes(target) && !note.trim()) {
    throw new Error("Add a reason before requesting clarification or cancelling.");
  }
  if (
    kind === "pdi" &&
    target === "Approved" &&
    !REVIEW_CHECKS.every((check) => record.checks.includes(check))
  ) {
    throw new Error("Complete all five review checks before approval.");
  }
  if (kind === "service" && target === "Closed" && !record.paid) {
    throw new Error("Confirm the outstanding payment before closing this request.");
  }
  return {
    ...record,
    stage: target,
    paid:
      kind === "service" && record.stage === "Payment" && target === "Sample planned"
        ? true
        : record.paid,
    history: [...record.history, { stage: target, at, note: note.trim() }],
  };
}

export function bookingStatus(
  stage: string,
): "pending" | "in-progress" | "ready" | "completed" | "cancelled" {
  if (stage === "Cancelled") return "cancelled";
  if (stage === "Closed") return "completed";
  if (["Report ready", "Dispatched"].includes(stage)) return "ready";
  return SERVICE_STAGES.indexOf(stage as (typeof SERVICE_STAGES)[number]) >= 4
    ? "in-progress"
    : "pending";
}

export function progress(stage: string) {
  return stage === "Cancelled"
    ? 0
    : Math.max(
        0,
        Math.round(
          (SERVICE_STAGES.indexOf(stage as (typeof SERVICE_STAGES)[number]) /
            (SERVICE_STAGES.length - 1)) *
            100,
        ),
      );
}
