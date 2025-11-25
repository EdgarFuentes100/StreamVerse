import { useState } from 'react';
import { useFetch } from '../api/useFetch';

const useContenidoPlan = () => {
    const { getFetch, postFetch, putFetch, deleteFetch } = useFetch();
    const [contenidoPlanTodo, setContenidoPlanTodo] = useState([]);
    const [contenidoPlanSolo, setContenidoPlanSolo] = useState([]);
    const [cargando, setCargando] = useState(false);

    // ✅ Obtener TODO el contenido con estado de asignación
    const getContenidoPlanTodo = (idPlan) => {
        setCargando(true);
        getFetch(`contenidoPlan/listadoTodo/${idPlan}`)
            .then((data) => {
                setContenidoPlanTodo(data.datos || []);
                console.log('Contenido TODO:', data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener contenido todo:', error);
                setContenidoPlanTodo([]);
            })
            .finally(() => {
                setCargando(false);
            });
    };

    // ✅ Obtener SOLO el contenido asignado al plan
    const getContenidoPlanSolo = (idPlan) => {
        setCargando(true);
        getFetch(`contenidoPlan/listaSolo/${idPlan}`)
            .then((data) => {
                setContenidoPlanSolo(data.datos || []);
                console.log('Contenido SOLO:', data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener contenido solo:', error);
                setContenidoPlanSolo([]);
            })
            .finally(() => {
                setCargando(false);
            });
    };

    // ✅ Función para toggle (asignar/quitar)
    const toggleContenidoPlan = async (idContenido, idPlan, asignar) => {
        try {
            if (asignar) {
                await postFetch('contenidoPlan/asignar', {
                    idContenido,
                    idPlan
                });
            } else {
                await deleteFetch(`contenidoPlan/quitar/${idContenido}/${idPlan}`);
            }

            // ✅ Actualizar ambos estados después del toggle
            getContenidoPlanTodo(idPlan);
            getContenidoPlanSolo(idPlan);

            return true;
        } catch (error) {
            console.error('Error en toggle:', error);
            return false;
        }
    };

    // 🆕 NUEVA FUNCIÓN: Configuración automática - CORREGIDA
    const configurarContenidoAutomatico = async (idPlan) => {
        try {
            setCargando(true);
            
            const result = await postFetch(`contenidoPlan/configurar-automatico/${idPlan}`);
            
            // ✅ CORREGIDO: Usar tu estructura real "result.ok" y "result.datos"
            if (result.ok) {
                console.log('✅ Configuración automática aplicada:', result.datos);
                // Recargar ambos estados
                getContenidoPlanTodo(idPlan);
                getContenidoPlanSolo(idPlan);
                return result.datos;
            } else {
                throw new Error(result.mensaje || 'Error en configuración automática');
            }
            
        } catch (error) {
            console.error('Error en configuración automática:', error);
            throw error;
        } finally {
            setCargando(false);
        }
    };

    return {
        getContenidoPlanSolo,
        contenidoPlanSolo,
        getContenidoPlanTodo,
        contenidoPlanTodo,
        toggleContenidoPlan,
        configurarContenidoAutomatico,
        cargando
    };
};

export { useContenidoPlan };