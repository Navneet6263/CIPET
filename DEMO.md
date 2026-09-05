# Status workflow demo

The existing interface now includes working status controls. Changes are saved in the current
browser and shared between tabs on the same site. No backend or payment gateway is connected.

## Service request

1. Open **Operations → Appointments** (`/admin/appointments`).
2. Find `SMP-LKO-26091` and click **Update status**.
3. For a fresh presentation, choose **Reset this demo record → Confirm reset**.
4. Advance through Request review → Quotation → Payment → Sample planned → Received → Testing
   → Technical review → Report ready → Dispatched → Closed.
5. At Payment, **Confirm payment & schedule** records the demo payment and advances the request.
6. Open **Operations → Sample flow** (`/admin/samples`). Click a request card to update it;
   the card moves between columns and stage counts update automatically.
7. Open **Insights → Operational reports** (`/admin/reports`) to finish report review and dispatch.
8. Open `/tracking/CIP-LKO-26091` or the customer dashboard to show the updated status,
   progress, payment state and timestamped history. Refresh to demonstrate persistence.

Cancellation requires a reason. Closed and cancelled requests cannot advance further.
Outstanding payment must be confirmed before closure. The bulk action in Appointments advances
each selected request by one available stage.

## PDI registration

1. Open **Operations → PDI registrations** (`/admin/registrations`).
2. Select `PDI-LKO-26018` and scroll to **Update status** in the details panel.
3. Reset the record if needed, then advance Submitted → Under review → Technical review → Approved.
4. To demonstrate clarification, enter a reason and click **Request clarification**.
   The record moves to Action required. Resume review after the simulated response.
5. Complete all five review checks before approval. Incomplete checks block approval.
6. Use the status filter, queue counters and **Status history** to show the result.

Submitting the existing service/PDI wizard restarts its corresponding demo record at the first
stage. Reset affects only the selected record, including its payment state, checks and history.
Browser storage is separate for localhost and a deployed site, and is not shared across devices.

## Verification

- `npm run build`
- `npx tsc --noEmit`
- `npm run lint`
- `node --test tests/workflow.test.mjs` (Node 22.18+)
- `node tests/workflow-browser.mjs` with the app at `http://127.0.0.1:8080`
  and an isolated Chrome debugging session on port 9333. Browser tests intentionally change
  demo records in that isolated browser profile; screenshots go into ignored `artifacts/`.
