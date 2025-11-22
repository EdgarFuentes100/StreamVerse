import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { useCategoria } from "../../../../data/useCategoria";
import { useGenero } from '../../../../data/useGenero';

function SubModalContenido({
    contenido = {},
    onChange,
    errores = {},
    operacion
}) {
    const { categoria } = useCategoria();
    const { genero } = useGenero();
    const [generosConEstado, setGenerosConEstado] = useState([]);
    const [contenidoIdActual, setContenidoIdActual] = useState(null);

    const opcionesCategoria = (categoria || []).map((item) => ({
        value: item.idCategoria,
        label: item.nombre,
    }));

    // SOLUCIÓN: Usar el ID del contenido para detectar cambios
    useEffect(() => {
        if (genero.length > 0) {
            const contenidoId = contenido?.idContenido || 'nuevo';
            
            // Solo inicializar si cambió el contenido
            if (contenidoId !== contenidoIdActual) {
                console.log("🎬 OPERACIÓN:", operacion === 1 ? "AGREGAR" : "EDITAR");
                console.log("📝 Contenido ID:", contenidoId);
                console.log("📋 Géneros del contenido:", contenido?.generos);
                
                let generosIniciales = [];

                if (operacion === 1) {
                    // MODO AGREGAR: Todos los géneros comienzan DESMARCADOS
                    generosIniciales = genero.map(gen => ({
                        ...gen,
                        marcado: 0
                    }));
                    console.log("➕ MODO AGREGAR - Todos los géneros desmarcados");
                } else {
                    // MODO EDITAR: Marcar según contenido.generos
                    const generosDelContenido = contenido?.generos || '';
                    const generosArray = generosDelContenido ? 
                        generosDelContenido.split(',').map(g => g.trim()) : [];

                    generosIniciales = genero.map(gen => {
                        const estaMarcado = generosArray.some(nombreGenero =>
                            gen.nombre.toLowerCase() === nombreGenero.toLowerCase()
                        );
                        return {
                            ...gen,
                            marcado: estaMarcado ? 1 : 0
                        };
                    });
                    console.log("✏️ MODO EDITAR - Géneros marcados según contenido");
                }

                console.log("📋 GÉNEROS INICIALIZADOS:", generosIniciales);
                setGenerosConEstado(generosIniciales);
                setContenidoIdActual(contenidoId);

                // ACTUALIZAR EL CAMPO generos DEL FORMULARIO
                const nombresGenerosIniciales = generosIniciales
                    .filter(gen => gen.marcado === 1)
                    .map(gen => gen.nombre);
                    
                const generosStringInicial = nombresGenerosIniciales.join(', ');
                console.log("🔄 CAMPO generos INICIAL:", generosStringInicial);
                
                // Usar setTimeout para evitar el error de renderizado
                setTimeout(() => {
                    onChange({
                        target: {
                            name: 'generos',
                            value: generosStringInicial
                        }
                    });
                }, 0);
            }
        }
    }, [genero, operacion, contenido, contenidoIdActual, onChange]);

    // SOLUCIÓN: Función toggleGenero mejorada
    const toggleGenero = (idGenero) => {
        console.log("🖱️ CLICK en género ID:", idGenero);

        setGenerosConEstado(prev => {
            const nuevosGeneros = prev.map(gen => {
                if (gen.idGenero === idGenero) {
                    const nuevoMarcado = gen.marcado === 1 ? 0 : 1;
                    console.log(`🔄 Género ${gen.nombre} cambió de ${gen.marcado} a ${nuevoMarcado}`);
                    return { ...gen, marcado: nuevoMarcado };
                }
                return gen;
            });
            
            console.log("📋 NUEVO ESTADO:", nuevosGeneros);
            
            // ACTUALIZAR EL CAMPO generos
            const nombresGeneros = nuevosGeneros
                .filter(gen => gen.marcado === 1)
                .map(gen => gen.nombre);
                
            const generosString = nombresGeneros.join(', ');
            console.log("🎯 ACTUALIZANDO CAMPO generos:", generosString);
            
            // Usar setTimeout para evitar el error de renderizado
            setTimeout(() => {
                onChange({
                    target: {
                        name: 'generos',
                        value: generosString
                    }
                });
            }, 0);
            
            return nuevosGeneros;
        });
    };

    // Efecto separado para actualizaciones del campo generos
    useEffect(() => {
        if (generosConEstado.length > 0) {
            const nombresGeneros = generosConEstado
                .filter(gen => gen.marcado === 1)
                .map(gen => gen.nombre);
                
            const generosString = nombresGeneros.join(', ');
            console.log("🔄 EFECTO - Campo generos actualizado:", generosString);
        }
    }, [generosConEstado]);

    // Verificar si los géneros están cargados
    if (genero.length === 0) {
        return <div>Cargando géneros...</div>;
    }

    return (
        <div className="space-y-4 text-gray-900">
            {/* Título */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Título *
                </label>
                <input
                    type="text"
                    name="title"
                    value={contenido?.title || ''}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errores.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ingrese el título"
                />
                {errores.title && <p className="text-red-500 text-sm mt-1">{errores.title}</p>}
            </div>

            {/* Imagen */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    URL de la Imagen
                </label>
                <input
                    type="text"
                    name="image"
                    value={contenido?.image || ''}
                    onChange={onChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://ejemplo.com/imagen.jpg"
                />
            </div>

            {/* Rating y Año */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Rating
                    </label>
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        name="rating"
                        value={contenido?.rating || 0}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Año
                    </label>
                    <input
                        type="number"
                        name="year"
                        value={contenido?.year || ''}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Categoría y Duración */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Categoría *
                    </label>
                    <Select
                        options={opcionesCategoria}
                        value={opcionesCategoria.find(o => o.value === Number(contenido?.idCategoria)) || null}
                        onChange={(selected) => onChange({
                            target: { name: "idCategoria", value: selected ? selected.value : null },
                        })}
                        placeholder="Seleccione categoría..."
                        isClearable
                    />
                    {errores.idCategoria && <p className="text-red-500 text-sm mt-1">{errores.idCategoria}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Duración
                    </label>
                    <input
                        type="text"
                        name="duracion"
                        value={contenido?.duracion || ''}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="120 min"
                    />
                </div>
            </div>

            {/* Lista de Géneros */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                    Géneros {operacion === 1 ? "(Nuevo - Seleccione)" : "(Editando)"}
                </label>
                <div className="border border-gray-300 rounded-md p-3 !bg-white">
                    <div className="flex flex-wrap gap-2">
                        {generosConEstado.map((gen) => (
                            <button
                                key={gen.idGenero}
                                type="button"
                                className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                                    gen.marcado === 1
                                        ? '!bg-blue-400 text-white border border-blue-600'
                                        : '!bg-gray-100 text-gray-400 border border-gray-300 hover:!bg-gray-200'
                                }`}
                                onClick={() => toggleGenero(gen.idGenero)}
                            >
                                {gen.nombre} {gen.marcado === 1 ? '✓' : ''}
                            </button>
                        ))}
                    </div>

                    {generosConEstado.filter(gen => gen.marcado === 1).length > 0 && (
                        <div className="mt-3 p-2 !bg-blue-50 rounded-md">
                            <p className="text-sm text-blue-800">
                                <span className="font-medium">
                                    {generosConEstado.filter(gen => gen.marcado === 1).length}
                                </span>
                                género(s) seleccionado(s)
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Descripción */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Descripción
                </label>
                <textarea
                    name="descripcion"
                    value={contenido?.descripcion || ''}
                    onChange={onChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Descripción del contenido..."
                />
            </div>

            {/* Temporadas y Episodios */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Temporadas
                    </label>
                    <input
                        type="number"
                        name="temporadas"
                        value={contenido?.temporadas || 0}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Episodios
                    </label>
                    <input
                        type="number"
                        name="episodios"
                        value={contenido?.episodios || 0}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="isNew"
                        checked={Boolean(contenido?.isNew)}
                        onChange={(e) => onChange({
                            target: { name: 'isNew', value: e.target.checked ? 1 : 0 }
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-900">Nuevo</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="isExclusive"
                        checked={Boolean(contenido?.isExclusive)}
                        onChange={(e) => onChange({
                            target: { name: 'isExclusive', value: e.target.checked ? 1 : 0 }
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-900">Exclusivo</label>
                </div>
            </div>

            {/* Info operación */}
            <div className="!bg-blue-50 p-3 rounded-md">
                <p className="text-blue-800 text-sm">
                    {operacion === 2 ? 'Editando contenido' : 'Creando nuevo contenido'}
                </p>
            </div>
        </div>
    );
}

export default SubModalContenido;