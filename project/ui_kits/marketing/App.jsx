// App.jsx — root composition
const App = () => (
  <>
    <Header />
    <main>
      <Hero />
      <LogosWall />
      <Features />
      <Editorial />
      <CTA />
    </main>
    <Footer />
  </>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
