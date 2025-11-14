import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const usePlan = () => {
    const { getFetch, postFetch, putFetch, deleteFetch } = useFetch();
    const [plan, setPlan] = useState([]);

    const getPlanes = () => {
        getFetch(`plan/listadoPlan`)
            .then((data) => {
                setPlan(data.datos || []);
                console.log("plan", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    // ======== PETICIONES CRUD ========
    const crearPlan = (body) => {
        return postFetch('plan/crear', body)
            .then((data) => {
                if (data.datos.ok) getPlanes();
                return data;
            })
            .catch((err) => {
                console.error('Error al crear:', err);
            });
    };

    const actualizarPlan = (id, body) => {
        return putFetch(`plan/editar/${id}`, body)
            .then((data) => {
                if (data.datos.ok) getPlanes();
                return data;
            })
            .catch((err) => {
                console.error('Error al actualizar:', err);
            });
    };

    const eliminarPlan = (id) => {
        return deleteFetch(`plan/eliminar/${id}`)
            .then((data) => {
                if (data.datos.ok) getPlanes();
                return data;
            })
            .catch((err) => {
                console.error('Error al eliminar:', err);
            });
    };

    useEffect(() => {
        getPlanes();
    }, []);


    return {
        plan,
        crearPlan,
        actualizarPlan,
        eliminarPlan
    };
};

export { usePlan };
