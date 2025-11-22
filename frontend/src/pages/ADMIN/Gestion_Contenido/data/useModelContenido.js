import { useState } from "react";
import { ModelContenido } from "../../../../model/ModelContenido";

const useModelContenido = ({ crearContenido, actualizarContenido }) => {
    const [showSubModal, setSubModalOpen] = useState(false);
    const [contenidoSeleccionado, setContenidoSeleccionado] = useState(null);
    const [operacion, setOperacion] = useState(1);
    const [errores, setErrores] = useState({});
    const [generosSeleccionados, setGenerosSeleccionados] = useState(""); // ✅ Nuevo estado para géneros

    const openSubModal = (op, contenido = ModelContenido()) => {
        setOperacion(op);
        setContenidoSeleccionado(op === 2 ? contenido : ModelContenido());
        setGenerosSeleccionados(contenido?.generos || ""); // ✅ Inicializar con géneros del contenido
        setSubModalOpen(true);
    };

    const closeSubModal = () => {
        setSubModalOpen(false);
        setContenidoSeleccionado(null);
        setGenerosSeleccionados(""); // ✅ Limpiar géneros
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
        if (!generosSeleccionados || generosSeleccionados.trim() === "") {
            nuevosErrores.generos = "Seleccione al menos un género"; // ✅ Validar géneros
        }

        setErrores(nuevosErrores);

        if (Object.keys(nuevosErrores).length > 0) {
            console.warn("Por favor complete los campos obligatorios.");
            return;
        }

        // ✅ COMBINAR EL CONTENIDO CON LOS GÉNEROS SELECCIONADOS
        const contenidoCompleto = {
            ...contenidoSeleccionado,
            generos: generosSeleccionados
        };

        console.warn('Guardando contenido:', contenidoCompleto);
        
        if (operacion === 1) {
            crearContenido(contenidoCompleto);
        } else {
            actualizarContenido(contenidoSeleccionado.idContenido, contenidoCompleto);
        }
        
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

    // ✅ NUEVA FUNCIÓN PARA ACTUALIZAR GÉNEROS DESDE EL SUBMODAL
    const handleGenerosChange = (generosString) => {
        setGenerosSeleccionados(generosString);
        setErrores(prev => ({ ...prev, generos: false }));
    };

    return {
        showSubModal,
        openSubModal,
        closeSubModal,
        handleChange,
        handleGenerosChange, // ✅ Exportar nueva función
        handleContinue,
        errores,
        operacion,
        contenidoSeleccionado,
        generosSeleccionados // ✅ Exportar géneros
    };
};

export { useModelContenido };