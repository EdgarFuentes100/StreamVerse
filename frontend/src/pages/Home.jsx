import Particles from "../components/Particles";
import PlanesCarousel from "./PlanesCarousel";

function Home() {
  // Datos para diferentes tipos de contenido
  const seriesPopulares = [
    { id: 1, title: "Attack on Titan", image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg", rating: 4.9, type: "anime" },
    { id: 2, title: "Demon Slayer", image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg", rating: 4.8, type: "anime" },
    { id: 3, title: "One Piece", image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg", rating: 4.7, type: "anime" },
    { id: 4, title: "Jujutsu Kaisen", image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg", rating: 4.9, type: "anime" },
    { id: 5, title: "Stranger Things", image: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg", rating: 4.6, type: "serie" },
    { id: 6, title: "The Mandalorian", image: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg", rating: 4.5, type: "serie" },
  ];

  const peliculasEstreno = [
    { id: 1, title: "Your Name", image: "https://cdn.myanimelist.net/images/anime/5/87048.jpg", rating: 4.8, type: "anime" },
    { id: 2, title: "Spider-Man: Across the Spider-Verse", image: "https://image.tmdb.org/t/p/w500/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg", rating: 4.7, type: "pelicula" },
    { id: 3, title: "Suzume", image: "https://cdn.myanimelist.net/images/anime/1598/134333.jpg", rating: 4.6, type: "anime" },
    { id: 4, title: "Avengers: Endgame", image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", rating: 4.9, type: "pelicula" },
    { id: 5, title: "Weathering With You", image: "https://cdn.myanimelist.net/images/anime/1884/101632.jpg", rating: 4.5, type: "anime" },
    { id: 6, title: "Dune", image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", rating: 4.4, type: "pelicula" },
  ];

  const contenidoTendencia = [
    { id: 1, title: "Chainsaw Man", image: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg", rating: 4.8, type: "anime", trend: "🔥" },
    { id: 2, title: "The Last of Us", image: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg", rating: 4.7, type: "serie", trend: "📈" },
    { id: 3, title: "Oppenheimer", image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", rating: 4.6, type: "pelicula", trend: "🎬" },
    { id: 4, title: "Blue Lock", image: "https://cdn.myanimelist.net/images/anime/1236/128158.jpg", rating: 4.5, type: "anime", trend: "⚽" },
    { id: 5, title: "Wednesday", image: "https://image.tmdb.org/t/p/w500/9PFonBhy4xuQSSr1deT9f8mzIBu.jpg", rating: 4.4, type: "serie", trend: "👻" },
    { id: 6, title: "John Wick 4", image: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg", rating: 4.3, type: "pelicula", trend: "🔫" },
  ];

  const tipos = [
    { name: "Películas", icon: "🎬", count: "3.2K" },
    { name: "Series", icon: "📺", count: "1.8K" },
    { name: "Anime", icon: "🎌", count: "2.5K" },
    { name: "Doramas", icon: "💞", count: "1.1K" },
    { name: "Documentales", icon: "📹", count: "640" },
    { name: "Infantil", icon: "👶", count: "520" },
  ];

  const generos = [
    "Acción", "Aventura", "Comedia", "Drama", "Fantasia", "Ciencia Ficción",
    "Terror", "Romance", "Misterio", "Deportes", "Musical", "Documental"
  ];

  const planes = [
    {
      id: 1,
      name: "Básico",
      price: "$5.99",
      period: "/ mes",
      features: ["Calidad 720p", "1 dispositivo", "Contenido limitado", "Anuncios incluidos"],
      color: "from-gray-500 to-gray-700",
      popular: false,
    },
    {
      id: 2,
      name: "Estándar",
      price: "$9.99",
      period: "/ mes",
      features: ["Calidad 1080p", "2 dispositivos", "Contenido completo", "Sin anuncios", "Descargas"],
      color: "from-cyan-500 to-blue-500",
      popular: true,
    },
    {
      id: 3,
      name: "Premium",
      price: "$14.99",
      period: "/ mes",
      features: ["Calidad 4K UHD", "4 dispositivos", "Todo el contenido", "Sin anuncios", "Descargas ilimitadas", "Contenido exclusivo"],
      color: "from-purple-500 to-pink-500",
      popular: false,
    },
  ];

  return (
    <>

      {/* Hero Section Universal con Efecto Apilado */}
      <section className="relative mt-12 sm:mt-16 md:mt-20 lg:mt-24 min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-screen flex flex-col lg:flex-row items-start lg:items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[url('https://tse4.mm.bing.net/th/id/OIP.yBffhe1roqeKvEpyGUPjDAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3')] opacity-20"></div>

        <div className="relative z-10 container mx-auto px-5 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-8 lg:mb-0 w-full px-4 sm:px-6">
            {/* Badge superior */}
            <div className="inline-block px-2 py- sm:px-3 sm:py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-[10px] sm:text-sm mb-4 sm:mb-6">
              🚀 TU UNIVERSO DE ENTRETENIMIENTO
            </div>

            {/* Título */}
            <h1 className="font-black mb-4 sm:mb-6 leading-snug sm:leading-tight break-words">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                TODO EL
              </span>
              <br />
              <span className="text-white drop-shadow-2xl text-3xl sm:text-3xl md:text-4xl lg:text-6xl">ENTRETENIMIENTO</span>
            </h1>

            {/* Descripción */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 sm:mb-8 leading-relaxed max-w-full sm:max-w-xl">
              Descubre miles de <span className="text-cyan-400">series</span>,{" "}
              <span className="text-purple-400">películas</span> y{" "}
              <span className="text-pink-400">animes</span> en un solo lugar.
              Streaming ilimitado en la mejor calidad.
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="group bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl text-sm sm:text-lg font-bold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
                <span className="flex items-center justify-center">
                  COMIENZA TU PRUEBA GRATIS
                  <span className="ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform">🎬</span>
                </span>
              </button>
            </div>

            {/* Estadísticas */}
            <div className="mt-6 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-6 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-cyan-400">10K+</div>
                <div className="text-gray-400 text-xs sm:text-sm">Series & Películas</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-purple-400">2.5K</div>
                <div className="text-gray-400 text-xs sm:text-sm">Animes Exclusivos</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-pink-400">4K</div>
                <div className="text-gray-400 text-xs sm:text-sm">Calidad Máxima</div>
              </div>
            </div>
          </div>


          {/* Contenido visual escalable */}
          <div className="lg:w-1/2 relative w-full">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">

              {/* Película principal */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-44 sm:w-56 md:w-64 lg:w-80 group">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/25 border-2 border-cyan-500/30 transform group-hover:scale-105 transition-all duration-500">
                  <img
                    src="https://image.tmdb.org/t/p/w500/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg"
                    alt="Spider-Verse"
                    className="w-full h-40 sm:h-52 md:h-64 lg:h-96 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                  <div className="absolute -top-2 sm:-top-3 -right-2 sm:-right-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-2xl font-bold text-xs sm:text-sm shadow-2xl z-10">
                    ESTRENO
                  </div>
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-gray-900/90 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-2 sm:p-4">
                    <div className="text-cyan-400 font-bold text-[9px] sm:text-xs mb-1">PELÍCULA</div>
                    <div className="text-white font-semibold text-[10px] sm:text-lg mb-1 sm:mb-2">Spider-Verse</div>
                    <div className="flex items-center justify-between text-[8px] sm:text-sm">
                      <div className="flex items-center space-x-1 sm:space-x-2 text-yellow-400">★★★★★</div>
                      <span className="text-green-400 text-[8px] sm:text-xs flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                        NUEVO
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Serie izquierda */}
              <div className="absolute top-5 sm:top-6 md:top-8 left-2 sm:left-4 z-20 w-36 sm:w-44 md:w-52 lg:w-60 group transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-purple-500/20 border-2 border-purple-500/30">
                  <img
                    src="https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg"
                    alt="The Last of Us"
                    className="w-full h-32 sm:h-44 md:h-56 lg:h-72 object-cover"
                  />
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className="text-purple-400 font-bold text-[8px] sm:text-xs">SERIE</div>
                    <div className="text-white font-semibold text-[9px] sm:text-sm">The Last of Us</div>
                    <div className="flex text-yellow-400 text-[8px] sm:text-xs">★★★★☆</div>
                  </div>
                </div>
              </div>

              {/* Anime derecha */}
              <div className="absolute top-5 sm:top-6 md:top-8 right-2 sm:right-4 z-20 w-36 sm:w-44 md:w-52 lg:w-60 group transform rotate-[5deg] hover:rotate-0 transition-transform duration-500">
                <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-pink-500/20 border-2 border-pink-500/30">
                  <img
                    src="https://cdn.myanimelist.net/images/anime/1286/99889.jpg"
                    alt="Demon Slayer"
                    className="w-full h-32 sm:h-44 md:h-56 lg:h-72 object-cover"
                  />
                  <div className="absolute bottom-1 left-1 right-1">
                    <div className="text-pink-400 font-bold text-[8px] sm:text-xs">ANIME</div>
                    <div className="text-white font-semibold text-[9px] sm:text-sm">Demon Slayer</div>
                    <div className="flex text-yellow-400 text-[8px] sm:text-xs">★★★★★</div>
                  </div>
                </div>
              </div>

              {/* Inferior izquierdo */}
              <div className="absolute bottom-4 left-3 sm:bottom-6 sm:left-4 md:bottom-8 md:left-6 z-10 w-32 sm:w-40 md:w-44 lg:w-48 group opacity-80 hover:opacity-100 transition-opacity duration-300">
                <div className="relative rounded-xl overflow-hidden shadow-lg shadow-blue-500/20 border-2 border-blue-500/30">
                  <img
                    src="https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
                    alt="Oppenheimer"
                    className="w-full h-28 sm:h-32 md:h-40 lg:h-48 object-cover"
                  />
                  <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2">
                    <div className="text-blue-400 text-[7px] sm:text-xs font-bold">PELÍCULA</div>
                  </div>
                </div>
              </div>

              {/* Inferior derecho */}
              <div className="absolute bottom-4 right-3 sm:bottom-6 sm:right-4 md:bottom-8 md:right-6 z-10 w-32 sm:w-40 md:w-44 lg:w-48 group opacity-80 hover:opacity-100 transition-opacity duration-300">
                <div className="relative rounded-xl overflow-hidden shadow-lg shadow-green-500/20 border-2 border-green-500/30">
                  <img
                    src="https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
                    alt="Wednesday"
                    className="w-full h-28 sm:h-32 md:h-40 lg:h-48 object-cover"
                  />
                  <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2">
                    <div className="text-green-400 text-[7px] sm:text-xs font-bold">SERIE</div>
                  </div>
                </div>
              </div>

              {/* Botón central flotante */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-40">
                <button className="group bg-gradient-to-r from-cyan-500/90 to-purple-500/90 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-2xl font-bold backdrop-blur-lg border border-cyan-400/30 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-110 hover:from-cyan-500 hover:to-purple-500">
                  <span className="flex items-center space-x-2">
                    <span>Explorar</span>
                    <span className="group-hover:translate-y-1 transition-transform duration-300">👇</span>
                  </span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>




      {/* Categorías Optimizadas para Móviles */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="container mx-auto">
          {/* Título responsive */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 lg:mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Explora por tipo
            </span>
          </h2>

          {/* Grid responsive con mejor espaciado */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
            {tipos.map((tipo, index) => (
              <div
                key={tipo.name}
                className="group relative bg-gray-800/50 border border-cyan-500/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-center hover:border-cyan-400 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-sm active:scale-95"
              >
                {/* Icono con tamaño responsive */}
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                  {tipo.icon}
                </div>

                {/* Nombre de categoría con texto responsive */}
                <h3 className="font-semibold text-gray-300 group-hover:text-cyan-400 transition-colors mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base whitespace-nowrap overflow-hidden text-ellipsis">
                  {tipo.name}
                </h3>

                {/* Contador con mejor jerarquía */}
                <div className="text-cyan-400 text-xs sm:text-sm font-bold bg-cyan-500/10 rounded-full px-2 py-1 inline-block">
                  {tipo.count}
                </div>

                {/* Efecto de brillo al hover */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Texto adicional para móviles */}
          <div className="mt-8 sm:mt-12 text-center lg:hidden">
            <p className="text-gray-400 text-sm sm:text-base">
              Toca cualquier categoría para explorar su contenido
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Efecto de partículas */}
        <Particles
          count={{ sm: 200, lg: 700 }}      // Cantidad de partículas según tamaño
          intensity={{ sm: "low", lg: "medium" }}  // Opacidad según tamaño
          className="absolute inset-0 z-0"
        />

        <div className="container mx-auto">
          {/* Header responsive */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-10 lg:mb-12 gap-4 sm:gap-0">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Series Populares
              </h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Las series más vistas esta semana
              </p>
            </div>
            <button className="group text-cyan-400 hover:text-purple-400 transition-colors font-bold flex items-center space-x-2 text-sm sm:text-base self-center sm:self-auto">
              <span>Ver todas</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          <div className="relative">
            {/* Gradientes laterales MÁS PEQUEÑOS en móviles */}
            <div className="absolute left-0 top-0 bottom-0 w-4 sm:w-8 lg:w-20 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-4 sm:w-8 lg:w-20 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none"></div>

            {/* Scroll horizontal */}
            <div className="flex overflow-x-auto pb-4 sm:pb-6 space-x-3 sm:space-x-6 px-1 sm:px-4 custom-scrollbar snap-x snap-mandatory">
              {seriesPopulares.map((serie) => (
                <div
                  key={serie.id}
                  className="flex-shrink-0 w-56 sm:w-72 md:w-80 snap-center group relative bg-gray-800 rounded-xl sm:rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 border border-gray-600 active:scale-95"
                >
                  {/* Badge de tipo MÁS PEQUEÑO */}
                  <div className="absolute top-2 left-2 z-10">
                    <div className={`px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-sm font-bold shadow-md ${serie.type === 'anime' ? 'bg-pink-500' :
                      serie.type === 'serie' ? 'bg-cyan-500' : 'bg-purple-500'
                      } text-white whitespace-nowrap`}>
                      {serie.type === 'anime' ? 'ANIME' : serie.type === 'serie' ? 'SERIE' : 'PELÍCULA'}
                    </div>
                  </div>

                  {/* Rating MÁS PEQUEÑO */}
                  <div className="absolute top-2 right-2 z-10">
                    <div className="bg-yellow-500 text-gray-900 px-1.5 py-0.5 rounded-full text-[10px] font-bold flex items-center space-x-0.5">
                      <span className="text-[10px]">⭐</span>
                      <span className="text-[10px]">{serie.rating}</span>
                    </div>
                  </div>

                  {/* Imagen con overlay - ALTURA REDUCIDA en móviles */}
                  <div className="relative overflow-hidden">
                    <img
                      src={serie.image}
                      alt={serie.title}
                      className="w-full h-40 sm:h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Botón con icono en móviles y ancho reducido */}
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 transform lg:translate-y-full lg:group-hover:translate-y-0 transition-transform duration-300">
                      <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-1.5 sm:p-3 rounded-full sm:rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all active:scale-95 flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto">
                        <span className="sm:hidden text-xs">▶</span>
                        <span className="hidden sm:inline text-sm font-bold">Ver ahora</span>
                      </button>
                    </div>
                  </div>

                  {/* Información de la serie - MÁS COMPACTA */}
                  <div className="p-2 sm:p-4">
                    <h3 className="font-bold text-xs sm:text-base text-center group-hover:text-cyan-400 transition-colors line-clamp-2 min-h-[1.5rem] flex items-center justify-center">
                      {serie.title}
                    </h3>
                    <div className="flex justify-center mt-1">
                      <div className="flex text-yellow-400 text-[10px] sm:text-sm">
                        {"★".repeat(5)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicador de scroll */}
          <div className="lg:hidden mt-4 text-center">
            <div className="text-cyan-400 text-xs font-medium animate-pulse">
              ← Desliza para ver más →
            </div>
          </div>
        </div>
      </section>

      {/* Películas de Estreno - Responsive Optimizado */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/30">
        <div className="container mx-auto">
          {/* Header responsive */}
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-8 sm:mb-10 lg:mb-12 gap-4 sm:gap-0">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Estrenos Recientes
              </h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Las películas más nuevas en la plataforma
              </p>
            </div>
            <button className="group text-purple-400 hover:text-pink-400 transition-colors font-bold flex items-center space-x-2 text-sm sm:text-base">
              <span>Ver todas</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Grid responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {peliculasEstreno.map((pelicula) => (
              <div
                key={pelicula.id}
                className="group relative bg-gray-800 rounded-2xl sm:rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 border border-gray-700 active:scale-95"
              >
                {/* Badge ESTRENO */}
                <div className="absolute top-2 left-2 z-10">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-md">
                    ESTRENO
                  </div>
                </div>

                {/* Rating */}
                <div className="absolute top-2 right-2 z-10">
                  <div className="bg-yellow-500 text-gray-900 px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold flex items-center space-x-0.5">
                    <span className="text-[10px]">⭐</span>
                    <span className="text-[10px]">{pelicula.rating}</span>
                  </div>
                </div>

                {/* Imagen con altura responsive */}
                <div className="relative overflow-hidden">
                  <img
                    src={pelicula.image}
                    alt={pelicula.title}
                    className="w-full h-36 sm:h-64 md:h-80 lg:h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>

                  {/* Botón flotante móvil */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 lg:hidden">
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-1.5 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all active:scale-95 flex items-center justify-center w-8 h-8">
                      <span className="text-xs">▶</span>
                    </button>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-bold text-base sm:text-xl text-center group-hover:text-purple-400 transition-colors mb-2 line-clamp-2 leading-snug">
                    {pelicula.title}
                  </h3>

                  {/* Rating y estrellas */}
                  <div className="flex justify-center items-center space-x-2 sm:space-x-4 text-[10px] sm:text-sm mb-2 sm:mb-3">
                    <div className="flex text-yellow-400 text-[10px] sm:text-sm">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-gray-400 text-[10px] sm:text-sm">{pelicula.rating}/5</span>
                  </div>

                  {/* Botón principal desktop */}
                  <button className="hidden lg:block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all active:scale-95">
                    Ver Película
                  </button>

                  {/* Botón compacto para tablet/móvil */}
                  <button className="lg:hidden w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all active:scale-95 text-sm">
                    Ver ahora
                  </button>
                </div>

                {/* Efecto borde sutil hover */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-purple-500/30 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* CTA adicional para móviles */}
          <div className="lg:hidden mt-6 sm:mt-8 text-center">
            <div className="bg-purple-500/10 rounded-2xl p-4 border border-purple-500/20">
              <p className="text-purple-400 text-sm font-medium mb-2">
                🎬 Más estrenos cada semana
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                Suscribirme
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <PlanesCarousel />
    </>
  );
}

export default Home;