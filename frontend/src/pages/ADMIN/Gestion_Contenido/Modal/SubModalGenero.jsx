import React from 'react';

function SubModalGenero({ 
    genero = {}, 
    onChange, 
    errores = {}, 
    operacion 
}) {
    return (
        <div className="space-y-4 text-gray-900">
            {/* Nombre del Género */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Nombre del Género *
                </label>
                <input
                    type="text"
                    name="nombre"
                    value={genero?.nombre || ''}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errores.nombre ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ingrese el nombre del género"
                />
                {errores.nombre && (
                    <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                )}
            </div>

            {/* Información de la operación */}
            <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-blue-800 text-sm">
                    {operacion === 2 ? 'Editando género' : 'Creando nuevo género'}
                </p>
            </div>

            {/* Ejemplos de géneros */}
            <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-gray-600 text-sm font-medium mb-2">Ejemplos de géneros:</p>
                <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Acción</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Aventura</span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Drama</span>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Romance</span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Comedia</span>
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">Ciencia Ficción</span>
                </div>
            </div>
        </div>
    );
}

export default SubModalGenero;