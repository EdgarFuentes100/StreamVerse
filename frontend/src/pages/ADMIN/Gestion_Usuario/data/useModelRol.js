import { useState } from "react";
import { ModelRol } from "../../../../model/ModelRol";

const useModelRol = ({ crearRol, actualizarRol }) => {
    const [showSubModal, setSubModalOpen] = useState(false);
    const [rolSeleccionado, setRolSeleccionado] = useState(null);
    const [operacion, setOperacion] = useState(1);
    const [errores, setErrores] = useState({});

    const openSubModal = (op, rol = ModelRol()) => {
        setOperacion(op);
        setRolSeleccionado(op === 2 ? rol : ModelRol());
        setSubModalOpen(true);
    };

    const closeSubModal = () => {
        setSubModalOpen(false);
        setRolSeleccionado(null);
        setErrores({});
    };

    const handleContinue = () => {
        const nuevosErrores = {};

        // Validaciones
        if (!rolSeleccionado?.rol || rolSeleccionado.rol.trim() === "") {
            nuevosErrores.rol = true;
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            console.warn("Por favor complete los campos obligatorios.");
            return;
        }

        console.log('Guardando rol:', rolSeleccionado);
        if (operacion === 1) crearRol(rolSeleccionado);
        else actualizarRol(rolSeleccionado.idRol, rolSeleccionado);
        closeSubModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRolSeleccionado(prev => ({
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
        rolSeleccionado,
    };
};

export { useModelRol };
