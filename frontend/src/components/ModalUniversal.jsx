// components/ModalUniversal.jsx
import { useEffect } from "react";

function ModalUniversal({ 
  mostrar, 
  onClose,
  onAceptar, // ✅ La acción que se ejecuta al aceptar
  titulo = "Confirmar",
  mensaje = "¿Estás seguro de realizar esta acción?",
  textoAceptar = "Aceptar", 
  textoCancelar = "Cancelar",
  tipo = "info" // 'info', 'warning', 'danger', 'success'
}) {
  
  // Cerrar modal con ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mostrar) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mostrar, onClose]);

  // Prevenir scroll del body
  useEffect(() => {
    if (mostrar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mostrar]);

  if (!mostrar) return null;

  const handleAceptar = () => {
    onAceptar(); // ✅ Ejecuta la acción que le pases
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Configuraciones según el tipo
  const getConfig = () => {
    const configs = {
      info: {
        icon: "💡",
        gradient: "from-blue-500 to-cyan-500"
      },
      warning: {
        icon: "⚠️",
        gradient: "from-yellow-500 to-orange-500"
      },
      danger: {
        icon: "🚫", 
        gradient: "from-red-500 to-pink-500"
      },
      success: {
        icon: "✅",
        gradient: "from-green-500 to-emerald-500"
      }
    };
    return configs[tipo] || configs.info;
  };

  const config = getConfig();

  return (
    <div 
      className="fixed inset-0 !bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="!bg-gray-800 rounded-2xl p-6 max-w-md w-full border !border-gray-600/50 animate-scale-in">
        <div className="text-center mb-6">
          <div className="w-16 h-16 !bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">{config.icon}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{titulo}</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {mensaje}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 !bg-gray-700 text-white rounded-lg font-bold hover:!bg-gray-600 transition-all duration-200"
          >
            {textoCancelar}
          </button>
          
          <button
            onClick={handleAceptar}
            className={`flex-1 py-3 !bg-gradient-to-r ${config.gradient} text-white rounded-lg font-bold hover:opacity-90 transition-all duration-200 shadow-lg`}
          >
            {textoAceptar}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalUniversal;