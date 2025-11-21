import React from 'react';
import Select from 'react-select'; // ✅ Faltaba importar Select
import { useRol } from '../../../../data/useRol';

function SubModalUsuario({
    usuario = {},
    onChange,
    errores = {},
    operacion
}) {
    const { roles } = useRol();
    const opcionesRoles = roles.map(item => ({
        value: item.idRol,
        label: item.rol
    }));

    // ✅ Handler específico para el Select de roles
    const handleRolChange = (selectedOption) => {
        // Simular el evento onChange que espera el componente padre
        const simulatedEvent = {
            target: {
                name: 'idRol',
                value: selectedOption ? selectedOption.value : ''
            }
        };
        onChange(simulatedEvent);
    };

    return (
        <div className="space-y-4 text-gray-900">
            {/* Nombre y Email */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Nombre *
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        value={usuario?.nombre || ''}
                        onChange={onChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errores.nombre ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Nombre del usuario"
                    />
                    {errores.nombre && (
                        <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Email *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={usuario?.email || ''}
                        onChange={onChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errores.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="usuario@ejemplo.com"
                    />
                    {errores.email && (
                        <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                    )}
                </div>
            </div>

            {/* Avatar y Estado */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        URL del Avatar
                    </label>
                    <input
                        type="text"
                        name="avatar"
                        value={usuario?.avatar || ''}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://ejemplo.com/avatar.jpg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">
                        Estado *
                    </label>
                    <select
                        name="estado"
                        value={usuario?.estado || 'activo'}
                        onChange={onChange}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errores.estado ? 'border-red-500' : 'border-gray-300'
                        }`}
                    >
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
                    {errores.estado && (
                        <p className="text-red-500 text-sm mt-1">Seleccione un estado</p>
                    )}
                </div>
            </div>

            {/* Rol - CORREGIDO */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Rol *
                </label>
                <Select
                    options={opcionesRoles}
                    value={opcionesRoles.find(o => o.value === Number(usuario?.idRol)) || null} // ✅ usuario.idRol, no categoriaModal
                    onChange={handleRolChange} // ✅ Handler corregido
                    placeholder="Seleccione un rol..."
                    isClearable
                    styles={{
                        control: (base) => ({
                            ...base,
                            borderColor: errores.idRol ? "red" : base.borderColor, // ✅ errores.idRol, no idCategoria
                        }),
                    }}
                />
                {errores.idRol && (
                    <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                )}
            </div>

            {/* Información de la operación */}
            <div className="bg-blue-50 p-3 rounded-md">
                <p className="text-blue-800 text-sm">
                    {operacion === 2 
                        ? `Editando usuario: ${usuario?.nombre || 'Sin nombre'}` 
                        : 'Creando nuevo usuario'
                    }
                </p>
            </div>
        </div>
    );
}

export default SubModalUsuario;