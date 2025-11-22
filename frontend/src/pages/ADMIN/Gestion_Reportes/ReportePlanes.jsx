import React from 'react';
import { useReportePlanes } from './data/useReportePlanes';
import TablaReutilizable from '../../../components/TablaReutilizable';

const ReportePlanes = () => {
    const { planes, cambiosPlan, cargando } = useReportePlanes();

    if (cargando) {
        return <div className="flex justify-center items-center h-64 text-white">Cargando...</div>;
    }

    return (
        <div className="container-fluid p-3 pt-24">
            <h1 className="text-2xl font-bold text-white mb-6">Reporte de Planes</h1>

            {/* Resumen de Planes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {planes.map(plan => (
                    <div key={plan.id} className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-white">{plan.plan}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                plan.color === 'blue' ? 'bg-blue-900 text-blue-200' :
                                plan.color === 'green' ? 'bg-green-900 text-green-200' :
                                'bg-purple-900 text-purple-200'
                            }`}>
                                {plan.crecimiento}
                            </span>
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-300">Usuarios:</span>
                                <span className="text-sm font-medium text-white">{plan.usuarios.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-300">Precio:</span>
                                <span className="text-sm font-medium text-white">{plan.precio}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-300">Ingreso Mensual:</span>
                                <span className="text-sm font-medium text-white">{plan.ingresoMensual}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-300">Retención:</span>
                                <span className="text-sm font-medium text-white">{plan.retencion}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabla de Cambios de Plan */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4">Cambios de Plan Recientes</h2>
                <TablaReutilizable
                    data={cambiosPlan}
                    columnas={[
                        { key: "usuario", label: "Usuario" },
                        { key: "email", label: "Email" },
                        { key: "planAnterior", label: "Plan Anterior" },
                        { key: "planNuevo", label: "Plan Nuevo" },
                        { 
                            key: "tipo", 
                            label: "Tipo",
                            formatter: (val) => (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    val === 'upgrade' ? 'bg-green-900 text-green-200' : 'bg-yellow-900 text-yellow-200'
                                }`}>
                                    {val === 'upgrade' ? 'Upgrade' : 'Downgrade'}
                                </span>
                            )
                        },
                        { key: "fecha", label: "Fecha" },
                        { key: "razon", label: "Razón" }
                    ]}
                    idKey="id"
                />
            </div>
        </div>
    );
};

export default ReportePlanes;