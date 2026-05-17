// Footer.jsx — four-column footer
const COLUMNS = [
  { head: "Product", items: ["Platform", "Schemas", "Pipelines", "Registry", "Audit log"] },
  { head: "Developers", items: ["Docs", "API reference", "SDKs", "Changelog", "Status"] },
  { head: "Company", items: ["About", "Customers", "Careers", "Press", "Brand"] },
  { head: "Legal", items: ["Terms", "Privacy", "Security", "DPA", "SOC 2"] },
];

const Footer = () => (
  <footer style={{ padding: "80px 0 40px", borderTop: "1px solid var(--border-1)" }}>
    <div className="mk-container">
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(4, 1fr)", gap: 48, marginBottom: 64 }}>
        <div>
          <img src="../../assets/sriio-wordmark.svg" alt="SRIIO" style={{ height: 28, display: "block", marginBottom: 16 }} />
          <p style={{ color: "var(--fg-3)", fontSize: 13, lineHeight: 1.6, margin: 0, maxWidth: 280 }}>
            A precision layer for critical systems. Typed, versioned, audited end-to-end.
          </p>
        </div>
        {COLUMNS.map((c) => (
          <div key={c.head}>
            <div className="mk-eyebrow" style={{ marginBottom: 14 }}>{c.head}</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {c.items.map((i) => (
                <li key={i}><a href="#" style={{ fontSize: 14, color: "var(--fg-2)" }}>{i}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <hr className="mk-rule" />
      <div style={{
        paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)",
        letterSpacing: "0.04em", textTransform: "uppercase",
      }}>
        <span>© 2026 SRIIO · All systems operational</span>
        <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--success)" }}></span>
          status.sriio.dev
        </span>
      </div>
    </div>
  </footer>
);
window.Footer = Footer;
