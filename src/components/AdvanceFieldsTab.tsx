"use client";

import { useState } from "react";
import { AdvanceField, ADVANCE_FIELDS, PRODUCT_FIELD_MAP } from "@/lib/advanceFields";

interface Props {
  productCode: string;
}

function TypeBadge({ type }: { type: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    Dropdown: { bg: "#dbeafe", color: "#1d4ed8" },
    Radio: { bg: "#dcfce7", color: "#15803d" },
    Checkbox: { bg: "#fef3c7", color: "#d97706" },
    "Check box": { bg: "#fef3c7", color: "#d97706" },
    Number: { bg: "#f3e8ff", color: "#7c3aed" },
    Text: { bg: "#f1f5f9", color: "#475569" },
    Multiline: { bg: "#f1f5f9", color: "#475569" },
    "Shade Guide": { bg: "#fce7f3", color: "#be185d" },
    "File Upload": { bg: "#ffedd5", color: "#c2410c" },
  };
  const c = map[type] || { bg: "#f1f5f9", color: "#475569" };
  return <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, background: c.bg, color: c.color }}>{type}</span>;
}

export default function AdvanceFieldsTab({ productCode }: Props) {
  const initialIds = PRODUCT_FIELD_MAP[productCode] ?? [];
  const [linkedIds, setLinkedIds] = useState<string[]>(initialIds);
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);

  const linkedFields = linkedIds
    .map(id => ADVANCE_FIELDS.find(f => f.id === id))
    .filter(Boolean) as AdvanceField[];

  const unlinkedFields = ADVANCE_FIELDS.filter(f => !linkedIds.includes(f.id));

  const removeField = (id: string) => {
    setLinkedIds(prev => prev.filter(i => i !== id));
    setConfirmRemove(null);
  };

  const addField = (id: string) => {
    setLinkedIds(prev => [...prev, id]);
    setShowAddModal(false);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div>
          <p style={{ fontSize: 13, color: "#6b7280" }}>
            {linkedFields.length} advance field{linkedFields.length !== 1 ? "s" : ""} linked to this product.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{ padding: "8px 16px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
        >
          + Link Field
        </button>
      </div>

      {/* Table */}
      {linkedFields.length === 0 ? (
        <div style={{ padding: "40px 0", textAlign: "center", color: "#9ca3af", border: "1px dashed #e5e7eb", borderRadius: 8 }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>⚙️</div>
          <p style={{ fontWeight: 600, marginBottom: 4 }}>No advance fields linked</p>
          <p style={{ fontSize: 13 }}>Click 'Link Field' to attach advance fields to this product.</p>
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden" }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
              {["Field Name", "Category", "Type", "Pricing", "Actions"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linkedFields.map((field, i) => (
              <tr key={field.id} style={{ borderBottom: i < linkedFields.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 600, color: "#111827" }}>{field.name}</td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#6b7280" }}>{field.subcategory || field.category}</td>
                <td style={{ padding: "12px 14px" }}><TypeBadge type={field.type} /></td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>{field.pricing || "—"}</td>
                <td style={{ padding: "12px 14px" }}>
                  {confirmRemove === field.id ? (
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#ef4444" }}>Remove?</span>
                      <button onClick={() => removeField(field.id)} style={{ padding: "3px 10px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 4, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>Yes</button>
                      <button onClick={() => setConfirmRemove(null)} style={{ padding: "3px 10px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 4, fontSize: 12, cursor: "pointer" }}>No</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmRemove(field.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444", fontSize: 18 }}>🗑️</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Field Modal */}
      {showAddModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }}>
          <div style={{ background: "#fff", borderRadius: 12, width: 520, maxHeight: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ padding: "18px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0 }}>Link Advance Field</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#6b7280" }}>✕</button>
            </div>
            <div style={{ overflowY: "auto", padding: 16, flex: 1 }}>
              {unlinkedFields.length === 0 ? (
                <p style={{ color: "#6b7280", textAlign: "center", padding: 24, fontSize: 13 }}>All available fields are already linked.</p>
              ) : (
                Object.entries(
                  unlinkedFields.reduce((acc, f) => {
                    const key = f.subcategory || f.category;
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(f);
                    return acc;
                  }, {} as Record<string, AdvanceField[]>)
                ).map(([group, fields]) => (
                  <div key={group} style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>{group}</p>
                    {fields.map(field => (
                      <div
                        key={field.id}
                        onClick={() => addField(field.id)}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderRadius: 6, border: "1px solid #e5e7eb", marginBottom: 6, cursor: "pointer", background: "#fff" }}
                        onMouseEnter={e => (e.currentTarget.style.background = "#eff6ff")}
                        onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                      >
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{field.name}</div>
                          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{field.pricing || "No pricing"}</div>
                        </div>
                        <TypeBadge type={field.type} />
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
