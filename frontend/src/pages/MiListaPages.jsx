import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { todosLosContenidos } from "../data/contenido";
import { todosLosMangas } from "../data/mangas";

function MiListaPage() {
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  const [filteredLista, setFilteredLista] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // PAGINACIÓN INDEPENDIENTE
  const ITEMS_PER_PAGE_MOBILE = 5;
  const ITEMS_PER_PAGE_DESKTOP = 15;

  const [currentPageVideos, setCurrentPageVideos] = useState(1);
  const [currentPageMangas, setCurrentPageMangas] = useState(1);

  // Detectar si es escritorio para ajustar items por página
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const listaFavoritos = [
      ...todosLosContenidos.filter(c => c.isFavorito),
      ...todosLosMangas.filter(m => m.isFavorito),
    ];
    setLista(listaFavoritos);
    setFilteredLista(listaFavoritos);
  }, []);

  useEffect(() => {
    let filtered = lista;
    if (searchTerm) {
      filtered = lista.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredLista(filtered);
    setCurrentPageVideos(1);
    setCurrentPageMangas(1);
  }, [searchTerm, lista]);

  const handleClick = (item) => {
    if (item.tipo === "manga") {
      navigate(`/manga/${item.id}`);
    } else {
      navigate(`/video/${item.id}`);
    }
  };

  const removeFromLista = (id, e) => {
    e.stopPropagation();
    setLista(prev => prev.filter(item => item.id !== id));
  };

  const getBadgeColor = (categoria) => {
    return categoria === 'Anime' ? 'bg-pink-500' :
      categoria === 'Manga' ? 'bg-cyan-500' :
        categoria === 'Película' ? 'bg-purple-500' :
          categoria === 'Serie' ? 'bg-blue-500' :
            categoria === 'Dorama' ? 'bg-red-500' :
              'bg-gray-500';
  };

  const mangas = filteredLista.filter(item => item.tipo === "manga");
  const videos = filteredLista.filter(item => item.tipo !== "manga");

  const paginate = (items, currentPage) => {
    const itemsPerPage = isDesktop ? ITEMS_PER_PAGE_DESKTOP : ITEMS_PER_PAGE_MOBILE;
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (items) => {
    const itemsPerPage = isDesktop ? ITEMS_PER_PAGE_DESKTOP : ITEMS_PER_PAGE_MOBILE;
    return Math.ceil(items.length / itemsPerPage);
  };

  const ListaItem = ({ item }) => (
    <div
      onClick={() => handleClick(item)}
      className="group flex flex-row bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 border border-transparent hover:border-cyan-400/30 relative"
    >
      <div className="w-28 sm:w-48 h-28 sm:h-48 relative flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover rounded-l-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 rounded-l-2xl"></div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {item.tipo === "manga" ? (
            <div className="bg-black/50 rounded-full p-2 sm:p-3">
              <span className="text-white text-2xl sm:text-3xl">📖</span>
            </div>
          ) : (
            <div className="bg-black/50 rounded-full p-2 sm:p-3">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 2v20l18-10L4 2z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-white text-base sm:text-lg mb-1 sm:mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center justify-start text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2 flex-wrap gap-2">
          <span>{item.year}</span>
          {item.capitulos && <span>{item.capitulos} capítulos</span>}
          {item.episodios && <span>{item.episodios} episodios</span>}
          {item.duracion && <span>{item.duracion}</span>}
        </div>
        <p className="text-gray-300 text-xs sm:text-sm line-clamp-3">{item.descripcion}</p>

        <div className="mt-auto flex flex-wrap gap-1 text-xs sm:text-sm">
          <span className={`px-2 py-0.5 rounded text-white font-bold ${getBadgeColor(item.categoria)}`}>
            {item.categoria}
          </span>
          {item.isNew && <span className="bg-green-500 px-2 py-0.5 rounded text-white font-bold">NUEVO</span>}
          {item.isExclusive && <span className="bg-yellow-500 px-2 py-0.5 rounded text-white font-bold">EXCLUSIVO</span>}
        </div>
      </div>

      <button
        onClick={(e) => removeFromLista(item.id, e)}
        className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );

  const renderPagination = (items, currentPage, setCurrentPage) => {
    const pages = totalPages(items);
    if (pages <= 1) return null;
    return (
      <div className="flex justify-center mt-4 gap-2">
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-cyan-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="py-1 px-4 sm:px-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20 text-center">
        <h2 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:hidden">
          Lista de favoritos
        </h2>
        <h1 className="hidden sm:block text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
          Lista de favoritos
        </h1>
        <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-4">
          {filteredLista.length} {filteredLista.length === 1 ? 'elemento' : 'elementos'} guardados
        </p>

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="🔍 Buscar en mi lista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md bg-gray-800/80 border border-cyan-500/30 rounded-xl px-3 py-2 text-xs sm:text-sm md:text-base text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </section>

      {/* Video Section */}
      <section className="py-6 px-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Contenido en Video</h2>
        {videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {paginate(videos, currentPageVideos).map(item => (
                <ListaItem key={item.id} item={item} />
              ))}
            </div>
            {renderPagination(videos, currentPageVideos, setCurrentPageVideos)}
          </>
        ) : (
          <p className="text-gray-400 text-sm text-center">No hay videos en tu lista</p>
        )}
      </section>

      {/* Manga Section */}
      <section className="py-6 px-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Mangas (PDF)</h2>
        {mangas.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              {paginate(mangas, currentPageMangas).map(item => (
                <ListaItem key={item.id} item={item} />
              ))}
            </div>
            {renderPagination(mangas, currentPageMangas, setCurrentPageMangas)}
          </>
        ) : (
          <p className="text-gray-400 text-sm text-center">No hay mangas en tu lista</p>
        )}
      </section>
    </div>
  );
}

export default MiListaPage;
