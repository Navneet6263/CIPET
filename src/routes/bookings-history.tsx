import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageShell } from "@/components/PageShell";
import { StatusBadge } from "@/components/StatusBadge";
import { formatINR } from "@/MOCK_DATA";

import { useDemoBookings } from "@/lib/workflow-store";

export const Route = createFileRoute("/bookings-history")({
  head: () => ({
    meta: [
      { title: "Request history — CIPET ServiceFlow" },
      {
        name: "description",
        content:
          "Every CIPET service request your organisation has placed, with status, invoices and report records.",
      },
      { property: "og:title", content: "CIPET request history" },
      { property: "og:description", content: "Search past requests and access report records." },
    ],
  }),
  component: BookingsHistory,
});

function BookingsHistory() {
  const bookings = useDemoBookings();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(
    () =>
      bookings.filter(
        (b) =>
          (status === "all" || b.status === status) &&
          `${b.id} ${b.serviceName} ${b.labName} ${b.sampleId}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [query, status, bookings],
  );

  return (
    <PageShell>
      <div className="bg-[#f8f6f1] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] text-blue-700 uppercase">
                Customer records
              </p>
              <h1 className="mt-2 text-3xl font-bold text-[#0a2347]">Request history</h1>
              <p className="mt-2 text-sm text-slate-500">
                Every request placed by Apex Polymers Pvt. Ltd.
              </p>
            </div>
            {
              <Button variant="outline" onClick={() => toast.success("Excel export started")}>
                <Download /> Export
              </Button>
            }
          </div>

          <div className="mt-7 grid gap-3 border-y border-slate-200 py-4 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search request ID, sample or service"
                className="pl-9"
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-slate-50 text-[10px] tracking-wide text-slate-400 uppercase">
                <tr>
                  <th className="px-4 py-3 font-semibold">Request</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Lab</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-foreground">{b.id}</p>
                      <p className="text-xs text-muted-foreground">{b.sampleId}</p>
                    </td>
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
          <p className="mt-4 text-sm text-muted-foreground">
            Showing {rows.length} of {bookings.length} requests
          </p>
        </div>
      </div>
    </PageShell>
  );
}
