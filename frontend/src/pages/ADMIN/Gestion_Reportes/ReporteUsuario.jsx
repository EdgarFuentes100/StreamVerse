import React from 'react';
import { useReporteUsuarios } from './data/useReporteUsuario';
import TablaReutilizable from '../../../components/TablaReutilizable';

const ReporteUsuarios = () => {
    const { usuarios, cargando } = useReporteUsuarios();

    if (cargando) {
        return <div className="flex justify-center items-center h-64 text-white">Cargando...</div>;
    }

    return (
        <div className="container-fluid p-3 pt-24">
            <h1 className="text-2xl font-bold text-white mb-6">Reporte de Usuarios</h1>

            {/* Solo la tabla - DIRECTA de la API */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4">Usuarios con Plan Actual</h2>
                <TablaReutilizable
                    data={usuarios}
                    columnas={[
                        { key: "usuario", label: "Usuario" },
                        { key: "email", label: "Email" },
                        { 
                            key: "plan_actual", 
                            label: "Plan Actual",
                            formatter: (val) => (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    val === 'Premium' ? 'bg-purple-900 text-purple-200' :
                                    val === 'Estándar' ? 'bg-green-900 text-green-200' :
                                    'bg-blue-900 text-blue-200'
                                }`}>
                                    {val}
                                </span>
                            )
                        },
                        { key: "precio", label: "Precio", formatter: (val) => `$${val}` },
                        { key: "fecha_contratacion", label: "Fecha Contratación" },
                        { key: "fecha_vencimiento", label: "Fecha Vencimiento" },
                        { 
                            key: "estado_cuenta", 
                            label: "Estado Cuenta",
                            formatter: (val) => (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    val === 'activa' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                                }`}>
                                    {val === 'activa' ? 'Activa' : 'Inactiva'}
                                </span>
                            )
                        }
                    ]}
                    idKey="idUsuario"
                />
            </div>
        </div>
    );
};

export default ReporteUsuarios;