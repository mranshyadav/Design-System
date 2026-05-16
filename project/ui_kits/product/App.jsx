// App.jsx — product app composition
const { useState, useEffect } = React;

const App = () => {
  const [active, setActive] = useState("pipelines");
  const [selectedId, setSelectedId] = useState("p2");
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setPaletteOpen(true);
      }
      if (e.key === "Escape") setPaletteOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar active={active} setActive={setActive} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <TopBar onOpenPalette={() => setPaletteOpen(true)} />
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <PipelineTable selectedId={selectedId} onSelect={setSelectedId} />
          {selectedId && <DetailPanel pipelineId={selectedId} onClose={() => setSelectedId(null)} />}
        </div>
      </div>
      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} />}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
