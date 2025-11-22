import React from 'react';
import { useReporteIngresos } from './data/useReporteIngresos';
import TablaReutilizable from '../../../components/TablaReutilizable';

const ReporteIngresos = () => {
    const { ingresos, resumen, tendencia, cargando } = useReporteIngresos();

    if (cargando) {
        return <div className="flex justify-center items-center h-64 text-white">Cargando...</div>;
    }

    return (
        <div className="container-fluid p-3 pt-24">
            <h1 className="text-2xl font-bold text-white mb-6">Reporte de Ingresos</h1>

            {/* Métricas Financieras */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">ARR</p>
                    <p className="text-xl font-bold text-white">${resumen.arr?.toLocaleString()}</p>
                    <p className="text-xs text-green-400">+12% vs año anterior</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">LTV</p>
                    <p className="text-xl font-bold text-white">${resumen.ltv}</p>
                    <p className="text-xs text-green-400">+8%</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">CAC</p>
                    <p className="text-xl font-bold text-white">${resumen.cac}</p>
                    <p className="text-xs text-red-400">-5%</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">Churn Rate</p>
                    <p className="text-xl font-bold text-white">{resumen.churnRate}%</p>
                    <p className="text-xs text-green-400">-0.8%</p>
                </div>
            </div>

            {/* Tabla de Ingresos Detallados */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4">Ingresos Mensuales Detallados</h2>
                <TablaReutilizable
                    data={ingresos}
                    columnas={[
                        { key: "mes", label: "Mes" },
                        { 
                            key: "suscripciones", 
                            label: "Suscripciones",
                            formatter: (val) => `$${val.toLocaleString()}`
                        },
                        { 
                            key: "publicidad", 
                            label: "Publicidad",
                            formatter: (val) => `$${val.toLocaleString()}`
                        },
                        { 
                            key: "contenidoExtra", 
                            label: "Contenido Extra",
                            formatter: (val) => `$${val.toLocaleString()}`
                        },
                        { 
                            key: "otros", 
                            label: "Otros",
                            formatter: (val) => `$${val.toLocaleString()}`
                        },
                        { 
                            key: "total", 
                            label: "Total",
                            formatter: (val) => `$${val.toLocaleString()}`
                        },
                        { 
                            key: "crecimiento", 
                            label: "Crecimiento",
                            formatter: (val) => (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    val.includes('+') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                                }`}>
                                    {val}
                                </span>
                            )
                        }
                    ]}
                    idKey="id"
                />
            </div>

            {/* Tendencia de Ingresos */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4">Tendencia de Ingresos (Últimos 7 meses)</h2>
                <TablaReutilizable
                    data={tendencia}
                    columnas={[
                        { key: "mes", label: "Mes" },
                        { 
                            key: "ingresos", 
                            label: "Ingresos",
                            formatter: (val) => `$${val.toLocaleString()}`
                        }
                    ]}
                    idKey="mes"
                />
            </div>
        </div>
    );
};

export default ReporteIngresos;