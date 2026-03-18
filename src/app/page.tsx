"use client";

import { useState } from "react";
import Sidebar, { ActivePage } from "@/components/Sidebar";
import ProductsPage from "@/components/ProductsPage";
import PlaceholderPage from "@/components/PlaceholderPage";
import AdvanceModeFieldsPage from "@/components/AdvanceModeFieldsPage";

// ── Mock slip data ────────────────────────────────────────────────────────────
const MOCK_SLIPS = [
  { id: "RXN-2025-001", patient: "John Smith", doctor: "Dr. Williams", date: "2025-01-15", status: "In Progress", products: 3 },
  { id: "RXN-2025-002", patient: "Maria Garcia", doctor: "Dr. Chen", date: "2025-01-14", status: "Completed", products: 1 },
  { id: "RXN-2025-003", patient: "Robert Johnson", doctor: "Dr. Patel", date: "2025-01-13", status: "Pending", products: 2 },
];

// ── Dashboard ─────────────────────────────────────────────────────────────────
function DashboardPage() {
  return (
    <div style={{ flex: 1, padding: "28px 32px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 }}>Dashboard</h1>
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0, marginTop: 2 }}>Lab Slip Management</p>
        </div>
        <button style={{ padding: "9px 18px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
          + New Slip
        </button>
      </div>

      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
              {["Slip ID", "Patient", "Doctor", "Date", "Products", "Status"].map(h => (
                <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#6b7280", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_SLIPS.map((slip, i) => (
              <tr key={slip.id} style={{ borderBottom: i < MOCK_SLIPS.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#6366f1" }}>{slip.id}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "#111827" }}>{slip.patient}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{slip.doctor}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "#6b7280" }}>{slip.date}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "#374151" }}>{slip.products}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                    background: slip.status === "Completed" ? "#dcfce7" : slip.status === "In Progress" ? "#dbeafe" : "#fef3c7",
                    color: slip.status === "Completed" ? "#16a34a" : slip.status === "In Progress" ? "#1d4ed8" : "#d97706",
                  }}>{slip.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Page router ───────────────────────────────────────────────────────────────
function PageContent({ page }: { page: ActivePage }) {
  switch (page) {
    case "dashboard": return <DashboardPage />;
    case "products": return <ProductsPage />;
    case "advance-fields": return <AdvanceModeFieldsPage />;
    case "category": return <PlaceholderPage title="Category" />;
    case "sub-category": return <PlaceholderPage title="Sub Category" />;
    case "addons": return <PlaceholderPage title="Add-ons" />;
    case "stages": return <PlaceholderPage title="Stages" />;
    case "grades": return <PlaceholderPage title="Grades" />;
    case "tooth-mapping": return <PlaceholderPage title="Tooth Mapping" />;
    case "impression": return <PlaceholderPage title="Impression" />;
    case "teeth-shade": return <PlaceholderPage title="Teeth Shade" />;
    case "gum-shade": return <PlaceholderPage title="Gum Shade" />;
    case "retention": return <PlaceholderPage title="Retention" />;
    case "material": return <PlaceholderPage title="Material" />;
    case "advance-mode": return <PlaceholderPage title="Advance Mode" />;
    case "case-management": return <PlaceholderPage title="Case Management" />;
    case "user-management": return <PlaceholderPage title="User Management" />;
    case "production": return <PlaceholderPage title="Production" />;
    case "billing": return <PlaceholderPage title="Billing & Subscription" />;
    case "system-settings": return <PlaceholderPage title="System Settings" />;
    case "lab-profile": return <PlaceholderPage title="Lab Profile" />;
    case "lab-management": return <PlaceholderPage title="Lab Management" />;
    default: return <DashboardPage />;
  }
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafb" }}>
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <PageContent page={activePage} />
    </div>
  );
}
