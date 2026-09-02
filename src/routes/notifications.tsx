import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, CheckCheck, Mail, MessageCircle, Smartphone } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { PageShell } from "@/components/PageShell";
import { NOTIFICATIONS } from "@/MOCK_DATA";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — CIPET Digital Services Portal" },
      {
        name: "description",
        content:
          "Every email and SMS alert issued for your CIPET requests, plus channel preferences.",
      },
      { property: "og:title", content: "CIPET Notifications" },
      {
        property: "og:description",
        content: "Sample status alerts and channel preferences in one place.",
      },
    ],
  }),
  component: Notifications,
});

function Notifications() {
  const [items, setItems] = useState(NOTIFICATIONS);

  return (
    <PageShell>
      <div className="bg-[#f8f6f1] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-blue-700 uppercase">
                Communication centre
              </p>
              <h1 className="mt-2 text-3xl font-bold text-[#0a2347]">Notifications</h1>
              <p className="mt-2 text-sm text-slate-500">
                {items.filter((i) => i.unread).length} unread updates across your requests
              </p>
            </div>
            {
              <Button
                variant="outline"
                onClick={() => {
                  setItems((list) => list.map((i) => ({ ...i, unread: false })));
                  toast.success("All notifications marked as read");
                }}
              >
                <CheckCheck /> Mark all read
              </Button>
            }
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <ul className="divide-y divide-slate-100 overflow-hidden rounded-lg border border-slate-200 bg-white">
              {items.map((n) => (
                <li
                  key={n.id}
                  className={cn(
                    "flex gap-4 border-l-2 p-5",
                    n.unread ? "border-l-blue-600 bg-blue-50/40" : "border-l-transparent bg-white",
                  )}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                    <Bell className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">{n.title}</p>
                      <span className="text-xs text-muted-foreground">{n.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="h-fit rounded-lg border border-slate-200 bg-white p-5 lg:sticky lg:top-24">
              <h2 className="text-base font-semibold text-foreground">Channel preferences</h2>
              <div className="mt-4 space-y-4">
                {[
                  { label: "WhatsApp updates", icon: MessageCircle, on: true },
                  { label: "Email updates", icon: Mail, on: true },
                  { label: "SMS updates", icon: Smartphone, on: false },
                ].map((c) => (
                  <label
                    key={c.label}
                    className="flex items-center justify-between gap-3 text-sm text-foreground"
                  >
                    <span className="flex items-center gap-2">
                      <c.icon className="size-4 text-muted-foreground" /> {c.label}
                    </span>
                    <Switch defaultChecked={c.on} />
                  </label>
                ))}
              </div>
              <Button className="mt-5" onClick={() => toast.success("Preferences saved")}>
                Save preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
