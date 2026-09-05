import { test } from "node:test";
import assert from "node:assert/strict";
import {
  SERVICE_STAGES,
  REVIEW_CHECKS,
  nextStages,
  transition,
  bookingStatus,
  progress,
} from "../src/lib/workflow.ts";

const fresh = (stage) => ({ stage, paid: false, checks: [], history: [] });
const at = "2026-09-05T10:00:00.000Z";

test("service request advances in order, confirms payment and reaches closure", () => {
  let record = fresh(SERVICE_STAGES[0]);
  for (const stage of SERVICE_STAGES.slice(1)) {
    record = transition(record, "service", stage, "Demo review", at);
    assert.equal(record.stage, stage);
  }
  assert.equal(record.paid, true);
  assert.equal(record.history.length, 9);
  assert.equal(bookingStatus(record.stage), "completed");
  assert.equal(progress(record.stage), 100);
  assert.deepEqual(nextStages("service", "Closed"), []);
});
test("cannot skip stages or close with outstanding payment", () => {
  assert.throws(
    () => transition(fresh("Request review"), "service", "Testing", "", at),
    /next available/,
  );
  assert.throws(
    () => transition(fresh("Dispatched"), "service", "Closed", "", at),
    /outstanding payment/,
  );
});
test("cancellation requires a reason and is terminal", () => {
  const start = fresh("Testing");
  assert.throws(() => transition(start, "service", "Cancelled", "  ", at), /reason/);
  const record = transition(start, "service", "Cancelled", "Client withdrew sample", at);
  assert.equal(bookingStatus(record.stage), "cancelled");
  assert.deepEqual(nextStages("service", record.stage), []);
  assert.equal(start.history.length, 0);
  assert.equal(record.history[0].note, "Client withdrew sample");
});
test("PDI clarification resumes review and approval needs every check", () => {
  let record = transition(fresh("Submitted"), "pdi", "Under review", "", at);
  assert.throws(() => transition(record, "pdi", "Action required", "", at), /reason/);
  record = transition(record, "pdi", "Action required", "Certificate missing", at);
  record = transition(record, "pdi", "Under review", "Certificate received", at);
  record = transition(record, "pdi", "Technical review", "", at);
  assert.throws(() => transition(record, "pdi", "Approved", "", at), /five review checks/);
  record = transition({ ...record, checks: [...REVIEW_CHECKS] }, "pdi", "Approved", "Verified", at);
  assert.deepEqual(nextStages("pdi", record.stage), []);
  assert.equal(record.history.at(-1).at, at);
});
