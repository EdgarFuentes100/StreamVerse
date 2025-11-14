import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useCategoria = () => {
    const { getFetch, postFetch, putFetch, deleteFetch } = useFetch();
    const [categoria, setCategoria] = useState([]);

    const getCategoria = () => {
        getFetch('categoria/listado')
            .then((data) => {
                setCategoria(data.datos || []);
                console.log("ss", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    useEffect(() => {
        getCategoria();
    }, []);

    // ======== PETICIONES CRUD ========
    const crearCategoria = (body) => {
        return postFetch('categoria/crear', body)
            .then((data) => {
                if (data.datos.ok) getCategoria();
                return data;
            })
            .catch((err) => {
                console.error('Error al crear:', err);
            });
    };

    const actualizarCategoria = (id, body) => {
        return putFetch(`categoria/editar/${id}`, body)
            .then((data) => {
                if (data.datos.ok) getCategoria();
                return data;
            })
            .catch((err) => {
                console.error('Error al actualizar:', err);
            });
    };

    const eliminarCategoria = (id) => {
        return deleteFetch(`categoria/eliminar/${id}`)
            .then((data) => {
                if (data.datos.ok) getCategoria();
                return data;
            })
            .catch((err) => {
                console.error('Error al eliminar:', err);
            });
    };
    return {
        categoria,
        crearCategoria,
        actualizarCategoria,
        eliminarCategoria
    };
};

export { useCategoria };
