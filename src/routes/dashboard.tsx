import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  CalendarCheck,
  FileCheck2,
  IndianRupee,
  Plus,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { StatusBadge } from "@/components/StatusBadge";
import { NOTIFICATIONS, SAVED_LABS, USER_PROFILE, formatINR } from "@/MOCK_DATA";

import { useDemoBookings } from "@/lib/workflow-store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Customer workspace — ServiceFlow" }] }),
  component: Dashboard,
});

function Dashboard() {
  const BOOKINGS = useDemoBookings();
  const active = BOOKINGS.filter((booking) => !["completed", "cancelled"].includes(booking.status));
  const spend = BOOKINGS.reduce((total, booking) => total + booking.total, 0);
  const metrics = [
    ["Active requests", String(active.length), "+1 this week", CalendarCheck],
    ["Reports received", "12", "+3 this month", FileCheck2],
    ["Total spend", formatINR(spend), "FY 2026–27", IndianRupee],
    ["On-time delivery", "96%", "+4 points", TrendingUp],
  ] as const;

  return (
    <PageShell>
      <div className="bg-[#f8f6f1] px-4 py-9 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-blue-700 uppercase">
                Customer workspace
              </p>
              <h1 className="mt-2 text-3xl font-bold text-[#0a2347]">
                Good afternoon, {USER_PROFILE.name.split(" ")[0]}
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Monitor requests, respond to actions and access completed reports.
              </p>
            </div>
            <div className="flex gap-2">
              <Link to="/notifications">
                <Button variant="outline">
                  <Bell /> Updates
                </Button>
              </Link>
              <Link to="/services">
                <Button>
                  <Plus /> New request
                </Button>
              </Link>
            </div>
          </div>

          <section className="mt-7 grid divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {metrics.map(([label, value, note, Icon]) => (
              <div key={label} className="flex items-start gap-3 p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-md bg-blue-50 text-blue-700">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-[10px] text-slate-400">{label}</p>
                  <p className="mt-1 text-lg font-bold text-[#0a2347]">{value}</p>
                  <p className="mt-1 text-[10px] font-semibold text-emerald-600">{note}</p>
                </div>
              </div>
            ))}
          </section>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
            <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
                <div>
                  <h2 className="text-lg font-bold text-[#0a2347]">Active requests</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Work currently moving through the service flow
                  </p>
                </div>
                <Link to="/bookings-history" className="text-xs font-semibold text-blue-700">
                  View all
                </Link>
              </div>
              <div className="divide-y divide-slate-100">
                {active.map((booking) => (
                  <article
                    key={booking.id}
                    className="grid gap-4 px-5 py-4 transition hover:bg-slate-50 sm:grid-cols-[minmax(0,1fr)_130px_auto] sm:items-center"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="truncate text-sm font-bold text-[#0a2347]">
                          {booking.serviceName}
                        </p>
                        <StatusBadge status={booking.status} />
                      </div>
                      <p className="mt-1 text-[10px] text-slate-500">
                        {booking.id} · {booking.sampleId} · {booking.labName}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">Next update</p>
                      <p className="mt-1 text-xs font-semibold text-slate-700">{booking.date}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      {!booking.paid && (
                        <Link to="/payment/$bookingId" params={{ bookingId: booking.id }}>
                          <Button size="sm" variant="outline">
                            Pay
                          </Button>
                        </Link>
                      )}
                      <Link to="/tracking/$bookingId" params={{ bookingId: booking.id }}>
                        <Button size="sm">
                          Track <ArrowRight />
                        </Button>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <aside className="space-y-5">
              <section className="rounded-lg border border-slate-200 bg-white">
                <div className="border-b border-slate-200 px-4 py-4">
                  <h2 className="text-base font-bold text-[#0a2347]">Latest updates</h2>
                </div>
                <ul className="divide-y divide-slate-100 px-4">
                  {NOTIFICATIONS.slice(0, 4).map((item) => (
                    <li key={item.id} className="py-3">
                      <div className="flex items-start gap-2">
                        <span
                          className={`mt-1 size-2 shrink-0 rounded-full ${item.unread ? "bg-blue-600" : "bg-slate-300"}`}
                        />
                        <div>
                          <p className="text-xs font-semibold text-[#0a2347]">{item.title}</p>
                          <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-slate-500">
                            {item.body}
                          </p>
                          <p className="mt-1 text-[9px] text-slate-400">{item.time}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/notifications"
                  className="block border-t border-slate-200 px-4 py-3 text-xs font-semibold text-blue-700"
                >
                  View notification centre
                </Link>
              </section>
              <section className="rounded-lg border border-blue-100 bg-blue-50/50 p-4">
                <p className="text-[10px] font-bold tracking-[0.12em] text-blue-700 uppercase">
                  Primary service centre
                </p>
                <h3 className="mt-2 text-base font-bold text-[#0a2347]">
                  {SAVED_LABS[0]?.shortName}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{SAVED_LABS[0]?.address}</p>
                <Link
                  to="/lab/$id"
                  params={{ id: SAVED_LABS[0]!.id }}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700"
                >
                  View capabilities <ArrowRight className="size-3" />
                </Link>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
