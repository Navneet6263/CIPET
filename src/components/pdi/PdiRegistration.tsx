import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Save,
} from "lucide-react";
import { toast } from "sonner";
import type { Lab, LabService } from "@/data/types";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { PDI_STEPS, emptyAddress, emptyPerson, type PdiDraft } from "@/components/pdi/PdiDraft";
import { PdiApplicantUnit } from "@/components/pdi/PdiApplicantUnit";
import { PdiPeopleProducts } from "@/components/pdi/PdiPeopleProducts";
import { PdiFinalize } from "@/components/pdi/PdiFinalize";

const initialDraft: PdiDraft = {
  applicant: {
    name: "Amit Kumar",
    designation: "Quality Manager",
    contact: "+91 98765 43210",
    email: "amit@apexpolymers.com",
  },
  unitName: "Apex Polymers Pvt. Ltd.",
  establishmentYear: "2010–2019",
  factory: {
    line1: "Plot 42, Industrial Area",
    line2: "Amausi",
    city: "Lucknow",
    district: "Lucknow",
    state: "Uttar Pradesh",
    pin: "226008",
  },
  corporate: { ...emptyAddress },
  registered: { ...emptyAddress },
  corporateSame: true,
  registeredSame: true,
  authority: {
    name: "Rajiv Mehra",
    designation: "Director",
    contact: "+91 98765 43001",
    email: "rajiv@apexpolymers.com",
    website: "https://apexpolymers.example",
  },
  qualityHead: { ...emptyPerson },
  plantHead: { ...emptyPerson },
  businessHead: { ...emptyPerson },
  products: [
    {
      id: 1,
      name: "Pipe Fittings",
      standards: ["IS 9523", "IS 10124"],
      capacity: "2,500",
      unit: "Tonnes / year",
    },
  ],
  turnover: "0–5 Crore",
  iso9001: "Yes",
  previousInspection: "No",
  certification: "",
  agreed: false,
};

