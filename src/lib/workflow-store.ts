import { useSyncExternalStore } from "react";
import { BOOKINGS } from "@/data/bookings";
import { TODAY_APPOINTMENTS } from "@/data/admin";
import { PDI_REGISTRATIONS } from "@/data/registrations";
import {
  bookingStatus,
  progress,
  transition,
  REVIEW_CHECKS,
  type WorkflowKind,
  type WorkflowRecord,
} from "./workflow";

const KEY = "serviceflow-workflows-v1";
const EVENT = "serviceflow-workflows-changed";
type Records = Record<string, WorkflowRecord>;
const seeds: Records = {};
const defaultStage = {
  pending: "Request review",
  "in-progress": "Testing",
  ready: "Report ready",
  completed: "Closed",
  cancelled: "Cancelled",
};
for (const appointment of TODAY_APPOINTMENTS) {
  const booking = BOOKINGS.find((item) => item.sampleId === appointment.sampleId);
  seeds[appointment.sampleId.replace("SMP-", "CIP-")] = {
    stage: defaultStage[booking?.status ?? appointment.status],
    paid: booking?.paid ?? false,
    checks: [],
    history: [],
  };
}
for (const record of PDI_REGISTRATIONS) {
  seeds[record.id] = {
    stage: record.status,
    paid: false,
    checks: record.status === "Approved" ? [...REVIEW_CHECKS] : [],
    history: [],
  };
}
let cachedRaw: string | null | undefined;
let cached: Records = seeds;

function snapshot() {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cached;
  }
  if (raw === cachedRaw) return cached;
  cachedRaw = raw;
  try {
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    const valid: Records = {};
    if (parsed && typeof parsed === "object") {
      for (const [id, value] of Object.entries(parsed)) {
        if (
          id in seeds &&
          value &&
          typeof value.stage === "string" &&
          typeof value.paid === "boolean" &&
          Array.isArray(value.checks) &&
          Array.isArray(value.history)
        )
          valid[id] = value;
      }
    }
    cached = { ...seeds, ...valid };
  } catch {
    cached = seeds;
  }
  return cached;
}
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(EVENT, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(EVENT, listener);
  };
}
export function useWorkflows() {
  return useSyncExternalStore(subscribe, snapshot, () => seeds);
}
function save(id: string, record: WorkflowRecord) {
  const records = snapshot();
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...records, [id]: record }));
  } catch {
    throw new Error("Could not save this change. Allow browser storage and try again.");
  }
  window.dispatchEvent(new Event(EVENT));
}
export function advanceWorkflow(id: string, kind: WorkflowKind, stage: string, note = "") {
  const record = snapshot()[id];
  if (!record) throw new Error("Request not found.");
  save(id, transition(record, kind, stage, note, new Date().toISOString()));
}
export function checkWorkflow(id: string, check: string, checked: boolean) {
  const record = snapshot()[id];
  if (!record) throw new Error("Request not found.");
  save(id, {
    ...record,
    checks: checked
      ? [...new Set([...record.checks, check])]
      : record.checks.filter((item) => item !== check),
  });
}
export function resetWorkflow(id: string, kind: WorkflowKind) {
  save(id, {
    stage: kind === "service" ? "Request review" : "Submitted",
    paid: false,
    checks: [],
    history: [],
  });
}
export function recordPayment(id: string) {
  const record = snapshot()[id];
  if (!record) throw new Error("Request not found.");
  if (record.stage === "Cancelled") throw new Error("This request is cancelled.");
  if (record.paid) return;
  const paid = { ...record, paid: true };
  save(
    id,
    record.stage === "Payment"
      ? transition(
          paid,
          "service",
          "Sample planned",
          "Demo payment received",
          new Date().toISOString(),
        )
      : {
          ...paid,
          history: [
            ...paid.history,
            { stage: paid.stage, note: "Demo payment received", at: new Date().toISOString() },
          ],
        },
  );
}
export function useDemoBookings() {
  const records = useWorkflows();
  return BOOKINGS.map((booking) => ({
    ...booking,
    status: bookingStatus(records[booking.id]!.stage),
    progress: progress(records[booking.id]!.stage),
    paid: records[booking.id]!.paid,
  }));
}
export function useDemoAppointments() {
  const records = useWorkflows();
  return TODAY_APPOINTMENTS.map((appointment) => {
    const booking = BOOKINGS.find((item) => item.sampleId === appointment.sampleId);
    const id = appointment.sampleId.replace("SMP-", "CIP-");
    return {
      ...appointment,
      id,
      stage: records[id]!.stage,
      customer: booking?.company ?? appointment.customer,
      service: booking?.serviceName ?? appointment.service,
      status: bookingStatus(records[id]!.stage),
    };
  });
}
