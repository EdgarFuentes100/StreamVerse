import React from 'react';

function SubModalRol({ 
    rol = {}, 
    onChange, 
    errores = {}, 
    operacion 
}) {
    return (
        <div className="space-y-4 text-gray-900">
            {/* Nombre del Rol */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Nombre del Rol *
                </label>
                <input
                    type="text"
                    name="rol"
                    value={rol?.rol || ''}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errores.rol ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ej: Administrador, Usuario, Superadmin"
                />
                {errores.rol && (
                    <p className="text-red-500 text-sm mt-1">Este campo es obligatorio</p>
                )}
            </div>
        </div>
    );
}

export default SubModalRol;
