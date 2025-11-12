import { useState } from "react";
import { ModelCategoria } from "../../../../model/ModelCategoria";

const useModelCategoria = () => {
    const [showSubModal, setSubModalOpen] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [operacion, setOperacion] = useState(1);
    const [errores, setErrores] = useState({});

    const openSubModal = (op, categoria = ModelCategoria()) => {
        setOperacion(op);
        setCategoriaSeleccionada(op === 2 ? categoria : ModelCategoria());
        setSubModalOpen(true);
    };

    const closeSubModal = () => {
        setSubModalOpen(false);
        setCategoriaSeleccionada(null);
        setErrores({});
    };

    const handleContinue = () => {
        const nuevosErrores = {};

        if (!categoriaSeleccionada?.nombre || categoriaSeleccionada.nombre.trim() === "") {
            nuevosErrores.nombre = true;
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            console.warn("Por favor complete los campos obligatorios.");
            return;
        }

        console.log('Guardando categoría:', categoriaSeleccionada);
        closeSubModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategoriaSeleccionada(prev => ({
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
        categoriaSeleccionada,
    };
};

export { useModelCategoria };