import React from 'react';

function SubModalCategoria({ 
    categoria = {}, 
    onChange, 
    errores = {}, 
    operacion 
}) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1"> {/* Cambié a gray-900 */}
                    Nombre de Categoría *
                </label>
                <input
                    type="text"
                    name="nombre"
                    value={categoria?.nombre || ''}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 ${
                        errores.nombre ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ingrese el nombre de la categoría"
                />
                {errores.nombre && (
                    <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1"> {/* Cambié a gray-900 */}
                    Icono
                </label>
                <input
                    type="text"
                    name="icon"
                    value={categoria?.icon || ''}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Ej: 📱, 🎬, 🎵"
                />
                <p className="text-gray-600 text-sm mt-1"> {/* Cambié a gray-600 */}
                    Puedes usar emojis o nombres de iconos
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1"> {/* Cambié a gray-900 */}
                    Cantidad
                </label>
                <input
                    type="text"
                    name="cantidad"
                    value={categoria?.cantidad || ''}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="Ej: 25, 100+"
                />
            </div>

            <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-blue-800 text-sm"> {/* Cambié a blue-800 */}
                    {operacion === 2 ? 'Editando categoría' : 'Creando nueva categoría'}
                </p>
            </div>
        </div>
    );
}

export default SubModalCategoria;