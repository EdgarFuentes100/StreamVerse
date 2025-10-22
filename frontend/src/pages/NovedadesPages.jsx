import { useNavigate } from "react-router-dom";
import { getNoticiasDestacadas, getNoticiasPorCategoria } from "../data/noticias";

function NovedadesPage() {
  const navigate = useNavigate();
  const noticiasDestacadas = getNoticiasDestacadas();
  const noticiasEstrenos = getNoticiasPorCategoria("Nuevos Estrenos");
  const noticiasPeliculas = getNoticiasPorCategoria("Nuevas Películas");
  const noticiasColaboraciones = getNoticiasPorCategoria("Colaboraciones");

  const noticiaPrincipal = noticiasDestacadas[0];

  return (
    <div className="pt-16 min-h-screen bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* HEADER */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-3 sm:p-6 mb-4">
            {/* H2 para móviles */}
            <h2 className="text-lg sm:hidden font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              NOVEDADES
            </h2>
            {/* H1 para escritorio */}
            <h1 className="hidden sm:block text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
              NOVEDADES
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto">
              Todo lo que necesitas saber sobre el mundo del entretenimiento
            </p>
          </div>
        </div>

        {/* NOTICIA PRINCIPAL */}
        {noticiaPrincipal && (
          <section className="mb-8 sm:mb-12">
            <div
              onClick={() => navigate(`/noticia/${noticiaPrincipal.id}`)}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-cyan-500/30 cursor-pointer hover:scale-105 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                  <img
                    src={noticiaPrincipal.imagen}
                    alt={noticiaPrincipal.titulo}
                    className="w-full h-40 sm:h-48 md:h-64 lg:h-80 object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-3 sm:p-4 lg:p-6 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
                    <span className="bg-cyan-500 text-white px-2 py-1 rounded-full text-xs sm:text-sm font-bold">
                      {noticiaPrincipal.categoria}
                    </span>
                    <span className="bg-yellow-500 text-gray-900 px-2 py-1 rounded-full text-xs sm:text-sm font-bold">
                      NOTICIA DESTACADA
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg lg:text-2xl font-bold text-white mb-2 sm:mb-3 line-clamp-2">
                    {noticiaPrincipal.titulo}
                  </h2>
                  <p className="text-gray-300 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-3">
                    {noticiaPrincipal.resumen}
                  </p>
                  <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm">
                    <span className="font-semibold">{noticiaPrincipal.fecha}</span>
                    <span>
                      👁️{" "}
                      {noticiaPrincipal.vistas >= 1000
                        ? `${(noticiaPrincipal.vistas / 1000).toFixed(1)}K`
                        : noticiaPrincipal.vistas}{" "}
                      vistas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* GRID DE NOTICIAS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">

          {/* COLUMNA 1: Estrenos */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center">
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-1 sm:p-2 rounded-lg mr-2">🎬</span>
              Nuevos Estrenos
            </h3>
            <div className="flex flex-row sm:flex-col gap-3 overflow-x-auto sm:overflow-x-visible">
              {noticiasEstrenos.slice(0, 3).map((noticia) => (
                <div
                  key={noticia.id}
                  onClick={() => navigate(`/noticia/${noticia.id}`)}
                  className="min-w-[180px] sm:min-w-full bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <img
                    src={noticia.imagen}
                    alt={noticia.titulo}
                    className="w-full h-28 sm:h-32 md:h-36 object-cover"
                  />
                  <div className="p-2 sm:p-3">
                    <span className="bg-purple-500 text-white px-1 py-0.5 rounded text-xs font-bold mb-1 inline-block">
                      {noticia.categoria}
                    </span>
                    <h4 className="font-bold text-white text-xs sm:text-sm mb-1 line-clamp-2">
                      {noticia.titulo}
                    </h4>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>{noticia.fecha}</span>
                      <span>
                        👁️{" "}
                        {noticia.vistas >= 1000
                          ? `${(noticia.vistas / 1000).toFixed(1)}K`
                          : noticia.vistas}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMNA 2: Destacadas */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center">
              <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-1 sm:p-2 rounded-lg mr-2">⭐</span>
              Destacadas
            </h3>
            <div className="flex flex-row sm:flex-col gap-3 overflow-x-auto sm:overflow-x-visible">
              {noticiasDestacadas.slice(1, 4).map((noticia) => (
                <div
                  key={noticia.id}
                  onClick={() => navigate(`/noticia/${noticia.id}`)}
                  className="min-w-[180px] sm:min-w-full bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20 cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <div className="p-2 sm:p-3">
                    <div className="flex items-center gap-1 sm:gap-2 mb-2 flex-wrap">
                      <span className="bg-cyan-500 text-white px-1 py-0.5 rounded text-xs font-bold">
                        {noticia.categoria}
                      </span>
                      <span className="bg-yellow-500 text-gray-900 px-1 py-0.5 rounded text-xs font-bold">
                        DESTACADA
                      </span>
                    </div>
                    <h4 className="font-bold text-white text-sm sm:text-base mb-1 line-clamp-2">
                      {noticia.titulo}
                    </h4>
                    <p className="text-gray-300 text-xs sm:text-sm mb-1 line-clamp-2">
                      {noticia.resumen}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>{noticia.fecha}</span>
                      <span>
                        👁️{" "}
                        {noticia.vistas >= 1000
                          ? `${(noticia.vistas / 1000).toFixed(1)}K`
                          : noticia.vistas}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMNA 3: Películas y Colaboraciones */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center">
              <span className="bg-gradient-to-r from-green-500 to-cyan-500 text-white p-1 sm:p-2 rounded-lg mr-2">🎥</span>
              Cine & Más
            </h3>

            {/* Película principal */}
            {noticiasPeliculas[0] && (
              <div
                onClick={() => navigate(`/noticia/${noticiasPeliculas[0].id}`)}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl overflow-hidden border border-purple-500/30 cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <img
                  src={noticiasPeliculas[0].imagen}
                  alt={noticiasPeliculas[0].titulo}
                  className="w-full h-28 sm:h-32 md:h-36 object-cover"
                />
                <div className="p-2 sm:p-3">
                  <span className="bg-purple-500 text-white px-1 py-0.5 rounded text-xs font-bold mb-1 inline-block">
                    {noticiasPeliculas[0].categoria}
                  </span>
                  <h4 className="font-bold text-white text-sm sm:text-base mb-1 line-clamp-2">
                    {noticiasPeliculas[0].titulo}
                  </h4>
                  <p className="text-gray-300 text-xs sm:text-sm line-clamp-2">{noticiasPeliculas[0].resumen}</p>
                </div>
              </div>
            )}

            {/* Colaboraciones */}
            <div className="flex flex-row sm:flex-col gap-3 overflow-x-auto sm:overflow-x-visible">
              {noticiasColaboraciones.slice(0, 2).map((noticia) => (
                <div
                  key={noticia.id}
                  onClick={() => navigate(`/noticia/${noticia.id}`)}
                  className="min-w-[160px] sm:min-w-full bg-gray-800/50 backdrop-blur-sm rounded-xl p-2 sm:p-3 border border-green-500/20 cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <span className="bg-green-500 text-white px-1 py-0.5 rounded text-xs font-bold mb-1 inline-block">
                    {noticia.categoria}
                  </span>
                  <h4 className="font-bold text-white text-xs sm:text-sm mb-1 line-clamp-2">
                    {noticia.titulo}
                  </h4>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{noticia.fecha}</span>
                    <span>
                      👁️{" "}
                      {noticia.vistas >= 1000
                        ? `${(noticia.vistas / 1000).toFixed(1)}K`
                        : noticia.vistas}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* TRENDING */}
        <section className="mb-8 sm:mb-12">
          <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center">
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-1 sm:p-2 rounded-lg mr-2">🔥</span>
            Trending Ahora
          </h3>
          <div className="flex flex-row gap-3 overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {noticiasDestacadas.slice(4, 8).map((noticia) => (
              <div
                key={noticia.id}
                onClick={() => navigate(`/noticia/${noticia.id}`)}
                className="min-w-[180px] sm:min-w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-orange-500/20 cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <img
                  src={noticia.imagen}
                  alt={noticia.titulo}
                  className="w-full h-24 sm:h-32 object-cover"
                />
                <div className="p-2 sm:p-3">
                  <h4 className="font-bold text-white text-xs sm:text-sm mb-1 line-clamp-2">
                    {noticia.titulo}
                  </h4>
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>{noticia.fecha}</span>
                    <span>
                      👁️{" "}
                      {noticia.vistas >= 1000
                        ? `${(noticia.vistas / 1000).toFixed(1)}K`
                        : noticia.vistas}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

export default NovedadesPage;
