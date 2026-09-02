import { createFileRoute, Link } from "@tanstack/react-router";
import { CreditCard, Mail, Pencil, Phone, Plus, Smartphone, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PageShell, SectionHeading } from "@/components/PageShell";
import { StatusBadge } from "@/components/StatusBadge";
import { BOOKINGS, PAYMENT_METHODS, SAVED_LABS, USER_PROFILE, formatINR } from "@/MOCK_DATA";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — CIPET Digital Services Portal" },
      {
        name: "description",
        content:
          "Manage your CIPET portal profile, saved laboratories, payment methods and notification settings.",
      },
      { property: "og:title", content: "CIPET Customer Profile" },
      {
        property: "og:description",
        content: "Organisation details, request history and service preferences.",
      },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <PageShell>
      <div className="bg-[#f8f6f1] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="border-b border-slate-200 pb-7">
            <div className="flex flex-wrap items-center gap-5">
              <span className="grid size-16 place-items-center rounded-full bg-[#0a2347] text-lg font-bold text-white ring-4 ring-white">
                {USER_PROFILE.initials}
              </span>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-foreground">{USER_PROFILE.name}</h1>
                <p className="text-sm text-muted-foreground">{USER_PROFILE.company}</p>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mail className="size-4" /> {USER_PROFILE.email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="size-4" /> {USER_PROFILE.phone}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  GSTIN {USER_PROFILE.gstin} • Member since {USER_PROFILE.joined}
                </p>
              </div>
              <Button variant="outline" onClick={() => toast.success("Profile editing enabled")}>
                <Pencil /> Edit Profile
              </Button>
            </div>
          </div>

          <div className="mt-10">
            <SectionHeading
              title="Recent requests"
              action={
                <Link to="/bookings-history">
                  <Button variant="outline" size="sm">
                    View all requests
                  </Button>
                </Link>
              }
            />
            <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200 bg-white">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="bg-slate-50 text-[10px] tracking-wide text-slate-400 uppercase">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Lab</th>
                    <th className="px-4 py-3 font-semibold">Service</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {BOOKINGS.slice(0, 4).map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-muted-foreground">{b.date}</td>
                      <td className="px-4 py-3 text-muted-foreground">{b.labName}</td>
                      <td className="px-4 py-3 text-foreground">{b.serviceName}</td>
                      <td className="px-4 py-3 font-semibold text-foreground">
                        {formatINR(b.total)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link to="/tracking/$bookingId" params={{ bookingId: b.id }}>
                          <Button size="sm" variant="outline">
                            {b.status === "completed" ? "View" : "Track"}
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="text-base font-semibold text-foreground">Saved labs</h2>
              <ul className="mt-4 space-y-3">
                {SAVED_LABS.map((lab) => (
                  <li key={lab.id} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {lab.shortName}
                      </p>
                      <p className="text-xs text-muted-foreground">{lab.city} service centre</p>
                    </div>
                    <Link to="/lab/$id" params={{ id: lab.id }}>
                      <Button size="sm" variant="ghost">
                        Open
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="text-base font-semibold text-foreground">Payment methods</h2>
              <ul className="mt-4 space-y-3">
                {PAYMENT_METHODS.map((m) => (
                  <li
                    key={m.id}
                    className="flex items-start gap-3 border-b border-slate-100 py-3 last:border-0"
                  >
                    <CreditCard className="mt-0.5 size-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.label}</p>
                      <p className="text-xs text-muted-foreground">{m.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => toast.success("Add payment method")}
              >
                <Plus /> Add New
              </Button>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <h2 className="text-base font-semibold text-foreground">Notification settings</h2>
              <div className="mt-4 space-y-4">
                {[
                  { label: "Email", icon: Mail, on: true },
                  { label: "SMS", icon: Smartphone, on: false },
                  { label: "WhatsApp", icon: MessageCircle, on: true },
                ].map((c) => (
                  <label
                    key={c.label}
                    className="flex items-center justify-between gap-3 text-sm text-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <c.icon className="size-4 text-muted-foreground" /> {c.label} notifications
                    </span>
                    <Switch defaultChecked={c.on} />
                  </label>
                ))}
              </div>
              <Button className="mt-5 w-full" onClick={() => toast.success("Settings saved")}>
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
