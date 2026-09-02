import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock3, Mail, MapPin, Phone, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { ServiceTable } from "@/components/ServiceTable";
import { LABS } from "@/MOCK_DATA";

export const Route = createFileRoute("/lab/$id")({
  loader: ({ params }) => {
    const lab = LABS.find((item) => item.id === params.id);
    if (!lab) throw notFound();
    return { lab };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.lab.shortName ?? "Lucknow centre"} — Service capabilities` }],
  }),
  component: CentreDetail,
});

function CentreDetail() {
  const { lab } = Route.useLoaderData();

  return (
    <PageShell>
      <section className="border-b border-slate-200 bg-[#f8f6f1] px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700"
          >
            <ArrowLeft className="size-4" /> Back to services
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] text-cyan-700 uppercase">
                Lucknow industry services
              </p>
              <h1 className="mt-3 max-w-3xl text-5xl leading-tight font-bold text-[#0a2347]">
                {lab.name}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">{lab.about}</p>
            </div>
            <div className="border-l border-slate-300 pl-6 text-sm text-slate-600">
              <p className="flex gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-blue-700" /> {lab.address}
              </p>
              <p className="mt-3 flex gap-2">
                <Phone className="size-4 shrink-0 text-blue-700" /> {lab.phone}
              </p>
              <p className="mt-3 flex gap-2">
                <Mail className="size-4 shrink-0 text-blue-700" /> {lab.email}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_.8fr]">
            <div>
              <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
                Available capabilities
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#0a2347]">Services you can request</h2>
              <div className="mt-7">
                <ServiceTable lab={lab} />
              </div>
            </div>
            <aside className="border-t border-slate-300 pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <h2 className="text-2xl font-bold text-[#0a2347]">Centre snapshot</h2>
              <dl className="mt-6 grid grid-cols-2 gap-5 border-y border-slate-200 py-6">
                <div>
                  <dt className="text-xs text-slate-500">Average turnaround</dt>
                  <dd className="mt-1 text-2xl font-bold text-[#0a2347]">{lab.avgTat} days</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Current utilisation</dt>
                  <dd className="mt-1 text-2xl font-bold text-[#0a2347]">{lab.utilization}%</dd>
                </div>
              </dl>
              <h3 className="mt-7 flex items-center gap-2 font-bold text-[#0a2347]">
                <Settings2 className="size-4 text-blue-700" /> Key equipment
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {lab.equipment.map((item) => (
                  <li key={item} className="border-b border-slate-100 pb-2">
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="mt-7 flex items-center gap-2 font-bold text-[#0a2347]">
                <Clock3 className="size-4 text-blue-700" /> Demo availability
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Requests are reviewed before a sample slot and final delivery date are confirmed.
              </p>
            </aside>
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-y border-slate-300 py-7">
            <div>
              <p className="text-xl font-bold text-[#0a2347]">Ready to define your requirement?</p>
              <p className="mt-1 text-sm text-slate-600">Start with a guided service request.</p>
            </div>
            <Link
              to="/booking/$labId/$serviceId"
              params={{ labId: lab.id, serviceId: lab.services[0]!.id }}
            >
              <Button size="lg">
                Create request <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
