// Features.jsx — 3-up feature grid
const FEATURES = [
  {
    eyebrow: "01 · Typed",
    title: "End-to-end types, end-to-end.",
    body: "Every payload carries its schema. Breaking changes fail at the boundary, not in production. No more 3am Slack threads about a missing field.",
    metric: { v: "100%", k: "compile-time coverage" },
  },
  {
    eyebrow: "02 · Versioned",
    title: "Every schema is a deploy.",
    body: "Schemas are first-class artifacts — promoted through environments, signed at the registry, and rolled back as cleanly as application code.",
    metric: { v: "v2.4.1", k: "current stable" },
  },
  {
    eyebrow: "03 · Audited",
    title: "Cryptographic provenance.",
    body: "Every payload signed, every transformation traced, every export logged. Replay any decision your systems made, six months later.",
    metric: { v: "12 mo", k: "default retention" },
  },
];

const FeatureCard = ({ eyebrow, title, body, metric }) => (
  <article style={{
    background: "var(--surface)",
    border: "1px solid var(--border-1)",
    borderRadius: 8,
    padding: 32,
    display: "flex", flexDirection: "column", gap: 16,
    minHeight: 320,
  }}>
    <div className="mk-eyebrow">{eyebrow}</div>
    <h3 style={{
      fontFamily: "var(--font-sans)", fontSize: 24, fontWeight: 600,
      letterSpacing: "-0.01em", lineHeight: 1.2, margin: 0,
    }}>{title}</h3>
    <p style={{ color: "var(--fg-2)", fontSize: 15, lineHeight: 1.6, margin: 0, flex: 1 }}>
      {body}
    </p>
    <div style={{
      display: "flex", alignItems: "baseline", gap: 10,
      borderTop: "1px solid var(--border-1)", paddingTop: 16,
    }}>
      <span style={{
        fontFamily: "var(--font-display)", fontSize: 32, lineHeight: 1,
        letterSpacing: "-0.02em",
      }}>{metric.v}</span>
      <span style={{
        fontFamily: "var(--font-mono)", fontSize: 11,
        letterSpacing: "0.06em", textTransform: "uppercase",
        color: "var(--fg-3)",
      }}>{metric.k}</span>
    </div>
  </article>
);

const Features = () => (
  <section style={{ padding: "96px 0" }}>
    <div className="mk-container">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 64, marginBottom: 48 }}>
        <div className="mk-eyebrow">— Foundations</div>
        <h2 style={{
          fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4vw, 56px)",
          lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0,
          fontWeight: 400, maxWidth: 720,
        }}>
          Three guarantees, <em style={{ fontStyle: "italic" }}>composable</em> end-to-end.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {FEATURES.map((f) => <FeatureCard key={f.eyebrow} {...f} />)}
      </div>
    </div>
  </section>
);

window.Features = Features;
