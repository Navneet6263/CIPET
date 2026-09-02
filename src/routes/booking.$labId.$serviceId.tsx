import { useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { RequestProgress } from "@/components/request/RequestProgress";
import { RequestSection } from "@/components/request/RequestFormSections";
import type { RequestDraft } from "@/components/request/RequestDraft";
import { RequestSummary } from "@/components/request/RequestSummary";
import { REQUEST_STEPS } from "@/components/request/requestSteps";
import { PdiRegistration } from "@/components/pdi/PdiRegistration";
import { LABS } from "@/MOCK_DATA";

const initialDraft: RequestDraft = {
  contact: "Amit Kumar",
  email: "amit@apexpolymers.com",
  company: "Apex Polymers Pvt. Ltd.",
  phone: "+91 98765 43210",
  purpose: "Quality assurance",
  method: "ASTM D638",
  material: "Thermoplastic specimen",
  quantity: "10",
  unit: "pcs",
  sampleForm: "Dog-bone",
  dimensions: "165 × 13 × 3 mm, conditioned",
  delivery: "Self-drop at centre",
  preferredDate: "2026-09-08",
  timeWindow: "09:30 AM – 11:30 AM",
  notes: "",
  files: ["product-specification.pdf"],
  agreed: false,
};

export const Route = createFileRoute("/booking/$labId/$serviceId")({
  loader: ({ params }) => {
    const lab = LABS.find((item) => item.id === params.labId);
    const service = lab?.services.find((item) => item.id === params.serviceId);
    if (!lab || !service) throw notFound();
    return { lab, service };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Create request — ${loaderData?.service.name ?? "ServiceFlow"}` }],
  }),
  component: BookingExperience,
});

function BookingExperience() {
  const { lab, service } = Route.useLoaderData();
  if (service.id === "pdi-registration") {
    return <PdiRegistration lab={lab} service={service} />;
  }
  return <RequestWizard />;
}

function RequestWizard() {
  const { lab, service } = Route.useLoaderData();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(initialDraft);
  const update = (patch: Partial<RequestDraft>) =>
    setDraft((current) => ({ ...current, ...patch }));
  const canContinue = [
    Boolean(draft.purpose && draft.method && draft.material && draft.quantity && draft.sampleForm),
    Boolean(draft.dimensions && draft.delivery),
    Boolean(draft.preferredDate && draft.timeWindow),
    true,
    draft.agreed,
  ][step];

  const next = () => {
    if (step < REQUEST_STEPS.length - 1) {
      setStep((value) => value + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    localStorage.setItem("cipet-demo-request", JSON.stringify(draft));
    navigate({ to: "/confirmation/$bookingId", params: { bookingId: "CIP-LKO-26091" } });
  };

  return (
    <PageShell>
      <div className="bg-[#f8f6f1] px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-[1380px]">
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700"
          >
            <ArrowLeft className="size-3.5" /> Back to services
          </Link>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-3xl font-bold text-[#0a2347] sm:text-4xl">
                Create service request
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Step {step + 1} of {REQUEST_STEPS.length} ·{" "}
                {step === 0
                  ? "Tell us what you need and confirm the selected service."
                  : `Complete ${REQUEST_STEPS[step].toLowerCase()} details.`}
              </p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              Draft saved
            </span>
          </div>

          <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
            <section className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,35,65,0.05)]">
              <RequestProgress step={step} service={service} />
              <div className="px-5 py-7 sm:px-7 sm:py-8">
                <RequestSection
                  step={step}
                  draft={draft}
                  update={update}
                  lab={lab}
                  service={service}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/50 px-5 py-4 sm:px-7">
                <Button
                  variant="outline"
                  onClick={() => {
                    localStorage.setItem("cipet-demo-request", JSON.stringify(draft));
                    toast.success("Draft saved");
                  }}
                >
                  <Save /> Save draft
                </Button>
                <div className="flex gap-2">
                  {step > 0 && (
                    <Button variant="ghost" onClick={() => setStep((value) => value - 1)}>
                      <ArrowLeft /> Back
                    </Button>
                  )}
                  <Button disabled={!canContinue} onClick={next}>
                    {step === REQUEST_STEPS.length - 1 ? (
                      <>
                        Submit request <Check />
                      </>
                    ) : (
                      <>
                        Continue to {REQUEST_STEPS[step + 1].toLowerCase()} <ArrowRight />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </section>
            <RequestSummary lab={lab} service={service} draft={draft} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
