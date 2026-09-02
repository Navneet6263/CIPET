import { Bell, Download, FileText, Printer, Share2, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Timeline } from "@/components/Timeline";
import { StatusBadge } from "@/components/StatusBadge";
import { NOTIFICATION_LOG, TRACKING_TIMELINE, type Booking } from "@/MOCK_DATA";

const documents = [
  { name: "Work Order", ready: true },
  { name: "Test Report", ready: false },
  { name: "Calibration Certificate", ready: false },
  { name: "Tax Invoice", ready: true },
];

export function TrackingView({
  booking,
  publicMode = false,
}: {
  booking: Booking;
  publicMode?: boolean;
}) {
  const shareUrl = `demo.cipet.local/track/${booking.id}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="min-w-0 space-y-10">
        <section>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Request {booking.id}
              </p>
              <h2 className="mt-1 text-xl font-bold text-foreground">{booking.serviceName}</h2>
              <p className="text-sm text-muted-foreground">
                {booking.labName} • Sample {booking.sampleId}
              </p>
            </div>
            <StatusBadge status={booking.status} />
          </div>
          <div className="mt-7">
            <Timeline steps={TRACKING_TIMELINE} />
          </div>
        </section>

        <section className="border-t border-border pt-7">
          <h3 className="text-base font-semibold text-foreground">Notification log</h3>
          <ul className="mt-4 divide-y divide-border">
            {NOTIFICATION_LOG.map((n) => (
              <li key={n.message} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span className="text-foreground">{n.message}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {n.time} • {n.channel}
                </span>
              </li>
            ))}
          </ul>
          {!publicMode && (
            <Button variant="outline" size="sm" className="mt-4">
              View all notifications
            </Button>
          )}
        </section>
      </div>

      <aside className="min-w-0 space-y-8 rounded-lg border border-slate-200 bg-white p-5 lg:sticky lg:top-24 lg:h-fit">
        <section>
          <h3 className="text-base font-semibold text-foreground">Current status</h3>
          <dl className="mt-4 space-y-3 text-sm">
            {[
              ["Sample ID", booking.sampleId],
              ["Current step", "Testing in progress"],
              ["Last update", "30 minutes ago"],
              ["Next expected", "In 4 hours"],
              ["Estimated ready", "Sept 4, 5:00 PM"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-right font-medium text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-medium text-foreground">
              <span>Overall progress</span>
              <span>{booking.progress}%</span>
            </div>
            <Progress value={booking.progress} className="mt-1.5 h-2" />
          </div>
          <Button
            className="mt-5 w-full"
            onClick={() => toast.success("WhatsApp updates enabled for this sample")}
          >
            <Bell /> Get notifications
          </Button>
        </section>

        <section className="border-t border-border pt-7">
          <h3 className="text-base font-semibold text-foreground">Documents</h3>
          <ul className="mt-3 divide-y divide-border">
            {documents.map((d) => (
              <li key={d.name} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span className="flex items-center gap-2 text-foreground">
                  <FileText className="size-4 text-primary" /> {d.name}
                </span>
                <Button
                  size="sm"
                  variant={d.ready ? "outline" : "ghost"}
                  disabled={!d.ready}
                  onClick={() => toast.success(`${d.name} download started`)}
                >
                  <Download /> {d.ready ? "PDF" : "Pending"}
                </Button>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-t border-border pt-7">
          <h3 className="text-base font-semibold text-foreground">Actions</h3>
          <div className="mt-4 grid gap-2">
            {!publicMode && (
              <Button
                variant="outline"
                onClick={() => toast.success("Thanks! Your feedback has been recorded")}
              >
                <Star /> Rate service
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                void navigator.clipboard?.writeText(`https://${shareUrl}`);
                toast.success("Tracking link copied");
              }}
            >
              <Share2 /> Share tracking link
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              <Printer /> Print timeline
            </Button>
          </div>
          <div className="mt-5 border-l-2 border-blue-600 bg-blue-50 px-3 py-2 text-xs text-slate-500">
            Public tracking link — share with anyone:
            <span className="mt-1 block font-semibold text-foreground">{shareUrl}</span>
          </div>
        </section>
      </aside>
    </div>
  );
}
