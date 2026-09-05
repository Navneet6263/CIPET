import { LABS, SERVICES } from "@/data/services";
import type { Booking, TimelineStep } from "@/data/types";

import { TODAY_APPOINTMENTS } from "@/data/admin";

const centre = LABS[0]!;

function makeBooking(
  number: number,
  serviceId: string,
  status: Booking["status"],
  date: string,
  progress: number,
  paid: boolean,
): Booking {
  const service = SERVICES.find((item) => item.id === serviceId) ?? SERVICES[0]!;
  const gst = Math.round(service.price * 0.18);
  return {
    id: `CIP-LKO-${number}`,
    sampleId: `SMP-LKO-${number}`,
    labId: centre.id,
    labName: centre.shortName,
    serviceId,
    serviceName: service.name,
    date,
    time: "10:00 AM",
    price: service.price,
    gst,
    total: service.price + gst,
    status,
    progress,
    customer: "Amit Kumar",
    company: "Apex Polymers Pvt. Ltd.",
    priority: number % 3 === 0 ? "High" : "Normal",
    paid,
  };
}

export const BOOKINGS: Booking[] = [
  makeBooking(26091, "tensile", "in-progress", "05 Sep 2026", 58, false),
  makeBooking(26092, "calibration", "pending", "07 Sep 2026", 18, true),
  makeBooking(26093, "mfi", "ready", "29 Aug 2026", 92, false),
  makeBooking(26094, "impact", "completed", "24 Aug 2026", 100, true),
  makeBooking(26095, "tooling", "in-progress", "09 Sep 2026", 42, true),
];

export const PAST_BOOKINGS = BOOKINGS.filter(
  (booking) => booking.status === "completed" || booking.status === "ready",
);

export function getBooking(id: string): Booking {
  const existing = BOOKINGS.find((booking) => booking.id.toLowerCase() === id.toLowerCase());
  if (existing) return existing;
  const appointment = TODAY_APPOINTMENTS.find(
    (item) => item.sampleId.replace("SMP-", "CIP-").toLowerCase() === id.toLowerCase(),
  );
  if (!appointment) return BOOKINGS[0]!;
  const service = SERVICES.find((item) => item.name === appointment.service)!;
  return {
    ...makeBooking(
      Number(id.split("-").at(-1)),
      service.id,
      appointment.status,
      appointment.eta,
      0,
      false,
    ),
    customer: appointment.customer,
    company: appointment.customer,
  };
}

export const TRACKING_TIMELINE: TimelineStep[] = [
  {
    title: "Service selected",
    state: "done",
    timestamp: "01 Sep, 10:18 AM",
    detail: "Tensile and mechanical testing selected.",
  },
  {
    title: "Request submitted",
    state: "done",
    timestamp: "01 Sep, 10:24 AM",
    detail: "Requirements and supporting documents received.",
  },
  {
    title: "Sample planned",
    state: "done",
    timestamp: "01 Sep, 12:40 PM",
    detail: "Sample handover scheduled with the Lucknow centre.",
  },
  {
    title: "Testing underway",
    state: "current",
    timestamp: "Started 02 Sep, 09:30 AM",
    detail: "Specimens conditioned; three of five runs completed.",
    progress: 58,
  },
  {
    title: "Technical review",
    state: "upcoming",
    timestamp: "Expected 04 Sep",
    detail: "Results await review.",
  },
  {
    title: "Report ready",
    state: "upcoming",
    timestamp: "Expected 05 Sep",
    detail: "Final report prepared.",
  },
  {
    title: "Request closed",
    state: "upcoming",
    timestamp: "After delivery",
    detail: "Records and payment closed.",
  },
];

export const NOTIFICATION_LOG = [
  { message: "Request submitted", time: "01 Sep, 10:24 AM", channel: "Email" },
  { message: "Sample handover scheduled", time: "01 Sep, 12:40 PM", channel: "Email" },
  { message: "Sample received", time: "02 Sep, 09:10 AM", channel: "SMS" },
  { message: "Testing started", time: "02 Sep, 09:30 AM", channel: "Email" },
];

export const TIME_SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"];
