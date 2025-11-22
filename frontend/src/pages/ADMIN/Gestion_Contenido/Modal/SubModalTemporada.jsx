import React from 'react';
import { useContenido } from '../../../../data/useContenido';
import Select from 'react-select';

function SubModalTemporada({ 
    temporada = {}, 
    onChange, 
    errores = {}, 
    operacion 
}) {
    const { contenido, loading, error } = useContenido();
    
    // Opciones para el select de contenido usando la estructura correcta
    const opcionesContenido = contenido?.map(cont => ({
        value: cont.idContenido, // Usando idContenido de tu estructura
        label: cont.title // Usando title de tu estructura
    })) || [];

    if (loading) {
        return <div className="text-center py-4">Cargando contenidos...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-4">Error cargando contenidos</div>;
    }

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

            {/* Select de Contenido */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Contenido Principal *
                </label>
                <Select
                    options={opcionesContenido}
                    value={opcionesContenido.find(o => o.value === (temporada?.idContenido || 0)) || null}
                    onChange={(selected) => {
                        const event = {
                            target: { 
                                name: "idContenido", 
                                value: selected ? selected.value : 0 
                            }
                        };
                        onChange(event);
                    }}
                    placeholder="Seleccione el contenido..."
                    isClearable
                    isSearchable
                    noOptionsMessage={() => "No hay contenidos disponibles"}
                    className="basic-single"
                    classNamePrefix="select"
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            borderColor: errores.idContenido ? '#ef4444' : '#d1d5db',
                            '&:hover': {
                                borderColor: errores.idContenido ? '#ef4444' : '#9ca3af'
                            },
                            boxShadow: state.isFocused ? (errores.idContenido ? '0 0 0 1px #ef4444' : '0 0 0 1px #3b82f6') : 'none',
                        })
                    }}
                />
                {errores.idContenido && (
                    <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                )}
                <p className="text-gray-600 text-sm mt-1">
                    Seleccione la serie o contenido principal al que pertenece esta temporada
                </p>
                <p className="text-gray-500 text-xs mt-1">
                    {contenido?.length || 0} contenidos disponibles
                </p>
            </div>

        </div>
    );
}

export default SubModalTemporada;