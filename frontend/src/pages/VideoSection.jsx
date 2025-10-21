import { useState, useRef } from "react";

function VideoSection() {
  const videoRef = useRef(null);
  
  // Datos con videos reales cortos (de prueba)
  const contenido = [
    // ANIME CON TEMPORADAS
    {
      id: 1,
      tipo: "anime",
      titulo: "Attack on Titan",
      thumbnail: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
      rating: 4.9,
      descripcion: "La humanidad vive en ciudades rodeadas por enormes muros que los protegen de los titanes.",
      generos: ["Acción", "Drama", "Ciencia Ficción"],
      temporadas: [
        {
          id: 1,
          nombre: "Temporada 1",
          videos: [
            {
              id: 1,
              title: "Episodio 1: Para ti, que renuncias a la humanidad",
              thumbnail: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", // Video corto de prueba
              duration: "24:15",
              views: "2.4M",
              numero: 1
            },
            {
              id: 2,
              title: "Episodio 2: Ese día",
              thumbnail: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
              duration: "23:45",
              views: "2.1M",
              numero: 2
            }
          ]
        }
      ]
    },
    // SAGA DE PELÍCULAS
    {
      id: 2,
      tipo: "pelicula",
      titulo: "Spider-Man",
      thumbnail: "https://image.tmdb.org/t/p/w500/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg",
      rating: 4.7,
      descripcion: "La saga completa de Spider-Man a través del multiverso",
      generos: ["Animación", "Superhéroes", "Aventura"],
      temporadas: [
        {
          id: 1,
          nombre: "Saga 1",
          videos: [
            {
              id: 3,
              title: "Spider-Man: Into the Spider-Verse",
              thumbnail: "https://image.tmdb.org/t/p/w500/iiXliCeykkzmJ0Eg9RYJ7F2CWSz.jpg",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
              duration: "1:57:00",
              views: "12.4M",
              numero: 1
            }
          ]
        }
      ]
    },
    // SERIE CON TEMPORADAS
    {
      id: 3,
      tipo: "serie",
      titulo: "Stranger Things",
      thumbnail: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
      rating: 4.6,
      descripcion: "Un grupo de niños se enfrenta a fuerzas sobrenaturales en su pueblo.",
      generos: ["Ciencia Ficción", "Terror", "Drama"],
      temporadas: [
        {
          id: 1,
          nombre: "Temporada 1",
          videos: [
            {
              id: 4,
              title: "Capítulo 1: La desaparición de Will Byers",
              thumbnail: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
              duration: "47:15",
              views: "15.2M",
              numero: 1
            }
          ]
        }
      ]
    },
    // DORAMA CON TEMPORADAS
    {
      id: 4,
      tipo: "dorama",
      titulo: "Goblin",
      thumbnail: "https://i.mydramalist.com/4vz1W_4f.jpg",
      rating: 4.8,
      descripcion: "Un inmortal goblin busca a su novia humana para poner fin a su inmortalidad.",
      generos: ["Romance", "Fantasía", "Drama"],
      temporadas: [
        {
          id: 1,
          nombre: "Temporada 1",
          videos: [
            {
              id: 5,
              title: "Episodio 1",
              thumbnail: "https://i.mydramalist.com/4vz1W_4f.jpg",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
              duration: "60:00",
              views: "5.2M",
              numero: 1
            }
          ]
        }
      ]
    }
  ];

  const [selectedContenido, setSelectedContenido] = useState(contenido[0]);
  const [selectedTemporada, setSelectedTemporada] = useState(contenido[0].temporadas[0]);
  const [selectedVideo, setSelectedVideo] = useState(contenido[0].temporadas[0].videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(false);

  // Función para manejar cambio de contenido
  const handleContenidoChange = (contenido) => {
    setSelectedContenido(contenido);
    setSelectedTemporada(contenido.temporadas[0]);
    setSelectedVideo(contenido.temporadas[0].videos[0]);
    setIsPlaying(false);
  };

  // Función para manejar cambio de temporada
  const handleTemporadaChange = (temporada) => {
    setSelectedTemporada(temporada);
    setSelectedVideo(temporada.videos[0]);
    setIsPlaying(false);
  };

  // Función para manejar cambio de video
  const handleVideoChange = (video) => {
    setSelectedVideo(video);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  // Controladores del video
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getBadgeColor = (tipo) => {
    const colors = {
      'anime': 'bg-pink-500',
      'serie': 'bg-cyan-500',
      'pelicula': 'bg-purple-500',
      'dorama': 'bg-red-500'
    };
    return colors[tipo] || 'bg-gray-500';
  };

  const getIcon = (tipo) => {
    const icons = {
      'anime': '🎌',
      'serie': '📺', 
      'pelicula': '🎬',
      'dorama': '💞'
    };
    return icons[tipo] || '🎬';
  };

  const getTemporadaLabel = (tipo, nombre) => {
    if (tipo === 'pelicula') {
      return nombre.replace('Saga', 'Película');
    }
    return nombre;
  };

  const getTemporadaTitle = (tipo) => {
    const titles = {
      'anime': 'Seleccionar Temporada',
      'serie': 'Seleccionar Temporada',
      'pelicula': 'Seleccionar Película',
      'dorama': 'Seleccionar Temporada'
    };
    return titles[tipo] || 'Seleccionar Temporada';
  };

  const getVideoLabel = (tipo, video) => {
    if (tipo === 'pelicula') {
      return video.title;
    }
    return `Ep. ${video.numero}`;
  };

  const getListTitle = (tipo, count) => {
    const titles = {
      'anime': `Episodios (${count})`,
      'serie': `Episodios (${count})`,
      'pelicula': `Películas (${count})`,
      'dorama': `Episodios (${count})`
    };
    return titles[tipo] || `Videos (${count})`;
  };

  return (
    <section className="mt-20 py-8 px-4 sm:px-8 bg-gray-900/30 min-h-screen">
      <div className="container mx-auto">
        {/* Selector de Contenido Mejorado */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Reproductor
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Videos reales de prueba - Funcionalidad completa
              </p>
            </div>
            <div className="flex items-center space-x-3 text-sm text-cyan-400">
              <span>🎬 Videos reales</span>
              <span>•</span>
              <span>🎵 Audio incluido</span>
              <span>•</span>
              <span>⏱️ Cortos</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-cyan-400 mb-4">Seleccionar Contenido</h3>
          <div className="flex overflow-x-auto pb-4 space-x-4 custom-scrollbar">
            {contenido.map((item) => (
              <button
                key={item.id}
                onClick={() => handleContenidoChange(item)}
                className={`flex-shrink-0 p-4 rounded-2xl transition-all duration-300 min-w-[200px] border-2 backdrop-blur-sm ${
                  selectedContenido.id === item.id
                    ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/25'
                    : 'bg-gray-800/80 border-transparent hover:border-cyan-500/30 hover:bg-gray-700/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.thumbnail}
                    alt={item.titulo}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-white text-sm leading-tight">
                      {item.titulo}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded ${getBadgeColor(item.tipo)} text-white`}>
                        {getIcon(item.tipo)} {item.tipo}
                      </span>
                      <span className="text-yellow-400 text-xs">⭐ {item.rating}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selector de Temporadas */}
        {selectedContenido.temporadas && selectedContenido.temporadas.length > 1 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-purple-400 mb-4">
              {getTemporadaTitle(selectedContenido.tipo)}
            </h3>
            <div className="flex overflow-x-auto pb-4 space-x-4 custom-scrollbar">
              {selectedContenido.temporadas.map((temporada) => (
                <button
                  key={temporada.id}
                  onClick={() => handleTemporadaChange(temporada)}
                  className={`flex-shrink-0 p-4 rounded-2xl transition-all duration-300 border-2 backdrop-blur-sm ${
                    selectedTemporada?.id === temporada.id
                      ? 'bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/25'
                      : 'bg-gray-800/80 border-transparent hover:border-purple-500/30 hover:bg-gray-700/80'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold text-white text-sm mb-1">
                      {getTemporadaLabel(selectedContenido.tipo, temporada.nombre)}
                    </div>
                    <div className="text-cyan-400 text-xs">
                      {temporada.videos.length} {selectedContenido.tipo === 'pelicula' ? 'película' : 'episodios'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reproductor de Video Mejorado */}
          <div className="lg:col-span-2 order-1 lg:order-1">
            <div className="bg-gray-800 rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
              {/* Video Real */}
              <div 
                className="relative bg-black aspect-video group"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
              >
                <video
                  ref={videoRef}
                  src={selectedVideo.videoUrl}
                  className="w-full h-full object-cover"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleTimeUpdate}
                  onEnded={() => setIsPlaying(false)}
                />
                
                {/* Overlay de controles */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${
                  showControls ? 'opacity-100' : 'opacity-0'
                }`}>
                  
                  {/* Badge de tipo */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getBadgeColor(selectedContenido.tipo)} text-white backdrop-blur-sm`}>
                      {getIcon(selectedContenido.tipo)} {selectedContenido.tipo.toUpperCase()}
                    </span>
                  </div>

                  {/* Botón de play/pause central */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={togglePlay}
                      className="group bg-cyan-500/90 hover:bg-cyan-400 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl backdrop-blur-sm"
                    >
                      <span className="text-white text-xl sm:text-2xl ml-1 group-hover:scale-110 transition-transform">
                        {isPlaying ? '⏸' : '▶'}
                      </span>
                    </button>
                  </div>

                  {/* Barra de progreso */}
                  <div className="absolute bottom-20 left-4 right-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-white text-xs font-mono">
                        {formatTime(currentTime)}
                      </span>
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSeek}
                        className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
                      />
                      <span className="text-white text-xs font-mono">
                        {formatTime(duration)}
                      </span>
                    </div>
                  </div>

                  {/* Control de volumen */}
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <span className="text-white text-lg">🔊</span>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400"
                    />
                  </div>

                  {/* Información del video */}
                  <div className="absolute bottom-4 right-4 text-right">
                    <div className="bg-gray-900/90 backdrop-blur-lg rounded-xl p-3 max-w-xs">
                      <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">
                        {selectedVideo.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{selectedContenido.titulo}</span>
                        {selectedContenido.tipo !== 'pelicula' && (
                          <span>Ep. {selectedVideo.numero}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Información debajo del video */}
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {selectedVideo.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-gray-400 text-sm mb-4">
                      <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-lg">
                        {selectedVideo.views} vistas
                      </span>
                      <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-lg">
                        {selectedVideo.duration}
                      </span>
                      <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg">
                        ⭐ {selectedContenido.rating}
                      </span>
                      {selectedContenido.tipo !== 'pelicula' && (
                        <span className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-lg">
                          Episodio {selectedVideo.numero}
                        </span>
                      )}
                    </div>
                    
                    {/* Géneros */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedContenido.generos.map((genero) => (
                        <span
                          key={genero}
                          className="bg-gray-700 px-3 py-1 rounded-lg text-sm text-gray-300 backdrop-blur-sm"
                        >
                          {genero}
                        </span>
                      ))}
                    </div>

                    <p className="text-gray-300 text-base leading-relaxed">
                      {selectedContenido.descripcion}
                    </p>
                  </div>
                  <div className="flex sm:flex-col gap-3">
                    <button className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105 flex items-center space-x-2">
                      <span>🩵</span>
                      <span>Me gusta</span>
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold transition-all flex items-center space-x-2">
                      <span>💾</span>
                      <span>Guardar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel lateral mejorado */}
          <div className="lg:col-span-1 order-2 lg:order-2 space-y-6">
            {/* Información del Contenido */}
            <div className="bg-gray-800/80 rounded-2xl p-5 border border-cyan-500/20 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center space-x-2">
                <span>{getIcon(selectedContenido.tipo)}</span>
                <span>Información</span>
              </h3>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={selectedContenido.thumbnail}
                  alt={selectedContenido.titulo}
                  className="w-16 h-16 object-cover rounded-xl"
                />
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{selectedContenido.titulo}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs ${getBadgeColor(selectedContenido.tipo)} text-white`}>
                      {selectedContenido.tipo}
                    </span>
                    <span className="text-yellow-400 text-xs">⭐ {selectedContenido.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-center bg-gray-700/50 rounded-xl p-3">
                <div className="text-cyan-400 font-bold text-lg">
                  {selectedContenido.temporadas.reduce((total, temp) => total + temp.videos.length, 0)}
                </div>
                <div className="text-gray-400 text-sm">
                  {selectedContenido.tipo === 'pelicula' ? 'Películas' : 'Episodios'} totales
                </div>
              </div>
            </div>

            {/* Lista de videos mejorada */}
            <div className="bg-gray-800/80 rounded-2xl p-5 border border-purple-500/20 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-purple-400 mb-4 flex items-center space-x-2">
                <span>📺</span>
                <span>{getListTitle(selectedContenido.tipo, selectedTemporada.videos.length)}</span>
              </h3>
              
              <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                {selectedTemporada.videos.map((video) => (
                  <div
                    key={video.id}
                    onClick={() => handleVideoChange(video)}
                    className={`group cursor-pointer p-4 rounded-xl transition-all duration-300 border-2 backdrop-blur-sm ${
                      selectedVideo.id === video.id 
                        ? 'bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/25' 
                        : 'bg-gray-700/50 border-transparent hover:border-purple-500/30 hover:bg-gray-600/50'
                    }`}
                  >
                    <div className="flex space-x-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-16 h-12 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                          {video.duration}
                        </div>
                        {selectedVideo.id === video.id && (
                          <div className="absolute inset-0 bg-purple-400/20 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm">▶</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-white text-sm group-hover:text-purple-400 transition-colors line-clamp-2">
                            {getVideoLabel(selectedContenido.tipo, video)}
                          </h4>
                          <span className="text-gray-400 text-xs flex-shrink-0 ml-2 bg-gray-600 px-2 py-1 rounded">
                            {video.views}
                          </span>
                        </div>
                        {selectedContenido.tipo !== 'pelicula' && (
                          <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                            {video.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;