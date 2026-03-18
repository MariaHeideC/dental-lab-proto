export interface AdvanceFieldOption {
  id: string;
  label: string;
  price: number;
  isDefault: boolean;
  status: boolean;
}

export type FieldType =
  | "Dropdown" | "Radio" | "Checkbox" | "Check box"
  | "Number" | "Text" | "Multiline" | "Multiline (text)"
  | "Shade Guide" | "File Upload" | "Implant Library - Dropdown";

export type PricingModel = "Per case" | "Per tooth" | "Per field" | "Per unit" | "Per item" | "Per file" | "";

export interface AdvanceField {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  type: FieldType;
  options: AdvanceFieldOption[];
  pricing: PricingModel;
  price: number;
  required: boolean;
  systemDefault: boolean;
  status: boolean;
  description: string;
  linkedProducts: string[];
}

export const ADVANCE_FIELDS: AdvanceField[] = [
  {
    id: "abutment-details", name: "Abutment Details", category: "Default Case Config", subcategory: "Implant",
    type: "Dropdown", options: [
      { id: "o1", label: "Office to provide", price: 0, isDefault: true, status: true },
      { id: "o2", label: "Lab to provide", price: 0, isDefault: false, status: true },
    ], pricing: "Per item", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Implant Library"],
  },
  {
    id: "abutment-type", name: "Abutment Type", category: "Default Case Config", subcategory: "Implant",
    type: "Dropdown", options: [
      { id: "o1", label: "Stock abutment", price: 0, isDefault: true, status: true },
      { id: "o2", label: "Custom abutment", price: 0, isDefault: false, status: true },
      { id: "o3", label: "Multi-Unit abutment", price: 0, isDefault: false, status: true },
    ], pricing: "Per item", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Implant Library"],
  },
  {
    id: "add-instruction", name: "Add Instruction", category: "Additional Settings", subcategory: "General",
    type: "Text", options: [], pricing: "", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Add-Ons"],
  },
  {
    id: "alloy-type", name: "Alloy Type", category: "Additional Settings", subcategory: "Alloy",
    type: "Dropdown", options: [
      { id: "o1", label: "High Noble", price: 0, isDefault: false, status: true },
      { id: "o2", label: "Noble", price: 0, isDefault: false, status: true },
      { id: "o3", label: "Semi-Precious", price: 0, isDefault: false, status: true },
      { id: "o4", label: "Non-Precious", price: 0, isDefault: false, status: true },
    ], pricing: "Per case", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Metal"],
  },
  {
    id: "base-shade", name: "Base Shade", category: "Default Case Config", subcategory: "Base Shade",
    type: "Dropdown", options: [], pricing: "Per tooth", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Shade"],
  },
  {
    id: "body-shade", name: "Body Shade", category: "Additional Settings", subcategory: "Crown thirds shade",
    type: "Shade Guide", options: [], pricing: "Per tooth", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Shade"],
  },
  {
    id: "cervical-shade", name: "Cervical Shade", category: "Additional Settings", subcategory: "Crown thirds shade",
    type: "Shade Guide", options: [], pricing: "Per tooth", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Shade"],
  },
  {
    id: "characterization", name: "Characterization", category: "Additional Settings", subcategory: "Custom Shade",
    type: "Checkbox", options: [], pricing: "Per field", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Shade"],
  },
  {
    id: "embrasure-type", name: "Embrasure Type", category: "Default Case Config", subcategory: "Embrasures",
    type: "Radio", options: [
      { id: "o1", label: "Type I", price: 0, isDefault: false, status: true },
      { id: "o2", label: "Type II", price: 0, isDefault: true, status: true },
      { id: "o3", label: "Type III", price: 0, isDefault: false, status: true },
    ], pricing: "Per field", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Default Case Config"],
  },
  {
    id: "extra-pontic-fee", name: "Extra Pontic Fee", category: "Additional Settings", subcategory: "General",
    type: "Number", options: [], pricing: "Per unit", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Add-Ons"],
  },
  {
    id: "pontic-design", name: "Pontic Design", category: "Default Case Config", subcategory: "Pontic",
    type: "Dropdown", options: [
      { id: "o1", label: "MRL", price: 0, isDefault: true, status: true },
      { id: "o2", label: "Ovate", price: 0, isDefault: false, status: true },
      { id: "o3", label: "Bullet", price: 0, isDefault: false, status: true },
      { id: "o4", label: "Hygienic", price: 0, isDefault: false, status: true },
    ], pricing: "Per case", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Default Case Config"],
  },
  {
    id: "occlusal-contact", name: "Occlusal Contact", category: "Default Case Config", subcategory: "Occlusion",
    type: "Radio", options: [
      { id: "o1", label: "In occlusion", price: 0, isDefault: true, status: true },
      { id: "o2", label: "Slight out", price: 0, isDefault: false, status: true },
      { id: "o3", label: "Out", price: 0, isDefault: false, status: true },
    ], pricing: "Per case", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Default Case Config"],
  },
  {
    id: "metal-design", name: "Metal Design", category: "Additional Settings", subcategory: "Metal Design",
    type: "Dropdown", options: [], pricing: "Per case", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Metal"],
  },
  {
    id: "stump-shade", name: "Stump Shade", category: "Additional Settings", subcategory: "Custom Shade",
    type: "Shade Guide", options: [], pricing: "Per tooth", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Shade"],
  },
  {
    id: "surface-finish", name: "Surface Finish", category: "Additional Settings", subcategory: "Custom Shade",
    type: "Dropdown", options: [
      { id: "o1", label: "Glossy", price: 0, isDefault: true, status: true },
      { id: "o2", label: "Matte", price: 0, isDefault: false, status: true },
      { id: "o3", label: "Natural", price: 0, isDefault: false, status: true },
    ], pricing: "Per field", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: ["Shade"],
  },
  {
    id: "margin-design", name: "Margin Design", category: "Additional Settings", subcategory: "Design",
    type: "Radio", options: [
      { id: "o1", label: "Chamfer", price: 0, isDefault: true, status: true },
      { id: "o2", label: "Shoulder", price: 0, isDefault: false, status: true },
      { id: "o3", label: "Knife Edge", price: 0, isDefault: false, status: true },
      { id: "o4", label: "Feather", price: 0, isDefault: false, status: true },
    ], pricing: "", price: 0, required: false, systemDefault: false, status: true, description: "", linkedProducts: [],
  },
];

// Product → linked field IDs map
export const PRODUCT_FIELD_MAP: Record<string, string[]> = {
  ZIR: ["base-shade", "body-shade", "cervical-shade", "characterization", "occlusal-contact", "margin-design"],
  EMAX: ["base-shade", "body-shade", "cervical-shade", "stump-shade", "occlusal-contact", "surface-finish"],
  CPFM: ["alloy-type", "metal-design", "base-shade", "occlusal-contact"],
  FCAST: ["alloy-type", "metal-design"],
  S: ["pontic-design", "embrasure-type", "occlusal-contact"],
  SP: ["pontic-design", "embrasure-type"],
  CAN: ["pontic-design"],
  IZIRC: ["abutment-details", "abutment-type", "pontic-design"],
  HYBRID: ["abutment-details", "abutment-type"],
};

export function getProductAdvanceFields(productCode: string): AdvanceField[] {
  const ids = PRODUCT_FIELD_MAP[productCode] ?? [];
  return ids.map(id => ADVANCE_FIELDS.find(f => f.id === id)).filter(Boolean) as AdvanceField[];
}
