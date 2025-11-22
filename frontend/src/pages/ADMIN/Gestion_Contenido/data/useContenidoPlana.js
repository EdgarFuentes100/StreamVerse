import { useState, useEffect } from 'react';
export const useContenidoPlana = () => {
    const [planes, setPlanes] = useState([]);
    const [contenidos, setContenidos] = useState([]);
    const [planSeleccionado, setPlanSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(false);

    // Cargar datos iniciales
    useEffect(() => {
        cargarDatosIniciales();
    }, []);

    const cargarDatosIniciales = async () => {
        setCargando(true);
        try {
            // Simular carga de datos desde API
            setTimeout(() => {
                setPlanes(planesEjemplo);
                setContenidos(contenidosEjemplo);
                setCargando(false);
            }, 1000);
        } catch (error) {
            console.error('Error cargando datos:', error);
            setCargando(false);
        }
    };

    // Toggle para asignar/desasignar contenido a un plan
    const toggleContenidoPlan = (idContenido, asignar) => {
        setContenidos(prev => prev.map(contenido =>
            contenido.idContenido === idContenido
                ? { ...contenido, asignado: asignar }
                : contenido
        ));

        // Aquí en una app real harías la llamada a la API
        console.log(`📝 ${asignar ? 'Asignando' : 'Quitando'} contenido ${idContenido} del plan ${planSeleccionado}`);
    };

    return {
        planes,
        contenidos,
        planSeleccionado,
        setPlanSeleccionado,
        cargando,
        toggleContenidoPlan
    };
};

// Asegúrate de que exportas por defecto también si es necesario
export default useContenidoPlana;