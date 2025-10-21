import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/catalogo");
  };

  const handleMenuClick = (item) => {
    const rutas = {
      "Inicio": "/",
      "Series, Peliculas": "/catalogo", 
      "Mangas": "/mangas",
      "Mawa": "/mawa",
      "Mi Lista": "/mi-lista",
      "Novedades": "/novedades"
    };
    
    navigate(rutas[item]);
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-lg border-b border-cyan-500/20 w-full py-4 px-8 flex justify-between items-center fixed top-0 z-50">
      {/* Logo y título */}
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
          <span className="font-bold text-white text-xl">🎬</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          StreamVerse
        </h1>
      </div>

      {/* Menú de navegación - EXACTAMENTE IGUAL */}
      <nav className="hidden lg:flex space-x-8">
        {["Inicio", "Series, Peliculas", "Mangas", "Mawa", "Mi Lista", "Novedades"].map((item) => (
          <a 
            key={item} 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleMenuClick(item);
            }}
            className="relative group"
          >
            <span className="text-gray-300 group-hover:text-cyan-400 transition-all duration-300 font-medium">
              {item}
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
        ))}
      </nav>

      {/* Botón de login */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleLoginClick}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105"
        >
          Iniciar sesión
        </button>
      </div>
    </header>
  );
}

export default Header;