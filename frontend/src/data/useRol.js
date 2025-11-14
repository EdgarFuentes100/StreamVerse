import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useRol = () => {
    const { getFetch, postFetch, putFetch, deleteFetch } = useFetch();
    const [roles, setRoles] = useState([]);

    const getRoles = () => {
        getFetch('rol/listadoRol')
            .then((data) => {
                setRoles(data.datos || []);
                console.log("Roles:", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener roles:', error);
            });
    };

    useEffect(() => {
        getRoles();
    }, []);

    // ======== PETICIONES CRUD ========
    const crearRol = (body) => {
        return postFetch('rol/crear', body)
            .then((data) => {
                if (data.datos.ok) getRoles();
                return data;
            })
            .catch((err) => {
                console.error('Error al crear:', err);
            });
    };

    const actualizarRol = (id, body) => {
        return putFetch(`rol/editar/${id}`, body)
            .then((data) => {
                if (data.datos.ok) getRoles();
                return data;
            })
            .catch((err) => {
                console.error('Error al actualizar:', err);
            });
    };

    const eliminarRol = (id) => {
        return deleteFetch(`rol/eliminar/${id}`)
            .then((data) => {
                if (data.datos.ok) getRoles();
                return data;
            })
            .catch((err) => {
                console.error('Error al eliminar:', err);
            });
    };

    return {
        roles,
        crearRol,
        actualizarRol,
        eliminarRol
    };
};

export { useRol };
