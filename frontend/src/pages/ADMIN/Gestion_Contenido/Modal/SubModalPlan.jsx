import React from "react";

function SubModalPlan({
    plan = {},
    onChange,
    errores = {},
    operacion
}) {
    return (
        <div className="space-y-4 text-gray-900">
            {/* Nombre del Plan */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Nombre del Plan *
                </label>
                <input
                    type="text"
                    name="nombre"
                    value={plan?.nombre || ""}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.nombre ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder="Ej: Básico, Estándar, Premium"
                />
                {errores.nombre && (
                    <p className="text-red-500 text-sm mt-1">
                        Este campo es obligatorio
                    </p>
                )}
            </div>

            {/* Precio */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Precio ($) *
                </label>
                <input
                    type="number"
                    step="0.01"
                    name="precio"
                    value={plan?.precio || ""}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.precio ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder="Ej: 9.99"
                />
                {errores.precio && (
                    <p className="text-red-500 text-sm mt-1">
                        Este campo es obligatorio
                    </p>
                )}
            </div>

            {/* Máximo de Perfiles */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Máximo de Perfiles *
                </label>
                <input
                    type="number"
                    name="maxPerfil"
                    value={plan?.maxPerfil || ""}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.maxPerfil ? "border-red-500" : "border-gray-300"
                        }`}
                    placeholder="Ej: 1, 2, 4"
                />
                {errores.maxPerfil && (
                    <p className="text-red-500 text-sm mt-1">
                        Este campo es obligatorio
                    </p>
                )}
            </div>

            {/* Calidad */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                    Calidad del Plan *
                </label>
                <select
                    name="calidad"
                    value={plan?.calidad || ""}
                    onChange={onChange}
                    className={`w-full px-3 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.calidad ? "border-red-500" : "border-gray-300"
                        }`}
                >
                    <option value="">Seleccionar calidad</option>
                    <option value="SD">SD (480p)</option>
                    <option value="HD">HD (720p)</option>
                    <option value="Full HD">Full HD (1080p)</option>
                    <option value="4K">4K (2160p)</option>
                </select>
                {errores.calidad && (
                    <p className="text-red-500 text-sm mt-1">
                        Este campo es obligatorio
                    </p>
                )}
            </div>

        </div>
    );
}

export default SubModalPlan;
