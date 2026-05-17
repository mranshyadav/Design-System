// Editorial.jsx — pull-quote section
const Editorial = () => (
  <section style={{ padding: "96px 0", borderTop: "1px solid var(--border-1)" }}>
    <div className="mk-container" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 64 }}>
      <div>
        <div className="mk-eyebrow" style={{ marginBottom: 16 }}>— Customer · 002</div>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)",
          letterSpacing: "0.04em", lineHeight: 1.8,
        }}>
          Northwind Data<br/>
          Platform team, 14 engineers<br/>
          Migrated: Q4 2025<br/>
          Pipelines: 312
        </div>
      </div>
      <blockquote style={{ margin: 0 }}>
        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(28px, 3.2vw, 44px)",
          lineHeight: 1.2, letterSpacing: "-0.015em",
          margin: 0, color: "var(--fg-1)", textWrap: "balance",
        }}>
          <em style={{ fontStyle: "italic" }}>“</em>We deleted four internal tools the week we adopted SRIIO. The schema registry alone replaced a system one engineer maintained full-time. Six months in, we haven't had a single schema-related production incident.<em style={{ fontStyle: "italic" }}>”</em>
        </p>
        <footer style={{
          marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--border-1)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500 }}>Priya Ramanathan</div>
            <div style={{ fontSize: 13, color: "var(--fg-3)" }}>Director of Data Platform, Northwind</div>
          </div>
          <a href="#" className="mk-btn mk-btn--ghost mk-arrow">Read the case study</a>
        </footer>
      </blockquote>
    </div>
  </section>
);
window.Editorial = Editorial;
