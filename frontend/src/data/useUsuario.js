import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useUsuario = () => {
    const { getFetch } = useFetch();
    const [usuarios, setUsuarios] = useState([]);

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

    return {
        usuarios,
        getUsuarioId
    };
};

export { useUsuario };
