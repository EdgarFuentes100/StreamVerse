import { useState, useEffect } from 'react';

export const useReportePlanes = () => {
    const [planes, setPlanes] = useState([]);
    const [cambiosPlan, setCambiosPlan] = useState([]);
    const [filtros, setFiltros] = useState({ fechaInicio: '2024-01-01', fechaFin: '2024-01-31' });
    const [cargando, setCargando] = useState(false);

    const obtenerReportePlanes = async () => {
        setCargando(true);
        try {
            const data = {
                planes: [
                    { 
                        id: 1,
                        plan: "Básico", 
                        usuarios: 4500, 
                        precio: "$9.99", 
                        ingresoMensual: "$44,955",
                        crecimiento: "+5%",
                        retencion: "85%",
                        color: "blue"
                    },
                    { 
                        id: 2,
                        plan: "Estándar", 
                        usuarios: 6800, 
                        precio: "$14.99", 
                        ingresoMensual: "$101,932",
                        crecimiento: "+12%",
                        retencion: "92%",
                        color: "green"
                    },
                    { 
                        id: 3,
                        plan: "Premium", 
                        usuarios: 1289, 
                        precio: "$19.99", 
                        ingresoMensual: "$25,767",
                        crecimiento: "+25%",
                        retencion: "95%",
                        color: "purple"
                    }
                ],
                cambiosPlan: [
                    { 
                        id: 1,
                        usuario: "María González", 
                        email: "maria@email.com",
                        planAnterior: "Básico", 
                        planNuevo: "Estándar", 
                        fecha: "2024-01-15", 
                        tipo: "upgrade",
                        razon: "Más contenido disponible"
                    },
                    { 
                        id: 2,
                        usuario: "Carlos Martínez", 
                        email: "carlos@email.com",
                        planAnterior: "Premium", 
                        planNuevo: "Estándar", 
                        fecha: "2024-01-12", 
                        tipo: "downgrade",
                        razon: "Ajuste presupuestario"
                    },
                    { 
                        id: 3,
                        usuario: "Ana López", 
                        email: "ana@email.com",
                        planAnterior: "Gratuito", 
                        planNuevo: "Premium", 
                        fecha: "2024-01-10", 
                        tipo: "upgrade",
                        razon: "Calidad 4K"
                    }
                ]
            };
            setPlanes(data.planes);
            setCambiosPlan(data.cambiosPlan);
        } catch (error) {
            console.error('Error obteniendo reporte de planes:', error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerReportePlanes();
    }, []);

    return {
        planes,
        cambiosPlan,
        filtros,
        setFiltros,
        cargando,
        obtenerReportePlanes
    };
};