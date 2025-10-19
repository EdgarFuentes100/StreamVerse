import "./App.css";

function App() {
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
    <div className="min-h-screen bg-gray-950 text-white font-sans overflow-x-hidden">
      {/* Header Mejorado */}
      <header className="bg-gray-900/80 backdrop-blur-lg border-b border-cyan-500/20 w-full py-4 px-8 flex justify-between items-center fixed top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <span className="font-bold text-white text-xl">🎬</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            StreamVerse
          </h1>
        </div>

        <nav className="hidden lg:flex space-x-8">
          {["Inicio", "Series", "Películas", "Animes", "Mi Lista", "Novedades"].map((item) => (
            <a key={item} href="#" className="relative group">
              <span className="text-gray-300 group-hover:text-cyan-400 transition-all duration-300 font-medium">
                {item}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors hover:scale-110">
            <span className="text-xl">🔍</span>
          </button>
          <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105">
            Iniciar sesión
          </button>
        </div>
      </header>

      {/* Hero Section Universal con Efecto Apilado */}
      <section className="relative mt-20 min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20"></div>
        <div className="absolute inset-0 bg-[url('https://tse4.mm.bing.net/th/id/OIP.yBffhe1roqeKvEpyGUPjDAHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3')] opacity-20"></div>

        <div className="relative z-10 container mx-auto px-8 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <div className="inline-block px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-6">
              🚀 TU UNIVERSO DE ENTRETENIMIENTO
            </div>
            <h1 className="text-6xl lg:text-8xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                TODO EL
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">ENTRETENIMIENTO</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Descubre miles de <span className="text-cyan-400">series</span>,{" "}
              <span className="text-purple-400">películas</span> y{" "}
              <span className="text-pink-400">animes</span> en un solo lugar.
              Streaming ilimitado en la mejor calidad.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="group bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
                <span className="flex items-center justify-center">
                  COMIENZA TU PRUEBA GRATIS
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">🎬</span>
                </span>
              </button>
              <button className="group border-2 border-cyan-500/30 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-cyan-500/10 transition-all duration-300 backdrop-blur-sm">
                <span className="flex items-center justify-center">
                  EXPLORAR CATÁLOGO
                  <span className="ml-2 group-hover:scale-110 transition-transform">🔍</span>
                </span>
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-400">10K+</div>
                <div className="text-gray-400">Series & Películas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">2.5K</div>
                <div className="text-gray-400">Animes Exclusivos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-pink-400">4K</div>
                <div className="text-gray-400">Calidad Máxima</div>
              </div>
            </div>
          </div>

          {/* Contenido Apilado con Efecto Cascada - Mezclando tipos */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-[600px]">
              {/* Contenido Principal - Película */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-80 group">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-cyan-500/25 border-2 border-cyan-500/30 transform group-hover:scale-105 transition-all duration-500">
                  <img
                    src="https://image.tmdb.org/t/p/w500/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg"
                    alt="Spider-Man: Across the Spider-Verse"
                    className="w-full h-96 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>

                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-2xl z-10">
                    ESTRENO
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-gray-900/90 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-4">
                    <div className="text-cyan-400 font-bold text-xs mb-1">PELÍCULA</div>
                    <div className="text-white font-semibold text-lg mb-2">Spider-Verse</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400 text-sm">★★★★★</div>
                        <span className="text-gray-400 text-sm">4.7</span>
                      </div>
                      <span className="text-green-400 text-xs flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                        NUEVO
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contenido Secundario - Serie (Izquierda) */}
              <div className="absolute top-10 left-0 z-20 w-64 group transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-purple-500/20 border-2 border-purple-500/30">
                  <img
                    src="https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg"
                    alt="The Last of Us"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-purple-400 font-bold text-xs">SERIE</div>
                    <div className="text-white font-semibold text-sm">The Last of Us</div>
                    <div className="flex text-yellow-400 text-xs">★★★★☆</div>
                  </div>
                </div>
              </div>

              {/* Contenido Secundario - Anime (Derecha) */}
              <div className="absolute top-10 right-0 z-20 w-64 group transform rotate-[5deg] hover:rotate-0 transition-transform duration-500">
                <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-pink-500/20 border-2 border-pink-500/30">
                  <img
                    src="https://cdn.myanimelist.net/images/anime/1286/99889.jpg"
                    alt="Demon Slayer"
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-pink-400 font-bold text-xs">ANIME</div>
                    <div className="text-white font-semibold text-sm">Demon Slayer</div>
                    <div className="flex text-yellow-400 text-xs">★★★★★</div>
                  </div>
                </div>
              </div>

              {/* Contenido Terciario - Película (Abajo Izquierda) */}
              <div className="absolute bottom-10 left-10 z-10 w-56 group opacity-80 hover:opacity-100 transition-opacity duration-300">
                <div className="relative rounded-xl overflow-hidden shadow-lg shadow-blue-500/20 border-2 border-blue-500/30">
                  <img
                    src="https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
                    alt="Oppenheimer"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 left-2">
                    <div className="text-blue-400 text-xs font-bold">PELÍCULA</div>
                  </div>
                </div>
              </div>

              {/* Contenido Terciario - Serie (Abajo Derecha) */}
              <div className="absolute bottom-10 right-10 z-10 w-56 group opacity-80 hover:opacity-100 transition-opacity duration-300">
                <div className="relative rounded-xl overflow-hidden shadow-lg shadow-green-500/20 border-2 border-green-500/30">
                  <img
                    src="https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
                    alt="Wednesday"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-2 left-2">
                    <div className="text-green-400 text-xs font-bold">SERIE</div>
                  </div>
                </div>
              </div>

              {/* Botón Ver Más - Flotante en el centro inferior */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40">
                <button className="group bg-gradient-to-r from-cyan-500/90 to-purple-500/90 text-white px-8 py-3 rounded-2xl font-bold backdrop-blur-lg border border-cyan-400/30 shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-110 hover:from-cyan-500 hover:to-purple-500">
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

      {/* Categorías Mejoradas */}
      <section className="py-16 px-8 bg-gray-900/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Explora por tipo
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tipos.map((tipo, index) => (
              <div
                key={tipo.name}
                className="group relative bg-gray-800/50 border border-cyan-500/20 rounded-2xl p-6 text-center hover:border-cyan-400 transition-all duration-300 hover:scale-105 cursor-pointer backdrop-blur-sm"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                  {tipo.icon}
                </div>
                <h3 className="font-semibold text-gray-300 group-hover:text-cyan-400 transition-colors mb-2">
                  {tipo.name}
                </h3>
                <div className="text-cyan-400 text-sm font-bold">{tipo.count} títulos</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Series Populares */}
      <section className="py-20 px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Series Populares
              </h2>
              <p className="text-gray-400 mt-2">Las series más vistas esta semana</p>
            </div>
            <button className="group text-cyan-400 hover:text-purple-400 transition-colors font-bold flex items-center space-x-2">
              <span>Ver todas</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none"></div>

            <div className="flex overflow-x-auto pb-6 snap-x snap-mandatory space-x-6 px-4 custom-scrollbar">
              {seriesPopulares.map((serie) => (
                <div
                  key={serie.id}
                  className="flex-shrink-0 w-80 snap-center group relative bg-gray-800 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/20 border border-gray-700"
                >
                  <div className="absolute top-4 left-4 z-10">
                    <div className={`px-3 py-1 rounded-full text-sm font-bold shadow-lg ${serie.type === 'anime' ? 'bg-pink-500' :
                      serie.type === 'serie' ? 'bg-cyan-500' : 'bg-purple-500'
                      } text-white`}>
                      {serie.type === 'anime' ? 'ANIME' : serie.type === 'serie' ? 'SERIE' : 'PELÍCULA'}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-yellow-500 text-gray-900 px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <span>⭐</span>
                      <span>{serie.rating}</span>
                    </div>
                  </div>

                  <div className="relative overflow-hidden">
                    <img
                      src={serie.image}
                      alt={serie.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
                        Ver ahora
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-lg text-center group-hover:text-cyan-400 transition-colors">
                      {serie.title}
                    </h3>
                    <div className="flex justify-center mt-2">
                      <div className="flex text-yellow-400 text-sm">
                        {"★".repeat(5)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Películas de Estreno */}
      <section className="py-20 px-8 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Estrenos Recientes
              </h2>
              <p className="text-gray-400 mt-2">Las películas más nuevas en la plataforma</p>
            </div>
            <button className="group text-purple-400 hover:text-pink-400 transition-colors font-bold flex items-center space-x-2">
              <span>Ver todas</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {peliculasEstreno.map((pelicula) => (
              <div
                key={pelicula.id}
                className="group relative bg-gray-800 rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 border border-gray-700"
              >
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    ESTRENO
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-yellow-500 text-gray-900 px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <span>⭐</span>
                    <span>{pelicula.rating}</span>
                  </div>
                </div>

                <div className="relative overflow-hidden">
                  <img
                    src={pelicula.image}
                    alt={pelicula.title}
                    className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>

                <div className="p-6">
                  <h3 className="font-bold text-xl text-center group-hover:text-purple-400 transition-colors mb-2">
                    {pelicula.title}
                  </h3>
                  <div className="flex justify-center items-center space-x-4 text-sm mb-4">
                    <div className="flex text-yellow-400">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-gray-400">{pelicula.rating}/5</span>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                    Ver Película
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planes Mejorados */}
      <section className="py-20 px-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Elige Tu Plan Perfecto
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Acceso ilimitado a todo nuestro catálogo de series, películas y animes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {planes.map((plan) => (
              <div
                key={plan.id}
                className={`group relative rounded-3xl p-8 bg-gradient-to-br ${plan.color} backdrop-blur-lg border-2 ${plan.popular
                  ? 'border-cyan-400 shadow-2xl shadow-cyan-500/25 scale-105'
                  : 'border-gray-600'
                  } transition-all duration-500 hover:scale-110 hover:shadow-2xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-cyan-400 to-purple-400 text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-2xl">
                      💎 MÁS POPULAR
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-5xl font-black text-white">{plan.price}</span>
                    <span className="text-gray-200">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3 text-white/90">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-cyan-300 text-sm">✓</span>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${plan.popular
                  ? 'bg-white text-gray-900 hover:bg-gray-100 hover:scale-105'
                  : 'bg-gray-900/50 text-white hover:bg-gray-900/70 border border-white/20'
                  }`}>
                  {plan.popular ? 'Comenzar Ahora' : 'Elegir Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Mejorado */}
      <footer className="bg-gray-900 border-t border-cyan-500/20 py-12 px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="font-bold text-white">🎬</span>
                </div>
                <h2 className="text-2xl font-bold text-white">StreamVerse</h2>
              </div>
              <p className="text-gray-400 mb-4">
                Tu destino definitivo para series, películas y animes. Streaming de calidad premium.
              </p>
              <div className="flex space-x-4">
                {["📘", "📷", "🐦", "📺"].map((icon, i) => (
                  <button key={i} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-500 transition-colors">
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {[
              {
                title: "Contenido",
                links: ["Series", "Películas", "Animes", "Novedades", "Tendencias"]
              },
              {
                title: "Plataforma",
                links: ["Dispositivos", "Aplicaciones", "Calidad", "Descargas", "FAQ"]
              },
              {
                title: "Empresa",
                links: ["Sobre Nosotros", "Empleo", "Contacto", "Prensa", "Inversores"]
              }
            ].map((section, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 StreamVerse. Plataforma de streaming multipropósito. Proyecto de demostración.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;