import { LABS, SERVICES } from "@/data/services";
import type { Appointment, Equipment, Status } from "@/data/types";

export const ADMIN_STATS = {
  todayAppointments: 15,
  appointmentsDelta: 3,
  pendingSamples: 8,
  reportsReady: 5,
  revenueToday: 75000,
  revenueDelta: 12000,
  utilization: 82,
  avgTat: 4.2,
  satisfaction: 92,
  uptime: 99.9,
};

const customers = [
  "Apex Polymers Pvt. Ltd.",
  "Nova Components",
  "Shakti Moulders",
  "Bharat Packaging",
  "Vertex Auto Components",
];
const times = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
];
const statuses: Status[] = ["pending", "in-progress", "ready", "completed", "in-progress"];

const appointmentServices = SERVICES.filter((service) => service.id !== "pdi-registration");

export const TODAY_APPOINTMENTS: Appointment[] = times.map((time, index) => ({
  time,
  sampleId: `SMP-LKO-${26091 + index}`,
  customer: customers[index % customers.length]!,
  service: appointmentServices[index % appointmentServices.length]!.name,
  lab: LABS[0]!.shortName,
  status: statuses[index % statuses.length]!,
  priority: index % 5 === 0 ? "High" : index % 7 === 0 ? "Urgent" : "Normal",
  technician: ["R. Sharma", "P. Nair", "S. Iyer", "M. Verma"][index % 4]!,
  eta: ["Today 4 PM", "Tomorrow 11 AM", "05 Sep, 5 PM", "06 Sep, 1 PM"][index % 4]!,
}));

export const SAMPLE_SUMMARY = {
  total: 15,
  received: 10,
  testing: 3,
  qualityCheck: 1,
  ready: 1,
  problems: 0,
};

export const EQUIPMENT_STATUS: Equipment[] = [
  {
    id: "eq-1",
    name: "Universal Testing System",
    status: "Operational",
    lastService: "15 Aug 2026",
    nextService: "01 Oct 2026",
    health: "Excellent",
    usedHours: 120,
    totalHours: 500,
  },
  {
    id: "eq-2",
    name: "Impact Testing System",
    status: "Operational",
    lastService: "28 Aug 2026",
    nextService: "15 Sep 2026",
    health: "Good",
    usedHours: 95,
    totalHours: 300,
  },
  {
    id: "eq-3",
    name: "Melt Flow Tester",
    status: "Operational",
    lastService: "31 Aug 2026",
    nextService: "05 Oct 2026",
    health: "Excellent",
    usedHours: 210,
    totalHours: 600,
  },
  {
    id: "eq-4",
    name: "Thermal Analysis System",
    status: "Operational",
    lastService: "01 Jul 2026",
    nextService: "20 Sep 2026",
    health: "Good",
    usedHours: 340,
    totalHours: 800,
  },
  {
    id: "eq-5",
    name: "FTIR Spectrometer",
    status: "Maintenance",
    lastService: "20 Aug 2026",
    nextService: "10 Sep 2026",
    health: "Fair",
    usedHours: 410,
    totalHours: 700,
  },
];

export const REVENUE_TREND = Array.from({ length: 30 }, (_, index) => ({
  day: `${index + 1}`,
  revenue: 45000 + Math.round(Math.sin(index / 3) * 12000) + index * 900,
}));
export const ORDERS_BY_SERVICE = [
  { service: "Testing", orders: 150 },
  { service: "Calibration", orders: 120 },
  { service: "Tooling", orders: 90 },
  { service: "Processing", orders: 78 },
  { service: "Consultancy", orders: 62 },
];
export const TAT_DISTRIBUTION = [
  { bucket: "Same day", count: 50 },
  { bucket: "2–3 days", count: 250 },
  { bucket: "4–5 days", count: 150 },
  { bucket: "6+ days", count: 50 },
];
export const FEEDBACK_SPLIT = [
  { name: "Excellent", value: 60 },
  { name: "Good", value: 25 },
  { name: "Needs review", value: 10 },
  { name: "Open", value: 5 },
];
export const ANALYTICS_KPIS = [
  { label: "Total requests", value: "500", delta: "+15%" },
  { label: "Total revenue", value: "₹25,00,000", delta: "+18%" },
  { label: "Average TAT", value: "4.2 days", delta: "−0.4 d" },
  { label: "Positive feedback", value: "92%", delta: "+4%" },
  { label: "Lab utilisation", value: "82%", delta: "+6%" },
  { label: "On-time delivery", value: "96%", delta: "+3%" },
  { label: "Equipment uptime", value: "99.5%", delta: "+0.3%" },
];
