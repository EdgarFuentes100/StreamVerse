import React from "react";

const TablaToolbar = ({
  onBack,
  backLabel = "Volver",
  onExport,
  exportDisabled = false,
  onAdd,
  addLabel = "Agregar",
  addVariant = "purple"
}) => {
  return (
    <div className="bg-gray-600 shadow-2xl rounded-xl flex justify-between items-center flex-wrap gap-3 mb-6 p-5 rounded-lg">

      {/* Botón Volver */}
      {onBack && (
        <button
          className="flex items-center px-4 py-2 !bg-gradient-to-r !from-blue-600 !to-cyan-500 text-white rounded-md hover:!from-blue-500 hover:!to-cyan-400 transition-all duration-200 font-medium text-sm hover:!shadow-lg hover:!shadow-blue-500/25"
          onClick={onBack}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {backLabel}
        </button>
      )}

      {/* Botones de Acción */}
      <div className="flex gap-3">
        {onExport && (
          <button
            className={`flex items-center px-4 py-2 border !border-amber-600 text-white rounded-md transition-all duration-200 font-medium text-sm ${exportDisabled
              ? 'opacity-50 cursor-not-allowed !bg-gradient-to-r !from-amber-700 !to-amber-600'
              : '!bg-gradient-to-r !from-amber-600 !to-orange-500 hover:!from-amber-500 hover:!to-orange-400 hover:!border-amber-400 hover:!shadow-lg hover:!shadow-amber-500/25'
              }`}
            disabled={exportDisabled}
            onClick={onExport}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hidden sm:inline">Exportar</span>
            <span className="inline sm:hidden">Exp</span>
          </button>
        )}

        {onAdd && (
          <button
            className={`flex items-center px-4 py-2 text-white rounded-md transition-colors duration-200 font-medium text-sm ${addVariant === 'success'
              ? '!bg-green-700 hover:bg-green-600'
              : addVariant === 'primary'
                ? '!bg-blue-700 hover:bg-blue-600'
                : addVariant === 'warning'
                  ? '!bg-yellow-600 hover:bg-yellow-500'
                  : addVariant === 'purple'
                    ? '!bg-gradient-to-r !from-purple-600 !to-pink-500 hover:!from-purple-500 hover:!to-pink-400 !shadow-lg !shadow-purple-500/25 border border-purple-400/50'
                    : '!bg-gradient-to-r !from-gray-600 !to-gray-500 hover:!from-gray-500 hover:!to-gray-400 !shadow-lg !shadow-gray-500/25'

              }`}
            onClick={onAdd}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">{addLabel}</span>
            <span className="inline sm:hidden">Add</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TablaToolbar;