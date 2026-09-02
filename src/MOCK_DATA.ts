export * from "@/data/admin";
export * from "@/data/bookings";
export * from "@/data/services";
export * from "@/data/types";
export * from "@/data/user";
export * from "@/data/registrations";

export function formatINR(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}
