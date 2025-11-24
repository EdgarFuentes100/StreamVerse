import React from 'react';
import { useReporteIngresos } from './data/useReporteIngresos';
import TablaReutilizable from '../../../components/TablaReutilizable';

const ReporteIngresos = () => {
    const { ingresosMensual, ingresoTotal, cargando } = useReporteIngresos();

    if (cargando) {
        return <div className="flex justify-center items-center h-64 text-white">Cargando...</div>;
    }

    return (
        <div className="container-fluid p-3 pt-24">
            <h1 className="text-2xl font-bold text-white mb-6">Reporte de Ingresos</h1>

            {/* Resumen */}
            {ingresoTotal.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <p className="text-sm font-medium text-gray-300">Ingreso Total</p>
                        <p className="text-2xl font-bold text-white">${ingresoTotal[0].ingreso_total}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <p className="text-sm font-medium text-gray-300">Pagos Completados</p>
                        <p className="text-2xl font-bold text-white">{ingresoTotal[0].total_pagos_completados}</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <p className="text-sm font-medium text-gray-300">Promedio por Pago</p>
                        <p className="text-2xl font-bold text-white">${ingresoTotal[0].promedio_por_pago}</p>
                    </div>
                </div>
            )}

            {/* Tabla con meses formateados */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4">Ingresos Mensuales</h2>
                <TablaReutilizable
                    data={ingresosMensual}
                    columnas={[
                        { key: "mes_formateado", label: "Mes" },
                        { key: "total_pagos", label: "Pagos Completados" },
                        { 
                            key: "ingresos_mensuales", 
                            label: "Ingresos",
                            formatter: (val) => `$${parseFloat(val).toLocaleString()}`
                        }
                    ]}
                    idKey="año_mes"
                />
            </div>
        </div>
    );
};

export default ReporteIngresos;