function StepProgress({ step }: { step: number }) {
  return (
    <div className="border-b border-slate-200 bg-slate-50 px-5 py-5 sm:px-7">
      <div className="flex items-start justify-between gap-1">
        {PDI_STEPS.map((label, index) => (
          <div
            key={label}
            className="relative flex min-w-0 flex-1 flex-col items-center text-center"
          >
            {index > 0 && (
              <span
                className={`absolute top-3 right-1/2 h-px w-full ${index <= step ? "bg-blue-600" : "bg-slate-200"}`}
              />
            )}
            <span
              className={`relative z-10 grid size-7 place-items-center rounded-full border text-[10px] font-bold ${
                index < step
                  ? "border-blue-600 bg-blue-600 text-white"
                  : index === step
                    ? "border-blue-600 bg-white text-blue-700 ring-4 ring-blue-100"
                    : "border-slate-300 bg-white text-slate-400"
              }`}
            >
              {index < step ? <Check className="size-3.5" /> : index + 1}
            </span>
            <span
              className={`mt-2 hidden truncate text-[10px] font-semibold sm:block ${index === step ? "text-blue-700" : "text-slate-400"}`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Summary({ lab, draft }: { lab: Lab; draft: PdiDraft }) {
  const standards = new Set(draft.products.flatMap((product) => product.standards)).size;
  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-[#0a2347] px-5 py-4 text-white">
          <p className="text-[10px] font-bold tracking-wider text-cyan-300 uppercase">
            Registration scope
          </p>
          <h2 className="mt-1 text-base font-bold">Manufacturer / Industry</h2>
        </div>
        <dl className="divide-y divide-slate-100 px-5 text-xs">
          <div className="py-4">
            <dt className="text-slate-400">Review centre</dt>
            <dd className="mt-1 font-semibold text-[#0a2347]">{lab.shortName}</dd>
          </div>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <dt className="text-slate-400">Products</dt>
              <dd className="mt-1 text-lg font-bold text-[#0a2347]">{draft.products.length}</dd>
            </div>
            <div>
              <dt className="text-slate-400">Standards</dt>
              <dd className="mt-1 text-lg font-bold text-[#0a2347]">{standards}</dd>
            </div>
          </div>
          <div className="py-4">
            <dt className="text-slate-400">Expected review time</dt>
            <dd className="mt-1 font-semibold text-[#0a2347]">3–5 working days</dd>
          </div>
          <div className="py-4">
            <dt className="text-slate-400">Registration fee</dt>
            <dd className="mt-1 font-semibold text-emerald-700">No fee in this demo</dd>
          </div>
        </dl>
      </section>
      <section className="rounded-lg border border-blue-100 bg-blue-50 p-5">
        <div className="flex gap-3">
          <ClipboardCheck className="size-5 shrink-0 text-blue-700" />
          <div>
            <p className="text-xs font-bold text-[#0a2347]">What happens next?</p>
            <p className="mt-1 text-[11px] leading-5 text-slate-600">
              The admin team checks completeness, maps the product scope and requests clarification
              if required.
            </p>
          </div>
        </div>
      </section>
    </aside>
  );
}

export function PdiRegistration({ lab, service }: { lab: Lab; service: LabService }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(initialDraft);
  const update = (patch: Partial<PdiDraft>) => setDraft((current) => ({ ...current, ...patch }));
  const productsReady = draft.products.every(
    (product) => product.name && product.standards.length && product.capacity,
  );
  const canContinue = [
    Boolean(draft.applicant.name && draft.applicant.contact && draft.applicant.email),
    Boolean(draft.unitName && draft.factory.line1 && draft.factory.city && draft.factory.pin),
    Boolean(draft.authority.name && draft.authority.contact),
    productsReady,
    Boolean(draft.turnover && draft.iso9001 && draft.previousInspection),
    draft.agreed,
  ][step];

  const save = () => {
    localStorage.setItem("pdi-registration-draft", JSON.stringify(draft));
    toast.success("Registration draft saved");
  };
  const next = () => {
    if (step < PDI_STEPS.length - 1) {
      setStep((value) => value + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    localStorage.setItem("pdi-registration-submitted", JSON.stringify(draft));
    navigate({
      to: "/pdi-confirmation/$registrationId",
      params: { registrationId: "PDI-LKO-26018" },
    });
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
          <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold tracking-wider text-blue-700 uppercase">
                <Building2 className="size-4" /> Industry onboarding
              </p>
              <h1 className="mt-2 text-3xl font-bold text-[#0a2347] sm:text-4xl">{service.name}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                One guided application for company details, manufacturing locations, key personnel,
                products and standards.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <FileCheck2 className="size-3.5" /> Mock registration
            </span>
          </div>

          <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_310px]">
            <section className="min-w-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,35,65,0.05)]">
              <StepProgress step={step} />
              <div className="px-5 py-7 sm:px-7 sm:py-8">
                {step <= 1 && <PdiApplicantUnit step={step} draft={draft} update={update} />}
                {step >= 2 && step <= 3 && (
                  <PdiPeopleProducts step={step} draft={draft} update={update} />
                )}
                {step >= 4 && <PdiFinalize step={step} draft={draft} update={update} />}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50/60 px-5 py-4 sm:px-7">
                <Button variant="outline" onClick={save}>
                  <Save /> Save draft
                </Button>
                <div className="flex gap-2">
                  {step > 0 && (
                    <Button variant="ghost" onClick={() => setStep((value) => value - 1)}>
                      <ArrowLeft /> Back
                    </Button>
                  )}
                  <Button disabled={!canContinue} onClick={next}>
                    {step === PDI_STEPS.length - 1 ? (
                      <>
                        Submit registration <CheckCircle2 />
                      </>
                    ) : (
                      <>
                        Continue <ArrowRight />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </section>
            <Summary lab={lab} draft={draft} />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
