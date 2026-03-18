"use client";

import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type PricingModel = "Per case" | "Per tooth" | "Per field" | "Per unit" | "Per item" | "Per file" | "";
type FieldType = "Dropdown" | "Radio" | "Checkbox" | "Check box" | "Number" | "Text" | "Multiline" | "Multiline (text)" | "Shade Guide" | "File Upload" | "Implant Library - Dropdown";

interface FieldOption {
  id: string;
  label: string;
  price: number;
  isDefault: boolean;
  status: boolean;
}

interface AdvanceField {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  type: FieldType;
  options: FieldOption[];
  pricing: PricingModel;
  price: number;
  required: boolean;
  systemDefault: boolean;
  status: boolean;
  description: string;
  linkedProducts: string[];
}

// ── Initial seed data from Excel ───────────────────────────────────────────────
const INITIAL_FIELDS: AdvanceField[] = [
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
];

// ── Constants ──────────────────────────────────────────────────────────────────
const MAIN_CATEGORIES = ["Metal", "Shade", "Default Case Config", "Additional Settings", "Implant Library", "Add-Ons", "Notes"];
const SUBCATEGORIES: Record<string, string[]> = {
  "Additional Settings": ["Design", "Occlusion", "General", "Alloy", "Metal Design", "Crown thirds shade", "Custom Shade"],
  "Default Case Config": ["Base Shade", "Embrasures", "Implant", "Occlusion", "Pontic", "Proximal Contact"],
  "Metal": ["Alloy", "Metal Design"],
  "Shade": ["Base Shade", "Crown thirds shade", "Custom Shade"],
  "Implant Library": ["Implant"],
  "Add-Ons": ["General"],
  "Notes": ["General"],
};
const FIELD_TYPES: FieldType[] = ["Dropdown", "Radio", "Checkbox", "Number", "Text", "Multiline", "Shade Guide", "File Upload"];
const PRICING_MODELS: PricingModel[] = ["Per case", "Per tooth", "Per field", "Per unit", "Per item", "Per file", ""];

// ── Helpers ────────────────────────────────────────────────────────────────────
function typeBadge(type: string) {
  const colors: Record<string, { bg: string; color: string }> = {
    Dropdown: { bg: "#dbeafe", color: "#1d4ed8" },
    Radio: { bg: "#dcfce7", color: "#15803d" },
    Checkbox: { bg: "#fef3c7", color: "#d97706" },
    "Check box": { bg: "#fef3c7", color: "#d97706" },
    Number: { bg: "#f3e8ff", color: "#7c3aed" },
    Text: { bg: "#f1f5f9", color: "#475569" },
    Multiline: { bg: "#f1f5f9", color: "#475569" },
    "Multiline (text)": { bg: "#f1f5f9", color: "#475569" },
    "Shade Guide": { bg: "#fce7f3", color: "#be185d" },
    "File Upload": { bg: "#ffedd5", color: "#c2410c" },
    "Implant Library - Dropdown": { bg: "#dbeafe", color: "#1d4ed8" },
  };
  const c = colors[type] || { bg: "#f1f5f9", color: "#475569" };
  return (
    <span style={{
      padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600,
      background: c.bg, color: c.color,
    }}>{type}</span>
  );
}

// ── Toggle ─────────────────────────────────────────────────────────────────────
function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: 40, height: 22, borderRadius: 11, cursor: "pointer",
        background: value ? "#1d4ed8" : "#d1d5db",
        position: "relative", transition: "background 0.2s", flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute", top: 3, left: value ? 21 : 3,
        width: 16, height: 16, borderRadius: "50%", background: "#fff",
        transition: "left 0.2s",
      }} />
    </div>
  );
}

// ── Add Field Modal ────────────────────────────────────────────────────────────
interface AddFieldModalProps {
  onClose: () => void;
  onSave: (field: AdvanceField) => void;
  editField?: AdvanceField | null;
}

