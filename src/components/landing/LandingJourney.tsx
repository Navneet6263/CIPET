import {
  ArrowRight,
  BellRing,
  Check,
  ClipboardCheck,
  CreditCard,
  FileCheck2,
  FileText,
  PackageCheck,
} from "lucide-react";

const stages = [
  ["Select service", "Choose the required capability.", "Immediate"],
  ["Submit requirement", "Share details and documents.", "Within 1 working day"],
  ["Plan sample", "Confirm quantity and logistics.", "1–2 days"],
  ["Testing", "Testing follows selected standards.", "3–7 days"],
  ["Technical review", "Results are checked and approved.", "Within 1 day"],
  ["Report ready", "Verified report is released.", "Same-day release"],
  ["Billing & close", "Invoice, receipt and closure.", "Same-day close"],
];

const followUps = [
  [ClipboardCheck, "Requirement review", "The centre checks scope and requests any clarification."],
  [FileText, "Quotation confirmation", "You receive scope, timeline and applicable charges."],
  [PackageCheck, "Sample instructions", "Handover, quantity and packing guidance is shared."],
  [BellRing, "Automatic updates", "Milestone updates continue through report and billing."],
];

const payment = ["Quotation", "Approval", "Invoice", "UPI / Card / Bank", "Receipt"];

export function LandingJourney() {
  return (
    <section id="journey" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6">
        <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
          How the service journey works
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-bold text-[#0a2347] sm:text-4xl">
          A clear, connected workflow with defined timelines.
        </h2>

        <ol className="mt-10 grid gap-0 md:grid-cols-7">
          {stages.map(([title, detail, time], index) => (
            <li key={title} className="relative flex gap-4 pb-7 md:block md:pb-0">
              {index < stages.length - 1 && (
                <span
                  className={`absolute top-10 bottom-0 left-5 w-px md:top-5 md:bottom-auto md:left-1/2 md:h-px md:w-full ${index < 3 ? "bg-emerald-500" : "bg-slate-300"}`}
                />
              )}
              <span
                className={`relative z-10 grid size-10 shrink-0 place-items-center rounded-full border-2 text-xs font-bold md:mx-auto ${index < 3 ? "border-emerald-500 bg-white text-emerald-600" : index === 3 ? "border-blue-600 bg-blue-600 text-white shadow-glow" : "border-slate-300 bg-white text-slate-400"}`}
              >
                {index < 3 ? <Check className="size-4" /> : index + 1}
              </span>
              <div className="md:px-2 md:text-center">
                <h3
                  className={`mt-2 text-sm font-bold ${index === 3 ? "text-blue-700" : "text-[#0a2347]"}`}
                >
                  {title}
                </h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{detail}</p>
                <p className="mt-3 text-[11px] font-bold text-emerald-600">{time}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-20 border-t border-slate-200 pt-16">
          <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
            What happens after you submit
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0a2347]">
            We keep you informed at every step.
          </h2>
          <div className="mt-9 grid gap-8 md:grid-cols-4">
            {followUps.map(([Icon, title, text]) => {
              const ItemIcon = Icon as typeof ClipboardCheck;
              return (
                <article
                  key={String(title)}
                  className="border-l border-slate-200 pl-5 first:border-l-0 first:pl-0"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-blue-50 text-blue-700">
                    <ItemIcon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-base font-bold text-[#0a2347]">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{String(text)}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div
          id="payment"
          className="mt-14 rounded-xl border border-slate-200 bg-[#f8fafc] px-5 py-6"
        >
          <p className="text-[11px] font-bold tracking-[0.14em] text-blue-700 uppercase">
            Demo payment journey · shown after service review
          </p>
          <ol className="mt-5 grid gap-4 sm:grid-cols-5">
            {payment.map((step, index) => (
              <li key={step} className="relative flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-blue-200 bg-white text-blue-700">
                  {index === 4 ? (
                    <FileCheck2 className="size-4" />
                  ) : index === 3 ? (
                    <CreditCard className="size-4" />
                  ) : (
                    index + 1
                  )}
                </span>
                <span className="text-xs font-bold text-[#0a2347]">{step}</span>
                {index < payment.length - 1 && (
                  <ArrowRight className="ml-auto hidden size-4 text-slate-300 sm:block" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
