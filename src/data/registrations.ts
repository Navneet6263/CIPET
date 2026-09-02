export type RegistrationStatus =
  "Draft" | "Submitted" | "Under review" | "Action required" | "Approved";

export interface RegistrationRecord {
  id: string;
  company: string;
  applicant: string;
  city: string;
  products: number;
  standards: number;
  submitted: string;
  completeness: number;
  status: RegistrationStatus;
  reviewer: string;
}

export const PDI_REGISTRATIONS: RegistrationRecord[] = [
  {
    id: "PDI-LKO-26018",
    company: "Apex Polymers Pvt. Ltd.",
    applicant: "Amit Kumar",
    city: "Lucknow",
    products: 3,
    standards: 7,
    submitted: "01 Sep, 10:24 AM",
    completeness: 100,
    status: "Submitted",
    reviewer: "Unassigned",
  },
  {
    id: "PDI-LKO-26017",
    company: "Shakti Pipe Systems",
    applicant: "Neeraj Singh",
    city: "Kanpur",
    products: 4,
    standards: 9,
    submitted: "31 Aug, 04:10 PM",
    completeness: 92,
    status: "Under review",
    reviewer: "N. Gupta",
  },
  {
    id: "PDI-LKO-26016",
    company: "Vertex Water Solutions",
    applicant: "Riya Mehta",
    city: "Noida",
    products: 2,
    standards: 4,
    submitted: "30 Aug, 11:32 AM",
    completeness: 78,
    status: "Action required",
    reviewer: "A. Kumar",
  },
  {
    id: "PDI-LKO-26015",
    company: "Bharat Packaging Works",
    applicant: "S. Verma",
    city: "Agra",
    products: 1,
    standards: 3,
    submitted: "29 Aug, 02:18 PM",
    completeness: 100,
    status: "Approved",
    reviewer: "N. Gupta",
  },
  {
    id: "PDI-LKO-26014",
    company: "Nova Infrastructure",
    applicant: "Manish Jain",
    city: "Prayagraj",
    products: 5,
    standards: 11,
    submitted: "28 Aug, 09:45 AM",
    completeness: 96,
    status: "Under review",
    reviewer: "A. Kumar",
  },
];
