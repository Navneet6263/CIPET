import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Download, Wrench } from "lucide-react";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AdminShell } from "@/components/PageShell";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Centre Performance — CIPET ServiceFlow" }] }),
  component: CentrePerformance,
});

const metrics = [
  ["Requests this month", "286", "+18% vs last month"],
  ["On-time reports", "94%", "+6 points"],
  ["Average TAT", "5.2 days", "−0.6 days"],
  ["Utilisation", "68%", "+6%"],
  ["Revenue MTD", "₹12,45,300", "+18%"],
];

const trend = [
  { day: "20 Tue", requests: 42, tat: 5 },
  { day: "21 Wed", requests: 55, tat: 6 },
  { day: "22 Thu", requests: 67, tat: 5.2 },
  { day: "23 Fri", requests: 43, tat: 4.6 },
  { day: "24 Sat", requests: 35, tat: 4 },
  { day: "25 Sun", requests: 26, tat: 3.2 },
  { day: "26 Mon", requests: 31, tat: 4.1 },
];

const services = [
  ["Materials Testing", "1,200", "812", "68%", "388", "42", "5.3", "+0.3"],
  ["Calibration", "600", "402", "67%", "198", "18", "3.8", "−0.2"],
  ["Tooling", "400", "276", "69%", "124", "14", "6.1", "+0.6"],
  ["Processing", "800", "556", "70%", "244", "26", "4.2", "+0.1"],
  ["Inspection", "500", "320", "64%", "180", "12", "2.9", "−0.4"],
  ["Consultancy", "300", "198", "66%", "102", "8", "2.7", "−0.3"],
];

const revenue = [
  ["Materials Testing", 41, "₹5,15,800"],
  ["Calibration", 19, "₹2,33,200"],
  ["Tooling", 16, "₹2,05,400"],
  ["Processing", 15, "₹1,80,700"],
  ["Inspection", 6, "₹70,200"],
  ["Consultancy", 3, "₹40,000"],
] as const;

const workload = services.map(([name], row) => ({
  name,
  values: Array.from({ length: 10 }, (_, column) => 10 + ((row * 11 + column * 7) % 65)),
}));

