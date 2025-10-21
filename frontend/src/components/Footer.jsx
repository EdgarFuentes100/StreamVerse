function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-cyan-500/20 py-8 px-4 sm:py-12 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          
          {/* Logo y descripción */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">🎬</span>
              </div>
              <h2 className="text-2xl font-bold text-white">StreamVerse</h2>
            </div>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Tu destino definitivo para series, películas y animes. Streaming de calidad premium.
            </p>
            <div className="flex space-x-3">
              {["📘", "📷", "🐦", "📺"].map((icon, i) => (
                <button key={i} className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-500 transition-colors text-sm sm:text-base">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Secciones de links */}
          {[
            { title: "Contenido", links: ["Series", "Películas", "Animes", "Novedades", "Tendencias"] },
            { title: "Plataforma", links: ["Dispositivos", "Aplicaciones", "Calidad", "Descargas", "FAQ"] },
            { title: "Empresa", links: ["Sobre Nosotros", "Empleo", "Contacto", "Prensa", "Inversores"] }
          ].map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm sm:text-base">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Pie de página */}
        <div className="border-t border-gray-700 pt-6 mt-8 text-center text-sm sm:text-base text-gray-400">
          © 2025 StreamVerse. Plataforma de streaming multipropósito. Proyecto de demostración.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
