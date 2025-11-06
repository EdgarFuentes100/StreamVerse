import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useReproductor } from "../data/useReproductor";

function ReproductorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Estados
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [temporadaSeleccionada, setTemporadaSeleccionada] = useState(null);
  const [cargandoVideos, setCargandoVideos] = useState(false);
  const [videosLocales, setVideosLocales] = useState([]); // Nuevo estado local para videos
  const [videoActualLocal, setVideoActualLocal] = useState(null); // Nuevo estado local para video actual

  const { getTemporadas, temporadas, getVideos, videos, getVideoActual, videoActual, getContenidoInfo, contenidoInfo, recomendacion } = useReproductor();

  // Cargar contenido cuando cambia el ID - CORREGIDO
  useEffect(() => {
    // Limpiar TODOS los estados anteriores
    setTemporadaSeleccionada(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setCargandoVideos(true);
    setVideosLocales([]); // Limpiar videos locales
    setVideoActualLocal(null); // Limpiar video actual local

    // Cargar nuevo contenido
    getTemporadas(id);
    getContenidoInfo(id);
  }, [id]);

  // Sincronizar videos del hook con estado local - NUEVO
  useEffect(() => {
    setVideosLocales(videos);
  }, [videos]);

  // Sincronizar videoActual del hook con estado local - NUEVO
  useEffect(() => {
    setVideoActualLocal(videoActual);
  }, [videoActual]);

  // Cuando ya se hayan cargado las temporadas, cargar los videos de la primera
  useEffect(() => {
    if (temporadas.length > 0) {
      const primeraTemporada = temporadas[0];
      setTemporadaSeleccionada(primeraTemporada);
      setCargandoVideos(true);
      setVideosLocales([]); // Limpiar videos antes de cargar nuevos
      setVideoActualLocal(null); // Limpiar video actual
      getVideos(primeraTemporada.idTemporada);
    } else {
      // Si no hay temporadas, limpiar videos
      setCargandoVideos(false);
      setVideosLocales([]);
      setVideoActualLocal(null);
    }
  }, [temporadas]);

  // Cuando se cargan los videos
  useEffect(() => {
    if (videosLocales.length > 0) {
      getVideoActual(videosLocales[0].idEpisodio);
      setCargandoVideos(false);
    } else {
      setCargandoVideos(false);
      setVideoActualLocal(null); // Asegurar que no hay video actual si no hay videos
    }
  }, [videosLocales]);

  // CORREGIDO: Resetear el video cuando cambia videoActualLocal
  useEffect(() => {
    if (videoRef.current && videoActualLocal) {
      videoRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [videoActualLocal]);

  const generosArray = contenidoInfo?.generos
    ? contenidoInfo.generos.split(',').map(g => g.trim())
    : [];

  // Controladores del video
  const togglePlay = () => {
    if (videoRef.current && videoActualLocal?.videoUrl) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
    showControlsTemporarily();
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (videoRef.current && videoActualLocal?.videoUrl) {
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
    showControlsTemporarily();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    showControlsTemporarily();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
    showControlsTemporarily();
  };

  // Manejar cambio de video - CORREGIDO
  const handleVideoChange = (video) => {
    getVideoActual(video.idEpisodio);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Manejar cambio de temporada - CORREGIDO
  const handleCambiarTemporada = (temporada) => {
    setTemporadaSeleccionada(temporada);
    setCargandoVideos(true);
    setVideosLocales([]); // Limpiar videos antes de cargar nuevos
    setVideoActualLocal(null); // Limpiar video actual
    getVideos(temporada.idTemporada);
  };

  // Manejar cambio de contenido desde recomendaciones - CORREGIDO
  const handleIrAContenido = (nuevoContenido) => {
    navigate(`/video/${nuevoContenido.idContenido}`);
  };

  // Mostrar controles temporalmente
  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Funciones utilitarias
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const getBadgeColor = (categoria) => {
    const colors = {
      'Anime': 'bg-pink-500',
      'Película': 'bg-purple-500',
      'Serie': 'bg-cyan-500',
      'Dorama': 'bg-red-500'
    };
    return colors[categoria] || 'bg-gray-500';
  };

  const getIcon = (categoria) => {
    const icons = {
      'Anime': '🎌',
      'Serie': '📺',
      'Película': '🎬',
      'Dorama': '💞'
    };
    return icons[categoria] || '🎬';
  };

  // Si no se encuentra el contenido
  if (!contenidoInfo) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center pt-20 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-white mb-2">Contenido no encontrado</h2>
          <p className="text-gray-400 mb-4">El ID {id} no existe en nuestro catálogo</p>
          <button
            onClick={() => navigate('/catalogo')}
            className="!bg-gradient-to-r !from-cyan-500 !to-purple-500 !text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Volver al Catálogo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 md:pt-20 min-h-screen bg-gray-950">
      <div className="container mx-auto px-3 sm:px-4 md:px-8 pb-6 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Área Principal del Video */}
          <div className="lg:col-span-3">
            {/* Reproductor */}
            <div className="bg-gray-900 rounded-xl md:rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/10">
              {/* Video Container */}
              <div
                className="relative bg-black aspect-video group"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
                onTouchStart={showControlsTemporarily}
              >
                {videoActualLocal && videoActualLocal.videoUrl ? (
                  <>
                    <video
                      ref={videoRef}
                      src={videoActualLocal.videoUrl}
                      className="w-full h-full object-contain"
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleTimeUpdate}
                      onEnded={() => setIsPlaying(false)}
                      onClick={togglePlay}
                      playsInline
                      key={videoActualLocal.idEpisodio} // CORREGIDO: Forzar re-render
                    />

                    {/* Overlay de controles */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                      }`}>

                      {/* Controles superiores */}
                      <div className="absolute top-2 md:top-4 left-2 md:left-4 right-2 md:right-4 flex justify-between items-start">
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs md:text-sm font-bold ${getBadgeColor(contenidoInfo.categoria)} !text-white backdrop-blur-sm`}>
                            <span className="sm:hidden">{getIcon(contenidoInfo.categoria)}</span>
                            <span className="hidden sm:inline">{getIcon(contenidoInfo.categoria)} {contenidoInfo.categoria}</span>
                          </span>
                          {contenidoInfo.isNew && (
                            <span className="!bg-green-500 !text-white px-1 py-1 rounded text-xs font-bold backdrop-blur-sm">
                              NUEVO
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="!bg-yellow-500 !text-gray-900 px-2 py-1 rounded text-xs font-bold flex items-center space-x-1">
                            <span>⭐</span>
                            <span className="hidden xs:inline">{contenidoInfo.rating}</span>
                          </span>
                        </div>
                      </div>

                      {/* Botón de play/pause central */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={togglePlay}
                          className="transform transition-all duration-300 hover:scale-110 opacity-80 hover:opacity-100"
                        >
                          <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 md:p-4">
                            <span className="!text-white text-3xl md:text-4xl">
                              {isPlaying ? '⏸️' : '▶️'}
                            </span>
                          </div>
                        </button>
                      </div>

                      {/* Controles inferiores */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 bg-gradient-to-t from-black/90 to-transparent">
                        {/* Barra de progreso */}
                        <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-3">
                          <span className="!text-white text-xs md:text-sm font-mono min-w-[35px] md:min-w-[40px]">
                            {formatTime(currentTime)}
                          </span>
                          <input
                            type="range"
                            min="0"
                            max={duration || 0}
                            value={currentTime}
                            onChange={handleSeek}
                            className="flex-1 h-1.5 md:h-1 !bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 md:[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-3 md:[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:!bg-cyan-400 [&::-webkit-slider-thumb]:!border [&::-webkit-slider-thumb]:!border-white [&::-webkit-slider-thumb]:shadow-lg"
                          />
                          <span className="!text-white text-xs md:text-sm font-mono min-w-[35px] md:min-w-[40px]">
                            {formatTime(duration)}
                          </span>
                        </div>

                        {/* Controles de reproducción */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 md:space-x-4">
                            <button
                              onClick={togglePlay}
                              className="!bg-gray-800 !text-white hover:!text-cyan-400 transition-colors text-lg md:text-base p-2 rounded-lg"
                            >
                              {isPlaying ? '⏸️' : '▶️'}
                            </button>

                            {/* Volumen - Oculto en móviles */}
                            <div className="hidden sm:flex items-center space-x-2">
                              <span className="!text-white text-sm">🔊</span>
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="w-16 md:w-20 h-1 !bg-gray-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:!bg-cyan-400"
                              />
                            </div>

                            <span className="!text-white text-xs md:text-sm hidden xs:inline">
                              {videoActualLocal.views}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 md:space-x-3">
                            <button
                              onClick={toggleFullscreen}
                              className="!bg-gray-800 !text-white hover:!text-cyan-400 transition-colors text-lg md:text-base"
                            >
                              {isFullscreen ? '⤢' : '⤡'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  // Mensaje cuando no hay video disponible - MEJORADO
                  <div className="w-full h-full flex items-center justify-center flex-col p-8 text-center">
                    <div className="text-6xl mb-4">
                      {cargandoVideos ? "⏳" : "📺"}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {cargandoVideos ? "Cargando video..." : "No hay video disponible"}
                    </h3>
                    <p className="text-gray-400 mb-4">
                      {cargandoVideos
                        ? "Buscando el contenido solicitado..."
                        : "Este video no está disponible en este momento."
                      }
                    </p>
                    {!cargandoVideos && (
                      <button
                        onClick={() => navigate('/catalogo')}
                        className="!bg-gradient-to-r !from-cyan-500 !to-purple-500 !text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                      >
                        Explorar Catálogo
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Información del contenido */}
              <div className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold !text-white mb-3">
                      {contenidoInfo.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm mb-4">
                      <span className="!text-cyan-400">{contenidoInfo.year}</span>
                      <span className="!text-gray-400">•</span>
                      {contenidoInfo.duracion && (
                        <>
                          <span className="!text-purple-400">{contenidoInfo.duracion}</span>
                          <span className="!text-gray-400">•</span>
                        </>
                      )}
                      {contenidoInfo.temporadas && (
                        <>
                          <span className="!text-pink-400">{contenidoInfo.temporadas} Temporadas</span>
                          <span className="!text-gray-400">•</span>
                        </>
                      )}
                      <span className="!text-yellow-400">⭐ {contenidoInfo.rating}</span>
                    </div>

                    {/* Géneros */}
                    <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-700 pb-2">
                      {generosArray.map((genero) => (
                        <span
                          key={genero}
                          className="!bg-gray-700 px-2 py-1 rounded-lg text-xs !text-gray-300 whitespace-nowrap flex-shrink-0"
                        >
                          {genero}
                        </span>
                      ))}
                    </div>

                    <p className="!text-gray-300 text-sm md:text-base leading-relaxed">
                      {contenidoInfo.descripcion}
                    </p>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex lg:flex-col gap-2 md:gap-3 justify-center">
                    <button className="!bg-gradient-to-r !from-cyan-500 !to-purple-500 !text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all hover:scale-105 flex items-center space-x-2 text-sm md:text-base">
                      <span>❤️</span>
                      <span className="hidden sm:inline">Agregar a mi lista</span>
                    </button>
                    <button className="!bg-gray-700 hover:!bg-gray-600 !text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-bold transition-all flex items-center space-x-2 text-sm md:text-base" onClick={() => navigate('/catalogo')}>
                      <span>🎞️</span>
                      <span>Ir a catálogo</span>
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Lateral */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {/* Información del Contenido */}
            <div className="!bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-cyan-500/20">
              <h3 className="text-base md:text-lg font-bold !text-cyan-400 mb-3 md:mb-4 flex items-center space-x-2">
                <span>📋</span>
                <span>Información</span>
              </h3>

              <div className="flex items-center space-x-3 md:space-x-4 mb-3 md:mb-4">
                <img
                  src={contenidoInfo.image}
                  alt={contenidoInfo.title}
                  className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg md:rounded-xl"
                />
                <div className="flex-1">
                  <h4 className="font-bold !text-white text-sm mb-1 line-clamp-2">{contenidoInfo.title}</h4>
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <span className={`px-1.5 py-0.5 md:px-2 md:py-1 rounded text-xs ${getBadgeColor(contenidoInfo.categoria)} !text-white`}>
                      <span className="sm:hidden">{getIcon(contenidoInfo.categoria)}</span>
                      <span className="hidden sm:inline">{contenidoInfo.categoria}</span>
                    </span>
                    <span className="!text-yellow-400 text-xs">⭐ {contenidoInfo.rating}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-3 text-center">
                <div className="!bg-gray-700/50 rounded-lg md:rounded-xl p-2 md:p-3">
                  <div className="!text-cyan-400 font-bold text-base md:text-lg">
                    {contenidoInfo.episodios}
                  </div>
                  <div className="!text-gray-400 text-xs">
                    {contenidoInfo.categoria === 'Película' ? 'Películas' : 'Episodios'}
                  </div>
                </div>
                <div className="!bg-gray-700/50 rounded-lg md:rounded-xl p-2 md:p-3">
                  <div className="!text-purple-400 font-bold text-base md:text-lg">
                    {contenidoInfo.year}
                  </div>
                  <div className="!text-gray-400 text-xs">Año</div>
                </div>
              </div>
            </div>

            {/* Temporadas (si hay más de una) */}
            {temporadas?.length > 1 && !cargandoVideos && (
              <div className="!bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-pink-500/20">
                <h3 className="text-base md:text-lg font-bold !text-pink-400 mb-3 md:mb-4 flex items-center space-x-2">
                  <span>📚</span>
                  <span>Temporadas</span>
                </h3>

                <div className="space-y-1 md:space-y-2">
                  {temporadas.map((temporada) => (
                    <button
                      key={temporada.idTemporada}
                      onClick={() => handleCambiarTemporada(temporada)}
                      className={`w-full text-left p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 ${temporadaSeleccionada?.idTemporada === temporada.idTemporada
                        ? '!bg-pink-500/20 !border !border-pink-400 !text-white'
                        : '!bg-gray-700/50 hover:!bg-gray-600/50 !text-white'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm line-clamp-1">
                          {temporada.nombre}
                        </span>
                        <span className="!text-cyan-400 text-xs">
                          {contenidoInfo?.categoria === 'Película' ? 'p' : 'e'}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Lista de Episodios/Películas - CORREGIDO */}
            <div className="!bg-gray-800/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 border border-purple-500/20">
              <h3 className="text-base md:text-lg font-bold !text-purple-400 mb-3 md:mb-4 flex items-center space-x-2">
                <span>🎥</span>
                <span>
                  {contenidoInfo.categoria === 'Película' ? 'Película' : 'Episodios'}
                </span>
              </h3>

              {cargandoVideos ? (
                <div className="text-center py-8">
                  <div className="text-white mb-2">Cargando...</div>
                  <div className="text-gray-400 text-sm">Buscando contenido disponible</div>
                </div>
              ) : videosLocales.length > 0 ? (
                <div className="space-y-2 md:space-y-3 max-h-[300px] md:max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-700">
                  {videosLocales.map((video) => (
                    <div
                      key={video.idEpisodio}
                      onClick={() => handleVideoChange(video)}
                      className={`group cursor-pointer p-2 md:p-3 rounded-lg md:rounded-xl transition-all duration-300 border backdrop-blur-sm ${videoActualLocal?.idEpisodio === video.idEpisodio
                        ? '!bg-purple-500/20 !border-purple-400 shadow-lg shadow-purple-500/25'
                        : '!bg-gray-700/50 border-transparent hover:!border-purple-500/30 hover:!bg-gray-600/50'
                        }`}
                    >
                      <div className="flex space-x-2 md:space-x-3">
                        <div className="relative flex-shrink-0">
                          <img
                            src={video.image}
                            alt={video.title}
                            className="w-12 h-9 md:w-16 md:h-12 object-cover rounded-md md:rounded-lg"
                          />
                          <div className="absolute bottom-0.5 right-0.5 !bg-black/80 !text-white text-xs px-0.5 rounded">
                            {video.duration}
                          </div>
                          {videoActualLocal?.idEpisodio === video.idEpisodio && (
                            <div className="absolute inset-0 !bg-purple-400/20 rounded-md md:rounded-lg flex items-center justify-center">
                              <span className="!text-white text-xs md:text-sm">▶</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-0.5 md:mb-1">
                            <h4 className="font-semibold !text-white text-xs md:text-sm group-hover:!text-purple-400 transition-colors line-clamp-2">
                              {contenidoInfo.categoria === 'Película'
                                ? video.title
                                : `Ep. ${video.capitulo}`}
                            </h4>
                          </div>
                          {contenidoInfo.categoria !== 'Película' && (
                            <p className="!text-gray-400 text-xs line-clamp-2 leading-relaxed">
                              {video.title}
                            </p>
                          )}
                          <div className="flex justify-between items-center mt-0.5 md:mt-1 text-xs !text-gray-400">
                            <span className="text-xs">{video.views}</span>
                            <span className="text-xs">{video.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Mensaje cuando no hay videos - MEJORADO
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">📺</div>
                  <div className="text-white mb-2">No hay videos disponibles</div>
                  <div className="text-gray-400 text-sm">
                    {contenidoInfo.categoria === 'Película'
                      ? 'Esta película no está disponible'
                      : 'Esta temporada no tiene episodios disponibles'
                    }
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Recomendaciones */}
        {recomendacion.length > 0 && (
          <div className="mt-6 md:mt-8">
            <h2 className="text-xl md:text-2xl font-bold !text-cyan-400 mb-4 md:mb-6 flex items-center space-x-2">
              <span>🎬</span>
              <span>Te podría gustar</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
              {recomendacion.slice(0, 8).map((item) => (
                <div
                  key={item.idContenido}
                  onClick={() => handleIrAContenido(item)}
                  className="group !bg-gray-800/80 backdrop-blur-sm rounded-lg md:rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300 border border-transparent hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-24 sm:h-28 md:h-32 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>

                    <div className="absolute top-1 left-1 md:top-2 md:left-2">
                      <div className={`${getBadgeColor(item.nombre)} !text-white px-1 py-0.5 md:px-2 md:py-1 rounded text-xs font-bold`}>
                        <span className="sm:hidden">{getIcon(item.nombre)}</span>
                        <span className="hidden sm:inline">{item.nombre}</span>
                      </div>
                    </div>

                    <div className="absolute top-1 right-1 md:top-2 md:right-2 !bg-yellow-500 !text-gray-900 px-1 py-0.5 md:px-2 md:py-1 rounded text-xs font-bold flex items-center space-x-1">
                      <span>⭐</span>
                      <span className="hidden xs:inline">{item.rating}</span>
                    </div>
                  </div>

                  <div className="p-2 md:p-3">
                    <h3 className="font-semibold !text-white text-xs md:text-sm line-clamp-2 group-hover:!text-cyan-400 transition-colors mb-1 md:mb-2">
                      {item.title}
                    </h3>
                    <div className="flex justify-between items-center text-xs !text-gray-400">
                      <span>{item.year}</span>
                      {item.duracion && <span className="hidden sm:inline">{item.duracion}</span>}
                      {item.temporadas && <span>{item.temporadas}T</span>}
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

export default ReproductorPage;