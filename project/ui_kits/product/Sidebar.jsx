// Sidebar.jsx — workspace + section nav
const NAV_SECTIONS = [
  {
    head: "Workspace",
    items: [
      { id: "pipelines", g: "▦", label: "Pipelines", count: 12 },
      { id: "sources",   g: "◇", label: "Sources",   count: 5 },
      { id: "schemas",   g: "≡", label: "Schemas",   count: 38 },
      { id: "registry",  g: "◈", label: "Registry" },
      { id: "audit",     g: "◉", label: "Audit log" },
    ],
  },
  {
    head: "Develop",
    items: [
      { id: "playground", g: "▷", label: "Playground" },
      { id: "sdks",       g: "{}", label: "SDKs" },
      { id: "webhooks",   g: "↗", label: "Webhooks" },
    ],
  },
  {
    head: "Account",
    items: [
      { id: "members",    g: "◌", label: "Members" },
      { id: "billing",    g: "$", label: "Billing" },
      { id: "settings",   g: "⚙", label: "Settings" },
    ],
  },
];

const NavItem = ({ g, label, count, active, onClick }) => (
  <button onClick={onClick} style={{
    display: "flex", alignItems: "center", gap: 10, width: "100%",
    padding: "6px 8px", border: 0, borderRadius: 4,
    background: active ? "rgba(31,63,224,0.08)" : "transparent",
    color: active ? "var(--accent)" : "var(--fg-2)",
    fontSize: 13, fontWeight: active ? 500 : 400,
    textAlign: "left", cursor: "pointer",
    transition: "background 120ms var(--ease-standard)",
    boxShadow: active ? "inset 2px 0 0 var(--accent)" : "none",
  }}
  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--bg-3)"; }}
  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
  >
    <span className="glyph" style={{ width: 16 }}>{g}</span>
    <span style={{ flex: 1 }}>{label}</span>
    {count !== undefined && (
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: 11,
        color: active ? "var(--accent)" : "var(--fg-3)",
      }}>{count}</span>
    )}
  </button>
);

const Sidebar = ({ active, setActive }) => (
  <aside style={{
    width: 240, height: "100vh",
    background: "var(--paper)",
    borderRight: "1px solid var(--border-1)",
    padding: "16px 12px",
    display: "flex", flexDirection: "column", gap: 24,
    overflow: "hidden",
  }}>
    {/* Workspace switcher */}
    <button style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "8px 10px", background: "var(--surface)",
      border: "1px solid var(--border-1)", borderRadius: 6,
      width: "100%", textAlign: "left",
    }}>
      <span style={{
        width: 24, height: 24, borderRadius: 4,
        background: "var(--ink)", color: "var(--paper)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 16,
      }}>A</span>
      <div style={{ flex: 1, lineHeight: 1.2 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: "var(--fg-1)" }}>acme-prod</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.04em" }}>WORKSPACE · PRO</div>
      </div>
      <span className="glyph" style={{ color: "var(--fg-3)" }}>⌄</span>
    </button>

    <nav style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 20 }}>
      {NAV_SECTIONS.map((sec) => (
        <div key={sec.head}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 10,
            letterSpacing: "0.08em", textTransform: "uppercase",
            color: "var(--fg-3)", padding: "0 8px", marginBottom: 6,
          }}>— {sec.head}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {sec.items.map((it) => (
              <NavItem key={it.id} {...it}
                active={active === it.id}
                onClick={() => setActive(it.id)} />
            ))}
          </div>
        </div>
      ))}
    </nav>

    {/* Footer */}
    <div style={{
      borderTop: "1px solid var(--border-1)", paddingTop: 12,
      display: "flex", alignItems: "center", gap: 10,
    }}>
      <span style={{
        width: 28, height: 28, borderRadius: "50%",
        background: "var(--graphite-85)", color: "var(--paper)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 500,
      }}>PR</span>
      <div style={{ flex: 1, lineHeight: 1.2 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>Priya R.</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)" }}>admin</div>
      </div>
      <button className="icon-btn"><span className="glyph">⌃</span></button>
    </div>
  </aside>
);

window.Sidebar = Sidebar;
window.NavItem = NavItem;
