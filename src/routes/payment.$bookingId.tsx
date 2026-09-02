import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check, CreditCard, Landmark, Lock, QrCode } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PageShell } from "@/components/PageShell";
import { formatINR, getBooking } from "@/MOCK_DATA";

export const Route = createFileRoute("/payment/$bookingId")({
  loader: ({ params }) => ({ booking: getBooking(params.bookingId) }),
  head: ({ loaderData }) => ({
    meta: [{ title: `Quotation and payment — ${loaderData?.booking.id ?? "request"}` }],
  }),
  component: Payment,
});

const methods = [
  { id: "upi", label: "UPI", hint: "Instant confirmation", icon: QrCode },
  { id: "card", label: "Card", hint: "Debit or credit card", icon: CreditCard },
  { id: "bank", label: "Net banking", hint: "Choose your bank", icon: Landmark },
  { id: "transfer", label: "NEFT / RTGS", hint: "Manual bank transfer", icon: Landmark },
];

function Payment() {
  const { booking } = Route.useLoaderData();
  const navigate = useNavigate();
  const [method, setMethod] = useState("upi");

  const pay = () => {
    toast.success("Demo payment completed", { description: formatINR(booking.total) });
    navigate({ to: "/payment-success/$bookingId", params: { bookingId: booking.id } });
  };

  return (
    <PageShell>
      <div className="bg-[#f8f6f1] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/confirmation/$bookingId"
            params={{ bookingId: booking.id }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700"
          >
            <ArrowLeft className="size-3.5" /> Back to request
          </Link>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-blue-700 uppercase">
                Quotation approved
              </p>
              <h1 className="mt-1 text-3xl font-bold text-[#0a2347]">Review quotation and pay</h1>
              <p className="mt-2 text-sm text-slate-500">
                Secure the request before scheduling and testing.
              </p>
            </div>
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              Scope confirmed
            </span>
          </div>

          <ol className="mt-6 flex overflow-x-auto rounded-lg border border-slate-200 bg-white px-5 py-4 text-xs">
            {["Request", "Review", "Quotation", "Payment", "Schedule", "Report"].map(
              (label, index) => (
                <li key={label} className="relative min-w-[130px] flex-1 text-center">
                  {index > 0 && (
                    <span
                      className={`absolute top-3 right-1/2 h-px w-full ${index <= 3 ? "bg-blue-600" : "bg-slate-200"}`}
                    />
                  )}
                  <span
                    className={`relative z-10 mx-auto grid size-6 place-items-center rounded-full border font-bold ${index < 3 ? "border-blue-600 bg-blue-600 text-white" : index === 3 ? "border-blue-600 bg-white text-blue-700 ring-4 ring-blue-50" : "border-slate-300 bg-white text-slate-400"}`}
                  >
                    {index < 3 ? <Check className="size-3" /> : index + 1}
                  </span>
                  <span
                    className={`mt-2 block text-[10px] font-semibold ${index <= 3 ? "text-blue-700" : "text-slate-400"}`}
                  >
                    {label}
                  </span>
                </li>
              ),
            )}
          </ol>

          <section className="mt-6 grid overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,35,65,0.05)] lg:grid-cols-[360px_minmax(0,1fr)]">
            <aside className="border-b border-slate-200 bg-slate-50/60 p-6 lg:border-r lg:border-b-0">
              <p className="text-[10px] font-bold tracking-[0.14em] text-slate-400 uppercase">
                Quotation QTN-LKO-26091
              </p>
              <h2 className="mt-2 text-lg font-bold text-[#0a2347]">{booking.serviceName}</h2>
              <p className="mt-1 text-xs text-slate-500">{booking.labName}</p>
              <dl className="mt-6 space-y-4 border-y border-slate-200 py-5 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Request</dt>
                  <dd className="font-semibold text-[#0a2347]">{booking.id}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Sample</dt>
                  <dd className="font-semibold text-[#0a2347]">{booking.sampleId}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-slate-500">Turnaround</dt>
                  <dd className="font-semibold text-[#0a2347]">3–5 working days</dd>
                </div>
              </dl>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service fee</span>
                  <span>{formatINR(booking.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tax (18%)</span>
                  <span>{formatINR(booking.gst)}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-4">
                  <strong className="text-[#0a2347]">Total payable</strong>
                  <strong className="text-xl text-blue-700">{formatINR(booking.total)}</strong>
                </div>
              </div>
              <p className="mt-5 text-[10px] leading-4 text-slate-500">
                This is a product demonstration. No real transaction will be initiated.
              </p>
            </aside>

            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#0a2347]">Choose payment method</h2>
              <p className="mt-1 text-xs text-slate-500">
                Select an option to complete the simulated payment.
              </p>
              <RadioGroup
                value={method}
                onValueChange={setMethod}
                className="mt-6 grid gap-3 sm:grid-cols-2"
              >
                {methods.map(({ id, label, hint, icon: Icon }) => (
                  <label
                    key={id}
                    className="flex cursor-pointer items-start gap-3 rounded-md border border-slate-200 p-4 transition has-[button[data-state=checked]]:border-blue-600 has-[button[data-state=checked]]:bg-blue-50"
                  >
                    <RadioGroupItem value={id} className="mt-0.5" />
                    <Icon className="size-4 text-blue-700" />
                    <span>
                      <strong className="block text-xs text-[#0a2347]">{label}</strong>
                      <span className="mt-1 block text-[10px] text-slate-500">{hint}</span>
                    </span>
                  </label>
                ))}
              </RadioGroup>

              <div className="mt-6 border-t border-slate-200 pt-6">
                {method === "upi" && (
                  <div className="max-w-md">
                    <Label htmlFor="upi" className="text-xs font-semibold text-[#0a2347]">
                      UPI ID
                    </Label>
                    <div className="mt-2 flex gap-2">
                      <Input id="upi" defaultValue="amit@upi" className="h-11" />
                      <Button variant="outline">Verify</Button>
                    </div>
                  </div>
                )}
                {method === "card" && (
                  <div className="grid max-w-xl gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Label htmlFor="card" className="text-xs font-semibold">
                        Card number
                      </Label>
                      <Input id="card" placeholder="1234 5678 9012 3456" className="mt-2 h-11" />
                    </div>
                    <div>
                      <Label htmlFor="expiry" className="text-xs font-semibold">
                        Expiry
                      </Label>
                      <Input id="expiry" placeholder="MM/YY" className="mt-2 h-11" />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-xs font-semibold">
                        CVV
                      </Label>
                      <Input id="cvv" placeholder="•••" type="password" className="mt-2 h-11" />
                    </div>
                  </div>
                )}
                {method === "bank" && (
                  <p className="rounded-md bg-blue-50 p-4 text-xs leading-5 text-slate-600">
                    Choose your bank on the secure authorisation screen after continuing.
                  </p>
                )}
                {method === "transfer" && (
                  <div className="rounded-md bg-slate-50 p-4 text-xs leading-5 text-slate-600">
                    <strong className="block text-[#0a2347]">Collection account</strong>
                    <p>Account 3021 4455 8899 · IFSC SBIN0001234</p>
                    <p>Use {booking.id} as the payment reference.</p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
                <p className="flex items-center gap-2 text-[10px] text-slate-500">
                  <Lock className="size-3.5 text-emerald-600" /> Secure demo payment · Encrypted
                  session
                </p>
                <Button onClick={pay}>
                  Pay {formatINR(booking.total)} <Lock />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
