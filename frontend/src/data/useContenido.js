import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useContenido = () => {
    const { getFetch } = useFetch();
    const [contenido, setContenido] = useState([]);

    const getContenido = () => {
        getFetch('contenido/listado')
            .then((data) => {
                setContenido(data.datos || []);
                console.log(data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    useEffect(() => {
        getContenido();
    }, []);

    return {
        contenido
    };
};

export { useContenido };
