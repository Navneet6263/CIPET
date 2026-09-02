import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { TrackingView } from "@/components/TrackingView";
import { getBooking } from "@/MOCK_DATA";

export const Route = createFileRoute("/tracking/$bookingId")({
  loader: ({ params }) => ({ booking: getBooking(params.bookingId) }),
  head: ({ loaderData }) => {
    const id = loaderData?.booking.id ?? "booking";
    const title = `Tracking ${id} — CIPET Digital Services Portal`;
    const description = `Live status, timeline, documents and notification history for CIPET request ${id}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: TrackingPage,
});

function TrackingPage() {
  const { booking } = Route.useLoaderData();

  return (
    <PageShell>
      <div className="border-b border-slate-200 bg-[#f8f6f1]">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700"
          >
            <ArrowLeft className="size-4" /> Back to dashboard
          </Link>
          <h1 className="mt-4 text-3xl font-bold text-[#0a2347]">Request progress</h1>
          <p className="mt-2 text-sm text-slate-500">
            {booking.id} • {booking.labName} • {booking.serviceName}
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <TrackingView booking={booking} />
      </div>
    </PageShell>
  );
}
