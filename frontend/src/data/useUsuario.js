import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useUsuario = () => {
    const { getFetch, postFetch, putFetch, deleteFetch } = useFetch();
    const [usuarios, setUsuarios] = useState([]);
    const [selectedRol, setSelectedRol] = useState("");

    const getUsuarioId = (idRol) => {
        getFetch(`usuario/listadoUsuario/${idRol}`)
            .then((data) => {
                setUsuarios(data.datos || []);
                console.log("Usuarios:", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener usuarios:', error);
            });
    };

    // ======== PETICIONES CRUD ========
    const crearUsuario = (body) => {
        return postFetch('usuario/crear', body)
            .then((data) => {
                if (data.datos.ok) getUsuarioId(selectedRol);
                return data;
            })
            .catch((err) => {
                console.error('Error al crear:', err);
            });
    };

    const actualizarUsuario = (id, body) => {
        return putFetch(`usuario/editar/${id}`, body)
            .then((data) => {
                if (data.datos.ok) getUsuarioId(selectedRol);
                return data;
            })
            .catch((err) => {
                console.error('Error al actualizar:', err);
            });
    };

    const eliminarUsuario = (id) => {
        return deleteFetch(`usuario/eliminar/${id}`)
            .then((data) => {
                if (data.datos.ok) getUsuarioId(selectedRol);
                return data;
            })
            .catch((err) => {
                console.error('Error al eliminar:', err);
            });
    };

    const handleRol = (RolId) => {
        setSelectedRol(RolId);
        getUsuarioId(RolId || selectedRol);
    };

    return {
        usuarios,
        selectedRol,
        crearUsuario,
        actualizarUsuario,
        eliminarUsuario,
        handleRol
    };
};

export { useUsuario };
