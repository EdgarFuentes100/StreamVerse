import { useNavigate } from "react-router-dom";
import SubModal from "../../../components/SubModal";
import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { useContenido } from "../../../data/useContenido";
import { useModelContenido } from "./data/useModelContenido";
import SubModalContenido from "./Modal/SubModalContenido";

function Contenido() {
    const contenidoHook = useContenido();
    const { contenido, eliminarContenido } = contenidoHook;
    const navigate = useNavigate();

    const {
        showSubModal,
        handleContinue,
        closeSubModal,
        operacion,
        openSubModal,
        contenidoSeleccionado,
        handleChange,
        handleGenerosChange, // ✅ Ahora sí existe
        errores
    } = useModelContenido(contenidoHook);

    const handleVolver = () => {
        navigate(-1); // Vuelve a la página anterior
    };

    return (
        <>
            <div className="container-fluid p-3 pt-24">
                <TablaToolbar
                    onBack={handleVolver}
                    onAdd={() => openSubModal(1)}
                    addLabel="Agregar Contenido" // ✅ Cambié "Ingrediente" por "Contenido"
                />

                <TablaReutilizable
                    data={contenido}
                    columnas={[
                        { key: "title", label: "Título" },
                        { key: "descripcion", label: "Descripción" },
                        { key: "year", label: "Año" },
                        { key: "temporadas", label: "Temporadas" },
                        { key: "episodios", label: "Episodios" },
                        { key: "isNew", label: "Nuevo", isBoolean: true },
                        { key: "isPopular", label: "Popular", isBoolean: true },
                        { key: "isExclusive", label: "Exclusivo", isBoolean: true },
                        { key: "categoria", label: "Categoría" },
                        { key: "generos", label: "Géneros" },
                    ]}
                    expandible={[]}
                    acciones={[
                        { label: "Editar", variant: "primary", icon: "pencil", onClick: (item) => openSubModal(2, item) },
                        { label: "Eliminar", variant: "danger", icon: "trash", onClick: (item) => eliminarContenido(item.idContenido) }
                    ]}
                    idKey="idContenido"
                />

                {/* Modal */}
                <SubModal
                    show={showSubModal}
                    handleContinue={handleContinue}
                    handleClose={closeSubModal}
                    titulo={operacion === 2 ? "Editar Contenido" : "Agregar Contenido"}
                    width={900}
                    continueText={operacion === 2 ? "Guardar Cambios" : "Agregar"}
                    cancelText="Cancelar"
                    continueVariant="success"
                    backdrop={true}
                    scrollable={true}
                >
                    <SubModalContenido
                        contenido={contenidoSeleccionado}
                        onChange={handleChange}
                        onGenerosChange={handleGenerosChange} // ✅ Pasar la función
                        errores={errores}
                        operacion={operacion}
                    />
                </SubModal>
            </div>
        </>
    );
}

export default Contenido;