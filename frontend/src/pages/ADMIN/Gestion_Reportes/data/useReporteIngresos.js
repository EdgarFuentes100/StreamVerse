import { useState, useEffect } from 'react';

export const useReporteIngresos = () => {
    const [ingresos, setIngresos] = useState([]);
    const [resumen, setResumen] = useState({});
    const [tendencia, setTendencia] = useState([]);
    const [cargando, setCargando] = useState(false);

    const obtenerReporteIngresos = async () => {
        setCargando(true);
        try {
            const data = {
                ingresos: [
                    {
                        id: 1,
                        mes: "Enero 2024",
                        suscripciones: 42150,
                        publicidad: 2500,
                        contenidoExtra: 1020,
                        otros: 500,
                        total: 45670,
                        crecimiento: "+8%"
                    },
                    {
                        id: 2,
                        mes: "Diciembre 2023",
                        suscripciones: 40150,
                        publicidad: 2200,
                        contenidoExtra: 850,
                        otros: 450,
                        total: 43650,
                        crecimiento: "+5%"
                    },
                    {
                        id: 3,
                        mes: "Noviembre 2023",
                        suscripciones: 38200,
                        publicidad: 2000,
                        contenidoExtra: 750,
                        otros: 400,
                        total: 41350,
                        crecimiento: "+7%"
                    },
                    {
                        id: 4,
                        mes: "Octubre 2023",
                        suscripciones: 35700,
                        publicidad: 1800,
                        contenidoExtra: 600,
                        otros: 350,
                        total: 38450,
                        crecimiento: "+6%"
                    }
                ],
                resumen: {
                    arr: 548040,
                    ltv: 245.60,
                    cac: 45.30,
                    churnRate: 4.2,
                    mrr: 45670
                },
                tendencia: [
                    { mes: "Jul", ingresos: 38500 },
                    { mes: "Ago", ingresos: 40200 },
                    { mes: "Sep", ingresos: 41800 },
                    { mes: "Oct", ingresos: 43200 },
                    { mes: "Nov", ingresos: 44500 },
                    { mes: "Dic", ingresos: 45100 },
                    { mes: "Ene", ingresos: 45670 }
                ]
            };
            setIngresos(data.ingresos);
            setResumen(data.resumen);
            setTendencia(data.tendencia);
        } catch (error) {
            console.error('Error obteniendo reporte de ingresos:', error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerReporteIngresos();
    }, []);

    return {
        ingresos,
        resumen,
        tendencia,
        cargando,
        obtenerReporteIngresos
    };
};