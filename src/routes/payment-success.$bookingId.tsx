import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, CheckCircle2, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { formatINR, getBooking } from "@/MOCK_DATA";

export const Route = createFileRoute("/payment-success/$bookingId")({
  loader: ({ params }) => ({ booking: getBooking(params.bookingId) }),
  head: ({ loaderData }) => ({
    meta: [{ title: `Payment received — ${loaderData?.booking.id ?? "request"}` }],
  }),
  component: PaymentSuccess,
});

function PaymentSuccess() {
  const { booking } = Route.useLoaderData();
  return (
    <PageShell>
      <div className="bg-[#f8f6f1] px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <section className="text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-100 text-emerald-700">
              <CheckCircle2 className="size-7" />
            </span>
            <p className="mt-4 text-xs font-bold tracking-[0.14em] text-emerald-700 uppercase">
              Payment confirmed
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#0a2347]">
              Your request is ready for scheduling
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              A receipt has been added to the request and the service team has been notified.
            </p>
          </section>

          <ol className="mt-8 grid grid-cols-5 rounded-lg border border-slate-200 bg-white px-4 py-5">
            {["Request", "Quotation", "Payment", "Schedule", "Report"].map((label, index) => (
              <li key={label} className="relative text-center">
                {index > 0 && (
                  <span
                    className={`absolute top-3 right-1/2 h-px w-full ${index <= 2 ? "bg-blue-600" : "bg-slate-200"}`}
                  />
                )}
                <span
                  className={`relative z-10 mx-auto grid size-7 place-items-center rounded-full border text-xs font-bold ${index <= 2 ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white text-slate-400"}`}
                >
                  {index <= 2 ? <Check className="size-3.5" /> : index + 1}
                </span>
                <span
                  className={`mt-2 block text-[10px] font-semibold ${index <= 2 ? "text-blue-700" : "text-slate-400"}`}
                >
                  {label}
                </span>
              </li>
            ))}
          </ol>

          <section className="mt-6 grid overflow-hidden rounded-lg border border-slate-200 bg-white sm:grid-cols-[1fr_260px]">
            <div className="p-6">
              <h2 className="text-lg font-bold text-[#0a2347]">Receipt details</h2>
              <dl className="mt-5 grid gap-x-8 gap-y-4 text-xs sm:grid-cols-2">
                {[
                  ["Transaction ID", `TXN-${booking.id.slice(-4)}8842`],
                  ["Payment method", "UPI · amit@upi"],
                  ["Request", booking.id],
                  ["Service", booking.serviceName],
                  ["Receipt", "RCP-LKO-26091"],
                  ["Status", "Successful"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[10px] tracking-wide text-slate-400 uppercase">{label}</dt>
                    <dd className="mt-1 font-semibold text-[#0a2347]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <aside className="border-t border-slate-200 bg-blue-50/50 p-6 sm:border-t-0 sm:border-l">
              <p className="text-[10px] font-bold tracking-[0.12em] text-blue-700 uppercase">
                Amount paid
              </p>
              <p className="mt-2 text-3xl font-bold text-[#0a2347]">{formatINR(booking.total)}</p>
              <p className="mt-2 text-[10px] leading-4 text-slate-500">
                05 Sep 2026, 10:00 AM · Demo transaction
              </p>
              <Button
                variant="outline"
                className="mt-5 w-full bg-white"
                onClick={() => toast.success("Receipt downloaded")}
              >
                <Download /> Download receipt
              </Button>
            </aside>
          </section>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <Link to="/dashboard" className="text-xs font-semibold text-slate-500">
              Return to dashboard
            </Link>
            <Link to="/tracking/$bookingId" params={{ bookingId: booking.id }}>
              <Button>
                Track request <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
