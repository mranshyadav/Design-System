// Hero.jsx — editorial serif headline + console placeholder
const Hero = () => {
  return (
    <section style={{ padding: "96px 0 64px" }}>
      <div className="mk-container" style={{
        display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64, alignItems: "center",
      }}>
        <div>
          <div className="mk-eyebrow mk-eyebrow--accent" style={{ marginBottom: 24 }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", marginRight: 10, verticalAlign: "middle" }}></span>
            v2.4 · Typed payloads now generally available
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 6vw, 88px)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            fontWeight: 400,
            margin: 0,
            color: "var(--fg-1)",
            maxWidth: 640,
          }}>
            A precision layer for <em style={{ fontStyle: "italic" }}>critical</em> systems.
          </h1>
          <p style={{
            marginTop: 28, fontSize: 18, lineHeight: 1.6,
            color: "var(--fg-2)", maxWidth: 520,
          }}>
            SRIIO sits between your data sources and the systems that act on them — typed, versioned, and audited end-to-end. Breaking changes fail at the boundary, not in production.
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 12, alignItems: "center" }}>
            <a href="#" className="mk-btn mk-btn--primary mk-arrow">Start free</a>
            <a href="#" className="mk-btn mk-btn--ghost">Read the docs</a>
          </div>
          <div style={{
            marginTop: 40, display: "inline-flex", gap: 14, alignItems: "center",
            fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)",
            letterSpacing: "0.04em", textTransform: "uppercase",
          }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--success)" }}></span>
            SOC 2 Type II
            <span style={{ color: "var(--graphite-15)" }}>·</span>
            HIPAA-eligible
            <span style={{ color: "var(--graphite-15)" }}>·</span>
            VPC-isolated
          </div>
        </div>

        <ConsolePreview />
      </div>
    </section>
  );
};

const ConsolePreview = () => {
  const rowStyle = { display: "grid", gridTemplateColumns: "1fr 80px 80px 80px", gap: 12, padding: "10px 16px", fontFamily: "var(--font-mono)", fontSize: 12, alignItems: "center", borderTop: "1px solid var(--border-1)" };
  const dot = (c) => <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: c, marginRight: 10, verticalAlign: "middle" }}></span>;
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid var(--border-1)",
      borderRadius: 12,
      boxShadow: "var(--shadow-2)",
      overflow: "hidden",
    }}>
      {/* Window chrome */}
      <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--border-1)", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--graphite-15)" }}></span>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--graphite-15)" }}></span>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--graphite-15)" }}></span>
        <span style={{ marginLeft: 12, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", letterSpacing: "0.04em" }}>
          sriio · acme-prod · pipelines
        </span>
      </div>
      {/* Header strip */}
      <div style={{ padding: "10px 16px", display: "grid", gridTemplateColumns: "1fr 80px 80px 80px", gap: 12, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.08em", textTransform: "uppercase", background: "var(--bg-3)" }}>
        <span>Pipeline</span><span>Status</span><span>Schema</span><span style={{ textAlign: "right" }}>p95</span>
      </div>
      {/* Rows */}
      <div style={rowStyle}>
        <span>orders.normalize</span>
        <span>{dot("#1F6B47")}ok</span>
        <span>v2.4.1</span>
        <span style={{ textAlign: "right" }}>12.4 ms</span>
      </div>
      <div style={{ ...rowStyle, background: "rgba(31,63,224,0.06)", boxShadow: "inset 2px 0 0 var(--accent)" }}>
        <span>events.dedupe</span>
        <span>{dot("#1F6B47")}ok</span>
        <span>v1.0.7</span>
        <span style={{ textAlign: "right" }}>9.1 ms</span>
      </div>
      <div style={rowStyle}>
        <span>payments.audit</span>
        <span>{dot("#8A5A14")}throttled</span>
        <span>v3.2.0</span>
        <span style={{ textAlign: "right" }}>48.6 ms</span>
      </div>
      <div style={rowStyle}>
        <span>users.enrich</span>
        <span>{dot("#9A2222")}failed</span>
        <span>v0.9.2</span>
        <span style={{ textAlign: "right", color: "var(--fg-3)" }}>—</span>
      </div>
      <div style={rowStyle}>
        <span>inventory.reconcile</span>
        <span>{dot("#1F6B47")}ok</span>
        <span>v4.1.0</span>
        <span style={{ textAlign: "right" }}>22.0 ms</span>
      </div>
      {/* Footer */}
      <div style={{ padding: "10px 16px", borderTop: "1px solid var(--border-1)", display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)" }}>
        <span>5 pipelines · 3 healthy · 1 throttled · 1 failed</span>
        <span>updated 14:02:11Z</span>
      </div>
    </div>
  );
};

window.Hero = Hero;
