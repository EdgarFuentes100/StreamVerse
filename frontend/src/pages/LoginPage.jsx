import React from "react";
import Particles from "../components/Particles";

function LoginPage({ onClose, onLogin }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans overflow-x-hidden relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 sm:pt-20 px-4 sm:px-0">
        {/* Fondo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/20"></div>

        {/* Efecto de partículas */}
        <Particles
          count={{ sm: 100, lg: 700 }}
          intensity={{ sm: "low", lg: "medium" }}
          className="absolute inset-0 z-0"
        />

        {/* Tarjeta de login */}
        <div className="relative z-10 max-w-md w-full">
          <div className="bg-gray-900/80 backdrop-blur-xl border-2 border-cyan-500/30 rounded-3xl p-4 sm:p-8 shadow-2xl shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-500">

            {/* Icono */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/25 animate-pulse">
                <span className="text-2xl sm:text-3xl">🔐</span>
              </div>
            </div>

            {/* Título */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2 sm:mb-4">
                Iniciar Sesión
              </h2>
              <p className="text-sm sm:text-base text-gray-300">
                Accede a tu universo de entretenimiento
              </p>
            </div>

            {/* Botón de Google */}
            <button
              onClick={onLogin}
              className="group w-full !bg-white !text-gray-900 py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg hover:!bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-3 mb-6 hover:scale-105 shadow-lg hover:shadow-xl border-2 border-white/20"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-red-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold">G</span>
              </div>
              <span>Continuar con Google</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>

            {/* Texto de creación de cuenta */}
            <div className="text-center text-gray-400 text-xs sm:text-sm mt-4">
              ¿Primera vez en StreamVerse?{' '}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-8 text-center">
            <div className="bg-gray-800/50 rounded-2xl p-3 sm:p-4 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 group hover:scale-105">
              <div className="text-xl sm:text-3xl font-bold text-cyan-400 group-hover:scale-110 transition-transform">10K+</div>
              <div className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300">Títulos</div>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-3 sm:p-4 border border-purple-500/20 hover:border-purple-400 transition-all duration-300 group hover:scale-105">
              <div className="text-xl sm:text-3xl font-bold text-purple-400 group-hover:scale-110 transition-transform">4K</div>
              <div className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300">Calidad</div>
            </div>
            <div className="bg-gray-800/50 rounded-2xl p-3 sm:p-4 border border-pink-500/20 hover:border-pink-400 transition-all duration-300 group hover:scale-105">
              <div className="text-xl sm:text-3xl font-bold text-pink-400 group-hover:scale-110 transition-transform">∞</div>
              <div className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300">Streaming</div>
            </div>
          </div>

          {/* Mensaje adicional */}
          <div className="text-center mt-4 sm:mt-6">
            <p className="text-gray-400 text-xs sm:text-sm">
              Únete a <span className="text-cyan-400">millones</span> de usuarios
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
