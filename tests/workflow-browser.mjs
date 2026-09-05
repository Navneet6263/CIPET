// Run with an isolated Chrome debugging session on port 9333 and the app on port 8080.
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const tabs = await fetch("http://127.0.0.1:9333/json").then((r) => r.json());
const socket = new WebSocket(tabs.find((tab) => tab.type === "page").webSocketDebuggerUrl);
await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
let sequence = 0;
const pending = new Map();
const errors = [];
socket.addEventListener("message", ({ data }) => {
  const message = JSON.parse(data);
  if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails);
  const request = pending.get(message.id);
  if (request) {
    pending.delete(message.id);
    message.error ? request.reject(message.error) : request.resolve(message.result);
  }
});
function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}
async function wait(expression) {
  const deadline = Date.now() + 30000;
  do {
    try {
      if (await evaluate(`Boolean(${expression})`)) return;
    } catch {
      /* Navigation may replace context. */
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  } while (Date.now() < deadline);
  throw new Error(`Timed out: ${expression}`);
}
async function go(path, title) {
  await send("Page.navigate", { url: `http://127.0.0.1:8080${path}` });
  await wait(
    `document.querySelector('h1')?.textContent.includes(${JSON.stringify(title)}) && !document.querySelector('vite-error-overlay')`,
  );
  await new Promise((resolve) => setTimeout(resolve, 800));
  await wait(
    "[...document.querySelectorAll('button')].some(b => Object.keys(b).some(k => k.startsWith('__reactProps')))",
  );
}
async function click(text) {
  const expression = `[...document.querySelectorAll('button')].find((b) => b.textContent.trim() === ${JSON.stringify(text)} && !b.disabled)`;
  await wait(expression);
  await evaluate(`${expression}.click()`);
  await new Promise((resolve) => setTimeout(resolve, 200));
}
async function openRequest(id) {
  const expression = `[...document.querySelectorAll('tr')].find(r => r.textContent.includes(${JSON.stringify(id)}))?.querySelector('button:not([role=checkbox])')`;
  await wait(expression);
  await evaluate(`${expression}.click()`);
  await wait("document.querySelector('[role=dialog]')");
}
const stage = (id) =>
  `JSON.parse(localStorage.getItem('serviceflow-workflows-v1') || '{}')[${JSON.stringify(id)}]?.stage`;
async function expectStage(id, value) {
  await wait(`${stage(id)} === ${JSON.stringify(value)}`);
}
async function screenshot(name) {
  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await mkdir("artifacts", { recursive: true });
  await writeFile(`artifacts/${name}.png`, Buffer.from(shot.data, "base64"));
}

try {
  await send("Runtime.enable");
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 1100,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await go("/admin/appointments", "Appointments");
  await openRequest("SMP-LKO-26091");
  await click("Reset this demo record");
  await click("Confirm reset");
  await expectStage("CIP-LKO-26091", "Request review");
  for (const [button, value] of [
    ["Move to quotation", "Quotation"],
    ["Move to payment", "Payment"],
    ["Confirm payment & schedule", "Sample planned"],
    ["Move to received", "Received"],
    ["Move to testing", "Testing"],
  ]) {
    await click(button);
    await expectStage("CIP-LKO-26091", value);
  }
  await screenshot("workflow-appointment");
  await go("/tracking/CIP-LKO-26091", "Request progress");
  await wait(
    "document.querySelector('aside')?.textContent.includes('Testing') && document.querySelector('aside')?.textContent.includes('Paid')",
  );
  await screenshot("workflow-tracking");
  await go("/admin/samples", "Today at Lucknow Centre");
  await wait(
    "[...document.querySelectorAll('button')].find(b=>b.textContent.includes('CIP-LKO-26091'))",
  );
  await evaluate(
    "[...document.querySelectorAll('button')].find(b=>b.textContent.includes('CIP-LKO-26091')).click()",
  );
  await click("Move to technical review");
  await expectStage("CIP-LKO-26091", "Technical review");
  await go("/admin/reports", "Reports");
  await openRequest("SMP-LKO-26091");
  await click("Move to report ready");
  await click("Move to dispatched");
  await click("Move to closed");
  await expectStage("CIP-LKO-26091", "Closed");
  await go("/bookings-history", "Request history");
  await wait(
    "[...document.querySelectorAll('tr')].find(r=>r.textContent.includes('CIP-LKO-26091'))?.textContent.includes('Completed')",
  );
  console.log("PASS: service stages, payment, reports, customer tracking and refresh persistence");

  await go("/admin/registrations", "PDI Registrations");
  await click("Reset this demo record");
  await click("Confirm reset");
  await click("Move to under review");
  await click("Request clarification");
  await expectStage("PDI-LKO-26018", "Under review");
  await evaluate(
    "(() => {const el=document.querySelector('textarea'); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(el,'Certificate missing'); el.dispatchEvent(new Event('input',{bubbles:true}));})()",
  );
  await click("Request clarification");
  await expectStage("PDI-LKO-26018", "Action required");
  await click("Move to under review");
  await click("Move to technical review");
  await click("Move to approved");
  await expectStage("PDI-LKO-26018", "Technical review");
  for (let i = 0; i < 5; i++) {
    await evaluate(`document.querySelectorAll('fieldset input[type=checkbox]')[${i}].click()`);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  await click("Move to approved");
  await expectStage("PDI-LKO-26018", "Approved");
  await go("/admin/registrations", "PDI Registrations");
  await wait("document.querySelector('aside')?.textContent.includes('Approved')");
  await screenshot("workflow-pdi");
  console.log("PASS: PDI clarification, mandatory checks, approval and persistence");
  await go("/pdi-confirmation/PDI-LKO-26018", "Registration: approved");
  await wait("document.body.textContent.includes('Current status: Approved')");

  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await go("/admin/appointments", "Appointments");
  await openRequest("SMP-LKO-26091");
  await screenshot("workflow-mobile");
  assert.equal(
    await evaluate("document.documentElement.scrollWidth <= window.innerWidth"),
    true,
    "No mobile page overflow",
  );
  assert.equal(errors.length, 0, JSON.stringify(errors));
  console.log("PASS: mobile width and zero uncaught browser exceptions");
} catch (error) {
  console.error("Browser state:", await evaluate("document.body.innerText.slice(-8000)"));
  console.error("Browser errors:", JSON.stringify(errors));
  await screenshot("workflow-failure");
  throw error;
} finally {
  socket.close();
}
