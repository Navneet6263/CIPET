import { Link } from "@tanstack/react-router";
import { ArrowRight, CreditCard, LayoutDashboard, Settings2 } from "lucide-react";

const accessPoints = [
  {
    eyebrow: "For industry clients",
    title: "Client workspace",
    description: "Review active requests, pending actions, reports and service history.",
    action: "Open client workspace",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    eyebrow: "For centre teams",
    title: "Operations console",
    description: "Manage appointments, sample queues, equipment, reports and performance.",
    action: "Open operations console",
    to: "/admin/dashboard",
    icon: Settings2,
  },
] as const;

export function PortalAccess() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-blue-700 uppercase">
              Portal access
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#0a2347] sm:text-4xl">
              One product, two workspaces.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Enter the experience that matches your role. Both sides use the same request and
              sample journey.
            </p>
          </div>

          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {accessPoints.map(({ eyebrow, title, description, action, to, icon: Icon }) => (
              <Link
                key={title}
                to={to}
                className="group grid gap-4 py-6 transition-colors hover:bg-slate-50 sm:grid-cols-[48px_1fr_auto] sm:items-center sm:px-4"
              >
                <span className="grid size-12 place-items-center rounded-full border border-blue-200 bg-blue-50 text-blue-700">
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block text-[11px] font-bold tracking-[0.14em] text-slate-400 uppercase">
                    {eyebrow}
                  </span>
                  <span className="mt-1 block text-xl font-bold text-[#0a2347]">{title}</span>
                  <span className="mt-1 block text-sm leading-6 text-slate-600">{description}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                  {action}{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-l-2 border-blue-600 bg-[#f3f5f7] px-5 py-4">
          <span className="flex items-center gap-3 text-sm text-slate-600">
            <CreditCard className="size-5 text-blue-700" />
            <span>
              <strong className="text-[#0a2347]">Billing & payment demo</strong> — invoice, payment
              methods and confirmation flow.
            </span>
          </span>
          <Link
            to="/payment/$bookingId"
            params={{ bookingId: "CIP-LKO-26091" }}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700"
          >
            View payment demo <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
