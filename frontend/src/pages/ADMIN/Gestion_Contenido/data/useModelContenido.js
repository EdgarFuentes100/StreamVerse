import { useState } from "react";
import { ModelContenido } from "../../../../model/ModelContenido";

const useModelContenido = ({ crearContenido, actualizarContenido }) => {
    const [showSubModal, setSubModalOpen] = useState(false);
    const [contenidoSeleccionado, setContenidoSeleccionado] = useState(null);
    const [operacion, setOperacion] = useState(1);
    const [errores, setErrores] = useState({});

    const openSubModal = (op, contenido = ModelContenido()) => {
        setOperacion(op);
        setContenidoSeleccionado(op === 2 ? contenido : ModelContenido());
        setSubModalOpen(true);
    };

    const closeSubModal = () => {
        setSubModalOpen(false);
        setContenidoSeleccionado(null);
        setErrores({});
    };

    const handleContinue = () => {
        const nuevosErrores = {};

        // Validaciones
        if (!contenidoSeleccionado?.title || contenidoSeleccionado.title.trim() === "") {
            nuevosErrores.title = true;
        }
        if (!contenidoSeleccionado?.idCategoria || contenidoSeleccionado.idCategoria === 0) {
            nuevosErrores.idCategoria = true;
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            console.warn("Por favor complete los campos obligatorios.");
            return;
        }

        console.warn('Guardando contenido:', contenidoSeleccionado);
        if (operacion === 1) crearContenido(contenidoSeleccionado);
        else actualizarContenido(contenidoSeleccionado.idContenido, contenidoSeleccionado);
        closeSubModal();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setContenidoSeleccionado(prev => ({
                ...prev,
                [name]: checked ? 1 : 0
            }));
        } else {
            setContenidoSeleccionado(prev => ({
                ...prev,
                [name]: type === 'number' ? Number(value) : value
            }));
        }

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
        contenidoSeleccionado,
    };
};

export { useModelContenido };