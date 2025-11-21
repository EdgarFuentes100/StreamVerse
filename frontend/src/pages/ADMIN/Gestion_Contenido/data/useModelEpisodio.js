import { useState } from "react";
import { ModelEpisodio } from "../../../../model/ModelEpisodio";

const useModelEpisodio = ({crearVideo, actualizarVideo}) => {
    const [showSubModal, setSubModalOpen] = useState(false);
    const [episodioSeleccionado, setEpisodioSeleccionado] = useState(null);
    const [operacion, setOperacion] = useState(1);
    const [errores, setErrores] = useState({});

    const openSubModal = (op, episodio = ModelEpisodio()) => {
        setOperacion(op);
        setEpisodioSeleccionado(op === 2 ? episodio : ModelEpisodio());
        setSubModalOpen(true);
    };

    const closeSubModal = () => {
        setSubModalOpen(false);
        setEpisodioSeleccionado(null);
        setErrores({});
    };

    const handleContinue = () => {
        const nuevosErrores = {};

        // Validaciones
        if (!episodioSeleccionado?.title || episodioSeleccionado.title.trim() === "") {
            nuevosErrores.title = true;
        }
        if (!episodioSeleccionado?.idTemporada || episodioSeleccionado.idTemporada === 0) {
            nuevosErrores.idTemporada = true;
        }
        if (!episodioSeleccionado?.capitulo || episodioSeleccionado.capitulo === 0) {
            nuevosErrores.capitulo = true;
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            console.warn("Por favor complete los campos obligatorios.");
            return;
        }

        console.log('Guardando episodio:', episodioSeleccionado);
        if(operacion === 1) crearVideo(episodioSeleccionado);
        else actualizarVideo(episodioSeleccionado.idEpisodio, episodioSeleccionado);
        
        closeSubModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEpisodioSeleccionado(prev => ({
            ...prev,
            [name]: value
        }));
                console.log('🟢 Nuevo estado:', name, value);

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
        episodioSeleccionado,
    };
};

export { useModelEpisodio };