import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Building2, CheckCircle2, Download, RefreshCw } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AdminShell } from "@/components/PageShell";
import { EQUIPMENT_STATUS, TODAY_APPOINTMENTS } from "@/MOCK_DATA";

import { useDemoAppointments, useWorkflows } from "@/lib/workflow-store";
import { PDI_REGISTRATIONS } from "@/data/registrations";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Lucknow Operations — CIPET ServiceFlow" }] }),
  component: AdminDashboard,
});

const metrics = [
  ["Pending requests", "48", "+12 vs last 7 days", "text-blue-700"],
  ["Average TAT", "5.2 days", "−0.6 vs last 7 days", "text-emerald-600"],
  ["Lab utilisation", "68%", "+6% vs last 7 days", "text-emerald-600"],
  ["Revenue MTD", "₹12,45,300", "+18% vs last month", "text-emerald-600"],
];

const turnaround = [
  { day: "Mon", current: 4, previous: 6.8 },
  { day: "Tue", current: 5.2, previous: 4 },
  { day: "Wed", current: 6.7, previous: 7.8 },
  { day: "Thu", current: 4.1, previous: 6.8 },
  { day: "Fri", current: 8, previous: 9.6 },
  { day: "Sat", current: 5.1, previous: 6.8 },
  { day: "Sun", current: 6.6, previous: 5.2 },
];

const activities = [
  ["Report published for CIP-LKO-26093", "Today, 10:34 AM"],
  ["Sample received for CIP-LKO-26097", "Today, 09:45 AM"],
  ["Invoice generated for CIP-LKO-26091", "Yesterday, 04:21 PM"],
  ["Equipment maintenance scheduled", "Yesterday, 11:00 AM"],
];

function AdminDashboard() {
  const appointments = useDemoAppointments();
  const workflows = useWorkflows();
  const pendingPdi = PDI_REGISTRATIONS.filter(
    (item) => workflows[item.id]!.stage !== "Approved",
  ).length;
  return (
    <AdminShell
      title="Lucknow Operations"
      description="Executive overview of centre performance and daily operations."
      actions={
        <>
          <Button variant="outline" onClick={() => toast.success("Operations report downloaded")}>
            <Download /> Export report
          </Button>
          <Button onClick={() => toast.success("Dashboard refreshed")}>
            <RefreshCw /> Refresh
          </Button>
        </>
      }
    >
      <section className="grid divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-4">
        {metrics.map(([label, value, delta, tone]) => (
          <div key={label} className="p-5">
            <p className="text-xs font-medium text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-bold text-[#0a2347]">
              {label === "Pending requests"
                ? appointments.filter((item) => !["Closed", "Cancelled"].includes(item.stage))
                    .length
                : value}
            </p>
            <p className={`mt-2 text-[11px] font-semibold ${tone}`}>{delta}</p>
          </div>
        ))}
      </section>

      <Link
        to="/admin/registrations"
        className="mt-5 flex flex-wrap items-center gap-4 rounded-lg border border-blue-100 bg-blue-50 px-5 py-4 transition hover:border-blue-300"
      >
        <span className="grid size-10 place-items-center rounded-md bg-blue-600 text-white">
          <Building2 className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <strong className="block text-sm text-[#0a2347]">
            {pendingPdi} PDI registrations need attention
          </strong>
          <span className="mt-1 block text-xs text-slate-500">
            Review company details, product standards and certification evidence.
          </span>
        </span>
        <span className="text-xs font-bold text-blue-700">Open registration queue →</span>
      </Link>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.65fr_0.75fr]">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="text-base font-bold text-[#0a2347]">Sample queue</h2>
            <Link to="/admin/samples" className="text-xs font-semibold text-blue-700">
              View all requests →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-xs">
              <thead className="bg-slate-50 text-[10px] tracking-wide text-slate-400 uppercase">
                <tr>
                  {[
                    "Request ID",
                    "Client",
                    "Service",
                    "Received",
                    "Current stage",
                    "TAT",
                    "Owner",
                  ].map((heading) => (
                    <th key={heading} className="px-4 py-3 font-semibold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.slice(0, 7).map((item, index) => (
                  <tr key={item.sampleId} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-[#0a2347]">
                      <Link to="/admin/appointments">{item.id}</Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.customer}</td>
                    <td className="px-4 py-3 text-slate-600">{item.service}</td>
                    <td className="px-4 py-3 text-slate-500">01 Sep</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 font-semibold ${index < 2 ? "bg-blue-50 text-blue-700" : index < 4 ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}
                      >
                        {item.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {index < 2 ? "3–5 days" : "2 days"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.technician}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-base font-bold text-[#0a2347]">Turnaround time</h2>
            <p className="mt-1 text-xs text-slate-500">Current week compared with previous week</p>
            <div className="mt-4 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={turnaround}>
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar
                    dataKey="current"
                    fill="#2563eb"
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={false}
                  />
                  <Bar
                    dataKey="previous"
                    fill="#cbd5e1"
                    radius={[3, 3, 0, 0]}
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex justify-between">
              <h2 className="text-base font-bold text-[#0a2347]">SLA alerts</h2>
              <span className="text-xs font-semibold text-blue-700">View all</span>
            </div>
            <ul className="mt-4 divide-y divide-slate-100 text-xs">
              {[
                "CIP-LKO-26092 · due in 1 day",
                "CIP-LKO-26096 · overdue",
                "CIP-LKO-26097 · due in 2 days",
              ].map((alert, index) => (
                <li key={alert} className="flex items-center gap-2 py-3 text-slate-600">
                  <AlertTriangle
                    className={`size-4 ${index === 1 ? "text-red-500" : "text-amber-500"}`}
                  />
                  {alert}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-base font-bold text-[#0a2347]">Equipment status</h2>
          <ul className="mt-3 divide-y divide-slate-100 text-xs">
            {EQUIPMENT_STATUS.slice(0, 5).map((item) => (
              <li key={item.id} className="flex justify-between gap-3 py-3">
                <span className="text-slate-600">{item.name}</span>
                <span
                  className={item.status === "Operational" ? "text-emerald-600" : "text-amber-600"}
                >
                  {item.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-base font-bold text-[#0a2347]">Recent activity</h2>
          <ul className="mt-3 divide-y divide-slate-100 text-xs">
            {activities.map(([activity, time]) => (
              <li key={activity} className="flex gap-3 py-3">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                <span className="text-slate-600">
                  {activity}
                  <small className="mt-1 block text-slate-400">{time}</small>
                </span>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <h2 className="text-base font-bold text-[#0a2347]">Reports awaiting review</h2>
          <ul className="mt-3 divide-y divide-slate-100 text-xs">
            {TODAY_APPOINTMENTS.slice(2, 7).map((item, index) => (
              <li key={item.sampleId} className="flex justify-between gap-3 py-3">
                <span>
                  <strong className="block text-[#0a2347]">REP-LKO-{26012 - index}</strong>
                  <span className="text-slate-500">{item.service}</span>
                </span>
                <span className="text-slate-500">{item.technician}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
