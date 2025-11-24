import { useState, useEffect } from 'react';
import { useFetch } from '../../../../api/useFetch';

export const useReporteUsuarios = () => {
    const { getFetch } = useFetch();
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(false);

    const obtenerUsuarios = () => {
        getFetch('reporte/plan-actual')
            .then((data) => {
                setUsuarios(data.datos || []);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
            });
    };

    useEffect(() => {
        setCargando(true);
        obtenerUsuarios();
        setCargando(false);
    }, []);

    return {
        usuarios,
        cargando
    };
};