// CTA.jsx — closing band
const CTA = () => (
  <section style={{ padding: "96px 0", background: "var(--ink)", color: "var(--paper)" }}>
    <div className="mk-container" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64, alignItems: "center" }}>
      <div>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 12,
          letterSpacing: "0.08em", textTransform: "uppercase",
          color: "var(--graphite-40)", marginBottom: 24,
        }}>
          — Get started
        </div>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(40px, 5vw, 64px)",
          lineHeight: 1.05, letterSpacing: "-0.02em",
          margin: 0, fontWeight: 400,
        }}>
          Wire your first pipeline in <em style={{ fontStyle: "italic" }}>under ten minutes</em>.
        </h2>
        <p style={{
          marginTop: 24, fontSize: 17, lineHeight: 1.6, maxWidth: 540,
          color: "var(--graphite-25)",
        }}>
          Free up to 1M events / month. No credit card. Self-host on your own VPC any time.
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <a href="#" className="mk-btn mk-btn--accent mk-arrow" style={{ justifyContent: "center", padding: "14px 18px", fontSize: 15 }}>
          Start free
        </a>
        <a href="#" className="mk-btn" style={{
          justifyContent: "center", padding: "14px 18px", fontSize: 15,
          background: "transparent", color: "var(--paper)",
          border: "1px solid rgba(244,241,234,0.25)",
        }}>
          Talk to engineering →
        </a>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--graphite-40)",
          letterSpacing: "0.04em", textAlign: "center", marginTop: 8,
        }}>
          curl -fsSL sriio.dev/install.sh | sh
        </div>
      </div>
    </div>
  </section>
);
window.CTA = CTA;
