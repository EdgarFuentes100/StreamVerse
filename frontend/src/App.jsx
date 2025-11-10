import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white font-sans overflow-x-hidden">
      {/* HEADER */}
      <Header />

      {/* CONTENIDO CENTRAL FLEXIBLE */}
      <main className="flex-1">
        <AppRoutes />
      </main>

      {/* FOOTER PEGADO ABAJO */}
      <Footer />
    </div>
  );
}

export default App;
