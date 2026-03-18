export interface Product {
  code: string;
  name: string;
  icon: string;
  category: string;
  subCategory: string;
  price: number;
  hasGrades: boolean;
}

export const PRODUCTS: Product[] = [
  { code: "ZIR", name: "Full Contour Zirconia Crown", icon: "👑", category: "Fixed", subCategory: "Single Crowns", price: 120, hasGrades: true },
  { code: "EMAX", name: "Lithium Disilicate Crown (e.max)", icon: "💎", category: "Fixed", subCategory: "Single Crowns", price: 150, hasGrades: true },
  { code: "CPFM", name: "PFM Crown", icon: "⚙️", category: "Fixed", subCategory: "Single Crowns", price: 95, hasGrades: false },
  { code: "FCAST", name: "Full Cast Crown", icon: "🔧", category: "Fixed", subCategory: "Single Crowns", price: 80, hasGrades: false },
  { code: "S", name: "Standard Bridge", icon: "🌉", category: "Fixed", subCategory: "Multi-Unit Bridges", price: 200, hasGrades: false },
  { code: "SP", name: "Splinted Crowns", icon: "🔗", category: "Fixed", subCategory: "Multi-Unit Bridges", price: 180, hasGrades: false },
  { code: "CAN", name: "Cantilever Bridge", icon: "↔️", category: "Fixed", subCategory: "Multi-Unit Bridges", price: 210, hasGrades: false },
  { code: "IZIRC", name: "Implant-Supported Zirconia Bridge", icon: "💪", category: "Fixed", subCategory: "Multi-Unit Bridges", price: 350, hasGrades: false },
  { code: "HYBRID", name: "Full Arch Hybrid", icon: "🦷", category: "Fixed", subCategory: "Implant Supported", price: 800, hasGrades: false },
  { code: "EMAXIO", name: "Lithium Disilicate Inlay/Onlay (e.max)", icon: "🔷", category: "Fixed", subCategory: "Inlays/Onlays/Overlays", price: 110, hasGrades: false },
  { code: "COMPIO", name: "Composite Onlay", icon: "🔹", category: "Fixed", subCategory: "Inlays/Onlays/Overlays", price: 90, hasGrades: false },
  { code: "OVR", name: "Overlay", icon: "🔲", category: "Fixed", subCategory: "Inlays/Onlays/Overlays", price: 100, hasGrades: false },
];

export interface Patient {
  id: string;
  name: string;
  dob: string;
}

export interface Doctor {
  id: string;
  name: string;
  office: string;
}

export const PATIENTS: Patient[] = [
  { id: "P001", name: "John Smith", dob: "1980-05-15" },
  { id: "P002", name: "Maria Garcia", dob: "1975-08-22" },
  { id: "P003", name: "Robert Johnson", dob: "1990-03-10" },
  { id: "P004", name: "Sarah Williams", dob: "1985-11-30" },
];

export const DOCTORS: Doctor[] = [
  { id: "D001", name: "Dr. Williams", office: "Williams Dental" },
  { id: "D002", name: "Dr. Chen", office: "Chen & Associates" },
  { id: "D003", name: "Dr. Patel", office: "Patel Dental Group" },
];

export interface Office {
  id: string;
  name: string;
  doctor: string;
  phone: string;
}

export const OFFICES: Office[] = [
  { id: "OFF001", name: "Williams Dental", doctor: "Dr. Williams", phone: "555-0101" },
  { id: "OFF002", name: "Chen & Associates", doctor: "Dr. Chen", phone: "555-0102" },
  { id: "OFF003", name: "Patel Dental Group", doctor: "Dr. Patel", phone: "555-0103" },
  { id: "OFF004", name: "Downtown Dental", doctor: "Dr. Smith", phone: "555-0104" },
  { id: "OFF005", name: "Westside Oral Care", doctor: "Dr. Johnson", phone: "555-0105" },
];
