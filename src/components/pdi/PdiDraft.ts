export interface AddressDraft {
  line1: string;
  line2: string;
  city: string;
  district: string;
  state: string;
  pin: string;
}

export interface PersonDraft {
  name: string;
  designation: string;
  contact: string;
  email: string;
}

export interface ProductDraft {
  id: number;
  name: string;
  standards: string[];
  capacity: string;
  unit: string;
}

export interface PdiDraft {
  applicant: PersonDraft;
  unitName: string;
  establishmentYear: string;
  factory: AddressDraft;
  corporate: AddressDraft;
  registered: AddressDraft;
  corporateSame: boolean;
  registeredSame: boolean;
  authority: PersonDraft & { website: string };
  qualityHead: PersonDraft;
  plantHead: PersonDraft;
  businessHead: PersonDraft;
  products: ProductDraft[];
  turnover: string;
  iso9001: string;
  previousInspection: string;
  certification: string;
  agreed: boolean;
}

export const emptyAddress: AddressDraft = {
  line1: "",
  line2: "",
  city: "",
  district: "",
  state: "Uttar Pradesh",
  pin: "",
};
export const emptyPerson: PersonDraft = { name: "", designation: "", contact: "", email: "" };

export const PDI_STEPS = [
  "Applicant",
  "Unit & addresses",
  "Personnel",
  "Products",
  "Certification",
  "Review",
];

export const PRODUCT_STANDARDS: Record<string, string[]> = {
  "Pipe Fittings": ["IS 9523", "IS 10124", "IS 8360 - Pt 1 to 3", "IS 8008 - Pt 1 to 9", "Others"],
  "PE Pipes": [
    "IS 4984",
    "IS 12786",
    "IS 14151",
    "IS 14885",
    "IS 14333",
    "IS 13488",
    "IS 16098 Part I & II",
    "ISO 4427",
    "Others",
  ],
  "Tank / Chamber": ["IS 12701", "IS 9969", "EN 13598", "Others"],
  "UPVC Pipes": [
    "IS 4985",
    "IS 13592",
    "IS 12818",
    "ASTM D 1785",
    "IS 15328",
    "IS 15265",
    "Others",
  ],
  "Metal Pipes": ["IS 8329", "IS 1239 Part 1", "IS 1239 Part 2", "IS 3589", "IS 4270", "Others"],
  "Woven Sack Bags": [
    "IS 14887",
    "IS 16703",
    "IS 14968",
    "IS 11652",
    "IS 11824",
    "IS 9755",
    "Others",
  ],
  "Polyethylene Film": ["IS 2508", "IS 10889", "IS 14611", "IS 13217", "Others"],
  Other: ["IS 14182", "IS 15351", "IS 12709", "ISO 21138", "IS 15500", "Others"],
};
