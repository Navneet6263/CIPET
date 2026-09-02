import { BOOKINGS } from "@/data/bookings";
import { LABS } from "@/data/services";

export const USER_PROFILE = {
  name: "Amit Kumar",
  email: "amit@apexpolymers.com",
  phone: "+91 98765 43210",
  company: "Apex Polymers Pvt. Ltd.",
  gstin: "09AABCA1234F1Z5",
  joined: "01 Aug 2026",
  initials: "AK",
};

export const SAVED_LABS = LABS;

export const PAYMENT_METHODS = [
  { id: "card", label: "Card ending 1234", detail: "Business card • Expires 08/27" },
  { id: "upi", label: "amit@upi", detail: "UPI • Primary" },
];

export const NOTIFICATIONS = [
  {
    id: 1,
    title: "Testing underway",
    body: `${BOOKINGS[0]!.id} is progressing at the Lucknow centre.`,
    time: "30 minutes ago",
    unread: true,
  },
  {
    id: 2,
    title: "Payment action required",
    body: `Payment is pending for ${BOOKINGS[0]!.id}.`,
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 3,
    title: "Report ready",
    body: `${BOOKINGS[2]!.id} is available for review.`,
    time: "Yesterday",
    unread: false,
  },
  {
    id: 4,
    title: "Sample received",
    body: "Your calibration instrument has been checked in.",
    time: "2 days ago",
    unread: false,
  },
];
