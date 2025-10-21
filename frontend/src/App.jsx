import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans overflow-x-hidden">
      {/* HEADER FIJO */}
      <Header/>

      {/* CONTENIDO CENTRAL */}
      <AppRoutes />

      {/* FOOTER FIJO */}
      <Footer />
    </div>
  );
}

export default App;
