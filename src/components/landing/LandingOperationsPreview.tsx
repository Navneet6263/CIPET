import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BellRing,
  ChartNoAxesCombined,
  FlaskConical,
  Gauge,
  Wrench,
} from "lucide-react";

const queue = [
  ["REQ-LKO-26091", "Apex Polymers", "Tensile testing", "Testing", "3–5 days"],
  ["REQ-LKO-26092", "Nova Components", "Melt flow index", "Testing", "2–4 days"],
  ["REQ-LKO-26093", "Shakti Moulders", "Impact strength", "Review", "1 day"],
  ["REQ-LKO-26094", "Bharat Packaging", "FTIR analysis", "Report ready", "Today"],
];

export function LandingOperationsPreview() {
  return (
    <section id="operations" className="border-t border-slate-200 bg-[#f3f5f7]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1fr_300px] lg:items-center">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,35,65,0.10)]">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <p className="text-lg font-bold text-[#0a2347]">Lucknow Operations</p>
              <p className="text-xs text-slate-500">Live centre overview</p>
            </div>
            <span className="rounded-md border border-slate-200 px-3 py-1.5 text-xs text-slate-500">
              01–07 Sep 2026
            </span>
          </div>
          <div className="grid divide-y divide-slate-200 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {[
              ["Pending requests", "48", "+12 this week"],
              ["Average TAT", "5.2 days", "−0.6 days"],
              ["Lab utilisation", "68%", "+6% this week"],
              ["Revenue MTD", "₹12,45,300", "+18%"],
            ].map(([label, value, delta]) => (
              <div key={label} className="p-4">
                <p className="text-[11px] text-slate-500">{label}</p>
                <p className="mt-1 text-xl font-bold text-[#0a2347]">{value}</p>
                <p className="mt-1 text-[10px] font-semibold text-emerald-600">{delta}</p>
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-[1.45fr_0.55fr]">
            <div className="border-t border-slate-200 p-5 lg:border-r">
              <div className="flex justify-between">
                <h3 className="text-sm font-bold text-[#0a2347]">Sample queue</h3>
                <span className="text-xs font-semibold text-blue-700">View all requests</span>
              </div>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[620px] text-left text-xs">
                  <thead className="text-[10px] tracking-wide text-slate-400 uppercase">
                    <tr>
                      {["Request", "Client", "Service", "Stage", "TAT"].map((h) => (
                        <th key={h} className="pb-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {queue.map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell, index) => (
                          <td
                            key={cell}
                            className={`py-3 pr-3 ${index === 3 ? "font-semibold text-blue-700" : "text-slate-600"}`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="border-t border-slate-200 p-5">
              <h3 className="text-sm font-bold text-[#0a2347]">Turnaround</h3>
              <div className="mt-7 flex h-28 items-end justify-between gap-2 border-b border-slate-200">
                {[42, 58, 72, 48, 82, 55, 68].map((height, index) => (
                  <span
                    key={index}
                    className="w-full rounded-t bg-blue-600"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="text-xs font-bold text-[#0a2347]">SLA alerts</p>
                <p className="mt-2 flex items-center gap-2 text-xs text-amber-600">
                  <BellRing className="size-3.5" /> 3 requests need attention
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
            For centre teams
          </p>
          <h2 className="mt-3 text-3xl font-bold text-[#0a2347]">
            A shared operational view for every team.
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Monitor requests, turnaround, equipment, reports and service performance in one
            connected workspace.
          </p>
          <ul className="mt-7 space-y-4 text-sm text-slate-600">
            {[
              [FlaskConical, "Real-time request tracking"],
              [Gauge, "Lab utilisation insights"],
              [Wrench, "Equipment availability"],
              [ChartNoAxesCombined, "Revenue and performance"],
            ].map(([Icon, text]) => {
              const ItemIcon = Icon as typeof FlaskConical;
              return (
                <li key={String(text)} className="flex items-center gap-3">
                  <span className="grid size-8 place-items-center rounded-full bg-blue-50 text-blue-700">
                    <ItemIcon className="size-4" />
                  </span>
                  {String(text)}
                </li>
              );
            })}
          </ul>
          <Link
            to="/admin/dashboard"
            className="mt-8 inline-flex items-center gap-1 text-sm font-bold text-blue-700"
          >
            Open operations console <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
