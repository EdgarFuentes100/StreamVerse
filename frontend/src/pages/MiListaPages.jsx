import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLista } from "../data/useLista";
import ModalUniversal from "../components/ModalUniversal"; // ✅ Importar el modal universal

function MiListaPage() {
  const navigate = useNavigate();
  const [filteredLista, setFilteredLista] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { lista, getListaFavorito } = useLista();
  
  // ✅ Un solo estado para el modal
  const [modal, setModal] = useState({ 
    mostrar: false,
    titulo: "",
    mensaje: "",
    onAceptar: () => {},
    textoAceptar: "Aceptar",
    tipo: "info"
  });

  // PAGINACIÓN
  const ITEMS_PER_PAGE_MOBILE = 5;
  const ITEMS_PER_PAGE_DESKTOP = 15;

  const [currentPage, setCurrentPage] = useState(1);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  // Detectar si es escritorio para ajustar items por página
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cargar lista real desde la base de datos
  useEffect(() => {
    const idCuentaPerfil = localStorage.getItem('perfilActivo');
    if (idCuentaPerfil) {
      getListaFavorito(idCuentaPerfil);
    }
  }, []);

  // Filtrar lista cuando cambia la búsqueda
  useEffect(() => {
    let filtered = lista;
    if (searchTerm) {
      filtered = lista.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredLista(filtered);
    setCurrentPage(1);
  }, [searchTerm, lista]);

  const handleClick = (item) => {
    if (item.disponible === 0) {
      // ✅ Usar modal universal para cambiar plan
      setModal({
        mostrar: true,
        titulo: "Contenido No Disponible",
        mensaje: `"${item.title}" no está disponible en tu plan actual. ¿Te gustaría ver los planes disponibles?`,
        onAceptar: () => navigate("/CambiarPlan"), 
        textoAceptar: "Ver Planes",
        tipo: "warning"
      });
      return;
    }
    navigate(`/video/${item.idContenido}`);
  };

  const removeFromLista = (item, e) => {
    e.stopPropagation();
    
    // ✅ Usar modal universal para eliminar
    setModal({
      mostrar: true,
      titulo: "Eliminar de favoritos",
      mensaje: `¿Estás seguro de que quieres eliminar "${item.title}" de tu lista de favoritos?`,
      onAceptar: () => {
        console.log("Eliminando contenido:", item.idMiLista);
        // ✅ Aquí va tu lógica para eliminar de la base de datos
        // Ejemplo: eliminarDeFavoritos(item.idMiLista);
      },
      textoAceptar: "Sí, eliminar",
      tipo: "danger"
    });
  };

  const getBadgeColor = (categoria) => {
    return categoria === 'Anime' ? '!bg-pink-500' :
      categoria === 'Película' ? '!bg-purple-500' :
        categoria === 'Serie' ? '!bg-cyan-500' :
          categoria === 'Dorama' ? '!bg-red-500' :
            categoria === 'Infantil' ? '!bg-green-500' :
              '!bg-gray-500';
  };

  const paginate = (items, page) => {
    const itemsPerPage = isDesktop ? ITEMS_PER_PAGE_DESKTOP : ITEMS_PER_PAGE_MOBILE;
    const startIndex = (page - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (items) => {
    const itemsPerPage = isDesktop ? ITEMS_PER_PAGE_DESKTOP : ITEMS_PER_PAGE_MOBILE;
    return Math.ceil(items.length / itemsPerPage);
  };

  const ListaItem = ({ item }) => (
    <div
      onClick={() => handleClick(item)}
      className={`group flex flex-row !bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border relative
        ${item.disponible === 1
          ? 'hover:scale-105 border-transparent hover:!border-cyan-400/30'
          : 'opacity-60 !border-red-500/30 cursor-not-allowed'
        }`}
    >
      <div className="w-28 sm:w-48 h-28 sm:h-48 relative flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className={`w-full h-full object-cover rounded-l-2xl ${item.disponible === 0 ? 'grayscale' : ''}`}
        />
        <div className="absolute inset-0 !bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 rounded-l-2xl"></div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="!bg-black/50 rounded-full p-2 sm:p-3">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4 2v20l18-10L4 2z" />
            </svg>
          </div>
        </div>

        {/* Badge de no disponible */}
        {item.disponible === 0 && (
          <div className="absolute top-2 left-2 !bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            NO DISPONIBLE
          </div>
        )}
      </div>

      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <h3 className={`font-bold text-base sm:text-lg mb-1 sm:mb-2 line-clamp-2 transition-colors
          ${item.disponible === 1 ? 'text-white group-hover:!text-cyan-400' : 'text-gray-400'}
        `}>
          {item.title}
        </h3>

        <div className="flex items-center justify-start text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2 flex-wrap gap-2">
          <span>{item.year}</span>
          {item.episodios && <span>{item.episodios} episodios</span>}
          {item.duracion && <span>{item.duracion}</span>}
          {item.temporadas && <span>{item.temporadas} temp</span>}
        </div>

        <p className="text-gray-300 text-xs sm:text-sm line-clamp-3">{item.descripcion}</p>

        <div className="mt-auto flex flex-wrap gap-1 text-xs sm:text-sm">
          <span className={`px-2 py-0.5 rounded text-white font-bold ${getBadgeColor(item.categoria)}`}>
            {item.categoria}
          </span>
          {item.contenidoNuevo === 1 && <span className="!bg-green-500 px-2 py-0.5 rounded text-white font-bold">NUEVO</span>}
          {item.contenidoExclusivo === 1 && <span className="!bg-yellow-500 px-2 py-0.5 rounded text-white font-bold">EXCLUSIVO</span>}
          {item.sinAnuncios === 1 && <span className="!bg-blue-500 px-2 py-0.5 rounded text-white font-bold">SIN ANUNCIOS</span>}
        </div>

        {/* Mensaje de plan requerido */}
        {item.disponible === 0 && (
          <div className="mt-2 text-xs !text-red-400 font-medium">
            🔒 No disponible en tu plan actual
          </div>
        )}
      </div>

      <button
        onClick={(e) => removeFromLista(item, e)}
        className="absolute top-2 right-2 z-10 !bg-red-500 hover:!bg-red-600 text-white p-2 rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );

  const renderPagination = () => {
    const pages = totalPages(filteredLista);
    if (pages <= 1) return null;
    return (
      <div className="flex justify-center mt-4 gap-2">
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? '!bg-cyan-500 text-white' : '!bg-gray-700 text-gray-300 hover:!bg-gray-600'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="pt-20 min-h-screen !bg-gray-950">
      {/* ✅ Modal Universal para ambos casos */}
      <ModalUniversal
        mostrar={modal.mostrar}
        onClose={() => setModal({ ...modal, mostrar: false })}
        onAceptar={modal.onAceptar}
        titulo={modal.titulo}
        mensaje={modal.mensaje}
        textoAceptar={modal.textoAceptar}
        tipo={modal.tipo}
      />

      {/* Hero Section */}
      <section className="py-1 px-4 sm:px-8 !bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20 text-center">
        <h2 className="text-xl sm:text-2xl font-black !bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:hidden">
          Mi Lista de Favoritos
        </h2>
        <h1 className="hidden sm:block text-3xl sm:text-4xl font-black !bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3">
          Mi Lista de Favoritos
        </h1>
        <p className="text-gray-300 text-xs sm:text-sm md:text-base mb-4">
          {filteredLista.length} {filteredLista.length === 1 ? 'contenido' : 'contenidos'} guardados
        </p>

        <div className="flex justify-center">
          <input
            type="text"
            placeholder="🔍 Buscar en mi lista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md !bg-gray-800/80 border !border-cyan-500/30 rounded-xl px-3 py-2 text-xs sm:text-sm md:text-base text-white placeholder-gray-400 focus:outline-none focus:!border-cyan-400"
          />
        </div>
      </section>

      {/* Lista de Contenidos */}
      <section className="py-6 px-4">
        {filteredLista.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
              {paginate(filteredLista, currentPage).map(item => (
                <ListaItem key={item.idContenido} item={item} />
              ))}
            </div>
            {renderPagination()}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">📺</div>
            <h3 className="text-2xl font-bold text-gray-300 mb-4">Tu lista está vacía</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Agrega contenidos a tu lista de favoritos para verlos aquí
            </p>
            <button
              onClick={() => navigate("/Catalogo")}
              className="!bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105"
            >
              Explorar Catálogo
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default MiListaPage;