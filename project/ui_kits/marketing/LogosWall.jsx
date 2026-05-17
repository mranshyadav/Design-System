// LogosWall.jsx — neutral trust row (wordmark text placeholders)
const LogosWall = () => {
  const logos = ["NORTHWIND", "MERIDIAN", "CORTEX-AI", "PRAXIS", "AURIGA", "STILLWATER"];
  return (
    <section style={{ padding: "64px 0", borderTop: "1px solid var(--border-1)", borderBottom: "1px solid var(--border-1)" }}>
      <div className="mk-container">
        <div className="mk-eyebrow" style={{ textAlign: "center", marginBottom: 28 }}>
          Trusted by data teams at
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${logos.length}, 1fr)`,
          gap: 32, alignItems: "center", justifyItems: "center",
        }}>
          {logos.map((l) => (
            <span key={l} style={{
              fontFamily: "var(--font-mono)",
              fontSize: 14, fontWeight: 600,
              letterSpacing: "0.12em",
              color: "var(--graphite-55)",
            }}>{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
window.LogosWall = LogosWall;
