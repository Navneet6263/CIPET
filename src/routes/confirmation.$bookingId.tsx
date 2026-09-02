import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, CheckCircle2, Copy, Download, FileText, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { formatINR, getBooking } from "@/MOCK_DATA";

export const Route = createFileRoute("/confirmation/$bookingId")({
  loader: ({ params }) => ({ booking: getBooking(params.bookingId) }),
  head: ({ loaderData }) => ({
    meta: [{ title: `Request ${loaderData?.booking.id ?? "submitted"} — ServiceFlow` }],
  }),
  component: Confirmation,
});

const journey = [
  "Request submitted",
  "Team review",
  "Quotation",
  "Payment",
  "Schedule & testing",
  "Report",
];

function Confirmation() {
  const { booking } = Route.useLoaderData();

  return (
    <PageShell>
      <div className="bg-[#f8f6f1] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <section className="flex flex-wrap items-center justify-between gap-5 border-b border-slate-200 pb-7">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="size-6" />
              </span>
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-emerald-700 uppercase">
                  Request received
                </p>
                <h1 className="mt-1 text-3xl font-bold text-[#0a2347]">
                  Your request is ready for review
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  The service team will confirm scope, quotation and schedule.
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                void navigator.clipboard?.writeText(booking.id);
                toast.success("Request ID copied");
              }}
              className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-[#0a2347]"
            >
              {booking.id} <Copy className="size-4 text-blue-600" />
            </button>
          </section>

          <ol className="mt-7 grid grid-cols-6 overflow-x-auto rounded-lg border border-slate-200 bg-white px-4 py-5">
            {journey.map((label, index) => (
              <li key={label} className="relative min-w-[120px] text-center">
                {index > 0 && (
                  <span
                    className={`absolute top-3 right-1/2 h-px w-full ${index === 0 ? "bg-blue-600" : "bg-slate-200"}`}
                  />
                )}
                <span
                  className={`relative z-10 mx-auto grid size-7 place-items-center rounded-full border text-xs font-bold ${index === 0 ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white text-slate-400"}`}
                >
                  {index === 0 ? <Check className="size-3.5" /> : index + 1}
                </span>
                <span
                  className={`mt-2 block text-[10px] font-semibold ${index === 0 ? "text-blue-700" : "text-slate-400"}`}
                >
                  {label}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
            <section className="overflow-hidden rounded-lg border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-6 py-5">
                <h2 className="text-lg font-bold text-[#0a2347]">Request overview</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Information shared with the review team
                </p>
              </div>
              <dl className="grid sm:grid-cols-2">
                {[
                  ["Centre", booking.labName],
                  ["Service", booking.serviceName],
                  ["Sample reference", booking.sampleId],
                  ["Preferred appointment", `${booking.date}, ${booking.time}`],
                  ["Request owner", booking.customer],
                  ["Organisation", booking.company],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-slate-100 px-6 py-4 odd:sm:border-r">
                    <dt className="text-[10px] tracking-wide text-slate-400 uppercase">{label}</dt>
                    <dd className="mt-1 text-sm font-semibold text-[#0a2347]">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="px-6 py-5">
                <h3 className="text-sm font-bold text-[#0a2347]">What the team will check</h3>
                <ul className="mt-3 grid gap-3 text-xs text-slate-600 sm:grid-cols-2">
                  {[
                    "Testing method and acceptance criteria",
                    "Sample form, quantity and preparation",
                    "Equipment capacity and preferred schedule",
                    "Final fee, taxes and report delivery",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <aside className="space-y-4">
              <section className="rounded-lg border border-blue-100 bg-blue-50/50 p-5">
                <p className="text-[10px] font-bold tracking-[0.14em] text-blue-700 uppercase">
                  Demo quotation preview
                </p>
                <h2 className="mt-2 text-lg font-bold text-[#0a2347]">
                  Indicative commercial summary
                </h2>
                <dl className="mt-4 space-y-3 border-y border-blue-100 py-4 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Service fee</dt>
                    <dd className="font-semibold">{formatINR(booking.price)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Tax (18%)</dt>
                    <dd className="font-semibold">{formatINR(booking.gst)}</dd>
                  </div>
                  <div className="flex justify-between text-sm">
                    <dt className="font-bold text-[#0a2347]">Total payable</dt>
                    <dd className="font-bold text-blue-700">{formatINR(booking.total)}</dd>
                  </div>
                </dl>
                <p className="mt-3 text-[10px] leading-4 text-slate-500">
                  In the live product, payment opens only after the team approves the quotation.
                </p>
                <Link to="/payment/$bookingId" params={{ bookingId: booking.id }}>
                  <Button className="mt-4 w-full">
                    View quotation & payment <ArrowRight />
                  </Button>
                </Link>
              </section>
              <section className="rounded-lg border border-slate-200 bg-white p-4">
                <p className="text-xs font-bold text-[#0a2347]">Request actions</p>
                <div className="mt-3 grid gap-2">
                  <Link to="/tracking/$bookingId" params={{ bookingId: booking.id }}>
                    <Button variant="outline" className="w-full justify-start">
                      <Share2 /> Track request
                    </Button>
                  </Link>
                  <Link to="/workorder/$bookingId" params={{ bookingId: booking.id }}>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText /> Request summary
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => toast.success("Confirmation downloaded")}
                  >
                    <Download /> Download confirmation
                  </Button>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
