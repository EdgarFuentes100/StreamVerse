import React from 'react';
import { useReporteUsuarios } from './data/useReporteUsuario';
import TablaReutilizable from '../../../components/TablaReutilizable';

const ReporteUsuarios = () => {
    const { usuarios, metricas, cargando } = useReporteUsuarios();

    if (cargando) {
        return <div className="flex justify-center items-center h-64 text-white">Cargando...</div>;
    }

    return (
        <div className="container-fluid p-3 pt-24">
            <h1 className="text-2xl font-bold text-white mb-6">Reporte de Usuarios</h1>

            {/* Métricas Principales */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">Total Usuarios</p>
                    <p className="text-xl font-bold text-white">{metricas.totalUsuarios?.toLocaleString()}</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">Nuevos Este Mes</p>
                    <p className="text-xl font-bold text-green-400">{metricas.nuevosEsteMes?.toLocaleString()}</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">Cambios de Plan</p>
                    <p className="text-xl font-bold text-blue-400">{metricas.cambiosPlan}</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">Tasa Retención</p>
                    <p className="text-xl font-bold text-purple-400">{metricas.tasaRetencion}</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">Usuarios Activos</p>
                    <p className="text-xl font-bold text-green-400">{metricas.usuariosActivos?.toLocaleString()}</p>
                </div>
                <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700">
                    <p className="text-sm font-medium text-gray-300">Tiempo Promedio</p>
                    <p className="text-xl font-bold text-orange-400">{metricas.tiempoPromedio}</p>
                </div>
            </div>

            {/* Tabla de Usuarios */}
            <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
                <h2 className="text-lg font-semibold text-white mb-4">Detalle de Usuarios</h2>
                <TablaReutilizable
                    data={usuarios}
                    columnas={[
                        { key: "nombre", label: "Nombre" },
                        { key: "email", label: "Email" },
                        { 
                            key: "plan", 
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
                        { key: "planAnterior", label: "Plan Anterior" },
                        { key: "fechaCambio", label: "Fecha Cambio" },
                        { 
                            key: "estado", 
                            label: "Estado",
                            formatter: (val) => (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    val === 'activo' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                                }`}>
                                    {val === 'activo' ? 'Activo' : 'Inactivo'}
                                </span>
                            )
                        },
                        { key: "ultimaConexion", label: "Última Conexión" },
                        { key: "tiempoSesion", label: "Tiempo Sesión" }
                    ]}
                    acciones={[
                        { 
                            label: "Ver Detalle", 
                            variant: "primary", 
                            icon: "eye", 
                            onClick: (item) => console.log('Ver usuario:', item) 
                        }
                    ]}
                    idKey="id"
                />
            </div>
        </div>
    );
};

export default ReporteUsuarios;