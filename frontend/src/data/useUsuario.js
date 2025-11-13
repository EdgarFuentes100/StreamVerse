import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useUsuario = () => {
    const { getFetch } = useFetch();

    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);

    // 🔹 Obtener todos los usuarios
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

    // 🔹 Obtener todos los roles
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

    return {
        usuarios,
        roles,
        getUsuarioId
    };
};

export { useUsuario };
