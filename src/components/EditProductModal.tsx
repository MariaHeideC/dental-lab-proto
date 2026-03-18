"use client";

import { useState } from "react";
import { Product } from "@/lib/data";
import AdvanceFieldsTab from "./AdvanceFieldsTab";

interface Props {
  productId: string;
  product?: Product;
  onClose: () => void;
}

const TABS = ["Product Details", "Grades", "Stages", "Impressions", "Gum Shade", "Teeth Shade", "Material", "Add-Ons", "Retention", "Extractions", "Advance Fields", "Office Pricing", "Visibility"];

function PlaceholderTab({ name }: { name: string }) {
  return (
    <div style={{ padding: "40px 0", textAlign: "center", color: "#9ca3af" }}>
      <div style={{ fontSize: 32, marginBottom: 10 }}>📋</div>
      <p style={{ fontWeight: 600, marginBottom: 4 }}>{name}</p>
      <p style={{ fontSize: 13 }}>This tab is managed in the production app.</p>
    </div>
  );
}

export default function EditProductModal({ productId, product, onClose }: Props) {
  const [activeTab, setActiveTab] = useState("Product Details");

  // Use product prop if available, otherwise show generic
  const name = product?.name || productId;
  const icon = product?.icon || "📦";

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
      <div style={{ background: "#fff", borderRadius: 12, width: 820, maxHeight: "92vh", display: "flex", flexDirection: "column", boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
        {/* Header */}
        <div style={{ padding: "18px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>{icon}</span>
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>{name}</h2>
              <span style={{ fontSize: 12, color: "#9ca3af", fontFamily: "monospace" }}>{productId}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: "1px solid #e5e7eb", overflowX: "auto", flexShrink: 0 }}>
          <div style={{ display: "flex", padding: "0 24px", gap: 0, minWidth: "max-content" }}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "12px 14px", border: "none", background: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: activeTab === tab ? 700 : 400,
                  color: activeTab === tab ? "#1d4ed8" : "#6b7280",
                  borderBottom: activeTab === tab ? "2px solid #1d4ed8" : "2px solid transparent",
                  whiteSpace: "nowrap",
                }}
              >{tab}</button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {activeTab === "Advance Fields" ? (
            <AdvanceFieldsTab productCode={productId} />
          ) : activeTab === "Product Details" ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Product Name", value: name },
                { label: "Product Code", value: productId },
                { label: "Category", value: product?.category || "Fixed" },
                { label: "Sub Category", value: product?.subCategory || "Single Crowns" },
                { label: "Base Price", value: `$${product?.price || 0}` },
              ].map(field => (
                <div key={field.label}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>{field.label}</label>
                  <input defaultValue={field.value} style={{ width: "100%", padding: "9px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14, color: "#111827", outline: "none", boxSizing: "border-box" }} />
                </div>
              ))}
            </div>
          ) : (
            <PlaceholderTab name={activeTab} />
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 24px", borderTop: "1px solid #e5e7eb", display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose} style={{ padding: "9px 20px", border: "1px solid #d1d5db", borderRadius: 6, background: "#fff", fontSize: 14, cursor: "pointer", color: "#374151" }}>Cancel</button>
          <button onClick={onClose} style={{ padding: "9px 20px", border: "none", borderRadius: 6, background: "#1d4ed8", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}
