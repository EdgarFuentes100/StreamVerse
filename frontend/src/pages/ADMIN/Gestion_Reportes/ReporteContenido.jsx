import React from 'react';
import { useReporteContenido } from './data/useReporteContenido';
import TablaReutilizable from '../../../components/TablaReutilizable';

const ReporteContenido = () => {
    const { contenido, popular, metricas, cargando } = useReporteContenido();

    if (cargando) {
        return <div className="flex justify-center items-center h-64 text-white">Cargando...</div>;
    }

    return (
        <div className="container-fluid p-3 pt-24">
            <h1 className="text-2xl font-bold text-white mb-6">Reporte de Contenido</h1>

            {/* Métricas de Contenido */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">Total Contenido</p>
                    <p className="text-xl font-bold text-white">{metricas.totalContenido?.toLocaleString()}</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">Series Activas</p>
                    <p className="text-xl font-bold text-green-400">{metricas.seriesActivas}</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">Horas de Contenido</p>
                    <p className="text-xl font-bold text-blue-400">{metricas.horasContenido}h</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">Rating Promedio</p>
                    <p className="text-xl font-bold text-yellow-400">{metricas.avgRating}/5</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">Nuevos Este Mes</p>
                    <p className="text-xl font-bold text-purple-400">{metricas.nuevosEsteMes}</p>
                </div>
            </div>

            {/* Catálogo de Contenido */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4">Catálogo de Contenido</h2>
                <TablaReutilizable
                    data={contenido}
                    columnas={[
                        { key: "titulo", label: "Título" },
                        { 
                            key: "categoria", 
                            label: "Categoría",
                            formatter: (val) => (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    val === 'Drama' ? 'bg-purple-900 text-purple-200' :
                                    val === 'Comedia' ? 'bg-green-900 text-green-200' :
                                    val === 'Acción' ? 'bg-red-900 text-red-200' :
                                    'bg-blue-900 text-blue-200'
                                }`}>
                                    {val}
                                </span>
                            )
                        },
                        { key: "temporadas", label: "Temporadas" },
                        { key: "episodios", label: "Episodios" },
                        { 
                            key: "vistasTotales", 
                            label: "Vistas Totales",
                            formatter: (val) => `${(val / 1000000).toFixed(1)}M`
                        },
                        { 
                            key: "rating", 
                            label: "Rating",
                            formatter: (val) => (
                                <div className="flex items-center">
                                    <span className="text-yellow-400">★</span>
                                    <span className="ml-1 text-white">{val}</span>
                                </div>
                            )
                        },
                        { 
                            key: "estado", 
                            label: "Estado",
                            formatter: (val) => (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    val === 'Activo' ? 'bg-green-900 text-green-200' :
                                    val === 'En producción' ? 'bg-yellow-900 text-yellow-200' :
                                    'bg-gray-700 text-gray-300'
                                }`}>
                                    {val}
                                </span>
                            )
                        },
                        { key: "proximaLlegada", label: "Próxima Temporada" }
                    ]}
                    acciones={[
                        { 
                            label: "Analizar", 
                            variant: "primary", 
                            icon: "chart-bar", 
                            onClick: (item) => console.log('Analizar contenido:', item) 
                        }
                    ]}
                    idKey="id"
                />
            </div>

            {/* Contenido Popular */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4">Contenido Más Popular</h2>
                <TablaReutilizable
                    data={popular}
                    columnas={[
                        { key: "titulo", label: "Episodio" },
                        { 
                            key: "vistas", 
                            label: "Vistas",
                            formatter: (val) => `${(val / 1000).toFixed(0)}K`
                        },
                        { key: "duracion", label: "Duración" },
                        { key: "categoria", label: "Categoría" },
                        { key: "fechaLanzamiento", label: "Fecha Lanzamiento" }
                    ]}
                    idKey="id"
                />
            </div>
        </div>
    );
};

export default ReporteContenido;