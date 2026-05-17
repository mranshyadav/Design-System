// CommandPalette.jsx — ⌘K overlay
const COMMANDS = [
  { group: "Navigate", items: [
    { g: "▦", label: "Go to Pipelines",      hint: "G P" },
    { g: "◇", label: "Go to Sources",        hint: "G S" },
    { g: "≡", label: "Go to Schemas",        hint: "G C" },
    { g: "◉", label: "Go to Audit log",      hint: "G A" },
  ]},
  { group: "Actions", items: [
    { g: "+", label: "New pipeline",         hint: "N P" },
    { g: "+", label: "New schema",           hint: "N S" },
    { g: "↗", label: "Connect a source",     hint: "" },
    { g: "↺", label: "Replay last 24h",      hint: "" },
  ]},
  { group: "Recent", items: [
    { g: "·", label: "orders.normalize",     hint: "" },
    { g: "·", label: "events.dedupe",        hint: "" },
    { g: "·", label: "payments.audit",       hint: "" },
  ]},
];

const CommandPalette = ({ onClose }) => (
  <div onClick={onClose} style={{
    position: "fixed", inset: 0, zIndex: 100,
    background: "rgba(14,15,18,0.40)",
    display: "flex", alignItems: "flex-start", justifyContent: "center",
    paddingTop: "12vh",
    animation: "fade 160ms var(--ease-standard)",
  }}>
    <style>{`@keyframes fade { from { opacity: 0 } to { opacity: 1 } }`}</style>
    <div onClick={(e) => e.stopPropagation()} style={{
      width: 560, background: "var(--surface)",
      border: "1px solid var(--border-1)",
      borderRadius: 12, boxShadow: "var(--shadow-3)",
      overflow: "hidden",
      animation: "rise 200ms var(--ease-standard)",
    }}>
      <style>{`@keyframes rise { from { transform: translateY(8px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }`}</style>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "16px 20px", borderBottom: "1px solid var(--border-1)",
      }}>
        <span className="glyph" style={{ color: "var(--fg-3)" }}>⌕</span>
        <input autoFocus placeholder="Search or jump to anything…" style={{
          flex: 1, border: 0, outline: 0,
          fontSize: 15, color: "var(--fg-1)", background: "transparent",
          fontFamily: "var(--font-sans)",
        }} />
        <span className="kbd">esc</span>
      </div>
      <div style={{ maxHeight: 420, overflow: "auto", padding: "8px 0" }}>
        {COMMANDS.map((sec, si) => (
          <div key={sec.group} style={{ padding: "6px 0" }}>
            <div style={{
              padding: "6px 20px",
              fontFamily: "var(--font-mono)", fontSize: 10,
              letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--fg-3)",
            }}>— {sec.group}</div>
            {sec.items.map((it, i) => {
              const active = si === 0 && i === 0;
              return (
                <button key={it.label} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  width: "100%", padding: "8px 20px", border: 0,
                  background: active ? "rgba(31,63,224,0.08)" : "transparent",
                  color: active ? "var(--fg-1)" : "var(--fg-1)",
                  textAlign: "left", fontSize: 14,
                  boxShadow: active ? "inset 2px 0 0 var(--accent)" : "none",
                }}>
                  <span className="glyph" style={{ color: "var(--fg-3)" }}>{it.g}</span>
                  <span style={{ flex: 1 }}>{it.label}</span>
                  {it.hint && <span style={{ display: "inline-flex", gap: 4 }}>
                    {it.hint.split(" ").map((k) => <span key={k} className="kbd">{k}</span>)}
                  </span>}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{
        padding: "10px 20px", borderTop: "1px solid var(--border-1)",
        display: "flex", justifyContent: "space-between",
        fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)",
        letterSpacing: "0.04em",
      }}>
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <span className="kbd">↑</span><span className="kbd">↓</span> navigate
        </span>
        <span style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <span className="kbd">↵</span> select &nbsp;·&nbsp;
          <span className="kbd">esc</span> close
        </span>
      </div>
    </div>
  </div>
);

window.CommandPalette = CommandPalette;
