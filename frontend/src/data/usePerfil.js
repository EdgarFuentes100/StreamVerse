import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const usePerfil = () => {
    const { getFetch } = useFetch();
    const [contenidoPlan, setContenidoPlan] = useState([]);

    const getContendioPlan = (idPerfil) => {
        getFetch(`plan/listaContenido/${idPerfil}`)
            .then((data) => {
                setContenidoPlan(data.datos || []);
                console.log("cntnedi plan", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };


    return {
        contenidoPlan,
        getContendioPlan
    };
};

export { usePerfil };
