import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useGenero = () => {
    const { getFetch } = useFetch();
    const [genero, setGenero] = useState([]);

    const getGenero = () => {
        getFetch('genero/listado')
            .then((data) => {
                setGenero(data.datos || []);
                console.log(data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    useEffect(() => {
        getGenero();
    }, []);

    return {
        genero
    };
};

export { useGenero };