function AddFieldModal({ onClose, onSave, editField }: AddFieldModalProps) {
  const [tab, setTab] = useState<"options" | "pricing" | "link">("options");
  const [name, setName] = useState(editField?.name || "");
  const [category, setCategory] = useState(editField?.category || "");
  const [subcategory, setSubcategory] = useState(editField?.subcategory || "");
  const [fieldType, setFieldType] = useState<FieldType>(editField?.type || "Dropdown");
  const [required, setRequired] = useState(editField?.required || false);
  const [systemDefault, setSystemDefault] = useState(editField?.systemDefault || false);
  const [description, setDescription] = useState(editField?.description || "");
  const [options, setOptions] = useState<FieldOption[]>(editField?.options || []);
  const [pricing, setPricing] = useState<PricingModel>(editField?.pricing || "");
  const [hasPricing, setHasPricing] = useState(!!editField?.pricing);
  const [linkedProducts, setLinkedProducts] = useState<string[]>(editField?.linkedProducts || []);

  const addOption = () => {
    setOptions(prev => [...prev, {
      id: `o${Date.now()}`, label: "", price: 0, isDefault: false, status: true
    }]);
  };

  const removeOption = (id: string) => setOptions(prev => prev.filter(o => o.id !== id));
  const updateOption = (id: string, key: keyof FieldOption, val: string | number | boolean) => {
    setOptions(prev => prev.map(o => o.id === id ? { ...o, [key]: val } : o));
  };
  const setDefaultOption = (id: string) => {
    setOptions(prev => prev.map(o => ({ ...o, isDefault: o.id === id })));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    const field: AdvanceField = {
      id: editField?.id || name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      name: name.trim(),
      category, subcategory, type: fieldType,
      options, pricing: hasPricing ? pricing : "",
      price: 0, required, systemDefault,
      status: editField?.status ?? true,
      description, linkedProducts,
    };
    onSave(field);
    onClose();
  };

  const subs = category ? (SUBCATEGORIES[category] || []) : [];
  const showOptions = ["Dropdown", "Radio", "Checkbox", "Check box"].includes(fieldType);

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    }}>
      <div style={{
        background: "#fff", borderRadius: 12, width: 700, maxHeight: "90vh",
        overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: 0 }}>
            {editField ? "Edit Field" : "Add Field"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" }}>✕</button>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Field Details toggle row */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>Field Details</span>
            <span style={{ width: 16, height: 16, borderRadius: "50%", border: "1px solid #d1d5db", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#6b7280", cursor: "default" }}>?</span>
            <Toggle value={true} onChange={() => {}} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 20, marginBottom: 20 }}>
            {/* Image upload */}
            <div style={{
              border: "2px dashed #d1d5db", borderRadius: 8, height: 140,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#9ca3af", gap: 8,
            }}>
              <span style={{ fontSize: 28 }}>🖼️</span>
              <span style={{ fontSize: 12 }}>Click to upload image</span>
            </div>

            {/* Right side fields */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Field Name */}
              <div style={{ position: "relative" }}>
                <label style={{ fontSize: 11, color: "#6b7280", fontWeight: 500, display: "block", marginBottom: 4 }}>Field Name</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Field Name"
                  style={{
                    width: "100%", padding: "10px 12px",
                    border: `1px solid ${name ? "#22c55e" : "#d1d5db"}`,
                    borderRadius: 6, fontSize: 14, outline: "none", boxSizing: "border-box",
                  }}
                />
                {name && <span style={{ position: "absolute", right: 10, top: 32, color: "#22c55e" }}>✓</span>}
              </div>

              {/* Category + Sub Category */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label style={{ fontSize: 11, color: "#6b7280", fontWeight: 500, display: "block", marginBottom: 4 }}>Category</label>
                  <select
                    value={category}
                    onChange={e => { setCategory(e.target.value); setSubcategory(""); }}
                    style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, color: category ? "#111827" : "#9ca3af" }}
                  >
                    <option value="">Select category</option>
                    {MAIN_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: "#6b7280", fontWeight: 500, display: "block", marginBottom: 4 }}>Sub Category</label>
                  <select
                    value={subcategory}
                    onChange={e => setSubcategory(e.target.value)}
                    disabled={!category || subs.length === 0}
                    style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, color: subcategory ? "#111827" : "#9ca3af" }}
                  >
                    <option value="">{category ? "Select sub category" : "Select category first"}</option>
                    {subs.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Field Type + Required/System Default */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 11, color: "#6b7280", fontWeight: 500, display: "block", marginBottom: 4 }}>Field Type</label>
                  <select
                    value={fieldType}
                    onChange={e => setFieldType(e.target.value as FieldType)}
                    style={{ width: "100%", padding: "8px 10px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13 }}
                  >
                    {FIELD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div style={{ display: "flex", gap: 16, paddingBottom: 2 }}>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#374151", cursor: "pointer" }}>
                    <input type="checkbox" checked={required} onChange={e => setRequired(e.target.checked)} />
                    Required field
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#374151", cursor: "pointer" }}>
                    <input type="checkbox" checked={systemDefault} onChange={e => setSystemDefault(e.target.checked)} />
                    System default
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Enter your field description here."
              rows={3}
              style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "10px 12px", fontSize: 13, resize: "vertical", outline: "none", boxSizing: "border-box" }}
            />
          </div>

          {/* Tabs */}
          <div style={{ borderBottom: "1px solid #e5e7eb", marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 0 }}>
              {(["options", "pricing", "link"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: "10px 16px", border: "none", background: "none", cursor: "pointer",
                    fontSize: 13, fontWeight: tab === t ? 600 : 400,
                    color: tab === t ? "#1d4ed8" : "#6b7280",
                    borderBottom: tab === t ? "2px solid #1d4ed8" : "2px solid transparent",
                    display: "flex", alignItems: "center", gap: 6,
                  }}
                >
                  {t === "link" && "🔗 "}
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                  {t === "link" && " Product"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab: Options */}
          {tab === "options" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                  {showOptions
                    ? "Manage the selectable choices for this field. These options will appear in slips when this field is used."
                    : `This field type (${fieldType}) does not use predefined options.`}
                </p>
                {showOptions && (
                  <button
                    onClick={addOption}
                    style={{ padding: "7px 14px", border: "1px solid #d1d5db", borderRadius: 6, background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                  >Add option</button>
                )}
              </div>

              {showOptions && (
                <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #e5e7eb", borderRadius: 6, overflow: "hidden" }}>
                  <thead>
                    <tr style={{ background: "#f9fafb" }}>
                      {["", "Option", "Image", "Price", "Default", "Status", "Actions"].map((h, i) => (
                        <th key={i} style={{ padding: "10px 12px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6b7280", borderBottom: "1px solid #e5e7eb" }}>{h === "" ? <input type="checkbox" /> : h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {options.length === 0 ? (
                      <tr><td colSpan={7} style={{ padding: "20px", textAlign: "center", color: "#9ca3af", fontSize: 13 }}>No options yet. Click "Add option" to add choices.</td></tr>
                    ) : options.map((opt, i) => (
                      <tr key={opt.id} style={{ borderBottom: i < options.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                        <td style={{ padding: "8px 12px" }}><input type="checkbox" /></td>
                        <td style={{ padding: "8px 12px" }}>
                          <input
                            value={opt.label}
                            onChange={e => updateOption(opt.id, "label", e.target.value)}
                            placeholder="Option label"
                            style={{ border: "1px solid #d1d5db", borderRadius: 4, padding: "4px 8px", fontSize: 13, width: 120 }}
                          />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <div style={{ width: 32, height: 32, background: "#f3f4f6", borderRadius: 4, border: "1px solid #e5e7eb", cursor: "pointer" }} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <span style={{ color: "#6b7280", fontSize: 13 }}>$</span>
                            <input
                              type="number"
                              value={opt.price}
                              onChange={e => updateOption(opt.id, "price", parseFloat(e.target.value) || 0)}
                              style={{ border: "1px solid #d1d5db", borderRadius: 4, padding: "4px 8px", fontSize: 13, width: 60 }}
                            />
                          </div>
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <input type="radio" checked={opt.isDefault} onChange={() => setDefaultOption(opt.id)} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <Toggle value={opt.status} onChange={v => updateOption(opt.id, "status", v)} />
                        </td>
                        <td style={{ padding: "8px 12px" }}>
                          <div style={{ display: "flex", gap: 4 }}>
                            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#6b7280" }}>✏️</button>
                            <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#6b7280" }}>📋</button>
                            <button onClick={() => removeOption(opt.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#ef4444" }}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* Tab: Pricing */}
          {tab === "pricing" && (
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#374151", cursor: "pointer", marginBottom: 16 }}>
                <input type="checkbox" checked={hasPricing} onChange={e => setHasPricing(e.target.checked)} />
                This field can add additional charges
              </label>

              {hasPricing && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {PRICING_MODELS.filter(p => p).map(p => (
                    <label key={p} style={{
                      display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px",
                      border: `1px solid ${pricing === p ? "#1d4ed8" : "#e5e7eb"}`,
                      borderRadius: 8, cursor: "pointer",
                      background: pricing === p ? "#eff6ff" : "#fff",
                    }}>
                      <input type="radio" checked={pricing === p} onChange={() => setPricing(p)} style={{ marginTop: 2 }} />
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Charge {p.toLowerCase()}</div>
                        <div style={{ fontSize: 12, color: "#6b7280" }}>
                          {p === "Per case" ? "One charge per case/order" :
                           p === "Per tooth" ? "Charge per tooth configured" :
                           p === "Per field" ? "Charge per field usage" :
                           p === "Per unit" ? "Charge per unit" :
                           p === "Per item" ? "Charge per item" : "Charge per file uploaded"}
                        </div>
                      </div>
                    </label>
                  ))}
                  {showOptions && pricing && (
                    <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                      Set price adjustments per option in the{" "}
                      <span onClick={() => setTab("options")} style={{ color: "#1d4ed8", cursor: "pointer", fontWeight: 600 }}>Options tab</span>.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tab: Link Product */}
          {tab === "link" && (
            <div>
              <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>
                Select which linked categories or products this field applies to.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Implant Library", "Add-Ons", "Metal", "Shade", "Default Case Config", "Additional Settings"].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setLinkedProducts(prev =>
                      prev.includes(cat) ? prev.filter(p => p !== cat) : [...prev, cat]
                    )}
                    style={{
                      padding: "6px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer",
                      border: `1px solid ${linkedProducts.includes(cat) ? "#1d4ed8" : "#d1d5db"}`,
                      background: linkedProducts.includes(cat) ? "#dbeafe" : "#fff",
                      color: linkedProducts.includes(cat) ? "#1d4ed8" : "#374151",
                      fontWeight: linkedProducts.includes(cat) ? 600 : 400,
                    }}
                  >
                    {linkedProducts.includes(cat) ? "✓ " : ""}{cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", justifyContent: "flex-end", gap: 10,
          padding: "16px 24px", borderTop: "1px solid #e5e7eb",
        }}>
          <button
            onClick={onClose}
            style={{ padding: "9px 20px", border: "1px solid #d1d5db", borderRadius: 6, background: "#fff", fontSize: 14, cursor: "pointer", color: "#374151" }}
          >Cancel</button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            style={{
              padding: "9px 20px", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer",
              background: name.trim() ? "#1d4ed8" : "#93c5fd", color: "#fff",
            }}
          >Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ── Link Products Modal ────────────────────────────────────────────────────────
const SAMPLE_PRODUCTS = [
  "Acrylic Fracture Repair Add /1 tooth", "Acrylic Partial", "Add 1 tooth to flexible",
  "Adjustment of Occlusion", "Attachment Crown (Precision)", "Band & Loop", "Bionator",
  "Cantilever Bridge", "Full Arch Hybrid", "Full Cast Crown", "Full Contour Zirconia Crown",
  "Implant-Supported Zirconia Bridge", "Lithium Disilicate Crown (e.max)", "PFM Crown",
  "Splinted Crowns", "Standard Bridge",
];

const SAMPLE_FIELDS_FOR_LINK = [
  { name: "Implant Details", type: "Implant Library - Dropdown", sub: "implant_library • Implant" },
  { name: "Alloy Type", type: "Dropdown", sub: "dropdown • Alloy" },
  { name: "Metal Design", type: "Dropdown", sub: "dropdown • Metal Design" },
  { name: "Base Shade", type: "Dropdown", sub: "dropdown • Base Shade" },
  { name: "Cervical Shade", type: "Shade Guide", sub: "shade_guide • Crown thirds shade" },
  { name: "Body Shade", type: "Shade Guide", sub: "shade_guide • Crown thirds shade" },
  { name: "Characterization", type: "Checkbox", sub: "checkbox • Custom Shade" },
  { name: "Pontic Design", type: "Dropdown", sub: "dropdown • Pontic" },
];

function LinkProductModal({ onClose }: { onClose: () => void }) {
  const [selectedFields, setSelectedFields] = useState<string[]>(["Implant Details", "Alloy Type", "Metal Design"]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["Acrylic Fracture Repair Add /1 tooth", "Acrylic Partial"]);
  const [searchFields, setSearchFields] = useState("");
  const [searchProducts, setSearchProducts] = useState("");
  const [tab, setTab] = useState<"individual" | "category">("individual");

  const toggleField = (name: string) =>
    setSelectedFields(prev => prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]);
  const toggleProduct = (name: string) =>
    setSelectedProducts(prev => prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]);

  const filteredFields = SAMPLE_FIELDS_FOR_LINK.filter(f => f.name.toLowerCase().includes(searchFields.toLowerCase()));
  const filteredProducts = SAMPLE_PRODUCTS.filter(p => p.toLowerCase().includes(searchProducts.toLowerCase()));

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: 12, width: 780, maxHeight: "88vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", borderBottom: "1px solid #e5e7eb" }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>Link Products to Field</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1px 1fr", flex: 1, minHeight: 0 }}>
          {/* Left: Select Fields */}
          <div style={{ display: "flex", flexDirection: "column", padding: 20, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 15 }}>⚙️</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>Select Fields</span>
            </div>
            <div style={{ position: "relative", marginBottom: 12 }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 13 }}>🔍</span>
              <input value={searchFields} onChange={e => setSearchFields(e.target.value)} placeholder="Search Fields..."
                style={{ width: "100%", padding: "8px 12px 8px 30px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
              {filteredFields.map(f => {
                const selected = selectedFields.includes(f.name);
                return (
                  <div key={f.name} onClick={() => toggleField(f.name)} style={{
                    padding: "10px 12px", borderRadius: 8, cursor: "pointer",
                    border: `1px solid ${selected ? "#1d4ed8" : "#e5e7eb"}`,
                    background: selected ? "#eff6ff" : "#fff",
                    display: "flex", alignItems: "flex-start", gap: 8,
                  }}>
                    <input type="checkbox" checked={selected} onChange={() => {}} style={{ marginTop: 2, accentColor: "#1d4ed8" }} />
                    <div>
                      <div style={{ fontWeight: selected ? 600 : 400, fontSize: 13, color: "#111827" }}>{f.name}</div>
                      <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>– • {f.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button onClick={() => setSelectedFields(SAMPLE_FIELDS_FOR_LINK.map(f => f.name))}
                style={{ background: "none", border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>
                Select all
              </button>
              <span style={{ fontSize: 12, color: "#6b7280" }}>{selectedFields.length} fields selected</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ background: "#e5e7eb" }} />

          {/* Right: Assign Products */}
          <div style={{ display: "flex", flexDirection: "column", padding: 20, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 15 }}>📦</span>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>Assign to These Products</span>
            </div>

            {/* By Individual / By Category tabs */}
            <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
              <button onClick={() => setTab("individual")} style={{
                padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                background: tab === "individual" ? "#1d4ed8" : "#f3f4f6",
                color: tab === "individual" ? "#fff" : "#374151",
              }}>By Individual Products</button>
              <button onClick={() => setTab("category")} style={{
                padding: "6px 14px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                background: tab === "category" ? "#1d4ed8" : "#f3f4f6",
                color: tab === "category" ? "#fff" : "#374151",
              }}>By Category</button>
            </div>

            <div style={{ position: "relative", marginBottom: 12 }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 13 }}>🔍</span>
              <input value={searchProducts} onChange={e => setSearchProducts(e.target.value)} placeholder="Search Products..."
                style={{ width: "100%", padding: "8px 12px 8px 30px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
            </div>

            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
              {filteredProducts.map(p => {
                const selected = selectedProducts.includes(p);
                return (
                  <div key={p} onClick={() => toggleProduct(p)} style={{
                    padding: "9px 12px", borderRadius: 6, cursor: "pointer",
                    border: `1px solid ${selected ? "#1d4ed8" : "#e5e7eb"}`,
                    background: selected ? "#eff6ff" : "#fff",
                    display: "flex", alignItems: "center", gap: 8,
                  }}>
                    <input type="checkbox" checked={selected} onChange={() => {}} style={{ accentColor: "#1d4ed8" }} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: selected ? "#22c55e" : "#d1d5db", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#111827", fontWeight: selected ? 500 : 400, flex: 1 }}>{p}</span>
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>Uncategorized</span>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button onClick={() => setSelectedProducts(SAMPLE_PRODUCTS)}
                style={{ background: "none", border: "1px solid #d1d5db", borderRadius: 6, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>
                Select all
              </button>
              <span style={{ fontSize: 12, color: "#6b7280" }}>{selectedProducts.length} products selected</span>
            </div>
          </div>
        </div>

        {/* Legend + Footer */}
        <div style={{ borderTop: "1px solid #e5e7eb", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12, color: "#6b7280" }}>
            <span style={{ fontWeight: 600 }}>Legend:</span>
            {[{ color: "#22c55e", label: "All Image Configured" }, { color: "#f59e0b", label: "Some Image Configured" }, { color: "#d1d5db", label: "No Image Configured" }].map(l => (
              <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.color, display: "inline-block" }} />
                {l.label}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose} style={{ padding: "8px 18px", border: "1px solid #d1d5db", borderRadius: 6, background: "#fff", fontSize: 13, cursor: "pointer" }}>Cancel</button>
            <button onClick={onClose} style={{ padding: "8px 18px", border: "none", borderRadius: 6, background: "#1d4ed8", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              📦 Apply products to field
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function AdvanceModeFieldsPage() {
  const [fields, setFields] = useState<AdvanceField[]>(INITIAL_FIELDS);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editField, setEditField] = useState<AdvanceField | null>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);

  const filtered = fields.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (field: AdvanceField) => {
    setFields(prev => {
      const idx = prev.findIndex(f => f.id === field.id);
      if (idx >= 0) { const next = [...prev]; next[idx] = field; return next; }
      return [...prev, field];
    });
  };

  const toggleStatus = (id: string) => {
    setFields(prev => prev.map(f => f.id === id ? { ...f, status: !f.status } : f));
  };

  return (
    <div style={{ flex: 1, padding: "28px 32px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚙️</div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Fields</h1>
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Manage fields for advance mode</p>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#374151" }}>Show</span>
          <select style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: "4px 8px", fontSize: 13 }}>
            <option>10</option><option>25</option><option>50</option>
          </select>
          <span style={{ fontSize: 13, color: "#374151" }}>entries</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={() => { setEditField(null); setShowAddModal(true); }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >+ Add fields</button>
          <button
            onClick={() => setShowLinkModal(true)}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >🔗 Link Product</button>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 13 }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search Fields..."
              style={{ padding: "8px 12px 8px 30px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, outline: "none", width: 180 }} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ padding: "11px 16px", width: 32 }}><input type="checkbox" /></th>
              {["Field Name ↕", "Subcategory ↕", "Code ↕", "Type ↕", "Pricing ↕", "Price ↕", "Linked Category / Products ↕", "Status ↕", ""].map((h, i) => (
                <th key={i} style={{ padding: "11px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((field, i) => (
              <tr key={field.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <td style={{ padding: "12px 16px" }}><input type="checkbox" /></td>
                <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 600, color: "#111827" }}>{field.name}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#6b7280" }}>{field.subcategory}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#9ca3af" }}>–</td>
                <td style={{ padding: "12px 14px" }}>{typeBadge(field.type)}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{field.pricing || "–"}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{field.price > 0 ? `$${field.price.toFixed(2)}` : "$0.00"}</td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 13, color: "#374151" }}>{field.linkedProducts[0] || "—"}</span>
                    {field.linkedProducts.length > 0 && (
                      <span style={{ cursor: "pointer", color: "#6b7280", fontSize: 14 }}>🔗</span>
                    )}
                  </div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Toggle value={field.status} onChange={() => toggleStatus(field.id)} />
                    <span style={{ fontSize: 12, color: field.status ? "#16a34a" : "#6b7280", fontWeight: 500 }}>
                      {field.status ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button onClick={() => { setEditField(field); setShowAddModal(true); }}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "#6b7280" }}>✏️</button>
                    <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "#6b7280" }}>📋</button>
                    <button onClick={() => setFields(prev => prev.filter(f => f.id !== field.id))}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: 15, color: "#ef4444" }}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "#6b7280" }}>Showing 1 to {filtered.length} of {filtered.length} entries</span>
          <div style={{ display: "flex", gap: 4 }}>
            {["‹", "1", "›"].map((btn, i) => (
              <button key={i} style={{ padding: "4px 10px", border: i === 1 ? "none" : "1px solid #d1d5db", borderRadius: 4, background: i === 1 ? "#1d4ed8" : "#fff", fontSize: 13, cursor: "pointer", color: i === 1 ? "#fff" : "#374151", fontWeight: i === 1 ? 600 : 400 }}>{btn}</button>
            ))}
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddFieldModal
          onClose={() => { setShowAddModal(false); setEditField(null); }}
          onSave={handleSave}
          editField={editField}
        />
      )}
      {showLinkModal && <LinkProductModal onClose={() => setShowLinkModal(false)} />}
    </div>
  );
}
