import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoginClick = () => {
    navigate("/Login");
    setIsMenuOpen(false); // cierra el menú móvil al hacer click
  };

  const handleMenuClick = (item) => {
    const rutas = {
      "Inicio": "/",
      "Series, Peliculas": "/Catalogo",
      "Mangas": "/Mangas",
      "Mi Lista": "/MiLista",
      "Novedades": "/Novedades"
    };
    navigate(rutas[item]);
    setIsMenuOpen(false);
  };

  // Cerrar menú móvil si el tamaño cambia a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className="bg-gray-900/80 backdrop-blur-lg border-b border-cyan-500/20 w-full py-4 px-8 flex justify-between items-center fixed top-0 z-50">
        {/* Logo y título */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <span className="font-bold text-white text-lg sm:text-xl">🎬</span>
          </div>
          <h1
            className="font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            style={{ fontSize: 'clamp(1rem, 5vw, 2rem)' }}
          >
            Next View
          </h1>
        </div>

        {/* Menú desktop */}
        <nav className="hidden lg:flex space-x-8">
          {["Inicio", "Series, Peliculas", "Mangas", "Mi Lista", "Novedades"].map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => { e.preventDefault(); handleMenuClick(item); }}
              className="relative group"
            >
              <span className="text-gray-300 group-hover:text-cyan-400 transition-all duration-300 font-medium">
                {item}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        {/* Botón login + hamburguesa */}
        <div className="flex items-center space-x-4 lg:space-x-0">
          {/* Botón desktop */}
          <button
            onClick={handleLoginClick}
            className="hidden lg:block bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105 text-sm sm:text-base"
          >
            Iniciar sesión
          </button>

          {/* Botón hamburguesa móvil */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-gray-300 hover:text-cyan-400 transition-colors rounded-lg hover:bg-gray-800/50"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Menú móvil */}
      {isMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 mt-16"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="lg:hidden fixed top-16 left-0 right-0 bg-gray-900/98 backdrop-blur-lg border-b border-cyan-500/20 shadow-xl z-50 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col">
              {["Inicio", "Series, Peliculas", "Mangas", "Mi Lista", "Novedades"].map((item) => (
                <button
                  key={item}
                  onClick={() => handleMenuClick(item)}
                  className="px-1 py-0.25 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 transition-all duration-300 font-medium border-b border-gray-700/10 text-left text-[9px] leading-[1]"
                >
                  {item}
                </button>
              ))}

              {/* Botón login móvil dentro del menú */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-700/50 bg-gray-800/30">
                <button
                  onClick={handleLoginClick}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all text-sm sm:text-base"
                >
                  Iniciar sesión
                </button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

export default Header;
