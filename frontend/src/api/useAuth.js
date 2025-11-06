import { useState, useEffect } from 'react';
import { useFetch } from './useFetch';

const useAuth = () => {
    const { getFetch } = useFetch();
    const [usuario, setUsuario] = useState([]);

    const getUsuario = () => {
        getFetch('auth/user')
            .then((data) => {
                setUsuario(data.datos || []);
                console.log("usuario", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    useEffect(() => {
        getUsuario();
    }, []);

    return {
        usuario
    };
};

export { useAuth };
