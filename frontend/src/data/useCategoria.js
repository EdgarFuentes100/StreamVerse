import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useCategoria = () => {
    const { getFetch } = useFetch();
    const [categoria, setCategoria] = useState([]);

    const getCategoria = () => {
        getFetch('categoria/listado')
            .then((data) => {
                setCategoria(data.datos || []);
                console.log(data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    useEffect(() => {
        getCategoria();
    }, []);

    return {
        categoria
    };
};

export { useCategoria };
