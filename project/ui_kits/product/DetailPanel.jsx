// DetailPanel.jsx — right slide-over for selected pipeline
const DetailPanel = ({ pipelineId, onClose }) => {
  const p = window.PIPELINES.find(x => x.id === pipelineId);
  if (!p) return null;
  const color = window.STATUS_COLORS[p.status];
  return (
    <aside style={{
      width: 420, borderLeft: "1px solid var(--border-1)",
      background: "var(--surface)", height: "100%",
      display: "flex", flexDirection: "column",
      animation: "slidein 200ms var(--ease-standard)",
    }}>
      <style>{`@keyframes slidein { from { transform: translateX(8px); opacity: 0 } to { transform: translateX(0); opacity: 1 } }`}</style>

      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-1)", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-3)" }}>— Pipeline</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginTop: 4 }}>{p.name}</div>
        </div>
        <button className="icon-btn" onClick={onClose}><span className="glyph">✕</span></button>
      </div>

      {/* Status block */}
      <div style={{ padding: "20px", borderBottom: "1px solid var(--border-1)" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "5px 10px", borderRadius: 2,
          fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
          letterSpacing: "0.04em", textTransform: "uppercase",
          color, background: `${color}1A`, border: `1px solid ${color}4D`,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: color }}></span>
          {p.statusLabel}
        </div>
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1, letterSpacing: "-0.02em" }}>{p.p95}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-3)", marginTop: 4 }}>p95 latency</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1, letterSpacing: "-0.02em" }}>{p.rate}</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-3)", marginTop: 4 }}>throughput</div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, lineHeight: 1, letterSpacing: "-0.02em", color: p.status === "danger" ? "var(--danger)" : "var(--fg-1)" }}>
              {p.status === "danger" ? "2" : "0"}
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-3)", marginTop: 4 }}>errors · 24h</div>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div style={{ padding: "20px", borderBottom: "1px solid var(--border-1)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-3)", marginBottom: 12 }}>— Configuration</div>
        {[
          ["Schema", p.schema],
          ["Region", p.region],
          ["Owner", p.owner],
          ["Updated", p.updated],
          ["Created", "2025-11-04 09:12:00Z"],
          ["Source", "postgres-primary"],
          ["Sink", "warehouse-snowflake"],
        ].map(([k, v]) => (
          <div key={k} style={{
            display: "flex", justifyContent: "space-between",
            padding: "8px 0", borderBottom: "1px solid var(--border-1)",
            fontSize: 13,
          }}>
            <span style={{ color: "var(--fg-3)" }}>{k}</span>
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--fg-1)" }}>{v}</span>
          </div>
        ))}
      </div>

      {/* Recent runs */}
      <div style={{ padding: "20px", flex: 1, overflow: "auto" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-3)", marginBottom: 12 }}>— Recent runs</div>
        {[
          ["14:02:11Z", "ok", "12.4 ms"],
          ["13:57:00Z", "ok", "11.8 ms"],
          ["13:52:00Z", "ok", "13.2 ms"],
          ["13:47:00Z", "ok", "12.0 ms"],
          ["13:42:00Z", "warning", "62.4 ms"],
        ].map(([t, s, l], i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "1fr 80px 80px", gap: 12,
            padding: "8px 0", borderBottom: "1px solid var(--border-1)",
            fontFamily: "var(--font-mono)", fontSize: 12, alignItems: "center",
          }}>
            <span style={{ color: "var(--fg-2)" }}>{t}</span>
            <span style={{ color: window.STATUS_COLORS[s] }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: window.STATUS_COLORS[s], display: "inline-block", marginRight: 6, verticalAlign: "middle" }}></span>
              {s}
            </span>
            <span style={{ textAlign: "right" }}>{l}</span>
          </div>
        ))}
      </div>

      {/* Footer actions */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border-1)", display: "flex", gap: 8 }}>
        <button style={{
          flex: 1, padding: "10px 14px", background: "var(--ink)", color: "var(--surface)",
          border: 0, borderRadius: 4, fontSize: 13, fontWeight: 500,
        }}>Open in editor →</button>
        <button style={{
          padding: "10px 14px", background: "var(--surface)", color: "var(--fg-1)",
          border: "1px solid var(--border-1)", borderRadius: 4, fontSize: 13, fontWeight: 500,
        }}>Replay</button>
      </div>
    </aside>
  );
};

window.DetailPanel = DetailPanel;
