import React from 'react';
import { useResumenGeneral } from './data/useResumenGeneral';
import TablaReutilizable from '../../../components/TablaReutilizable';

const ResumenGeneral = () => {
    const { metricas, tendencias, alertas, cargando } = useResumenGeneral();

    const getColorClase = (color) => {
        const colores = {
            blue: 'bg-blue-600',
            green: 'bg-green-600', 
            purple: 'bg-purple-600',
            orange: 'bg-orange-600'
        };
        return colores[color] || 'bg-gray-600';
    };

    if (cargando) {
        return <div className="flex justify-center items-center h-64 text-white">Cargando...</div>;
    }

    return (
        <div className="container-fluid p-3 pt-24">
            <h1 className="text-2xl font-bold text-white mb-6">Resumen General</h1>

            {/* Tarjetas de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {metricas.map(metrica => (
                    <div key={metrica.id} className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-300">{metrica.titulo}</p>
                                <p className="text-2xl font-bold text-white mt-2">{metrica.valor}</p>
                                <p className={`text-sm mt-1 ${metrica.tendencia.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
                                    {metrica.tendencia} vs mes anterior
                                </p>
                            </div>
                            <div className={`${getColorClase(metrica.color)} w-12 h-12 rounded-full flex items-center justify-center text-white text-xl`}>
                                {metrica.icono}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabla de Tendencias */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4">Tendencias Mensuales</h2>
                <TablaReutilizable
                    data={tendencias}
                    columnas={[
                        { key: "mes", label: "Mes" },
                        { key: "usuarios", label: "Usuarios", formatter: (val) => val.toLocaleString() },
                        { key: "ingresos", label: "Ingresos", formatter: (val) => `$${val.toLocaleString()}` },
                        { key: "contenido", label: "Contenido", formatter: (val) => val.toLocaleString() },
                        { key: "suscripciones", label: "Suscripciones", formatter: (val) => val.toLocaleString() }
                    ]}
                    idKey="mes"
                />
            </div>
        </div>
    );
};

export default ResumenGeneral;