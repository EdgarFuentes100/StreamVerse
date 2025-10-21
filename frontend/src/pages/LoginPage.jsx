function LoginPage({ onClose, onLogin }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans overflow-x-hidden">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-lg border-b border-cyan-500/20 w-full py-4 px-8 flex justify-between items-center fixed top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
            <span className="font-bold text-white text-xl">🎬</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            StreamVerse
          </h1>
        </div>
        
        <button 
          onClick={onClose}
          className="group bg-gray-800/50 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 hover:text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span>Volver al inicio</span>
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20"></div>
        
        {/* Efecto de partículas con puros divs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce" style={{ left: '10%', top: '20%', animationDelay: '0s' }}></div>
          <div className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-bounce" style={{ left: '80%', top: '40%', animationDelay: '1s' }}></div>
          <div className="absolute w-2 h-2 bg-pink-400/30 rounded-full animate-bounce" style={{ left: '30%', top: '70%', animationDelay: '2s' }}></div>
          <div className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-bounce" style={{ left: '60%', top: '10%', animationDelay: '0.5s' }}></div>
          <div className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-bounce" style={{ left: '90%', top: '60%', animationDelay: '1.5s' }}></div>
        </div>

        <div className="relative z-10 max-w-md w-full mx-4">
          {/* Tarjeta de login */}
          <div className="bg-gray-900/80 backdrop-blur-xl border-2 border-cyan-500/30 rounded-3xl p-8 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-500">
            
            {/* Icono */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/25 animate-pulse">
                <span className="text-3xl">🔐</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Iniciar Sesión
              </h2>
              <p className="text-gray-300 text-lg">
                Accede a tu universo de entretenimiento
              </p>
            </div>

            {/* Botón de Google */}
            <button 
              onClick={onLogin}
              className="group w-full bg-white text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-3 mb-6 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-white/20"
            >
              <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">G</span>
              </div>
              <span>Continuar con Google</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            {/* Texto de creación de cuenta */}
            <div className="text-center text-gray-400 text-sm">
              ¿Primera vez en StreamVerse?{' '}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            <div className="bg-gray-800/50 rounded-2xl p-4 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 group hover:scale-105">
              <div className="text-2xl font-bold text-cyan-400 group-hover:scale-110 transition-transform">10K+</div>
              <div className="text-gray-400 text-sm group-hover:text-gray-300">Títulos</div>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-4 border border-purple-500/20 hover:border-purple-400 transition-all duration-300 group hover:scale-105">
              <div className="text-2xl font-bold text-purple-400 group-hover:scale-110 transition-transform">4K</div>
              <div className="text-gray-400 text-sm group-hover:text-gray-300">Calidad</div>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-4 border border-pink-500/20 hover:border-pink-400 transition-all duration-300 group hover:scale-105">
              <div className="text-2xl font-bold text-pink-400 group-hover:scale-110 transition-transform">∞</div>
              <div className="text-gray-400 text-sm group-hover:text-gray-300">Streaming</div>
            </div>
          </div>

          {/* Mensaje adicional */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Únete a <span className="text-cyan-400">millones</span> de usuarios
            </p>
          </div>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="bg-gray-900/80 border-t border-cyan-500/20 py-6 px-8 text-center">
        <p className="text-gray-400 text-sm">
          © 2025 StreamVerse. Plataforma de streaming.
        </p>
      </footer>
    </div>
  );
}

export default LoginPage;