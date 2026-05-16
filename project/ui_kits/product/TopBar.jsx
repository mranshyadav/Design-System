// TopBar.jsx — breadcrumb + search + actions
const TopBar = ({ onOpenPalette }) => (
  <header style={{
    display: "flex", alignItems: "center", gap: 16,
    height: 56, padding: "0 24px",
    borderBottom: "1px solid var(--border-1)",
    background: "rgba(244,241,234,0.85)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  }}>
    {/* Breadcrumb */}
    <nav style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
      <a href="#" style={{ color: "var(--fg-3)" }}>acme-prod</a>
      <span style={{ color: "var(--graphite-25)", fontFamily: "var(--font-mono)" }}>/</span>
      <a href="#" style={{ color: "var(--fg-3)" }}>pipelines</a>
      <span style={{ color: "var(--graphite-25)", fontFamily: "var(--font-mono)" }}>/</span>
      <span style={{ color: "var(--fg-1)", fontWeight: 500 }}>all</span>
    </nav>

    <div style={{ flex: 1 }} />

    {/* Search */}
    <button onClick={onOpenPalette} style={{
      display: "flex", alignItems: "center", gap: 10,
      width: 280, padding: "6px 10px",
      background: "var(--surface)",
      border: "1px solid var(--border-1)",
      borderRadius: 4, color: "var(--fg-3)", fontSize: 13,
      textAlign: "left",
    }}>
      <span className="glyph">⌕</span>
      <span style={{ flex: 1 }}>Search or jump to…</span>
      <span className="kbd">⌘K</span>
    </button>

    {/* Right cluster */}
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <button className="icon-btn" title="Activity"><span className="glyph">⏱</span></button>
      <button className="icon-btn" title="Notifications"><span className="glyph">⌖</span></button>
      <button className="icon-btn" title="Help"><span className="glyph">?</span></button>
    </div>

    {/* New pipeline */}
    <button style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "8px 12px", background: "var(--ink)", color: "var(--surface)",
      border: 0, borderRadius: 4, fontSize: 13, fontWeight: 500,
    }}>
      <span>+</span> New pipeline
    </button>
  </header>
);

window.TopBar = TopBar;
