import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCategoria } from '../data/useCategoria';
import { useGenero } from '../data/useGenero';
import { useAuth } from '../api/authContext';
import { useEffect } from 'react';
import ModalUniversal from '../components/ModalUniversal';

function CatalogoPage() {
  const navigate = useNavigate();
  const { categoria } = useCategoria();
  const { genero } = useGenero();
  const { contenidoFiltrado, usuario, getContenidoPlan, getContenido } = useAuth();

  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroGenero, setFiltroGenero] = useState('todos');
  const [filtroAño, setFiltroAño] = useState('todos');
  const [orden, setOrden] = useState('popular');
  const [busqueda, setBusqueda] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const [modal, setModal] = useState({
    mostrar: false,
    titulo: "",
    mensaje: "",
    onAceptar: () => { },
    textoAceptar: "Aceptar",
    tipo: "info"
  });

  // 🔹 Combinar "todos" + categorías del backend
  const categorias = [{ idCategoria: 0, nombre: 'todos', icon: '🌐', cantidad: 0 }, ...categoria];

  // 🔹 Combinar "todos" + géneros del backend
  const generos = [{ idGenero: 0, nombre: 'todos' }, ...genero];

  const años = ['todos', '2024', '2023', '2022', '2021', '2020'];

  const ordenes = [
    { value: 'popular', label: '🎯 Popular' },
    { value: 'new', label: '🆕 Nuevo' },
    { value: 'rating', label: '⭐ Rating' },
    { value: 'title', label: '🔤 A-Z' }
  ];

  useEffect(() => {
    getContenido();
    getContenidoPlan();
  }, []);

  // 🔹 Función para manejar contenido bloqueado
  const handleContenidoBloqueado = (contenido) => {
    setModal({
      mostrar: true,
      titulo: "🔒 Contenido Bloqueado",
      mensaje: `"${contenido.title}" no está disponible en tu plan actual. ¿Te gustaría ver los planes disponibles?`,
      onAceptar: () => navigate("/CambiarPlan"),
      textoAceptar: "Ver Planes",
      tipo: "warning"
    });
  };
  const handleVerVideo = (contenido) => {
    if (contenido.bloqueado) {
      handleContenidoBloqueado(contenido); // 👈 Mostrar modal si está bloqueado
    } else {
      navigate(`/video/${contenido.idContenido}`); // 👈 Navegar si no está bloqueado
    }
  };

  // 🔹 Filtrar los contenidos DEL BACKEND
  const contenidosFiltrados = contenidoFiltrado
    .filter(item => {
      const coincideCategoria = filtroCategoria === 'todos' ||
        item.categoria === filtroCategoria;

      const coincideGenero = filtroGenero === 'todos' ||
        (item.generos && item.generos.toLowerCase().includes(filtroGenero.toLowerCase()));

      const coincideAño = filtroAño === 'todos' ||
        item.year.toString() === filtroAño;

      const coincideBusqueda = item.title.toLowerCase().includes(busqueda.toLowerCase());

      return coincideCategoria && coincideGenero && coincideAño && coincideBusqueda;
    })
    .sort((a, b) => {
      switch (orden) {
        case 'popular':
          return (parseFloat(b.rating) - parseFloat(a.rating));
        case 'new':
          return b.year - a.year;
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const getBadgeColor = (categoriaNombre) => {
    const colors = {
      'Anime': 'bg-pink-500',
      'Película': 'bg-purple-500',
      'Serie': 'bg-cyan-500',
      'Dorama': 'bg-red-500',
      'Infantil': 'bg-green-500'
    };
    return colors[categoriaNombre] || 'bg-gray-500';
  };

  // Función para obtener el ícono de la categoría
  const getCategoriaIcon = (nombreCategoria) => {
    const cat = categorias.find(c => c.nombre === nombreCategoria);
    return cat ? cat.icon : '🎬';
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-950">
      <ModalUniversal
        mostrar={modal.mostrar}
        onClose={() => setModal({ ...modal, mostrar: false })}
        onAceptar={modal.onAceptar}
        titulo={modal.titulo}
        mensaje={modal.mensaje}
        textoAceptar={modal.textoAceptar}
        tipo={modal.tipo}
      />
      <section className="relative py-0 px-4 sm:px-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
        <div className="container mx-auto text-center">
          <h1 className="font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', marginTop: 0 }}>
            Catálogo
          </h1>
          <p className="text-sm sm:text-xl text-gray-300 max-w-full sm:max-w-2xl mx-auto">
            Encuentra tu próxima historia favorita
          </p>
        </div>
      </section>

      {/* Barra de búsqueda y filtros */}
      <section className="py-4 px-4 sm:px-8 bg-gray-900/80 backdrop-blur-lg border-b border-cyan-500/20 sticky top-20 z-40">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center justify-between mb-2">
            <input
              type="text"
              placeholder="🔍 Buscar contenido..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full sm:flex-1 !bg-gray-800/80 border border-cyan-500/30 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:border-cyan-400"
            />

            <div className="flex gap-2 sm:gap-2 w-full sm:w-auto">
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 !bg-gray-800 border border-cyan-500/30 text-cyan-400 px-3 py-2 rounded-lg text-sm"
              >
                🎚️ Filtros
              </button>
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="flex-1 sm:flex-none bg-gray-800 border !border-purple-500/30 text-white rounded-lg px-3 py-2 text-sm"
              >
                {ordenes.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {mostrarFiltros && (
            <div className="mt-3 p-4 bg-gray-800/50 rounded-lg border border-cyan-500/20">

              {/* Grupo 1: Categorías */}
              <div className="mb-6">
                <h3 className="text-cyan-400 font-bold text-sm mb-3 flex items-center gap-2">
                  <span>📁</span> Categorías
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {/* "Todos" primero en categorías */}
                  <button
                    onClick={() => setFiltroCategoria('todos')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filtroCategoria === 'todos'
                      ? '!bg-cyan-500 text-white shadow-lg'
                      : '!bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    🌐 Todos
                  </button>

                  {/* Resto de categorías */}
                  {categorias
                    .filter(c => c.nombre !== 'todos')
                    .map((c) => (
                      <button
                        key={c.idCategoria}
                        onClick={() => setFiltroCategoria(c.nombre)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filtroCategoria === c.nombre
                          ? '!bg-cyan-500 text-white shadow-lg'
                          : '!bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                      >
                        {c.icon} {c.nombre}
                        <span className="ml-2 text-cyan-400 text-xs font-bold bg-cyan-500/10 rounded-full px-2 py-0.5">
                          {c.cantidad}K
                        </span>
                      </button>
                    ))}
                </div>
              </div>

              {/* Grupo 2: Géneros */}
              <div className="mb-6">
                <h3 className="text-purple-400 font-bold text-sm mb-3 flex items-center gap-2">
                  <span>🎭</span> Géneros
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {/* "Todos" primero en géneros */}
                  <button
                    onClick={() => setFiltroGenero('todos')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filtroGenero === 'todos'
                      ? '!bg-purple-500 text-white shadow-lg'
                      : '!bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    Todos
                  </button>

                  {/* Resto de géneros ordenados alfabéticamente */}
                  {generos
                    .filter(g => g.nombre !== 'todos')
                    .sort((a, b) => a.nombre.localeCompare(b.nombre))
                    .map(g => (
                      <button
                        key={g.idGenero}
                        onClick={() => setFiltroGenero(g.nombre)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filtroGenero === g.nombre
                          ? '!bg-purple-500 text-white shadow-lg'
                          : '!bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                      >
                        {g.nombre}
                      </button>
                    ))}
                </div>
              </div>

              {/* Grupo 3: Años */}
              <div className="mb-6">
                <h3 className="text-pink-400 font-bold text-sm mb-3 flex items-center gap-2">
                  <span>📅</span> Años
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {/* "Todos" primero en años */}
                  <button
                    onClick={() => setFiltroAño('todos')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filtroAño === 'todos'
                      ? '!bg-pink-500 text-white shadow-lg'
                      : '!bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    📆 Todos
                  </button>

                  {/* Resto de años ordenados descendentes */}
                  {años
                    .filter(a => a !== 'todos')
                    .sort((a, b) => parseInt(b) - parseInt(a))
                    .map(a => (
                      <button
                        key={a}
                        onClick={() => setFiltroAño(a)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filtroAño === a
                          ? '!bg-pink-500 text-white shadow-lg'
                          : '!bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                      >
                        {a}
                      </button>
                    ))}
                </div>
              </div>

              {/* Botones para móvil */}
              <div className="flex gap-2 mt-4 sm:hidden">
                <button
                  onClick={() => setMostrarFiltros(false)}
                  className="flex-1 bg-cyan-500 text-white py-2 rounded-lg text-sm font-medium"
                >
                  Aplicar
                </button>
                <button
                  onClick={() => {
                    setFiltroCategoria('todos');
                    setFiltroGenero('todos');
                    setFiltroAño('todos');
                    setBusqueda('');
                  }}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-medium"
                >
                  Limpiar Todo
                </button>
              </div>

              {/* Botón para quitar todos los filtros - Escritorio */}
              <div className="hidden sm:flex justify-center mt-4">
                <button
                  onClick={() => {
                    setFiltroCategoria('todos');
                    setFiltroGenero('todos');
                    setFiltroAño('todos');
                    setBusqueda('');
                  }}
                  className="!bg-red-500 hover:bg-red-600 border border-red-400 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                >
                  🗑️ Quitar Todos los Filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Grid de contenidos */}
      <section className="py-6 px-4 sm:px-8">
        <div className="container mx-auto">
          {contenidosFiltrados.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {contenidosFiltrados.map(item => {
                const esBloqueado = item.bloqueado; // 👈 propiedad desde el backend
                return (

                  <div
                    key={item.idContenido}
                    onClick={() => handleVerVideo(item)} // 👈 Ahora usa la función que verifica bloqueo
                    className={`group bg-gray-800/80 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 flex flex-col h-full 
                      ${esBloqueado
                        ? "border-red-500/60 opacity-70 cursor-not-allowed"
                        : "border-gray-700/50 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10"
                      }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-40 sm:h-56 object-cover transition-transform duration-500 
                  ${!esBloqueado ? "group-hover:scale-110" : "grayscale"}`} // 👈 imagen en blanco y negro si está bloqueado
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Badge de categoría */}
                      <div className="absolute top-3 left-3">
                        <div className={`${getBadgeColor(item.categoria)} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1`}>
                          <span>{getCategoriaIcon(item.categoria)}</span>
                          <span>{item.categoria}</span>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="absolute top-3 right-3 bg-yellow-500/95 text-gray-900 px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                        <span>⭐</span>
                        <span>{item.rating}</span>
                      </div>

                      {/* Año */}
                      <div className="absolute bottom-3 left-3 bg-gray-900/90 text-white px-2 py-1 rounded text-xs font-medium">
                        {item.year}
                      </div>

                      {/* Etiqueta de bloqueo */}
                      {esBloqueado && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-red-400 text-xl font-bold">
                          🔒 Bloqueado
                        </div>
                      )}
                    </div>

                    {/* Contenido de la tarjeta */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-white line-clamp-2 leading-tight mb-3 group-hover:text-cyan-100 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-300 line-clamp-3 leading-relaxed mb-3 flex-1">
                        {item.descripcion}
                      </p>

                      <div className="mb-3">
                        <p className="text-xs text-gray-400 line-clamp-1">{item.generos}</p>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                        <div className="flex items-center space-x-1">
                          <span>🕒</span>
                          <span>{item.duracion || (item.episodios ? `${item.episodios} eps` : '120 min')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>📺</span>
                          <span>{item.temporadas || 1} temp</span>
                        </div>
                      </div>

                      {/* Botón Ver Ahora */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Evitar que se active el click del card
                          handleVerVideo(item);
                        }}
                        disabled={esBloqueado}
                        className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center space-x-2
                  ${esBloqueado
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                          }`}
                      >
                        <span className="text-lg">{esBloqueado ? "🚫" : "▶"}</span>
                        <span>{esBloqueado ? "No disponible" : "Ver Ahora"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-6 opacity-50">🔍</div>
              <h3 className="text-2xl font-bold text-gray-300 mb-4">No se encontraron resultados</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Intenta ajustar los filtros o la búsqueda para encontrar más contenido.
              </p>
              <button
                onClick={() => {
                  setFiltroCategoria('todos');
                  setFiltroGenero('todos');
                  setFiltroAño('todos');
                  setBusqueda('');
                }}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105"
              >
                Limpiar Filtros
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

export default CatalogoPage;