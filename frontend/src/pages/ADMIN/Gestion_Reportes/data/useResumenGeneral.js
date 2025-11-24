import { useState, useEffect } from 'react';
import { useFetch } from '../../../../api/useFetch';

export const useResumenGeneral = () => {
    const { getFetch } = useFetch();
    const [usuarioTotal, setUsuarioTotal] = useState(0);
    const [ingresoTotal, setIngresoTotal] = useState(0);
    const [contenidoTotal, setContenidoTotal] = useState(0);
    const [ingresosMensual, setIngresosMensual] = useState([]);
    const [cargando, setCargando] = useState(false);

    const getUsuarioTotal = () => {
        getFetch(`reporte/total-usuarios`)
            .then((data) => {
                setUsuarioTotal(data.datos[0]?.total_usuarios || 0);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
            });
    };

    const getIngresoTotal = () => {
        getFetch(`reporte/ingreso-total`)
            .then((data) => {
                setIngresoTotal(data.datos[0]?.ingreso_total || 0);
            })
            .catch((error) => {
                console.error('Error al obtener ingresos:', error);
            });
    };

    const getTotalContenido = () => {
        getFetch(`reporte/total-contenido`)
            .then((data) => {
                setContenidoTotal(data.datos[0]?.total_contenido || 0);
            })
            .catch((error) => {
                console.error('Error al obtener contenido:', error);
            });
    };

    const getIngresoMensual = () => {
        getFetch(`reporte/ingreso-mensual`)
            .then((data) => {
                setIngresosMensual(data.datos || []);
            })
            .catch((error) => {
                console.error('Error al obtener ingresos mensuales:', error);
            });
    };

    useEffect(() => {
        setCargando(true);
        Promise.all([
            getUsuarioTotal(),
            getIngresoTotal(),
            getTotalContenido(),
            getIngresoMensual()
        ]).finally(() => {
            setCargando(false);
        });
    }, []);

    return {
        usuarioTotal,
        ingresoTotal,
        contenidoTotal,
        ingresosMensual,
        cargando
    };
};