import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  nextStages,
  PDI_STAGES,
  SERVICE_STAGES,
  REVIEW_CHECKS,
  type WorkflowKind,
} from "@/lib/workflow";
import {
  advanceWorkflow,
  checkWorkflow,
  resetWorkflow,
  recordPayment,
  useWorkflows,
} from "@/lib/workflow-store";

export function WorkflowControls({ id, kind }: { id: string; kind: WorkflowKind }) {
  const record = useWorkflows()[id]!;
  const [note, setNote] = useState("");
  const [reset, setReset] = useState(false);
  const stages = kind === "service" ? SERVICE_STAGES : PDI_STAGES;
  const index = (stages as readonly string[]).indexOf(record.stage);
  const run = (action: () => void, message: string) => {
    try {
      action();
      toast.success(message);
      setNote("");
      setReset(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update status");
    }
  };
  return (
    <section className="mt-5 border-t border-slate-200 pt-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-[#0a2347]">Update status</h3>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {record.stage}
        </span>
      </div>
      <ol aria-label="Workflow stages" className="mt-3 flex flex-wrap gap-2 text-[10px]">
        {stages.map((stage, i) => (
          <li
            key={stage}
            aria-current={stage === record.stage ? "step" : undefined}
            className={`rounded border px-2 py-1 ${i <= index ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-400"}`}
          >
            {i + 1}. {stage}
          </li>
        ))}
      </ol>
      {kind === "pdi" && (
        <fieldset className="mt-4 space-y-2">
          <legend className="mb-2 text-xs font-semibold">Review checklist</legend>
          {REVIEW_CHECKS.map((check) => (
            <label key={check} className="flex items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                checked={record.checks.includes(check)}
                disabled={record.stage === "Approved"}
                onChange={(e) =>
                  run(() => checkWorkflow(id, check, e.target.checked), "Review check saved")
                }
                className="size-4 accent-blue-600"
              />
              {check}
            </label>
          ))}
        </fieldset>
      )}
      {nextStages(kind, record.stage).length > 0 && (
        <>
          <label className="mt-4 block text-xs font-semibold" htmlFor={`note-${id}`}>
            Review note / reason
          </label>
          <textarea
            id={`note-${id}`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="Required for clarification or cancellation"
            className="mt-2 w-full rounded-md border border-slate-200 p-3 text-sm"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {nextStages(kind, record.stage).map((target, i) => (
              <Button
                key={target}
                size="sm"
                variant={i === 0 ? "default" : "outline"}
                onClick={() =>
                  run(() => advanceWorkflow(id, kind, target, note), `${id}: ${target}`)
                }
              >
                {target === "Cancelled"
                  ? "Cancel request"
                  : target === "Action required"
                    ? "Request clarification"
                    : target === "Sample planned" && record.stage === "Payment"
                      ? "Confirm payment & schedule"
                      : `Move to ${target.toLowerCase()}`}
              </Button>
            ))}
          </div>
        </>
      )}
      {kind === "service" && !record.paid && index >= 3 && (
        <Button
          className="mt-3"
          size="sm"
          variant="outline"
          onClick={() => run(() => recordPayment(id), "Payment confirmed")}
        >
          Confirm outstanding payment
        </Button>
      )}
      {kind === "service" && (
        <Link
          to="/tracking/$bookingId"
          params={{ bookingId: id }}
          className="mt-4 block text-xs font-semibold text-blue-700"
        >
          View customer tracking →
        </Link>
      )}
      <details className="mt-4 text-xs">
        <summary className="cursor-pointer font-semibold text-slate-600">
          Status history ({record.history.length})
        </summary>
        <ol className="mt-2 max-h-48 space-y-3 overflow-y-auto">
          {record.history.map((event, i) => (
            <li key={`${event.at}-${i}`} className="border-l-2 border-blue-200 pl-3">
              <strong>{event.stage}</strong>
              <time className="ml-2 text-slate-400">
                {new Date(event.at).toLocaleString("en-IN")}
              </time>
              {event.note && <p className="mt-1 break-words text-slate-500">{event.note}</p>}
            </li>
          ))}
          {!record.history.length && <li className="text-slate-400">No status changes yet.</li>}
        </ol>
      </details>
      <div className="mt-4 border-t border-slate-100 pt-3">
        {reset ? (
          <div className="space-y-2">
            <p className="text-xs text-slate-500">
              Restart this record from the first step and clear its demo history?
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => run(() => resetWorkflow(id, kind), "Demo record reset")}
            >
              Confirm reset
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setReset(false)}>
              Keep current status
            </Button>
          </div>
        ) : (
          <button onClick={() => setReset(true)} className="text-xs text-slate-500 underline">
            Reset this demo record
          </button>
        )}
      </div>
    </section>
  );
}
