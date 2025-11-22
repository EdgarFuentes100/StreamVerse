import { useState, useEffect } from 'react';

export const useResumenGeneral = () => {
    const [metricas, setMetricas] = useState([]); // ✅ Cambiado a array vacío
    const [tendencias, setTendencias] = useState([]);
    const [alertas, setAlertas] = useState([]); // ✅ Agregado estado para alertas
    const [cargando, setCargando] = useState(false);

    const obtenerResumenGeneral = async () => {
        setCargando(true);
        try {
            // Simular datos de API
            const data = {
                metricas: [ // ✅ Esto es un array
                    { 
                        id: 1, 
                        titulo: "Usuarios Activos", 
                        valor: "15,234", 
                        tendencia: "+12%", 
                        icono: "👥",
                        color: "blue" 
                    },
                    { 
                        id: 2, 
                        titulo: "Ingresos Mensuales", 
                        valor: "$45,670", 
                        tendencia: "+8%", 
                        icono: "💰",
                        color: "green" 
                    },
                    { 
                        id: 3, 
                        titulo: "Contenido Total", 
                        valor: "1,245", 
                        tendencia: "+5%", 
                        icono: "🎬",
                        color: "purple" 
                    },
                    { 
                        id: 4, 
                        titulo: "Suscripciones Activas", 
                        valor: "12,589", 
                        tendencia: "+15%", 
                        icono: "📋",
                        color: "orange" 
                    }
                ],
                tendencias: [
                    { mes: "Oct", usuarios: 12000, ingresos: 42000, contenido: 1100, suscripciones: 10500 },
                    { mes: "Nov", usuarios: 13500, ingresos: 44500, contenido: 1150, suscripciones: 11500 },
                    { mes: "Dic", usuarios: 14750, ingresos: 45100, contenido: 1200, suscripciones: 12200 },
                    { mes: "Ene", usuarios: 15234, ingresos: 45670, contenido: 1245, suscripciones: 12589 }
                ],
                alertas: [ // ✅ Datos de alertas
                    { id: 1, tipo: "advertencia", mensaje: "5 series próximas a expirar licencia", fecha: "2024-02-15" },
                    { id: 2, tipo: "info", mensaje: "Plan Premium con mayor crecimiento", fecha: "2024-01-30" },
                    { id: 3, tipo: "exito", mensaje: "Meta de ingresos superada este mes", fecha: "2024-01-25" }
                ]
            };
            setMetricas(data.metricas);
            setTendencias(data.tendencias);
            setAlertas(data.alertas); // ✅ Establecer alertas
        } catch (error) {
            console.error('Error obteniendo resumen:', error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerResumenGeneral();
    }, []);

    return {
        metricas,
        tendencias,
        alertas, // ✅ Retornar alertas
        cargando,
        obtenerResumenGeneral
    };
};