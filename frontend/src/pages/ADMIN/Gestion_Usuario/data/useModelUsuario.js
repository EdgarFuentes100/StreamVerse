import { useState } from "react";
import { ModelUsuario } from "../../../../model/ModelUsuario";

const useModelUsuario = ({crearUsuario, actualizarUsuario}) => {
    const [showSubModal, setSubModalOpen] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [operacion, setOperacion] = useState(1);
    const [errores, setErrores] = useState({});

    const openSubModal = (op, usuario = ModelUsuario()) => {
        setOperacion(op);
        setUsuarioSeleccionado(op === 2 ? usuario : ModelUsuario());
        setSubModalOpen(true);
    };

    const closeSubModal = () => {
        setSubModalOpen(false);
        setUsuarioSeleccionado(null);
        setErrores({});
    };

    const handleContinue = () => {
        const nuevosErrores = {};

        // Validaciones básicas
        if (!usuarioSeleccionado?.nombre || usuarioSeleccionado.nombre.trim() === "") {
            nuevosErrores.nombre = true;
        }
        if (!usuarioSeleccionado?.email || usuarioSeleccionado.email.trim() === "") {
            nuevosErrores.email = true;
        }
        if (!usuarioSeleccionado?.idRol || usuarioSeleccionado.idRol === 0) {
            nuevosErrores.idRol = true;
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            console.warn("Por favor complete los campos obligatorios.");
            return;
        }

        console.log('Guardando usuario:', usuarioSeleccionado);
        if(operacion === 1) crearUsuario(usuarioSeleccionado);
        else actualizarUsuario(usuarioSeleccionado.idUsuario, usuarioSeleccionado);
        closeSubModal();
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setUsuarioSeleccionado(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
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
        usuarioSeleccionado,
    };
};

export { useModelUsuario };
