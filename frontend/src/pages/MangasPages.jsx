import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { todosLosMangas } from "../data/mangas";

function MangasPage() {
  const navigate = useNavigate();
  const [mangas, setMangas] = useState([]);
  const [filteredMangas, setFilteredMangas] = useState([]);
  const [selectedGenero, setSelectedGenero] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMangas(todosLosMangas);
    setFilteredMangas(todosLosMangas);
  }, []);

  useEffect(() => {
    let filtered = mangas;

    if (selectedGenero !== "Todos") {
      filtered = filtered.filter(manga => manga.generos.includes(selectedGenero));
    }

    if (searchTerm) {
      filtered = filtered.filter(manga =>
        manga.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMangas(filtered);
  }, [selectedGenero, searchTerm, mangas]);

  const generos = ["Todos", ...new Set(mangas.flatMap(manga => manga.generos))];

  const handleMangaClick = (manga) => {
    navigate(`/manga/${manga.id}`);
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative py-2 px-4 sm:px-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20 text-center">
        <div className="container mx-auto">
          <h2 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:hidden">
            Biblioteca de Mangas
          </h2>
          <h1 className="hidden sm:block text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
            Biblioteca de Mangas
          </h1>
          <p className="text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto">
            Descubre los mejores mangas. Más de {mangas.length} títulos disponibles.
          </p>
        </div>
      </section>

      {/* Barra de búsqueda y filtros */}
      <section className="py-4 px-4 sm:px-8 bg-gray-900/80 backdrop-blur-lg border-b border-cyan-500/20 sticky top-20 z-40">
        <div className="container mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="🔍 Buscar mangas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-gray-800/80 border border-cyan-500/30 rounded-lg sm:rounded-xl px-3 py-2 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
          />
          <select
            value={selectedGenero}
            onChange={(e) => setSelectedGenero(e.target.value)}
            className="bg-gray-800 border border-purple-500/30 text-white rounded-lg px-3 py-2 text-sm sm:text-base min-w-[160px]"
          >
            {generos.map((genero) => (
              <option key={genero} value={genero}>
                {genero}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* Grid de mangas */}
      <section className="py-6 px-4 sm:px-8">
        <div className="container mx-auto">
          {filteredMangas.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredMangas.map((manga) => (
                <div
                  key={manga.id}
                  onClick={() => handleMangaClick(manga)}
                  className="relative group bg-gray-800/70 rounded-lg sm:rounded-2xl overflow-hidden border border-transparent hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 transition-all cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={manga.image}
                      alt={manga.title}
                      className="w-full aspect-[2.8/4] sm:aspect-[3/4] object-cover rounded-t-lg max-h-44 sm:max-h-56 md:max-h-64"
                    />

                    {/* Icono centrado sobre la imagen en móviles */}
                    <div className="sm:hidden absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-white bg-black/40 p-3 rounded-full text-2xl transition-transform hover:scale-110">
                        📖
                      </span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                    <span className="bg-cyan-500 text-white px-2 py-0.5 rounded text-[9px] font-bold">
                      MANGA
                    </span>
                    {manga.isNew && (
                      <span className="bg-green-500 text-white px-2 py-0.5 rounded text-[9px] font-bold">
                        NUEVO
                      </span>
                    )}
                  </div>

                  <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{manga.rating}</span>
                  </div>

                  <div className="p-2 sm:p-3 flex flex-col flex-1">
                    <h3 className="text-white text-xs sm:text-sm font-bold line-clamp-2 group-hover:text-cyan-400 transition-colors mb-1">
                      {manga.title}
                    </h3>
                    <p className="text-gray-400 text-[10px] sm:text-xs line-clamp-2 mb-2">
                      {manga.descripcion}
                    </p>

                    {/* Géneros */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {manga.generos.slice(0, 2).map((g) => (
                        <span key={g} className="bg-gray-700 px-2 py-0.5 rounded text-[10px] sm:text-xs text-gray-300">{g}</span>
                      ))}
                      {manga.generos.length > 2 && (
                        <span className="bg-gray-600 px-2 py-0.5 rounded text-[10px] sm:text-xs text-gray-400">
                          +{manga.generos.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Botón "Leer más" en pantallas grandes */}
                    <div className="mt-auto w-full hidden sm:flex justify-center">
                      <button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-1.5 sm:py-2 rounded-lg justify-center items-center gap-2 text-sm font-semibold transition-transform hover:scale-105">
                        📖 Leer más
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">😕</div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-300 mb-2">
                No se encontraron mangas
              </h3>
              <p className="text-gray-500 text-sm sm:text-base">
                Prueba con otros filtros o términos de búsqueda
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MangasPage;
