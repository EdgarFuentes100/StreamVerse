import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CatalogoPage() {
  const navigate = useNavigate();
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [filtroGenero, setFiltroGenero] = useState('todos');
  const [filtroAño, setFiltroAño] = useState('todos');
  const [orden, setOrden] = useState('popular');
  const [busqueda, setBusqueda] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Datos mejorados con múltiples géneros
  const todosLosContenidos = [
    // ANIMES
    {
      id: 1,
      title: "Attack on Titan",
      image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      rating: 4.9,
      year: 2023,
      categoria: "Anime",
      generos: ["Acción", "Drama", "Ciencia Ficción"],
      descripcion: "La humanidad vive en ciudades rodeadas por enormes muros que los protegen de los titanes.",
      temporadas: 4,
      episodios: 24,
      isNew: true,
      isExclusive: true
    },
    {
      id: 2,
      title: "Demon Slayer: Kimetsu no Yaiba",
      image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
      rating: 4.8,
      year: 2023,
      categoria: "Anime",
      generos: ["Acción", "Aventura", "Fantasía"],
      descripcion: "Tanjiro Kamado se convierte en cazador de demonios para salvar a su hermana.",
      temporadas: 3,
      episodios: 26,
      isTrending: true
    },
    {
      id: 3,
      title: "Jujutsu Kaisen",
      image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
      rating: 4.7,
      year: 2023,
      categoria: "Anime",
      generos: ["Acción", "Sobrenatural", "Aventura"],
      descripcion: "Estudiantes de hechicería luchan contra maldiciones en el mundo moderno.",
      temporadas: 2,
      episodios: 24,
      isPopular: true
    },

    // PELÍCULAS
    {
      id: 4,
      title: "Spider-Man: Across the Spider-Verse",
      image: "https://image.tmdb.org/t/p/w500/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg",
      rating: 4.7,
      year: 2023,
      categoria: "Película",
      generos: ["Animación", "Superhéroes", "Aventura", "Ciencia Ficción"],
      descripcion: "Miles Morales viaja a través del multiverso para unirse a Gwen Stacy.",
      duracion: "2:20:15",
      isNew: true
    },
    {
      id: 5,
      title: "Avengers: Endgame",
      image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
      rating: 4.9,
      year: 2019,
      categoria: "Película",
      generos: ["Acción", "Superhéroes", "Ciencia Ficción", "Aventura"],
      descripcion: "Los Vengadores se reúnen para revertir el chasquido de Thanos.",
      duracion: "3:01:00",
      isPopular: true
    },

    // SERIES
    {
      id: 6,
      title: "Stranger Things",
      image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      rating: 4.6,
      year: 2022,
      categoria: "Serie",
      generos: ["Ciencia Ficción", "Terror", "Drama", "Misterio"],
      descripcion: "Un grupo de niños se enfrenta a fuerzas sobrenaturales en su pueblo.",
      temporadas: 4,
      episodios: 34,
      isPopular: true
    },
    {
      id: 7,
      title: "The Last of Us",
      image: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
      rating: 4.7,
      year: 2023,
      categoria: "Serie",
      generos: ["Drama", "Post-apocalíptico", "Aventura", "Terror"],
      descripcion: "Un hombre y una niña en un mundo devastado por una infección.",
      temporadas: 1,
      episodios: 9,
      isTrending: true
    },

    // DORAMAS
    {
      id: 8,
      title: "Goblin: The Lonely and Great God",
      image: "https://i.mydramalist.com/4vz1W_4f.jpg",
      rating: 4.8,
      year: 2016,
      categoria: "Dorama",
      generos: ["Romance", "Fantasía", "Drama"],
      descripcion: "Un inmortal goblin busca a su novia humana para poner fin a su inmortalidad.",
      episodios: 16
    }
  ];

  const categorias = ['todos', 'Anime', 'Película', 'Serie', 'Dorama', 'Infantil'];
  const generos = ['todos', 'Acción', 'Aventura', 'Comedia', 'Drama', 'Romance', 'Terror', 'Ciencia Ficción', 'Fantasía', 'Superhéroes', 'Sobrenatural', 'Misterio'];
  const años = ['todos', '2024', '2023', '2022', '2021', '2020'];
  const ordenes = [
    { value: 'popular', label: '🎯 Popular' },
    { value: 'new', label: '🆕 Nuevo' },
    { value: 'rating', label: '⭐ Rating' },
    { value: 'title', label: '🔤 A-Z' }
  ];

  // Obtener todos los géneros únicos para filtrado
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
      {/* Hero Section Simplificada */}
      <section className="relative py-12 px-4 sm:px-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Catálogo
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Encuentra tu próxima historia favorita
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-cyan-400">
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

      {/* Barra de Búsqueda y Filtros - Mejorada para móvil */}
      <section className="py-6 px-4 sm:px-8 bg-gray-900/80 backdrop-blur-lg border-b border-cyan-500/20 sticky top-20 z-40">
        <div className="container mx-auto">
          {/* Primera fila: Búsqueda y Botones principales */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-4">
            {/* Barra de búsqueda */}
            <div className="flex-1 min-w-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="🔍 Buscar contenido..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full bg-gray-800/80 border border-cyan-500/30 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-all text-base backdrop-blur-sm"
                />
                {busqueda && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-400 text-sm bg-cyan-500/10 px-2 py-1 rounded-lg">
                    {contenidosFiltrados.length}
                  </div>
                )}
              </div>
            </div>

            {/* Botones de control */}
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 border border-cyan-500/30 text-cyan-400 px-3 sm:px-4 py-3 rounded-xl transition-all duration-300 text-sm sm:text-base flex-1 sm:flex-none justify-center"
              >
                <span>🎚️</span>
                <span className="hidden sm:inline">Filtros</span>
              </button>

              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="bg-gray-800 border border-purple-500/30 text-white rounded-xl px-3 sm:px-4 py-3 focus:outline-none focus:border-purple-400 transition-all text-sm sm:text-base"
              >
                {ordenes.map((opcion) => (
                  <option key={opcion.value} value={opcion.value}>
                    {opcion.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filtros expandibles - Mejorado para móvil */}
          {mostrarFiltros && (
            <div className="mt-4 p-4 sm:p-6 bg-gray-800/50 rounded-xl sm:rounded-2xl border border-cyan-500/20 backdrop-blur-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Filtro por Categoría */}
                <div>
                  <h3 className="text-cyan-400 font-bold mb-3 text-sm sm:text-base">
                    🎭 Categoría
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categorias.map((categoria) => (
                      <button
                        key={categoria}
                        onClick={() => setFiltroCategoria(categoria)}
                        className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                          filtroCategoria === categoria 
                            ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {categoria === 'todos' ? '🌐 Todos' : 
                         categoria === 'Anime' ? '🎌 Animes' :
                         categoria === 'Película' ? '🎬 Películas' :
                         categoria === 'Serie' ? '📺 Series' :
                         categoria === 'Dorama' ? '💞 Doramas' :
                         '👶 Infantil'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtro por Género */}
                <div>
                  <h3 className="text-purple-400 font-bold mb-3 text-sm sm:text-base">
                    🏷️ Género
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {generos.map((genero) => (
                      <button
                        key={genero}
                        onClick={() => setFiltroGenero(genero)}
                        className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                          filtroGenero === genero 
                            ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {genero}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Filtro por Año */}
                <div>
                  <h3 className="text-pink-400 font-bold mb-3 text-sm sm:text-base">
                    📅 Año
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {años.map((año) => (
                      <button
                        key={año}
                        onClick={() => setFiltroAño(año)}
                        className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                          filtroAño === año 
                            ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25' 
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {año === 'todos' ? '📆 Todos' : año}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botones de acción en móvil */}
              <div className="flex gap-2 mt-4 sm:hidden">
                <button
                  onClick={() => setMostrarFiltros(false)}
                  className="flex-1 bg-cyan-500 text-white py-2 rounded-lg font-medium"
                >
                  Aplicar
                </button>
                <button
                  onClick={() => {
                    setFiltroCategoria('todos');
                    setFiltroGenero('todos');
                    setFiltroAño('todos');
                  }}
                  className="flex-1 bg-gray-600 text-white py-2 rounded-lg font-medium"
                >
                  Limpiar
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Grid de Contenido - Optimizado para móvil */}
      <section className="py-8 px-4 sm:px-8">
        <div className="container mx-auto">
          {/* Header del grid */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {filtroCategoria === 'todos' ? 'Todo el Contenido' : 
                 filtroCategoria === 'Anime' ? 'Animes' :
                 filtroCategoria === 'Película' ? 'Películas' :
                 filtroCategoria === 'Serie' ? 'Series' :
                 filtroCategoria === 'Dorama' ? 'Doramas' : 'Infantil'}
                <span className="text-cyan-400 ml-2">({contenidosFiltrados.length})</span>
              </h2>
              {(filtroGenero !== 'todos' || filtroAño !== 'todos') && (
                <p className="text-gray-400 text-xs sm:text-sm mt-1">
                  Filtros: 
                  {filtroGenero !== 'todos' && <span className="text-purple-400 ml-1">{filtroGenero}</span>}
                  {filtroAño !== 'todos' && <span className="text-pink-400 ml-1">• {filtroAño}</span>}
                </p>
              )}
            </div>
          </div>

          {/* Grid de contenido responsive */}
          {contenidosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {contenidosFiltrados.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleVerVideo(item)}
                  className="group bg-gray-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer border border-transparent hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay con gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
                    
                    {/* Badges superiores */}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      <div className={`${getBadgeColor(item.categoria)} text-white px-2 py-1 rounded text-xs font-bold`}>
                        {item.categoria}
                      </div>
                      {item.isNew && (
                        <div className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">
                          NUEVO
                        </div>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs font-bold flex items-center space-x-1">
                      <span>⭐</span>
                      <span>{item.rating}</span>
                    </div>

                    {/* Información inferior */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="flex justify-between items-center text-white text-xs">
                        <span>{item.year}</span>
                        {item.duracion && <span className="text-xs">{item.duracion}</span>}
                        {item.temporadas && <span className="text-xs">{item.temporadas}T</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 sm:p-4">
                    <h3 className="font-bold text-white text-base sm:text-lg mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                    
                    {/* Géneros */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.generos.slice(0, 2).map((genero, index) => (
                        <span
                          key={genero}
                          className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300"
                        >
                          {genero}
                        </span>
                      ))}
                      {item.generos.length > 2 && (
                        <span className="bg-gray-600 px-2 py-1 rounded text-xs text-gray-400">
                          +{item.generos.length - 2}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-3 leading-relaxed">
                      {item.descripcion}
                    </p>
                    
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group-hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base">
                      <span>▶</span>
                      <span>Ver Ahora</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-20">
              <div className="text-6xl sm:text-8xl mb-4">🔍</div>
              <h3 className="text-xl sm:text-3xl font-bold text-gray-400 mb-3 sm:mb-4">
                No se encontraron resultados
              </h3>
              <p className="text-gray-500 text-sm sm:text-lg max-w-md mx-auto mb-6">
                Prueba con otros filtros o términos de búsqueda
              </p>
              <button
                onClick={() => {
                  setFiltroCategoria('todos');
                  setFiltroGenero('todos');
                  setFiltroAño('todos');
                  setBusqueda('');
                }}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 sm:px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all text-sm sm:text-base"
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