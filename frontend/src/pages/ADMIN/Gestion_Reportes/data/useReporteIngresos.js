import { useState, useEffect } from 'react';
import { useFetch } from '../../../../api/useFetch';

export const useReporteIngresos = () => {
    const { getFetch } = useFetch();
    const [ingresosMensual, setIngresosMensual] = useState([]);
    const [ingresoTotal, setIngresoTotal] = useState([]);
    const [cargando, setCargando] = useState(false);

    const obtenerIngresosMensual = () => {
        getFetch('reporte/ingreso-mensual')
            .then((data) => {
                // Transformar solo el campo de fecha para mostrar mes en texto
                const ingresosFormateados = data.datos?.map(item => ({
                    ...item,
                    mes_formateado: formatearMes(item.año_mes)
                })) || [];
                setIngresosMensual(ingresosFormateados);
            })
            .catch((error) => {
                console.error('Error al obtener ingresos mensuales:', error);
            });
    };

    const obtenerIngresoTotal = () => {
        getFetch('reporte/ingreso-total')
            .then((data) => {
                setIngresoTotal(data.datos || []);
            })
            .catch((error) => {
                console.error('Error al obtener ingreso total:', error);
            });
    };

    // Función para formatear el mes
    const formatearMes = (añoMes) => {
        const [año, mes] = añoMes.split('-');
        const meses = {
            '01': 'Enero', '02': 'Febrero', '03': 'Marzo', '04': 'Abril',
            '05': 'Mayo', '06': 'Junio', '07': 'Julio', '08': 'Agosto',
            '09': 'Septiembre', '10': 'Octubre', '11': 'Noviembre', '12': 'Diciembre'
        };
        return `${meses[mes]} ${año}`;
    };

    useEffect(() => {
        setCargando(true);
        Promise.all([
            obtenerIngresosMensual(),
            obtenerIngresoTotal()
        ]).finally(() => {
            setCargando(false);
        });
    }, []);

    return {
        ingresosMensual,
        ingresoTotal,
        cargando
    };
};