import { useState } from "react";
import { ModelGenero } from "../../../../model/ModelGenero";

const useModelGenero = ({ crearGenero, actualizarGenero }) => {
    const [showSubModal, setSubModalOpen] = useState(false);
    const [generoSeleccionado, setGeneroSeleccionado] = useState(null);
    const [operacion, setOperacion] = useState(1);
    const [errores, setErrores] = useState({});

    const openSubModal = (op, genero = ModelGenero()) => {
        setOperacion(op);
        setGeneroSeleccionado(op === 2 ? genero : ModelGenero());
        setSubModalOpen(true);
    };

    const closeSubModal = () => {
        setSubModalOpen(false);
        setGeneroSeleccionado(null);
        setErrores({});
    };

    const handleContinue = () => {
        const nuevosErrores = {};

        // Validación
        if (!generoSeleccionado?.nombre || generoSeleccionado.nombre.trim() === "") {
            nuevosErrores.nombre = true;
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            console.warn("Por favor complete los campos obligatorios.");
            return;
        }

        console.warn("DATOS.", generoSeleccionado);
        if (operacion === 1) crearGenero(generoSeleccionado);
        else actualizarGenero(generoSeleccionado.idGenero, generoSeleccionado);

        closeSubModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGeneroSeleccionado(prev => ({
            ...prev,
            [name]: value
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
        generoSeleccionado,
    };
};

export { useModelGenero };