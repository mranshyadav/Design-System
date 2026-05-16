// PipelineTable.jsx — main data view
const PIPELINES = [
  { id: "p1", name: "orders.normalize",    status: "ok",        statusLabel: "deployed",  schema: "v2.4.1", region: "us-east-1", p95: "12.4 ms", rate: "3.2 K / min", updated: "14:02:11Z", owner: "data-platform" },
  { id: "p2", name: "events.dedupe",       status: "ok",        statusLabel: "deployed",  schema: "v1.0.7", region: "us-east-1", p95: "9.1 ms",  rate: "8.7 K / min", updated: "13:58:02Z", owner: "data-platform" },
  { id: "p3", name: "payments.audit",      status: "warning",   statusLabel: "throttled", schema: "v3.2.0", region: "eu-west-1", p95: "48.6 ms", rate: "210 / min",   updated: "13:41:33Z", owner: "trust-safety" },
  { id: "p4", name: "users.enrich",        status: "danger",    statusLabel: "failed",    schema: "v0.9.2", region: "us-east-1", p95: "—",       rate: "—",            updated: "13:22:18Z", owner: "growth" },
  { id: "p5", name: "inventory.reconcile", status: "ok",        statusLabel: "deployed",  schema: "v4.1.0", region: "us-east-1", p95: "22.0 ms", rate: "1.4 K / min", updated: "13:14:09Z", owner: "operations" },
  { id: "p6", name: "billing.export",      status: "neutral",   statusLabel: "queued",    schema: "v1.1.3", region: "us-east-1", p95: "—",       rate: "—",            updated: "12:59:00Z", owner: "finance" },
  { id: "p7", name: "logs.partition",      status: "ok",        statusLabel: "deployed",  schema: "v6.0.0", region: "eu-west-1", p95: "5.8 ms",  rate: "42.1 K / min", updated: "12:48:21Z", owner: "platform-eng" },
  { id: "p8", name: "ml.features.daily",   status: "ok",        statusLabel: "deployed",  schema: "v2.0.0", region: "us-west-2", p95: "180 ms",  rate: "scheduled",   updated: "12:31:00Z", owner: "ml-platform" },
];

const STATUS_COLORS = { ok: "#1F6B47", warning: "#8A5A14", danger: "#9A2222", neutral: "#8E939C" };

const Filters = () => (
  <div style={{
    display: "flex", alignItems: "center", gap: 8,
    padding: "12px 24px", borderBottom: "1px solid var(--border-1)",
  }}>
    <button style={chipStyle(true)}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block", marginRight: 8 }}></span>
      All pipelines · 8
    </button>
    <button style={chipStyle()}>Healthy · 5</button>
    <button style={chipStyle()}>Needs attention · 2</button>
    <button style={chipStyle()}>Archived</button>
    <div style={{ flex: 1 }} />
    <button style={chipStyle()}><span className="glyph">⊞</span> Region: any</button>
    <button style={chipStyle()}><span className="glyph">↕</span> Updated: today</button>
    <button style={chipStyle()}><span className="glyph">⌗</span> Owner: all</button>
  </div>
);

const chipStyle = (active) => ({
  display: "inline-flex", alignItems: "center", gap: 6,
  padding: "5px 10px", fontSize: 13, fontWeight: 500,
  background: active ? "var(--surface)" : "transparent",
  color: active ? "var(--fg-1)" : "var(--fg-2)",
  border: `1px solid ${active ? "var(--border-2)" : "var(--border-1)"}`,
  borderRadius: 4, cursor: "pointer",
});

const PipelineTable = ({ selectedId, onSelect }) => {
  const headStyle = {
    fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500,
    letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-3)",
    textAlign: "left", padding: "10px 16px", background: "var(--bg-3)",
    borderBottom: "1px solid var(--border-1)",
    position: "sticky", top: 0,
  };
  const cellStyle = {
    padding: "14px 16px", fontSize: 13, color: "var(--fg-1)",
    borderBottom: "1px solid var(--border-1)", verticalAlign: "middle",
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Filters />
      <div style={{ flex: 1, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...headStyle, paddingLeft: 24, width: 28 }}></th>
              <th style={headStyle}>Pipeline</th>
              <th style={headStyle}>Status</th>
              <th style={headStyle}>Schema</th>
              <th style={headStyle}>Region</th>
              <th style={{ ...headStyle, textAlign: "right" }}>p95</th>
              <th style={{ ...headStyle, textAlign: "right" }}>Throughput</th>
              <th style={headStyle}>Owner</th>
              <th style={{ ...headStyle, paddingRight: 24 }}>Updated</th>
            </tr>
          </thead>
          <tbody>
            {PIPELINES.map((p) => {
              const sel = p.id === selectedId;
              return (
                <tr key={p.id}
                  onClick={() => onSelect(p.id)}
                  style={{
                    background: sel ? "rgba(31,63,224,0.06)" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <td style={{ ...cellStyle, paddingLeft: 24, boxShadow: sel ? "inset 2px 0 0 var(--accent)" : "none" }}>
                    <input type="checkbox" style={{ accentColor: "var(--accent)" }} onClick={(e) => e.stopPropagation()} />
                  </td>
                  <td style={{ ...cellStyle, fontWeight: 500 }}>{p.name}</td>
                  <td style={cellStyle}>
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 500,
                      letterSpacing: "0.04em", textTransform: "uppercase",
                      color: STATUS_COLORS[p.status],
                    }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS_COLORS[p.status] }}></span>
                      {p.statusLabel}
                    </span>
                  </td>
                  <td style={{ ...cellStyle, fontFamily: "var(--font-mono)" }}>{p.schema}</td>
                  <td style={{ ...cellStyle, fontFamily: "var(--font-mono)", color: "var(--fg-2)" }}>{p.region}</td>
                  <td style={{ ...cellStyle, fontFamily: "var(--font-mono)", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{p.p95}</td>
                  <td style={{ ...cellStyle, fontFamily: "var(--font-mono)", textAlign: "right", color: "var(--fg-2)" }}>{p.rate}</td>
                  <td style={{ ...cellStyle, color: "var(--fg-2)" }}>{p.owner}</td>
                  <td style={{ ...cellStyle, fontFamily: "var(--font-mono)", color: "var(--fg-3)", paddingRight: 24 }}>{p.updated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Footer */}
      <div style={{
        padding: "10px 24px", borderTop: "1px solid var(--border-1)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)",
        letterSpacing: "0.04em",
      }}>
        <span>8 pipelines · 5 deployed · 1 throttled · 1 failed · 1 queued</span>
        <span>refreshed 14:02:11Z</span>
      </div>
    </div>
  );
};

window.PipelineTable = PipelineTable;
window.PIPELINES = PIPELINES;
window.STATUS_COLORS = STATUS_COLORS;
