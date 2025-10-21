function Footer() {
  return (
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
  );
}

export default Footer;