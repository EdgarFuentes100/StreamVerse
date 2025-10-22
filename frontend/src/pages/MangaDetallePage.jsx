import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMangaById, getMangasRecomendaciones, toggleFavorito } from "../data/mangas";

function MangaDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manga, setManga] = useState(null);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [volumenActivo, setVolumenActivo] = useState(1);
  const [esFavorito, setEsFavorito] = useState(false);
  const [menuActivo, setMenuActivo] = useState("info"); // "info" o "capitulos"

  useEffect(() => {
    const mangaData = getMangaById(parseInt(id));
    if (mangaData) {
      setManga(mangaData);
      setEsFavorito(mangaData.isFavorito);
      setRecomendaciones(getMangasRecomendaciones(mangaData));

      if (mangaData.capitulosDetalle && mangaData.capitulosDetalle.length > 0) {
        const minVolumen = Math.min(...mangaData.capitulosDetalle.map(cap => cap.volumen));
        setVolumenActivo(minVolumen);
      }
    }
  }, [id]);

  const handleToggleFavorito = () => {
    if (manga) {
      const nuevoEstado = toggleFavorito(manga.id);
      setEsFavorito(nuevoEstado);
    }
  };

  const handleLeerCapitulo = (capitulo) => {
    alert(`Abriendo: ${capitulo.titulo}\nURL: ${capitulo.archivoUrl}`);
  };

  const handleDescargarCapitulo = (capitulo, e) => {
    e.stopPropagation();
    alert(`Descargando: ${capitulo.titulo}`);
  };

  const capitulosPorVolumen = manga?.capitulosDetalle?.reduce((acc, capitulo) => {
    if (!acc[capitulo.volumen]) acc[capitulo.volumen] = [];
    acc[capitulo.volumen].push(capitulo);
    return acc;
  }, {}) || {};

  const volumenes = Object.keys(capitulosPorVolumen).map(Number).sort((a, b) => a - b);

  if (!manga) {
    return (
      <div className="pt-16 min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-4xl sm:text-6xl mb-4">😕</div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Manga no encontrado</h2>
          <p className="text-gray-400 mb-4 text-sm sm:text-base">El manga que buscas no existe</p>
          <button
            onClick={() => navigate('/mangas')}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all text-sm sm:text-base"
          >
            Volver a Mangas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-950">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
        {/* Botón volver */}
        <button
          onClick={() => navigate('/mangas')}
          className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <span>←</span>
          <span>Volver a Mangas</span>
        </button>

        {/* Header del Manga */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 border border-cyan-500/20">
          <div className="flex flex-col lg:flex-row">
            {/* Portada */}
            <div className="lg:w-1/3 p-4 sm:p-6 flex justify-center lg:justify-start">
              <div className="relative">
                <img
                  src={manga.image}
                  alt={manga.title}
                  className="w-48 sm:w-56 lg:w-64 h-72 sm:h-80 lg:h-96 object-cover rounded-lg sm:rounded-xl shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 bg-yellow-500 text-gray-900 px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center space-x-1">
                  <span className="text-xs">⭐</span>
                  <span>{manga.rating}</span>
                </div>
              </div>
            </div>

            {/* Información */}
            <div className="lg:w-2/3 p-4 sm:p-6 lg:p-8 flex flex-col h-full">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <span className="bg-cyan-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">MANGA</span>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                    manga.estado === "En publicación" ? "bg-blue-500" : "bg-green-500"
                  } text-white`}>
                    {manga.estado}
                  </span>
                  <span className="bg-purple-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    {manga.demografia}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  {manga.title}
                </h2>

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4 text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="font-semibold text-xs sm:text-sm">Autor:</span>
                    <span className="text-xs sm:text-sm">{manga.autor}</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="font-semibold text-xs sm:text-sm">Año:</span>
                    <span className="text-xs sm:text-sm">{manga.year}</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="font-semibold text-xs sm:text-sm">Volúmenes:</span>
                    <span className="text-xs sm:text-sm">{manga.volumnes}</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <span className="font-semibold text-xs sm:text-sm">Capítulos:</span>
                    <span className="text-xs sm:text-sm">{manga.capitulos}</span>
                  </div>
                </div>

                {/* Géneros */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {manga.generos.map((genero) => (
                    <span
                      key={genero}
                      className="bg-gray-700 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-300"
                    >
                      {genero}
                    </span>
                  ))}
                </div>

                {/* Menú móvil */}
                <div className="lg:hidden mb-4">
                  <div className="flex border-b border-gray-600">
                    <button
                      onClick={() => setMenuActivo("info")}
                      className={`flex-1 py-2 text-center font-medium text-sm ${
                        menuActivo === "info" 
                          ? "text-cyan-400 border-b-2 border-cyan-400" 
                          : "text-gray-400"
                      }`}
                    >
                      Información
                    </button>
                    {manga.capitulosDetalle && manga.capitulosDetalle.length > 0 && (
                      <button
                        onClick={() => setMenuActivo("capitulos")}
                        className={`flex-1 py-2 text-center font-medium text-sm ${
                          menuActivo === "capitulos" 
                            ? "text-cyan-400 border-b-2 border-cyan-400" 
                            : "text-gray-400"
                        }`}
                      >
                        Capítulos
                      </button>
                    )}
                  </div>
                </div>

                {/* Sinopsis */}
                <div className={`${menuActivo === "info" || window.innerWidth >= 1024 ? "block" : "hidden"} lg:block`}>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Sinopsis</h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{manga.sinopsis}</p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-700 mt-4">
                <button
                  onClick={handleToggleFavorito}
                  className={`flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold transition-all text-sm sm:text-base ${
                    esFavorito
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  <span>{esFavorito ? "❤️" : "🤍"}</span>
                  <span>{esFavorito ? "En Favoritos" : "Agregar a Favoritos"}</span>
                </button>
                {manga.capitulosDetalle && manga.capitulosDetalle.length > 0 && (
                  <button
                    onClick={() => handleLeerCapitulo(manga.capitulosDetalle[0])}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all text-sm sm:text-base"
                  >
                    Leer Primer Capítulo
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Capítulos */}
        {manga.capitulosDetalle && manga.capitulosDetalle.length > 0 && (
          <div className={`${menuActivo === "capitulos" || window.innerWidth >= 1024 ? "block" : "hidden"} lg:block bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-700/50`}>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Capítulos</h2>

            {/* Selector de Volumen */}
            <div className="flex overflow-x-auto pb-2 mb-4 sm:mb-6 gap-2 scrollbar-none">
              {volumenes.map(volumen => (
                <button
                  key={volumen}
                  onClick={() => setVolumenActivo(volumen)}
                  className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                    volumenActivo === volumen
                      ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  Vol. {volumen}
                </button>
              ))}
            </div>

            {/* Capítulos del Volumen Activo */}
            <div className="space-y-2 sm:space-y-3">
              {capitulosPorVolumen[volumenActivo]?.map((capitulo) => (
                <div
                  key={capitulo.id}
                  className="flex items-center justify-between p-3 sm:p-4 bg-gray-700/50 rounded-lg sm:rounded-xl hover:bg-gray-600/50 transition-colors cursor-pointer group"
                  onClick={() => handleLeerCapitulo(capitulo)}
                >
                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      capitulo.leido ? "bg-green-500" : "bg-cyan-500"
                    } text-white font-bold text-sm sm:text-base`}>
                      {capitulo.numero}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-white font-semibold text-sm sm:text-base group-hover:text-cyan-400 transition-colors truncate">
                        {capitulo.titulo}
                      </h4>
                      <p className="text-gray-400 text-xs sm:text-sm truncate">
                        {capitulo.descripcion} • {capitulo.paginas}p • {capitulo.duracion}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                    <span className="text-gray-400 text-xs sm:text-sm hidden sm:block">
                      {new Date(capitulo.fechaPublicacion).toLocaleDateString()}
                    </span>
                    <button
                      onClick={(e) => handleDescargarCapitulo(capitulo, e)}
                      className="bg-gray-600 hover:bg-gray-500 text-white p-1 sm:p-2 rounded-lg transition-colors opacity-70 group-hover:opacity-100"
                      title="Descargar capítulo"
                    >
                      <span className="text-xs sm:text-sm">⬇️</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recomendaciones */}
        {recomendaciones.length > 0 && (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700/50">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Mangas Recomendados</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {recomendaciones.map((mangaRec) => (
                <div
                  key={mangaRec.id}
                  onClick={() => navigate(`/manga/${mangaRec.id}`)}
                  className="group bg-gray-700/50 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 border border-transparent hover:border-cyan-400/30"
                >
                  <img
                    src={mangaRec.image}
                    alt={mangaRec.title}
                    className="w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="p-2 sm:p-3">
                    <h3 className="font-bold text-white text-xs sm:text-sm mb-1 sm:mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors leading-tight">
                      {mangaRec.title}
                    </h3>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>{mangaRec.year}</span>
                      <span>⭐ {mangaRec.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MangaDetallePage;
