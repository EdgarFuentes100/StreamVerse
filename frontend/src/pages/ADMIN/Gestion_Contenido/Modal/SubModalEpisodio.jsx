import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function SubModalEpisodio({ 
    episodio = {}, 
    onChange, 
    errores = {}, 
    operacion,
    selectedCategoria,
    selectedContenido,
    selectedTemporada,
    categorias = [],
    contenidos = [],
    temporadas = [],
    onCategoriaChange,
    onContenidoChange,
    onTemporadaChange
}) {
    
    const [categoriaModal, setCategoriaModal] = useState(selectedCategoria || '');
    const [contenidoModal, setContenidoModal] = useState(selectedContenido || '');
    const [temporadaModal, setTemporadaModal] = useState(selectedTemporada || '');
    const [inicializado, setInicializado] = useState(false);

    // Convertir arrays a formato para react-select
    const opcionesCategoria = categorias.map(cat => ({
        value: cat.idCategoria,
        label: cat.nombre
    }));

    const opcionesContenido = contenidos.map(contenido => ({
        value: contenido.idContenido,
        label: contenido.title
    }));

    const opcionesTemporada = temporadas.map(temporada => ({
        value: temporada.idTemporada,
        label: temporada.nombre || `Temporada ${temporada.numeroTemporada}`
    }));

    // Sincronizar con los props cuando cambien
    useEffect(() => {
        setCategoriaModal(selectedCategoria || '');
    }, [selectedCategoria]);

    useEffect(() => {
        setContenidoModal(selectedContenido || '');
    }, [selectedContenido]);

    useEffect(() => {
        setTemporadaModal(selectedTemporada || '');
    }, [selectedTemporada]);

    // Cuando cambia la categoría en el modal
    const handleCategoriaModal = (selected) => {
        const categoriaId = selected ? selected.value : '';
        setCategoriaModal(categoriaId);
        setContenidoModal('');
        setTemporadaModal('');
        onCategoriaChange(categoriaId);
    };

    // Cuando cambia el contenido en el modal
    const handleContenidoModal = (selected) => {
        const contenidoId = selected ? selected.value : '';
        setContenidoModal(contenidoId);
        setTemporadaModal('');
        onContenidoChange(contenidoId);
    };

    // Cuando cambia la temporada en el modal
    const handleTemporadaModal = (selected) => {
        const temporadaId = selected ? selected.value : '';
        setTemporadaModal(temporadaId);
        onTemporadaChange(temporadaId);
        
        // Actualizar directamente el episodio.idTemporada
        onChange({
            target: { name: 'idTemporada', value: temporadaId }
        });
    };

    // Precargar datos cuando estamos en modo edición
    useEffect(() => {
        if (operacion === 2 && episodio && episodio.idTemporada && !inicializado) {
            console.log('🔄 Precargando temporada para edición:', episodio.idTemporada);
            setTemporadaModal(episodio.idTemporada);
            setInicializado(true);
        }
    }, [operacion, episodio, episodio?.idTemporada, inicializado]);

    // Resetear inicializado cuando cambia la operación
    useEffect(() => {
        if (operacion !== 2) {
            setInicializado(false);
        }
    }, [operacion]);

    return (
        <div className="space-y-4 text-gray-900">
            {/* Selects con react-select */}
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Ubicación del episodio
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                    {/* Select de Categoría */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Categoría
                        </label>
                        <Select
                            options={opcionesCategoria}
                            value={opcionesCategoria.find(o => o.value === Number(categoriaModal)) || null}
                            onChange={handleCategoriaModal}
                            placeholder="Seleccione una categoría..."
                            isClearable
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: errores.idCategoria ? "red" : base.borderColor,
                                }),
                            }}
                        />
                    </div>

                    {/* Select de Contenido */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contenido
                        </label>
                        <Select
                            options={opcionesContenido}
                            value={opcionesContenido.find(o => o.value === Number(contenidoModal)) || null}
                            onChange={handleContenidoModal}
                            placeholder="Seleccione un contenido..."
                            isClearable
                            isDisabled={!categoriaModal}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: errores.idContenido ? "red" : base.borderColor,
                                }),
                            }}
                        />
                    </div>

                    {/* Select de Temporada */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Temporada *
                        </label>
                        <Select
                            options={opcionesTemporada}
                            value={opcionesTemporada.find(o => o.value === Number(temporadaModal)) || null}
                            onChange={handleTemporadaModal}
                            placeholder="Seleccione una temporada..."
                            isClearable
                            isDisabled={!contenidoModal}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: errores.idTemporada ? "red" : base.borderColor,
                                }),
                            }}
                        />
                        {errores.idTemporada && (
                            <p className="text-red-500 text-sm mt-1">Debe seleccionar una temporada</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Campos del episodio */}
            <div className="grid grid-cols-1 gap-4">
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
                    {operacion === 2 
                        ? `Editando episodio - Temporada ID: ${episodio?.idTemporada || 'No disponible'}` 
                        : temporadaModal 
                            ? `Creando episodio en: ${temporadas.find(t => t.idTemporada == temporadaModal)?.nombre || 'Temporada seleccionada'}` 
                            : 'Seleccione categoría → contenido → temporada'
                    }
                </p>
            </div>
        </div>
    );
}

export default SubModalEpisodio;