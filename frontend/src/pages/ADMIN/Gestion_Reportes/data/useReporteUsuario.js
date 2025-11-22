import { useState, useEffect } from 'react';

export const useReporteUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [metricas, setMetricas] = useState({});
    const [filtros, setFiltros] = useState({ 
        fechaInicio: '2024-01-01', 
        fechaFin: '2024-01-31',
        plan: 'todos',
        estado: 'todos'
    });
    const [cargando, setCargando] = useState(false);

    const obtenerReporteUsuarios = async () => {
        setCargando(true);
        try {
            const data = {
                usuarios: [
                    {
                        id: 1,
                        nombre: "María González",
                        email: "maria@email.com",
                        plan: "Estándar",
                        planAnterior: "Básico",
                        fechaCambio: "2024-01-15",
                        estado: "activo",
                        fechaRegistro: "2023-11-20",
                        ultimaConexion: "2024-01-28",
                        tiempoSesion: "45 min"
                    },
                    {
                        id: 2,
                        nombre: "Carlos Martínez",
                        email: "carlos@email.com",
                        plan: "Básico",
                        planAnterior: "Premium",
                        fechaCambio: "2024-01-12",
                        estado: "activo",
                        fechaRegistro: "2023-10-15",
                        ultimaConexion: "2024-01-25",
                        tiempoSesion: "32 min"
                    },
                    {
                        id: 3,
                        nombre: "Ana López",
                        email: "ana@email.com",
                        plan: "Premium",
                        planAnterior: "-",
                        fechaCambio: "2024-01-10",
                        estado: "inactivo",
                        fechaRegistro: "2023-12-01",
                        ultimaConexion: "2024-01-20",
                        tiempoSesion: "58 min"
                    },
                    {
                        id: 4,
                        nombre: "Juan Pérez",
                        email: "juan@email.com",
                        plan: "Estándar",
                        planAnterior: "Básico",
                        fechaCambio: "2024-01-08",
                        estado: "activo",
                        fechaRegistro: "2023-09-10",
                        ultimaConexion: "2024-01-29",
                        tiempoSesion: "67 min"
                    },
                    {
                        id: 5,
                        nombre: "Laura Rodríguez",
                        email: "laura@email.com",
                        plan: "Premium",
                        planAnterior: "Estándar",
                        fechaCambio: "2024-01-05",
                        estado: "activo",
                        fechaRegistro: "2023-08-22",
                        ultimaConexion: "2024-01-30",
                        tiempoSesion: "89 min"
                    }
                ],
                metricas: {
                    totalUsuarios: 15234,
                    nuevosEsteMes: 2484,
                    cambiosPlan: 156,
                    tasaRetencion: "88%",
                    usuariosActivos: 12489,
                    tiempoPromedio: "52 min"
                }
            };
            setUsuarios(data.usuarios);
            setMetricas(data.metricas);
        } catch (error) {
            console.error('Error obteniendo reporte de usuarios:', error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerReporteUsuarios();
    }, []);

    return {
        usuarios,
        metricas,
        filtros,
        setFiltros,
        cargando,
        obtenerReporteUsuarios
    };
};