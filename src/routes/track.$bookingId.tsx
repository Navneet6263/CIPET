import { createFileRoute, Link } from "@tanstack/react-router";
import { QrCode, ShieldCheck } from "lucide-react";
import { TrackingView } from "@/components/TrackingView";
import { getBooking } from "@/MOCK_DATA";

export const Route = createFileRoute("/track/$bookingId")({
  loader: ({ params }) => ({ booking: getBooking(params.bookingId) }),
  head: ({ loaderData }) => {
    const id = loaderData?.booking.id ?? "booking";
    const title = `Public tracking ${id} — CIPET Portal`;
    const description = `Check the live testing status of CIPET request ${id}. No login required.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: PublicTracking,
});

function PublicTracking() {
  const { booking } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-[#f8f6f1]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4">
          <span className="grid size-9 place-items-center rounded-md bg-[#0a2347] text-xs font-bold text-white">
            CI
          </span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-[#0a2347]">CIPET Public Sample Tracking</p>
            <p className="text-[11px] text-slate-500">
              Lucknow service request • No login required
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-7">
          <div>
            <h1 className="text-xl font-bold text-foreground md:text-2xl">Request {booking.id}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {booking.serviceName} at {booking.labName}
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-success">
              <ShieldCheck className="size-4" /> Verified demo request
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-md border border-dashed border-slate-300 bg-white p-3">
            <QrCode className="size-14 text-foreground" />
            <div className="text-xs text-muted-foreground">
              Scan to open
              <span className="mt-1 block font-semibold text-foreground">
                demo.cipet.local/track/{booking.id}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <TrackingView booking={booking} publicMode />
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Need to book your own test?{" "}
          <Link to="/" className="font-semibold text-primary hover:underline">
            Visit the CIPET Digital Services Portal
          </Link>
        </p>
      </main>
    </div>
  );
}