function CentrePerformance() {
  return (
    <AdminShell
      title="Centre Performance"
      description="Operations healthy · 3 SLA risks require attention"
      actions={
        <Button variant="outline" onClick={() => toast.success("Centre report exported")}>
          <Download /> Export report
        </Button>
      }
    >
      <section className="grid divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 xl:grid-cols-5">
        {metrics.map(([label, value, delta]) => (
          <div key={label} className="p-4">
            <p className="text-[11px] text-slate-500">{label}</p>
            <p className="mt-1 text-xl font-bold text-[#0a2347]">{value}</p>
            <p className="mt-1 text-[10px] font-semibold text-emerald-600">{delta}</p>
          </div>
        ))}
      </section>

      <div className="mt-5 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-[#0a2347]">
                  Request volume & turnaround trend
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Weekly operational demand and average TAT
                </p>
              </div>
              <div className="flex rounded-md border border-slate-200 p-1 text-[10px]">
                <span className="px-3 py-1 text-slate-500">Daily</span>
                <span className="rounded bg-blue-50 px-3 py-1 font-semibold text-blue-700">
                  Weekly
                </span>
                <span className="px-3 py-1 text-slate-500">Monthly</span>
              </div>
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={trend}>
                  <CartesianGrid stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar
                    dataKey="requests"
                    fill="#2563eb"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={false}
                  />
                  <Line
                    dataKey="tat"
                    stroke="#22a3dd"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    isAnimationActive={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="text-base font-bold text-[#0a2347]">Service capacity planning</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-xs">
                <thead className="bg-slate-50 text-[10px] text-slate-400">
                  <tr>
                    {[
                      "Service",
                      "Monthly capacity",
                      "Booked",
                      "Utilisation",
                      "Available",
                      "Backlog",
                      "Avg TAT",
                      "Vs target",
                    ].map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {services.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, index) => (
                        <td
                          key={`${row[0]}-${index}`}
                          className={`px-4 py-3 ${index === 0 ? "font-semibold text-[#0a2347]" : index === 7 && String(cell).startsWith("+") ? "text-red-500" : index === 7 ? "text-emerald-600" : "text-slate-600"}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="border-b border-slate-200 px-5 py-4">
              <h2 className="text-base font-bold text-[#0a2347]">Upcoming workload</h2>
            </div>
            <div className="overflow-x-auto p-4">
              <div className="min-w-[760px] space-y-2 text-[10px]">
                <div className="grid grid-cols-[140px_repeat(10,1fr)] gap-2 text-center text-slate-400">
                  <span />
                  <span>Tue 2</span>
                  <span>Wed 3</span>
                  <span>Thu 4</span>
                  <span>Fri 5</span>
                  <span>Sat 6</span>
                  <span>Mon 8</span>
                  <span>Tue 9</span>
                  <span>Wed 10</span>
                  <span>Thu 11</span>
                  <span>Fri 12</span>
                </div>
                {workload.map((row) => (
                  <div
                    key={row.name}
                    className="grid grid-cols-[140px_repeat(10,1fr)] items-center gap-2"
                  >
                    <strong className="text-slate-600">{row.name}</strong>
                    {row.values.map((value, index) => (
                      <span
                        key={index}
                        className={`rounded px-2 py-1 text-center font-semibold ${value > 55 ? "bg-red-50 text-red-600" : value > 35 ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <aside className="min-w-0 space-y-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-base font-bold text-[#0a2347]">Equipment utilisation</h2>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[72, 64, 58, 48].map((value, index) => (
                <div key={value} className="text-center">
                  <span
                    className="mx-auto grid size-14 place-items-center rounded-full text-xs font-bold text-[#0a2347]"
                    style={{
                      background: `radial-gradient(circle at center, white 58%, transparent 60%), conic-gradient(#2563eb ${value}%, #e2e8f0 0)`,
                    }}
                  >
                    {value}%
                  </span>
                  <span className="mt-2 block text-[9px] text-slate-500">
                    {["Universal", "FTIR", "MFI", "Impact"][index]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-base font-bold text-[#0a2347]">Revenue by service</h2>
            <p className="mt-1 text-xl font-bold text-[#0a2347]">₹12,45,300</p>
            <ul className="mt-4 space-y-3 text-[10px]">
              {revenue.map(([name, percent, amount]) => (
                <li key={name} className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-2">
                  <span className="truncate text-slate-600">{name}</span>
                  <span className="font-semibold text-slate-500">{amount}</span>
                  <span className="col-span-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <span
                      className="block h-full rounded-full bg-blue-600"
                      style={{ width: `${percent}%` }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-base font-bold text-[#0a2347]">SLA risks</h2>
            <ul className="mt-3 divide-y divide-slate-100 text-xs">
              {[
                "CIP-LKO-26074 · overdue",
                "CIP-LKO-26061 · overdue",
                "CIP-LKO-26062 · due today",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 py-3 text-slate-600">
                  <AlertTriangle className="size-4 text-red-500" /> {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5">
            <h2 className="text-base font-bold text-[#0a2347]">Actions for this week</h2>
            <ul className="mt-3 divide-y divide-slate-100 text-xs">
              {[
                [AlertTriangle, "Review SLA risks"],
                [CheckCircle2, "Balance testing capacity"],
                [Wrench, "Check equipment alerts"],
              ].map(([Icon, text]) => {
                const ItemIcon = Icon as typeof AlertTriangle;
                return (
                  <li key={String(text)} className="flex items-center gap-2 py-3 text-slate-600">
                    <ItemIcon className="size-4 text-blue-700" />
                    {String(text)}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="ml-auto h-7 text-[10px]"
                      onClick={() => toast.success(`${String(text)} opened`)}
                    >
                      Review
                    </Button>
                  </li>
                );
              })}
            </ul>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}
