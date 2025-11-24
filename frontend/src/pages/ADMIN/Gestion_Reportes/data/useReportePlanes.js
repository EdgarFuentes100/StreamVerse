import { useState, useEffect } from 'react';
import { useFetch } from '../../../../api/useFetch';

export const useReportePlanes = () => {
    const { getFetch } = useFetch();
    const [planes, setPlanes] = useState([]);
    const [cambiosPlan, setCambiosPlan] = useState([]);
    const [cargando, setCargando] = useState(false);

    const obtenerIngresosPlan = () => {
        getFetch('reporte/ingreso-plan')
            .then((data) => {
                setPlanes(data.datos || []);
            })
            .catch((error) => {
                console.error('Error al obtener ingresos por plan:', error);
            });
    };

    const obtenerCambiosPlan = () => {
        getFetch('reporte/cambio-plan')
            .then((data) => {
                setCambiosPlan(data.datos || []);
            })
            .catch((error) => {
                console.error('Error al obtener cambios de plan:', error);
            });
    };

    useEffect(() => {
        setCargando(true);
        Promise.all([
            obtenerIngresosPlan(),
            obtenerCambiosPlan()
        ]).finally(() => {
            setCargando(false);
        });
    }, []);

    return {
        planes,
        cambiosPlan,
        cargando
    };
};