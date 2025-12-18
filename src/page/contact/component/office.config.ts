export interface OfficeItem {
  id: number;
  label: string;
  value: string[];
}

export const officeConfig: OfficeItem[] = [
  {
    id: 1,
    label: "Availability:",
    value: ["Mon–Fri, 9:00–18:00 (GMT)"],
  },
  {
    id: 2,
    label: "Location:",
    value: [
      "Berlin, Germany",
      "Tbilisi, Georgia",
      "Remote-first team across Europe",
    ],
  },
  {
    id: 3,
    label: "Email:",
    value: ["support@gstore.com"],
  },
];
