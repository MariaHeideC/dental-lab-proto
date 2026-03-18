"use client";

import { useState } from "react";
import { PRODUCTS, Product } from "@/lib/data";
import { PRODUCT_FIELD_MAP } from "@/lib/advanceFields";
import EditProductModal from "./EditProductModal";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "28px 32px", flex: 1 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📦</div>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Products Management</h1>
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Manage your product inventory and configurations</p>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 12, flexWrap: "wrap" as const }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: "#374151" }}>Show</span>
          <select style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: "4px 8px", fontSize: 13 }}>
            <option>10</option><option>25</option><option>50</option>
          </select>
          <span style={{ fontSize: 13, color: "#374151" }}>entries &nbsp; Status</span>
          <select style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: "4px 8px", fontSize: 13 }}>
            <option>All</option><option>Active</option><option>Inactive</option>
          </select>
          <span style={{ fontSize: 13, color: "#374151" }}>Category</span>
          <select style={{ border: "1px solid #d1d5db", borderRadius: 6, padding: "4px 8px", fontSize: 13 }}>
            <option>All</option><option>Fixed</option><option>Removables</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..."
              style={{ padding: "7px 12px 7px 30px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 13, outline: "none", width: 200 }} />
          </div>
          <button style={{ padding: "7px 16px", background: "#1d4ed8", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            + Add Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
              <th style={{ padding: "11px 16px" }}><input type="checkbox" /></th>
              {["Product", "Case Pan", "Category Hierarchy", "Code", "Adv. Fields", "Actions"].map(h => (
                <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((product, i) => {
              const fieldCount = (PRODUCT_FIELD_MAP[product.code] ?? []).length;
              return (
                <tr key={product.code} style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                  <td style={{ padding: "12px 16px" }}><input type="checkbox" /></td>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 18 }}>{product.icon}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>{product.name}</div>
                        <div style={{ fontSize: 12, color: "#9ca3af" }}>{product.code}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "#374151" }}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: "#3b82f6", display: "inline-block" }} />
                      Regular
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 13, color: "#374151" }}>
                    {product.category} → {product.subCategory}
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#6b7280", fontFamily: "monospace" }}>{product.code}</span>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    {fieldCount > 0 ? (
                      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 24, height: 24, borderRadius: "50%", background: "#ede9fe", color: "#6366f1", fontSize: 12, fontWeight: 700 }}>{fieldCount}</span>
                    ) : (
                      <span style={{ color: "#d1d5db" }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setEditingProduct(product)}
                        style={{ padding: "5px 10px", border: "1px solid #d1d5db", borderRadius: 6, background: "#fff", fontSize: 13, cursor: "pointer" }}>✏️</button>
                      <button style={{ padding: "5px 10px", border: "1px solid #fecaca", borderRadius: 6, background: "#fff", fontSize: 13, cursor: "pointer", color: "#ef4444" }}>🗑️</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ padding: "12px 16px", borderTop: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "#6b7280" }}>Showing 1 to {filtered.length} of {PRODUCTS.length} entries</span>
          <div style={{ display: "flex", gap: 4 }}>
            {["‹", "1", "›"].map((btn, i) => (
              <button key={i} style={{ padding: "4px 10px", border: i === 1 ? "none" : "1px solid #d1d5db", borderRadius: 4, background: i === 1 ? "#1d4ed8" : "#fff", fontSize: 13, cursor: "pointer", color: i === 1 ? "#fff" : "#374151", fontWeight: i === 1 ? 600 : 400 }}>{btn}</button>
            ))}
          </div>
        </div>
      </div>

      {editingProduct && (
        <EditProductModal productId={editingProduct.code} product={editingProduct} onClose={() => setEditingProduct(null)} />
      )}
    </div>
  );
}
