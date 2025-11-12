import { useState } from "react";
import { ModelTemporada } from "../../../../model/ModelTemporada";

const useModelTemporada = () => {
    const [showSubModal, setSubModalOpen] = useState(false);
    const [temporadaSeleccionada, setTemporadaSeleccionada] = useState(null);
    const [operacion, setOperacion] = useState(1);
    const [errores, setErrores] = useState({});

    const openSubModal = (op, temporada = ModelTemporada()) => {
        setOperacion(op);
        setTemporadaSeleccionada(op === 2 ? temporada : ModelTemporada());
        setSubModalOpen(true);
    };

    const closeSubModal = () => {
        setSubModalOpen(false);
        setTemporadaSeleccionada(null);
        setErrores({});
    };

    const handleContinue = () => {
        const nuevosErrores = {};

        // Validaciones
        if (!temporadaSeleccionada?.nombre || temporadaSeleccionada.nombre.trim() === "") {
            nuevosErrores.nombre = true;
        }
        if (!temporadaSeleccionada?.idContenido || temporadaSeleccionada.idContenido === 0) {
            nuevosErrores.idContenido = true;
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            console.warn("Por favor complete los campos obligatorios.");
            return;
        }

        console.log('Guardando temporada:', temporadaSeleccionada);
        closeSubModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTemporadaSeleccionada(prev => ({ 
            ...prev, 
            [name]: name === 'idContenido' ? Number(value) : value 
        }));
        setErrores(prev => ({ ...prev, [name]: false }));
    };

    return {
        showSubModal,
        openSubModal,
        closeSubModal,
        handleChange,
        handleContinue,
        errores,
        operacion,
        temporadaSeleccionada,
    };
};

export { useModelTemporada };