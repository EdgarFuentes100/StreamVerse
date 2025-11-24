import React from 'react';
import { useReportePlanes } from './data/useReportePlanes';
import TablaReutilizable from '../../../components/TablaReutilizable';

const ReportePlanes = () => {
    const { 
        planes, 
        cambiosPlan, 
        cargando 
    } = useReportePlanes();

    if (cargando) {
        return <div className="flex justify-center items-center h-64 text-white">Cargando reportes...</div>;
    }

    return (
        <div className="container-fluid p-3 pt-24">
            <h1 className="text-2xl font-bold text-white mb-6">Reporte de Planes</h1>

            {/* Tarjetas de Planes DIRECTAS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {planes.map(plan => (
                    <div key={plan.idPlan} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white">{plan.nombre_plan}</h3>
                            <span className="px-2 py-1 rounded text-xs bg-blue-500 text-white">
                                ${plan.precio}
                            </span>
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-300">Usuarios: <span className="text-white font-bold">{plan.cantidad_usuarios}</span></p>
                            <p className="text-gray-300">Ingreso Total: <span className="text-white font-bold">${plan.ganancias_totales}</span></p>
                            <p className="text-gray-300">Pagos Completados: <span className="text-white font-bold">{plan.pagos_completados}</span></p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabla de Cambios de Plan DIRECTA */}
            <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Cambios de Plan</h2>
                <TablaReutilizable
                    data={cambiosPlan}
                    columnas={[
                        { key: "usuario", label: "Usuario" },
                        { key: "email", label: "Email" },
                        { key: "plan_anterior", label: "Plan Anterior" },
                        { key: "plan_actual", label: "Plan Nuevo" },
                        { 
                            key: "tipo_cambio", 
                            label: "Tipo", 
                            formatter: (val) => (
                                <span className={`px-2 py-1 rounded text-xs ${
                                    val === 'SUBIO' ? 'bg-green-500' : 'bg-yellow-500'
                                } text-white`}>
                                    {val}
                                </span>
                            )
                        },
                        { key: "fecha_cambio", label: "Fecha" }
                    ]}
                    idKey="idUsuario"
                />
            </div>
        </div>
    );
};

export default ReportePlanes;