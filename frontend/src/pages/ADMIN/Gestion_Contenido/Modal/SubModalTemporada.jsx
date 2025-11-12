import React from 'react';

function SubModalTemporada({ 
    temporada = {}, 
    onChange, 
    errores = {}, 
    operacion 
}) {
    return (
        <div className="space-y-4 text-gray-900">
            {/* Nombre de la Temporada */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Nombre de la Temporada *
                </label>
                <input
                    type="text"
                    name="nombre"
                    value={temporada?.nombre || ''}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errores.nombre ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ej: Temporada 1, Segunda Temporada, Final Season"
                />
                {errores.nombre && (
                    <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                )}
            </div>

            {/* ID Contenido */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    ID del Contenido *
                </label>
                <input
                    type="number"
                    name="idContenido"
                    value={temporada?.idContenido || 0}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errores.idContenido ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ID del contenido al que pertenece"
                />
                {errores.idContenido && (
                    <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                )}
                <p className="text-gray-600 text-sm mt-1">
                    ID de la serie o contenido principal
                </p>
            </div>

            {/* Información de la operación */}
            <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-blue-800 text-sm">
                    {operacion === 2 ? 'Editando temporada' : 'Creando nueva temporada'}
                </p>
            </div>

            {/* Ejemplos de nombres de temporadas */}
            <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-gray-600 text-sm font-medium mb-2">Ejemplos de nombres:</p>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Temporada 1</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Segunda Temporada</span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Temporada Final</span>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Temporada Especial</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">OVA</span>
                </div>
            </div>
        </div>
    );
}

export default SubModalTemporada;