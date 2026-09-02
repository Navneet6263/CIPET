import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import { LABS, USER_PROFILE, formatINR, getBooking } from "@/MOCK_DATA";

export const Route = createFileRoute("/workorder/$bookingId")({
  loader: ({ params }) => ({ booking: getBooking(params.bookingId) }),
  head: ({ loaderData }) => {
    const id = loaderData?.booking.id ?? "booking";
    const title = `Work order ${id} — CIPET Digital Services Portal`;
    const description = `Printable CIPET work order for request ${id} with sample, service and payment particulars.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: WorkOrder,
});

function WorkOrder() {
  const { booking } = Route.useLoaderData();
  const lab = LABS.find((l) => l.id === booking.labId) ?? LABS[0]!;

  return (
    <PageShell>
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/confirmation/$bookingId"
            params={{ bookingId: booking.id }}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to confirmation
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()}>
              <Printer /> Print
            </Button>
            <Button onClick={() => toast.success("Work order PDF downloaded")}>
              <Download /> Download PDF
            </Button>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
            <div>
              <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                Product vision demo
              </p>
              <h1 className="mt-1 text-xl font-bold text-foreground">Laboratory Work Order</h1>
              <p className="text-sm text-muted-foreground">{lab.name}</p>
              <p className="text-xs text-muted-foreground">{lab.address}</p>
            </div>
            <div className="text-right text-sm">
              <p className="font-bold text-foreground">{booking.id}</p>
              <p className="text-muted-foreground">Issued {booking.date}</p>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Customer
              </h2>
              <p className="mt-2 text-sm font-semibold text-foreground">{USER_PROFILE.company}</p>
              <p className="text-sm text-muted-foreground">{USER_PROFILE.name}</p>
              <p className="text-sm text-muted-foreground">{USER_PROFILE.phone}</p>
              <p className="text-sm text-muted-foreground">GSTIN {USER_PROFILE.gstin}</p>
            </div>
            <div>
              <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Appointment
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">Date: {booking.date}</p>
              <p className="text-sm text-muted-foreground">Time: {booking.time}</p>
              <p className="text-sm text-muted-foreground">Sample ID: {booking.sampleId}</p>
              <p className="text-sm text-muted-foreground">Priority: {booking.priority}</p>
            </div>
          </div>

          <table className="mt-8 w-full text-left text-sm">
            <thead className="border-b border-border text-xs uppercase text-muted-foreground">
              <tr>
                <th className="py-2 font-semibold">Description</th>
                <th className="py-2 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-3">
                  <p className="font-semibold text-foreground">{booking.serviceName}</p>
                  <p className="text-xs text-muted-foreground">
                    Testing charges as per CIPET published tariff
                  </p>
                </td>
                <td className="py-3 text-right font-medium text-foreground">
                  {formatINR(booking.price)}
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-3 text-muted-foreground">GST @ 18%</td>
                <td className="py-3 text-right text-foreground">{formatINR(booking.gst)}</td>
              </tr>
              <tr>
                <td className="py-3 font-bold text-foreground">Total payable</td>
                <td className="py-3 text-right text-lg font-bold text-primary">
                  {formatINR(booking.total)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8 grid gap-4 border-t border-border pt-5 text-xs text-muted-foreground sm:grid-cols-2">
            <p>
              This work order is computer generated by the CIPET Digital Services Portal and is
              valid without physical signature. Sample retention: 30 days post report issue.
            </p>
            <p className="sm:text-right">
              Authorised signatory
              <span className="mt-6 block border-t border-border pt-1 font-semibold text-foreground">
                Officer In-Charge, {lab.shortName}
              </span>
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
