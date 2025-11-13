import React from 'react';

function SubModalUsuario({ 
    usuario = {}, 
    onChange, 
    errores = {}, 
    operacion 
}) {
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

            {/* Rol */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Rol *
                </label>
                <input
                    type="number"
                    name="idRol"
                    value={usuario?.idRol || 0}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errores.idRol ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="ID del rol"
                />
                {errores.idRol && (
                    <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                )}
            </div>
        </div>
    );
}

export default SubModalUsuario;
