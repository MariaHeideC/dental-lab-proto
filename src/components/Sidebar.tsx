"use client";

import { useState } from "react";

export type ActivePage =
  | "dashboard"
  | "lab-profile"
  | "lab-management"
  | "products"
  | "category"
  | "sub-category"
  | "addons"
  | "stages"
  | "grades"
  | "tooth-mapping"
  | "impression"
  | "teeth-shade"
  | "gum-shade"
  | "retention"
  | "material"
  | "advance-mode"
  | "advance-fields"
  | "case-management"
  | "user-management"
  | "production"
  | "billing"
  | "system-settings";

interface SidebarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
}

const PRODUCT_SUB_PAGES: ActivePage[] = [
  "products", "category", "sub-category", "addons", "stages", "grades",
  "tooth-mapping", "impression", "teeth-shade", "gum-shade", "retention", "material",
];

const BOTTOM_NAV = [
  { id: "case-management" as ActivePage, label: "Case Management", icon: "📁" },
  { id: "user-management" as ActivePage, label: "User Management", icon: "👥" },
  { id: "production" as ActivePage, label: "Production", icon: "🏭" },
  { id: "billing" as ActivePage, label: "Billing & Subscription", icon: "💳" },
  { id: "system-settings" as ActivePage, label: "System Settings", icon: "⚙️" },
];

const PRODUCT_MGMT_ITEMS = [
  { id: "addons" as ActivePage, label: "Add-ons" },
  { id: "stages" as ActivePage, label: "Stages" },
  { id: "grades" as ActivePage, label: "Grades" },
  { id: "tooth-mapping" as ActivePage, label: "Tooth Mapping" },
  { id: "impression" as ActivePage, label: "Impression" },
  { id: "teeth-shade" as ActivePage, label: "Teeth Shade" },
  { id: "gum-shade" as ActivePage, label: "Gum Shade" },
  { id: "retention" as ActivePage, label: "Retention" },
  { id: "material" as ActivePage, label: "Material" },
];

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [prodExpanded, setProdExpanded] = useState(true);
  const [productsSubExpanded, setProductsSubExpanded] = useState(true);
  const [advanceExpanded, setAdvanceExpanded] = useState(true);

  const isProductPage = PRODUCT_SUB_PAGES.includes(activePage);
  const isAdvancePage = activePage === "advance-mode" || activePage === "advance-fields";

  const navBtn = (active: boolean) => ({
    width: "100%", display: "flex", alignItems: "center", gap: 8,
    padding: "9px 16px", background: active ? "#ede9fe" : "transparent",
    border: "none", borderLeft: active ? "3px solid #6366f1" : "3px solid transparent",
    cursor: "pointer", color: active ? "#6366f1" : "#374151",
    fontWeight: active ? 600 : 400, fontSize: 14, textAlign: "left" as const,
  });

  const subBtn = (active: boolean, indent: number) => ({
    width: "100%", display: "block",
    padding: `7px 16px 7px ${indent}px`,
    background: active ? "#ede9fe" : "transparent", border: "none",
    borderLeft: active ? "3px solid #6366f1" : "3px solid transparent",
    cursor: "pointer", color: active ? "#6366f1" : "#4b5563",
    fontWeight: active ? 600 : 400, fontSize: 13, textAlign: "left" as const,
  });

  return (
    <aside style={{
      width: 240, minHeight: "100vh", background: "#fff",
      borderRight: "1px solid #e5e7eb", display: "flex",
      flexDirection: "column", flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: 14, fontWeight: 700,
        }}>R</div>
        <span style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>Rxn3D</span>
      </div>

      <nav style={{ flex: 1, padding: "8px 0", overflowY: "auto" }}>
        {/* Dashboard */}
        <button onClick={() => onNavigate("dashboard")} style={navBtn(activePage === "dashboard")}>
          <span style={{ fontSize: 15 }}>⊞</span> Dashboard
        </button>
        {/* Lab Profile */}
        <button onClick={() => onNavigate("lab-profile")} style={navBtn(activePage === "lab-profile")}>
          <span style={{ fontSize: 15 }}>🧪</span> Lab Profile
        </button>
        {/* Lab Management */}
        <button onClick={() => onNavigate("lab-management")} style={navBtn(activePage === "lab-management")}>
          <span style={{ fontSize: 15 }}>📋</span> Lab Management
        </button>

        {/* Product Management */}
        <button onClick={() => setProdExpanded(p => !p)} style={navBtn(isProductPage)}>
          <span style={{ fontSize: 15 }}>📦</span>
          <span style={{ flex: 1 }}>Product Management</span>
          <span style={{ fontSize: 11 }}>{prodExpanded ? "▾" : "▸"}</span>
        </button>
        {prodExpanded && (
          <div style={{ background: "#f9fafb" }}>
            <button onClick={() => setProductsSubExpanded(p => !p)} style={{
              width: "100%", display: "flex", alignItems: "center",
              padding: "8px 16px 8px 36px", background: "transparent",
              border: "none", borderLeft: "3px solid transparent",
              cursor: "pointer", color: "#374151", fontWeight: 600,
              fontSize: 13, textAlign: "left" as const,
            }}>
              <span style={{ flex: 1 }}>Products</span>
              <span style={{ fontSize: 11 }}>{productsSubExpanded ? "▾" : "▸"}</span>
            </button>
            {productsSubExpanded && (
              <>
                {([
                  { id: "products" as ActivePage, label: "Products" },
                  { id: "category" as ActivePage, label: "Category" },
                  { id: "sub-category" as ActivePage, label: "Sub Category" },
                ]).map(sub => (
                  <button key={sub.id} onClick={() => onNavigate(sub.id)} style={subBtn(activePage === sub.id, 52)}>
                    {sub.label}
                  </button>
                ))}
              </>
            )}
            {PRODUCT_MGMT_ITEMS.map(item => (
              <button key={item.id} onClick={() => onNavigate(item.id)} style={subBtn(activePage === item.id, 36)}>
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* Advance Mode */}
        <button onClick={() => setAdvanceExpanded(p => !p)} style={navBtn(isAdvancePage)}>
          <span style={{ fontSize: 15 }}>⚡</span>
          <span style={{ flex: 1 }}>Advance Mode</span>
          <span style={{ fontSize: 11 }}>{advanceExpanded ? "▾" : "▸"}</span>
        </button>
        {advanceExpanded && (
          <div style={{ background: "#f9fafb" }}>
            <button onClick={() => onNavigate("advance-fields")} style={subBtn(activePage === "advance-fields", 36)}>
              Advance fields
            </button>
          </div>
        )}

        {/* Bottom nav items */}
        {BOTTOM_NAV.map(item => (
          <button key={item.id} onClick={() => onNavigate(item.id)} style={navBtn(activePage === item.id)}>
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
