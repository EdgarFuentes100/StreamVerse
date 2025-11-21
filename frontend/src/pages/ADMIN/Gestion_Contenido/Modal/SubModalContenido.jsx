import React from 'react';
import Select from "react-select";
import { useCategoria } from "../../../../data/useCategoria";

function SubModalContenido({
    contenido = {},
    onChange,
    errores = {},
    operacion
}) {
    const { categoria } = useCategoria();
    
    const opcionesCategoria = (categoria || []).map((item) => ({
        value: item.idCategoria,
        label: item.nombre,
    }));
    console.log(contenido, "dkc");

    return (
        <div className="space-y-4 text-gray-900">
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
                    placeholder="Ingrese el título del contenido"
                />
                {errores.title && (
                    <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                )}
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

            {/* Rating y Año en misma fila */}
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
                        placeholder="0.0 - 10.0"
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
                        placeholder="2024"
                    />
                </div>
            </div>

            {/* ID Categoría y Duración en misma fila */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        ID Categoría *
                    </label>

                    <Select
                        options={opcionesCategoria}
                        value={
                            opcionesCategoria.find(
                                (o) => o.value === Number(contenido?.idCategoria)
                            ) || null
                        }
                        onChange={(selected) =>
                            onChange({
                                target: { name: "idCategoria", value: selected ? selected.value : null },
                            })
                        }
                        placeholder="Seleccione una categoria..."
                        isClearable
                        styles={{
                            control: (base) => ({
                                ...base,
                                borderColor: errores.idCategoria ? "red" : base.borderColor,
                            }),
                        }}
                    />
                    {errores.idCategoria && (
                        <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                    )}
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
                        placeholder="Ej: 120 min, 45 min por episodio"
                    />
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

            {/* Grid para Temporadas y Episodios */}
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

            {/* Grid para Checkboxes */}
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
                        name="isPopular"
                        checked={Boolean(contenido?.isPopular)}
                        onChange={(e) => onChange({
                            target: { name: 'isPopular', value: e.target.checked ? 1 : 0 }
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-900">Popular</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="isTrending"
                        checked={Boolean(contenido?.isTrending)}
                        onChange={(e) => onChange({
                            target: { name: 'isTrending', value: e.target.checked ? 1 : 0 }
                        })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-900">Trending</label>
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

            {/* Información de la operación */}
            <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-blue-800 text-sm">
                    {operacion === 2 ? 'Editando contenido' : 'Creando nuevo contenido'}
                </p>
            </div>
        </div>
    );
}

export default SubModalContenido;