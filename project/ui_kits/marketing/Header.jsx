// Header.jsx — sticky top nav
const Header = () => {
  const linkStyle = {
    fontSize: 14, color: "var(--fg-2)", padding: "8px 12px",
    borderRadius: 4, transition: "background 120ms var(--ease-standard), color 120ms var(--ease-standard)",
  };
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(244, 241, 234, 0.88)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border-1)",
    }}>
      <div className="mk-container" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64,
      }}>
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <img src="../../assets/sriio-wordmark.svg" alt="SRIIO" style={{ height: 28 }} />
        </a>
        <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <a href="#" style={linkStyle}>Platform</a>
          <a href="#" style={linkStyle}>Schemas</a>
          <a href="#" style={linkStyle}>Docs</a>
          <a href="#" style={linkStyle}>Pricing</a>
          <a href="#" style={linkStyle}>Changelog</a>
        </nav>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a href="#" className="mk-btn mk-btn--text">Sign in</a>
          <a href="#" className="mk-btn mk-btn--primary mk-arrow">Start free</a>
        </div>
      </div>
    </header>
  );
};
window.Header = Header;
