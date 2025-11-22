import { useState, useEffect } from 'react';

export const useReporteContenido = () => {
    const [contenido, setContenido] = useState([]);
    const [popular, setPopular] = useState([]);
    const [metricas, setMetricas] = useState({});
    const [cargando, setCargando] = useState(false);

    const obtenerReporteContenido = async () => {
        setCargando(true);
        try {
            const data = {
                contenido: [
                    {
                        id: 1,
                        titulo: "Serie A - Drama",
                        categoria: "Drama",
                        temporadas: 3,
                        episodios: 24,
                        vistasTotales: 2500000,
                        rating: 4.8,
                        estado: "Activo",
                        fechaEstreno: "2023-03-15",
                        proximaLlegada: "2024-03-01"
                    },
                    {
                        id: 2,
                        titulo: "Serie B - Comedia",
                        categoria: "Comedia",
                        temporadas: 2,
                        episodios: 16,
                        vistasTotales: 1800000,
                        rating: 4.5,
                        estado: "Activo",
                        fechaEstreno: "2023-06-20",
                        proximaLlegada: "-"
                    },
                    {
                        id: 3,
                        titulo: "Serie C - Acción",
                        categoria: "Acción",
                        temporadas: 1,
                        episodios: 8,
                        vistasTotales: 1200000,
                        rating: 4.6,
                        estado: "En producción",
                        fechaEstreno: "2023-09-10",
                        proximaLlegada: "2024-02-15"
                    },
                    {
                        id: 4,
                        titulo: "Serie D - Ciencia Ficción",
                        categoria: "Ciencia Ficción",
                        temporadas: 4,
                        episodios: 32,
                        vistasTotales: 3200000,
                        rating: 4.9,
                        estado: "Activo",
                        fechaEstreno: "2022-11-05",
                        proximaLlegada: "2024-04-10"
                    }
                ],
                popular: [
                    {
                        id: 1,
                        titulo: "Episodio 5 - T3 Serie A",
                        vistas: 450000,
                        duracion: "45 min",
                        categoria: "Drama",
                        fechaLanzamiento: "2024-01-10"
                    },
                    {
                        id: 2,
                        titulo: "Episodio 1 - T1 Serie B",
                        vistas: 380000,
                        duracion: "50 min",
                        categoria: "Comedia",
                        fechaLanzamiento: "2023-06-20"
                    },
                    {
                        id: 3,
                        titulo: "Episodio 8 - T2 Serie A",
                        vistas: 320000,
                        duracion: "42 min",
                        categoria: "Drama",
                        fechaLanzamiento: "2023-11-15"
                    }
                ],
                metricas: {
                    totalContenido: 1245,
                    seriesActivas: 89,
                    horasContenido: 1560,
                    avgRating: 4.7,
                    nuevosEsteMes: 24
                }
            };
            setContenido(data.contenido);
            setPopular(data.popular);
            setMetricas(data.metricas);
        } catch (error) {
            console.error('Error obteniendo reporte de contenido:', error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerReporteContenido();
    }, []);

    return {
        contenido,
        popular,
        metricas,
        cargando,
        obtenerReporteContenido
    };
};