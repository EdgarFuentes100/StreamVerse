import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useGenero = () => {
    const { getFetch, postFetch, putFetch, deleteFetch } = useFetch();
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


        // ======== PETICIONES CRUD ========
    const crearGenero = (body) => {
        return postFetch('genero/crear', body)
            .then((data) => {
                if (data.datos.ok) getGenero();
                return data;
            })
            .catch((err) => {
                console.error('Error al crear:', err);
            });
    };

    const actualizarGenero = (id, body) => {
        return putFetch(`genero/editar/${id}`, body)
            .then((data) => {
                if (data.datos.ok) getGenero();
                return data;
            })
            .catch((err) => {
                console.error('Error al actualizar:', err);
            });
    };

    const eliminarGenero = (id) => {
        return deleteFetch(`genero/eliminar/${id}`)
            .then((data) => {
                if (data.datos.ok) getGenero();
                return data;
            })
            .catch((err) => {
                console.error('Error al eliminar:', err);
            });
    };

    return {
        genero,
        crearGenero,
        actualizarGenero,
        eliminarGenero
    };
};

export { useGenero };
