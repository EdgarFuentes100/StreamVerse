import React from "react";

const TablaToolbar = ({
  onBack,
  backLabel = "Volver",
  onExport,
  exportDisabled = false,
  onAdd,
  addLabel = "Agregar",
  addVariant = "success"
}) => {
  return (
    <div className="bg-gray-800 shadow-2xl rounded-xl flex justify-between items-center flex-wrap gap-3 mb-6 p-5 rounded-lg">

      {/* Botón Volver */}
      {onBack && (
        <button
          className="flex items-center px-4 py-2 !bg-gray-700 text-gray-200 rounded-md hover:bg-gray-600 transition-colors duration-200 font-medium text-sm"
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
            className={`flex items-center px-4 py-2 border !border-gray-600 text-gray-300 rounded-md transition-colors duration-200 font-medium text-sm ${exportDisabled
                ? 'opacity-50 cursor-not-allowed bg-gray-800'
                : '!bg-gray-800 hover:bg-gray-700 hover:border-gray-500'
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
                    : '!bg-gray-700 hover:bg-gray-600'
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