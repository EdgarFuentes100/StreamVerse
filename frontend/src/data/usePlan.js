import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const usePlan = () => {
    const { getFetch, postFetch, putFetch, deleteFetch } = useFetch();
    const [plan, setPlan] = useState([]);
    const [disponible, setDisponible] = useState(false);
    const [planActual, setPlanActual] = useState(false);

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

    const getVerficarPermiso = (idCuenta, idContenido) => {
        getFetch(`plan/verificarPermisoVideo/${idCuenta}/${idContenido}`)
            .then((data) => {
                setDisponible(data.datos.existe);
                console.log("SI EXISTE", data.datos.existe);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const getPlanActual = (idCuenta) => {
        getFetch(`plan/planActual/${idCuenta}`)
            .then((data) => {
                setPlanActual(data.datos[0]);
                console.log("Plan actual", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    useEffect(() => {
        getPlanes();
    }, []);

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


    return {
        plan,
        getVerficarPermiso,
        disponible,
        crearPlan,
        actualizarPlan,
        eliminarPlan,
        getPlanActual,
        planActual
    };
};

export { usePlan };
