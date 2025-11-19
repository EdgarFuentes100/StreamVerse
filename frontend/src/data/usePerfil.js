import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const usePerfil = () => {
    const { getFetch, postFetch } = useFetch();
    const [contenidoPlan, setContenidoPlan] = useState([]);

    const getContendioPlan = (idPerfil) => {
        getFetch(`plan/listaContenido/${idPerfil}`)
            .then((data) => {
                setContenidoPlan(data.datos || []);
                console.log("cntnedi plan", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const getPagos = async (idUsuario) => {
        try {
            const data = await getFetch(`pagos/pagos/${idUsuario}`);
            console.log("cCUETEA ", data.datos);
            return data.datos; // ✅ esto hace que el resultado esté disponible fuera
        } catch (error) {
            console.error("Error al obtener:", error);
            return null;
        }
    };

    // ======== PETICIONES CRUD ========
    const crearPerfil = (body) => {
        return postFetch('perfil/crear', body)
            .then((data) => {
                if (data.datos.ok);
                return data;
            })
            .catch((err) => {
                console.error('Error al crear:', err);
            });
    };

    return {
        contenidoPlan,
        getContendioPlan,
        getPagos, 
        crearPerfil
    };
};

export { usePerfil };
