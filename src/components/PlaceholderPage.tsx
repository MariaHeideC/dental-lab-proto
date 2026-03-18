"use client";

interface Props { title: string; description?: string; }

export default function PlaceholderPage({ title, description }: Props) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 48, color: "#6b7280" }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>🚧</div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8 }}>{title}</h2>
      <p style={{ fontSize: 14, textAlign: "center", maxWidth: 320 }}>
        {description || "This section is part of the production app and is not included in this prototype."}
      </p>
    </div>
  );
}
