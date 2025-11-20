import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../api/authContext";
import { adminMenus } from "../data/adminMenuOptions";

function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeAdminMenu, setActiveAdminMenu] = useState(null);
  const { usuario, logout, perfilActivo, setPerfilActivo } = useAuth();
  const adminMenuRef = useRef(null);

  // 🔹 Cerrar sesión completa
  const handleLoginClick = () => {
    if (usuario) {
      logout();
    } else {
      navigate("/Login");
    }
    setIsMenuOpen(false);
    setActiveAdminMenu(null);
  };

  // 🔹 Salir solo del perfil activo
  const handleCerrarPerfil = () => {
    setPerfilActivo(null);
    localStorage.removeItem("perfilActivo");
    localStorage.removeItem("tokenPerfil");
    navigate("/Perfil");
    setIsMenuOpen(false);
    setActiveAdminMenu(null);
  };

  // 🔹 Navegar entre rutas
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

  // 🔹 Navegar a rutas de administración
  const handleAdminMenuClick = (ruta) => {
    navigate(ruta);
    setActiveAdminMenu(null);
    setIsMenuOpen(false);
  };

  // 🔹 Cerrar menú al redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setActiveAdminMenu(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Función SIMPLIFICADA para manejar el toggle de menús móviles
  const handleAdminMenuMobileClick = (menuKey, event) => {
    // Solo toggle si es el mismo menú, si es diferente lo cambiamos
    if (activeAdminMenu === menuKey) {
      setActiveAdminMenu(null);
    } else {
      setActiveAdminMenu(menuKey);
    }
  };

  // 🔹 Función para obtener el color del borde según el menú
  const getMenuBorderColor = (menuKey) => {
    const colors = {
      usuarios: "!border-l-green-500",
      contenido: "!border-l-blue-500",
      finanzas: "!border-l-amber-500",
      configuracion: "!border-l-purple-500"
    };
    return colors[menuKey] || "!border-l-cyan-500";
  };

  // 🔹 Función para obtener el color de fondo del header del menú
  const getMenuHeaderBg = (menuKey) => {
    const colors = {
      usuarios: "!bg-green-500/10",
      contenido: "!bg-blue-500/10",
      finanzas: "!bg-amber-500/10",
      configuracion: "!bg-purple-500/10"
    };
    return colors[menuKey] || "!bg-cyan-500/10";
  };

  return (
    <>
      <header className="!bg-gray-900/80 backdrop-blur-lg border-b !border-cyan-500/20 w-full py-4 px-8 flex justify-between items-center fixed top-0 z-50">
        {/* Logo y título */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 !bg-gradient-to-r !from-cyan-500 !to-purple-500 rounded-xl flex items-center justify-center shadow-lg !shadow-cyan-500/25">
            <span className="font-bold !text-white text-lg sm:text-xl">🎬</span>
          </div>
          <h1
            className="font-bold !bg-gradient-to-r !from-cyan-400 !to-purple-400 bg-clip-text !text-transparent"
            style={{ fontSize: 'clamp(1rem, 5vw, 2rem)' }}
          >
            Next View
          </h1>
        </div>

        {/* Menú desktop */}
        <nav className="hidden lg:flex space-x-8">
          {["Inicio", "Series, Peliculas", "Mangas", "Mi Lista", "Novedades"]
            .filter(item => !(item === "Mi Lista" && !perfilActivo))
            .map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => { e.preventDefault(); handleMenuClick(item); }}
                className="relative group"
              >
                <span className="!text-gray-300 group-hover:!text-cyan-400 transition-all duration-300 font-medium">
                  {item}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 !bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
        </nav>

{/* Botones desktop */}
<div className="hidden lg:flex items-center space-x-4">
  {/* 🔥 MENÚS DE ADMINISTRACIÓN - SOLO PARA ROL 1 */}
  {usuario && usuario.idRol === 1 && (
    <div className="flex items-center space-x-2" ref={adminMenuRef}>
      {adminMenus.map((menu) => (
        <div key={menu.key} className="relative">
          <button
            onClick={() => setActiveAdminMenu(activeAdminMenu === menu.key ? null : menu.key)}
            className={`flex items-center space-x-2 !bg-gradient-to-r ${menu.color} !text-white px-3 py-2 rounded-xl font-semibold hover:!shadow-lg ${menu.hoverColor} transition-all hover:scale-105 text-sm`}
          >
            <span>{menu.icon}</span>
            <span>{menu.label}</span>
            <span className={`transform transition-transform ${activeAdminMenu === menu.key ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {/* Menú desplegable */}
          {activeAdminMenu === menu.key && (
            <div className="absolute top-full right-0 mt-2 w-64 !bg-white/95 backdrop-blur-lg rounded-xl !shadow-2xl !border !border-gray-300 overflow-hidden z-50">
              <div className="p-2">
                <div className="px-3 py-2 !text-gray-800 !border-b !border-gray-300 font-semibold text-sm">
                  {menu.label}
                </div>
                {menu.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAdminMenuClick(option.ruta)}
                    className="w-full flex items-center space-x-3 px-3 py-3 !text-gray-700 hover:!bg-gray-100 hover:!text-gray-900 transition-all duration-200 rounded-lg"
                  >
                    <span className="text-lg">{option.icon}</span>
                    <span className="font-medium text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )}

  {perfilActivo && (
    <button
      onClick={handleCerrarPerfil}
      className="!bg-red-500 !text-white px-3 py-1 rounded-lg hover:opacity-90 transition-all text-sm sm:text-base"
    >
      Salir del perfil
    </button>
  )}
  <button
    onClick={handleLoginClick}
    className="!bg-gradient-to-r !from-cyan-500 !to-purple-500 !text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl font-semibold hover:!shadow-lg hover:!shadow-cyan-500/25 transition-all hover:scale-105 text-sm sm:text-base"
  >
    {usuario ? "Cerrar sesión" : "Iniciar sesión"}
  </button>
</div>

        {/* Botón hamburguesa móvil */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 sm:p-2 !text-gray-300 hover:!text-cyan-400 transition-colors rounded-lg !bg-gray-800/30 hover:!bg-gray-800/50"
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
            className="lg:hidden fixed inset-0 !bg-black/50 z-40 mt-16"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="lg:hidden fixed top-16 left-0 right-0 !bg-gray-900/98 backdrop-blur-lg !border-b !border-cyan-500/20 !shadow-xl z-50 max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col">
              {/* Menú principal */}
              {["Inicio", "Series, Peliculas", "Mangas", "Mi Lista", "Novedades"]
                .filter(item => !(item === "Mi Lista" && !perfilActivo))
                .map((item) => (
                  <button
                    key={item}
                    onClick={() => handleMenuClick(item)}
                    className="px-4 py-3 !text-gray-300 hover:!text-cyan-400 hover:!bg-gray-800/50 !bg-gray-800/20 transition-all duration-300 font-medium border-b !border-gray-700/30 text-left text-sm"
                  >
                    {item}
                  </button>
                ))}

              {/* Separador Administración */}
              <div className="px-4 py-2 !bg-gray-800/50 !border-y !border-gray-700/50">
                <span className="!text-cyan-400 font-semibold text-sm">Administración</span>
              </div>

              {/* 🔥 MENÚS DE ADMINISTRACIÓN MÓVIL - LÓGICA SIMPLIFICADA */}
              {adminMenus.map((menu) => (
                <div key={menu.key} className="!border-b !border-gray-700/30">
                  {/* Botón principal del menú */}
                  <button
                    onClick={() => handleAdminMenuMobileClick(menu.key)}
                    className={`w-full flex items-center justify-between px-4 py-3 !text-gray-300 hover:!bg-gray-800/50 transition-all duration-200 ${getMenuHeaderBg(menu.key)}`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{menu.icon}</span>
                      <span className="font-medium text-sm">{menu.label}</span>
                    </div>
                    <span className={`transform transition-transform ${activeAdminMenu === menu.key ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {/* Submenú desplegable móvil */}
                  {activeAdminMenu === menu.key && (
                    <div className={`!bg-white !border-l-4 ${getMenuBorderColor(menu.key)}`}>
                      <div className="px-4 py-2 !text-gray-800 font-semibold text-xs border-b !border-gray-300">
                        Opciones de {menu.label}
                      </div>
                      {menu.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleAdminMenuClick(option.ruta)}
                          className="w-full flex items-center space-x-3 px-8 py-3 !text-gray-700 hover:!bg-gray-100 hover:!text-gray-900 transition-all duration-200 !border-b !border-gray-200 text-sm"
                        >
                          <span className="text-lg w-6 text-center">{option.icon}</span>
                          <span className="text-left flex-1">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Botones móviles */}
              <div className="px-4 sm:px-6 py-3 sm:py-4 !border-t !border-gray-700/50 !bg-gray-800/30 flex flex-col gap-2">
                {perfilActivo && (
                  <button
                    onClick={handleCerrarPerfil}
                    className="w-full !bg-red-500 !text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                  >
                    Salir del perfil
                  </button>
                )}
                <button
                  onClick={handleLoginClick}
                  className="w-full !bg-gradient-to-r !from-cyan-500 !to-purple-500 !text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:!shadow-lg hover:!shadow-cyan-500/25 transition-all text-sm sm:text-base"
                >
                  {usuario ? "Cerrar sesión" : "Iniciar sesión"}
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