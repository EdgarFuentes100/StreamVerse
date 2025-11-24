import React from 'react';
import { useResumenGeneral } from './data/useResumenGeneral';
import TablaReutilizable from '../../../components/TablaReutilizable';

const ResumenGeneral = () => {
    const { 
        usuarioTotal,
        ingresoTotal,
        contenidoTotal,
        ingresosMensual,
        cargando 
    } = useResumenGeneral();

    if (cargando) {
        return <div className="flex justify-center items-center h-64 text-white">Cargando datos...</div>;
    }

    return (
        <div className="container-fluid p-3 pt-24">
            <h1 className="text-2xl font-bold text-white mb-6">Resumen General</h1>

            {/* Tarjetas de Métricas DIRECTAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Usuarios Totales */}
                <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-300">Usuarios Totales</p>
                            <p className="text-2xl font-bold text-white mt-2">{usuarioTotal.toLocaleString()}</p>
                            <p className="text-green-400 text-sm mt-1">+12% vs mes anterior</p>
                        </div>
                        <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl">
                            👥
                        </div>
                    </div>
                </div>

                {/* Ingresos Totales */}
                <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-300">Ingresos Totales</p>
                            <p className="text-2xl font-bold text-white mt-2">${ingresoTotal.toLocaleString()}</p>
                            <p className="text-green-400 text-sm mt-1">+8% vs mes anterior</p>
                        </div>
                        <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl">
                            💰
                        </div>
                    </div>
                </div>

                {/* Contenido Total */}
                <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-300">Contenido Total</p>
                            <p className="text-2xl font-bold text-white mt-2">{contenidoTotal.toLocaleString()}</p>
                            <p className="text-green-400 text-sm mt-1">+5% vs mes anterior</p>
                        </div>
                        <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl">
                            🎬
                        </div>
                    </div>
                </div>

                {/* Suscripciones Activas */}
                <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-300">Suscripciones Activas</p>
                            <p className="text-2xl font-bold text-white mt-2">{usuarioTotal.toLocaleString()}</p>
                            <p className="text-green-400 text-sm mt-1">+15% vs mes anterior</p>
                        </div>
                        <div className="bg-orange-600 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl">
                            📋
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabla de Ingresos Mensuales Reales */}
            {ingresosMensual.length > 0 && (
                <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                    <h2 className="text-lg font-semibold text-white mb-4">Ingresos Mensuales</h2>
                    <TablaReutilizable
                        data={ingresosMensual}
                        columnas={[
                            { key: "año_mes", label: "Periodo" },
                            { key: "ingresos_mensuales", label: "Ingresos", formatter: (val) => `$${parseFloat(val).toLocaleString()}` }
                        ]}
                        idKey="año_mes"
                    />
                </div>
            )}

            {/* Resumen de Datos */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-6">
                <h2 className="text-lg font-semibold text-white mb-4">Resumen Ejecutivo</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
                    <div>
                        <p className="text-gray-400">Total de Usuarios Registrados</p>
                        <p className="text-xl font-bold">{usuarioTotal}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Ingresos Generados</p>
                        <p className="text-xl font-bold">${ingresoTotal}</p>
                    </div>
                    <div>
                        <p className="text-gray-400">Catálogo de Contenido</p>
                        <p className="text-xl font-bold">{contenidoTotal} elementos</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResumenGeneral;