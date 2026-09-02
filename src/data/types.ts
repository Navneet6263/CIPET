export type Status = "pending" | "in-progress" | "ready" | "completed" | "cancelled";

export interface LabService {
  id: string;
  name: string;
  category: string;
  price: number;
  tat: string;
  availability: "Available" | "Limited" | "Planned";
  description: string;
  standard: string;
  sample: string;
}

export interface Lab {
  id: string;
  name: string;
  shortName: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  credentials: string[];
  established: number;
  pendency: number;
  avgTat: number;
  utilization: number;
  revenueToday: number;
  about: string;
  equipment: string[];
  services: LabService[];
}

export interface Booking {
  id: string;
  sampleId: string;
  labId: string;
  labName: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  gst: number;
  total: number;
  status: Status;
  progress: number;
  customer: string;
  company: string;
  priority: "Normal" | "High" | "Urgent";
  paid: boolean;
}

export interface TimelineStep {
  title: string;
  state: "done" | "current" | "upcoming";
  timestamp: string;
  detail?: string;
  progress?: number;
}

export interface Appointment {
  time: string;
  sampleId: string;
  customer: string;
  service: string;
  lab: string;
  status: Status;
  priority: "Normal" | "High" | "Urgent";
  technician: string;
  eta: string;
}

export interface Equipment {
  id: string;
  name: string;
  status: "Operational" | "Maintenance" | "Down";
  lastService: string;
  nextService: string;
  health: "Excellent" | "Good" | "Fair";
  usedHours: number;
  totalHours: number;
}

export const STATUS_LABEL: Record<Status, string> = {
  pending: "Pending",
  "in-progress": "In progress",
  ready: "Ready",
  completed: "Completed",
  cancelled: "Cancelled",
};
