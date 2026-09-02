import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock3, FileCheck2, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageShell } from "@/components/PageShell";
import { formatINR, LABS, SERVICES, SERVICE_CATEGORIES } from "@/MOCK_DATA";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "Service catalogue — ServiceFlow" }] }),
  component: ServicesPage,
});

const requestFlow = ["Choose a service", "Share requirement", "Receive scope & quotation"];

function ServicesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Services");
  const services = useMemo(
    () =>
      SERVICES.filter(
        (service) =>
          (category === "All Services" || service.category === category) &&
          `${service.name} ${service.description} ${service.standard}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [category, query],
  );

  return (
    <PageShell>
      <section className="border-b border-slate-200 bg-[#f8f6f1] px-5 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-end">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-blue-700 uppercase">
              Service catalogue · Lucknow Centre
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold text-[#0a2347] sm:text-5xl">
              What would you like us to help with?
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              Compare capabilities, methods and turnaround times, then begin a guided request with
              the selected service already added.
            </p>
          </div>
          <div className="border-l border-slate-300 pl-6">
            <p className="text-[10px] font-bold tracking-[0.14em] text-slate-400 uppercase">
              From requirement to approved scope
            </p>
            <ol className="mt-4 grid grid-cols-3 gap-3">
              {requestFlow.map((label, index) => (
                <li key={label} className="relative">
                  <span className="grid size-6 place-items-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="mt-2 block text-[10px] font-semibold leading-4 text-[#0a2347]">
                    {label}
                  </span>
                  {index < requestFlow.length - 1 && (
                    <ArrowRight className="absolute top-1 right-0 size-3.5 text-slate-300" />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by service, testing method or standard"
                className="h-12 border-slate-300 bg-slate-50 pr-4 pl-11 shadow-none focus:bg-white"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <SlidersHorizontal className="mr-1 size-4 shrink-0 text-slate-400" />
              {SERVICE_CATEGORIES.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`shrink-0 rounded-full border px-3 py-2 text-xs font-semibold transition ${category === item ? "border-[#0a2347] bg-[#0a2347] text-white" : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-700"}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-[#0a2347]">
                {category === "All Services" ? "Available capabilities" : category}
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {services.length} {services.length === 1 ? "service" : "services"} available for
                request
              </p>
            </div>
            <span className="hidden text-[10px] text-slate-400 sm:block">
              Indicative fee and turnaround · Final scope after review
            </span>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                className="group flex min-w-0 flex-col rounded-lg border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_12px_30px_rgba(15,35,65,0.08)] sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.12em] text-blue-700 uppercase">
                      {service.category}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-[#0a2347]">{service.name}</h3>
                  </div>
                  <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    {service.availability}
                  </span>
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-600">{service.description}</p>

                <dl className="mt-5 grid gap-4 border-y border-slate-100 py-4 sm:grid-cols-3">
                  <div>
                    <dt className="flex items-center gap-1 text-[10px] text-slate-400">
                      <FileCheck2 className="size-3" /> Method
                    </dt>
                    <dd className="mt-1 text-xs font-semibold text-[#0a2347]">
                      {service.standard}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Clock3 className="size-3" /> Turnaround
                    </dt>
                    <dd className="mt-1 text-xs font-semibold text-[#0a2347]">{service.tat}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] text-slate-400">Indicative fee</dt>
                    <dd className="mt-1 text-sm font-bold text-blue-700">
                      {service.price === 0 ? "No registration fee" : formatINR(service.price)}
                    </dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <p className="flex min-w-0 items-start gap-2 text-[10px] leading-4 text-slate-500">
                    <Check className="mt-0.5 size-3 shrink-0 text-emerald-600" />
                    <span className="line-clamp-2">Sample guidance: {service.sample}</span>
                  </p>
                  <Link
                    to="/booking/$labId/$serviceId"
                    params={{ labId: LABS[0]!.id, serviceId: service.id }}
                  >
                    <Button className="group-hover:bg-blue-700">
                      Select service <ArrowRight />
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {services.length === 0 && (
            <div className="py-20 text-center">
              <Search className="mx-auto size-7 text-slate-300" />
              <p className="mt-3 text-sm font-semibold text-[#0a2347]">No matching service found</p>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All Services");
                }}
                className="mt-2 text-xs font-semibold text-blue-700"
              >
                Clear search and filters
              </button>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
