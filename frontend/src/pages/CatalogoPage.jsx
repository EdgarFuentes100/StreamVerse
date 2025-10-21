import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todosLosContenidos } from '../data/contenido';

function CatalogoPage() {
  const navigate = useNavigate();
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroGenero, setFiltroGenero] = useState('todos');
  const [filtroAño, setFiltroAño] = useState('todos');
  const [orden, setOrden] = useState('popular');
  const [busqueda, setBusqueda] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const categorias = ['todos', 'Anime', 'Película', 'Serie', 'Dorama', 'Infantil'];
  const generos = ['todos', 'Acción', 'Aventura', 'Comedia', 'Drama', 'Romance', 'Terror', 'Ciencia Ficción', 'Fantasía', 'Superhéroes', 'Sobrenatural', 'Misterio'];
  const años = ['todos', '2024', '2023', '2022', '2021', '2020'];
  const ordenes = [
    { value: 'popular', label: '🎯 Popular' },
    { value: 'new', label: '🆕 Nuevo' },
    { value: 'rating', label: '⭐ Rating' },
    { value: 'title', label: '🔤 A-Z' }
  ];

  const contenidosFiltrados = todosLosContenidos.filter(item => {
    const coincideCategoria = filtroCategoria === 'todos' || item.categoria === filtroCategoria;
    const coincideGenero = filtroGenero === 'todos' || item.generos.includes(filtroGenero);
    const coincideAño = filtroAño === 'todos' || item.year.toString() === filtroAño;
    const coincideBusqueda = item.title.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideGenero && coincideAño && coincideBusqueda;
  }).sort((a, b) => {
    switch (orden) {
      case 'popular':
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.rating - a.rating;
      case 'new':
        return b.year - a.year;
      case 'rating':
        return b.rating - a.rating;
      case 'title':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleVerVideo = (contenido) => {
    navigate(`/video/${contenido.id}`);
  };

  const getBadgeColor = (categoria) => {
    const colors = {
      'Anime': 'bg-pink-500',
      'Película': 'bg-purple-500',
      'Serie': 'bg-cyan-500',
      'Dorama': 'bg-red-500',
      'Infantil': 'bg-green-500'
    };
    return colors[categoria] || 'bg-gray-500';
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-950">

      {/* Hero Section */}
      <section className="relative py-0 px-4 sm:px-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
        <div className="container mx-auto text-center">
          <h1
            className="font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', marginTop: 0 }}
          >
            Catálogo
          </h1>

          <p className="text-sm sm:text-xl text-gray-300 max-w-full sm:max-w-2xl mx-auto">
            Encuentra tu próxima historia favorita
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-cyan-400">
            <span>🎬 Películas</span>
            <span>•</span>
            <span>📺 Series</span>
            <span>•</span>
            <span>🎌 Animes</span>
            <span>•</span>
            <span>💞 Doramas</span>
          </div>
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
              className="w-full bg-gray-800/80 border border-cyan-500/30 rounded-lg sm:rounded-xl px-3 py-2 text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:border-cyan-400"
            />
            <div className="flex gap-1 sm:gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="flex items-center justify-center gap-1 bg-gray-800 border border-cyan-500/30 text-cyan-400 px-2 py-2 rounded-lg text-xs sm:text-sm"
              >
                🎚️ Filtros
              </button>
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="bg-gray-800 border border-purple-500/30 text-white rounded-lg px-2 py-2 text-xs sm:text-sm"
              >
                {ordenes.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtros expandibles */}
          {mostrarFiltros && (
            <div className="mt-3 p-3 sm:p-4 bg-gray-800/50 rounded-lg sm:rounded-xl border border-cyan-500/20">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {/* Categoría */}
                {categorias.map(c => (
                  <button
                    key={c}
                    onClick={() => setFiltroCategoria(c)}
                    className={`px-2 py-1 rounded-lg text-xs sm:text-sm font-medium ${filtroCategoria === c ? 'bg-cyan-500 text-white shadow' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    {c === 'todos' ? '🌐 Todos' : c === 'Anime' ? '🎌 Animes' : c === 'Película' ? '🎬 Películas' : c === 'Serie' ? '📺 Series' : c === 'Dorama' ? '💞 Doramas' : '👶 Infantil'}
                  </button>
                ))}

                {/* Géneros */}
                {generos.map(g => (
                  <button
                    key={g}
                    onClick={() => setFiltroGenero(g)}
                    className={`px-2 py-1 rounded-lg text-xs sm:text-sm font-medium ${filtroGenero === g ? 'bg-purple-500 text-white shadow' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    {g}
                  </button>
                ))}

                {/* Año */}
                {años.map(a => (
                  <button
                    key={a}
                    onClick={() => setFiltroAño(a)}
                    className={`px-2 py-1 rounded-lg text-xs sm:text-sm font-medium ${filtroAño === a ? 'bg-pink-500 text-white shadow' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                  >
                    {a === 'todos' ? '📆 Todos' : a}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 mt-3 sm:hidden">
                <button onClick={() => setMostrarFiltros(false)} className="flex-1 bg-cyan-500 text-white py-2 rounded-lg text-sm">Aplicar</button>
                <button onClick={() => {
                  setFiltroCategoria('todos'); setFiltroGenero('todos'); setFiltroAño('todos');
                }} className="flex-1 bg-gray-600 text-white py-2 rounded-lg text-sm">Limpiar</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Grid de Contenido */}
{/* Grid de Contenido Optimizado */}
{/* Grid de Contenido Optimizado */}
<section className="py-6 px-4 sm:px-8">
  <div className="container mx-auto">
    {contenidosFiltrados.length > 0 ? (
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {contenidosFiltrados.map(item => (
          <div
            key={item.id}
            onClick={() => handleVerVideo(item)}
            className="group bg-gray-800/80 rounded-lg overflow-hidden cursor-pointer border border-transparent hover:border-cyan-400/50 hover:shadow-md transition-all flex flex-col"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-36 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badges superpuestos */}
              <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                <div className={`${getBadgeColor(item.categoria)} text-white px-2 py-0.5 rounded text-[10px] font-bold`}>
                  {item.categoria}
                </div>
                {item.isNew && (
                  <div className="bg-green-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                    NUEVO
                  </div>
                )}
                {item.isExclusive && (
                  <div className="bg-yellow-500 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                    EXCLUSIVO
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 px-2 py-0.5 rounded text-[10px] font-bold flex items-center space-x-1">
                <span>⭐</span>
                <span>{item.rating}</span>
              </div>
            </div>

            {/* Información inferior */}
            <div className="p-2 sm:p-3 flex flex-col flex-1">
              {/* Título */}
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white line-clamp-2">
                {item.title}
              </h3>

              {/* Descripción */}
              <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-400 line-clamp-2 mt-1 flex-1">
                {item.descripcion}
              </p>

              {/* Géneros */}
              <div className="flex flex-wrap gap-1 mt-1 mb-2">
                {item.generos.slice(0, 2).map(g => (
                  <span key={g} className="bg-gray-700 text-gray-300 px-1 py-0.5 text-[9px] sm:text-[10px] md:text-xs rounded">
                    {g}
                  </span>
                ))}
                {item.generos.length > 2 && (
                  <span className="bg-gray-600 text-gray-400 px-1 py-0.5 text-[9px] sm:text-[10px] md:text-xs rounded">
                    +{item.generos.length - 2}
                  </span>
                )}
              </div>

              {/* Botón siempre al fondo */}
              <button className="mt-auto w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base font-bold">
                ▶ Ver Ahora
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-400 mb-2">No se encontraron resultados</h3>
        <p className="text-gray-500 text-sm sm:text-base max-w-md mx-auto mb-4">
          Prueba con otros filtros o términos de búsqueda
        </p>
        <button onClick={() => {
          setFiltroCategoria('todos'); setFiltroGenero('todos'); setFiltroAño('todos'); setBusqueda('');
        }} className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2 rounded-lg font-bold text-sm sm:text-base">
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
