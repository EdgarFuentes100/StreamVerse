import { useState } from "react";
import { ModelPlan } from "../../../../model/ModelPlan";

const useModelPlan = ({ crearPlan, actualizarPlan }) => {
    const [showSubModal, setSubModalOpen] = useState(false);
    const [planSeleccionado, setPlanSeleccionado] = useState(null);
    const [operacion, setOperacion] = useState(1);
    const [errores, setErrores] = useState({});

    const openSubModal = (op, plan = ModelPlan()) => {
        setOperacion(op);
        setPlanSeleccionado(op === 2 ? plan : ModelPlan());
        setSubModalOpen(true);
    };

    const closeSubModal = () => {
        setSubModalOpen(false);
        setPlanSeleccionado(null);
        setErrores({});
    };

    const handleContinue = () => {
        const nuevosErrores = {};

        // Validación
        if (!planSeleccionado?.nombre || planSeleccionado.nombre.trim() === "") {
            nuevosErrores.nombre = true;
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            console.warn("Por favor complete los campos obligatorios.");
            return;
        }

        console.warn("DATOS.", planSeleccionado);

        if (operacion === 1) crearPlan(planSeleccionado);
        else actualizarPlan(planSeleccionado.idPlan, planSeleccionado);

        closeSubModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlanSeleccionado(prev => ({
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
        planSeleccionado,
    };
};

export { useModelPlan };