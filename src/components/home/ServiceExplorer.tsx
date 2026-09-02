import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Box,
  Clock3,
  FileCheck2,
  FlaskConical,
  Gauge,
  PenTool,
  Settings2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LABS, SERVICES } from "@/MOCK_DATA";

const icons = [FlaskConical, Gauge, PenTool, Settings2, FileCheck2, Users];
const categories = [
  "Materials Testing",
  "Calibration",
  "Design & Tooling",
  "Processing",
  "Inspection",
  "Consultancy",
];

export function ServiceExplorer() {
  const [active, setActive] = useState(categories[0]!);
  const service = useMemo(
    () => SERVICES.find((item) => item.category === active) ?? SERVICES[0]!,
    [active],
  );

  return (
    <section className="bg-[#f8f6f1] px-5 py-20 sm:px-6" id="services">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-blue-700 uppercase">
              Service discovery
            </p>
            <h2 className="mt-2 text-4xl font-bold text-[#0a2347]">What can you request?</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-600">
            Start with the capability you need. The request form captures the exact method, sample
            and delivery requirements.
          </p>
        </div>

        <div className="mt-10 grid overflow-hidden border-y border-slate-300 bg-white lg:grid-cols-[300px_1fr]">
          <nav className="border-b border-slate-200 p-3 lg:border-r lg:border-b-0">
            {categories.map((category, index) => {
              const Icon = icons[index]!;
              return (
                <button
                  key={category}
                  onClick={() => setActive(category)}
                  className={`flex w-full items-center gap-3 border-l-2 px-4 py-3.5 text-left text-sm font-semibold transition ${active === category ? "border-blue-600 bg-blue-50 text-blue-700" : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}
                >
                  <Icon className="size-4.5" /> {category} <ArrowRight className="ml-auto size-4" />
                </button>
              );
            })}
          </nav>

          <div className="p-6 md:p-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <span className="grid size-12 place-items-center rounded-full bg-blue-50 text-blue-700">
                  <Box className="size-5" />
                </span>
                <h3 className="mt-5 text-3xl font-bold text-[#0a2347]">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
              </div>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <span className="size-2 rounded-full bg-emerald-500" /> {service.availability}
              </span>
            </div>

            <dl className="mt-8 grid gap-6 border-y border-slate-200 py-6 md:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold text-slate-400 uppercase">Method</dt>
                <dd className="mt-2 text-sm font-semibold text-slate-800">{service.standard}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold text-slate-400 uppercase">
                  Sample requirement
                </dt>
                <dd className="mt-2 text-sm font-semibold text-slate-800">{service.sample}</dd>
              </div>
              <div>
                <dt className="flex items-center gap-1 text-xs font-semibold text-slate-400 uppercase">
                  <Clock3 className="size-3.5" /> Indicative turnaround
                </dt>
                <dd className="mt-2 text-sm font-semibold text-slate-800">{service.tat}</dd>
              </div>
            </dl>

            <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                Final scope and pricing are confirmed after request review.
              </p>
              <Link
                to="/booking/$labId/$serviceId"
                params={{ labId: LABS[0]!.id, serviceId: service.id }}
              >
                <Button>
                  Create request <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-300 py-4 text-xs text-slate-500">
          <span>Lucknow Centre • Demo availability updated today</span>
          <span>Product vision demo • Illustrative data</span>
        </div>
      </div>
    </section>
  );
}
