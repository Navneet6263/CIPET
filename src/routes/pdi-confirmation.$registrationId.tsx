import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, CheckCircle2, Clock3, FileSearch, Mail } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pdi-confirmation/$registrationId")({
  head: () => ({ meta: [{ title: "Registration submitted — ServiceFlow" }] }),
  component: PdiConfirmation,
});

const stages = [
  { label: "Submitted", detail: "Application received", icon: Check, state: "done" },
  {
    label: "Completeness check",
    detail: "Within 1 working day",
    icon: FileSearch,
    state: "current",
  },
  {
    label: "Technical review",
    detail: "Product and standards mapping",
    icon: Clock3,
    state: "next",
  },
  { label: "Decision", detail: "Approval or clarification", icon: CheckCircle2, state: "next" },
] as const;

function PdiConfirmation() {
  const { registrationId } = Route.useParams();
  return (
    <PageShell>
      <div className="bg-[#f8f6f1] px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,35,65,0.08)]">
            <div className="border-b border-emerald-100 bg-emerald-50 px-6 py-8 text-center sm:px-10">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-200">
                <Check className="size-7" />
              </span>
              <p className="mt-4 text-xs font-bold tracking-wider text-emerald-700 uppercase">
                Registration received
              </p>
              <h1 className="mt-2 text-3xl font-bold text-[#0a2347]">Application submitted</h1>
              <p className="mt-2 text-sm text-slate-600">
                Your reference number is <strong>{registrationId}</strong>
              </p>
            </div>

            <div className="p-6 sm:p-10">
              <div className="grid gap-3 sm:grid-cols-4">
                {stages.map(({ label, detail, icon: Icon, state }, index) => (
                  <div key={label} className="relative rounded-md border border-slate-200 p-4">
                    <div
                      className={`grid size-8 place-items-center rounded-full ${
                        state === "done"
                          ? "bg-emerald-600 text-white"
                          : state === "current"
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Icon className="size-4" />
                    </div>
                    <p className="mt-3 text-xs font-bold text-[#0a2347]">
                      {index + 1}. {label}
                    </p>
                    <p className="mt-1 text-[11px] leading-4 text-slate-500">{detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-[1fr_0.7fr]">
                <section className="rounded-md border border-slate-200 p-5">
                  <h2 className="text-base font-bold text-[#0a2347]">Submitted scope</h2>
                  <dl className="mt-4 grid gap-4 text-xs sm:grid-cols-2">
                    {[
                      ["Manufacturing unit", "Apex Polymers Pvt. Ltd."],
                      ["Factory location", "Lucknow, Uttar Pradesh"],
                      ["Products", "1 product category"],
                      ["Applicable standards", "2 standards selected"],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-slate-400">{label}</dt>
                        <dd className="mt-1 font-semibold text-slate-700">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
                <section className="rounded-md border border-blue-100 bg-blue-50 p-5">
                  <Mail className="size-5 text-blue-700" />
                  <h2 className="mt-3 text-sm font-bold text-[#0a2347]">Updates by email</h2>
                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Status changes and clarification requests will be sent to the registered
                    contact.
                  </p>
                </section>
              </div>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Button variant="outline" asChild>
                  <Link to="/services">Browse services</Link>
                </Button>
                <Button asChild>
                  <Link to="/dashboard">
                    Go to dashboard <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
