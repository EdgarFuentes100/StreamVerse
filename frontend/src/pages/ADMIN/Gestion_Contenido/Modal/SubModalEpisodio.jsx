import React from 'react';

function SubModalEpisodio({ 
    episodio = {}, 
    onChange, 
    errores = {}, 
    operacion 
}) {
    return (
        <div className="space-y-4 text-gray-900">
            {/* ID Temporada y Capítulo en misma fila */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        ID Temporada *
                    </label>
                    <input
                        type="number"
                        name="idTemporada"
                        value={episodio?.idTemporada || 0}
                        onChange={onChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errores.idTemporada ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="ID de la temporada"
                    />
                    {errores.idTemporada && (
                        <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Capítulo *
                    </label>
                    <input
                        type="number"
                        name="capitulo"
                        value={episodio?.capitulo || 0}
                        onChange={onChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errores.capitulo ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Número de capítulo"
                    />
                    {errores.capitulo && (
                        <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                    )}
                </div>
            </div>

            {/* Título */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Título *
                </label>
                <input
                    type="text"
                    name="title"
                    value={episodio?.title || ''}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errores.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Título del episodio"
                />
                {errores.title && (
                    <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                )}
            </div>

            {/* Imagen y Duración en misma fila */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        URL de la Imagen
                    </label>
                    <input
                        type="text"
                        name="image"
                        value={episodio?.image || ''}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://ejemplo.com/imagen.jpg"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Duración
                    </label>
                    <input
                        type="text"
                        name="duration"
                        value={episodio?.duration || ''}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: 24 min, 45 min"
                    />
                </div>
            </div>

            {/* Video URL */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    URL del Video
                </label>
                <input
                    type="text"
                    name="videoUrl"
                    value={episodio?.videoUrl || ''}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://ejemplo.com/video.mp4"
                />
            </div>

            {/* Views */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Vistas
                </label>
                <input
                    type="text"
                    name="views"
                    value={episodio?.views || ''}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: 1.5M, 500K, 1000"
                />
            </div>

            {/* Información de la operación */}
            <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-blue-800 text-sm">
                    {operacion === 2 ? 'Editando episodio' : 'Creando nuevo episodio'}
                </p>
            </div>
        </div>
    );
}

export default SubModalEpisodio;