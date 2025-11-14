import SubModal from "../../../components/SubModal";
import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { useContenido } from "../../../data/useContenido";
import { useModelContenido } from "./data/useModelContenido";
import SubModalContenido from "./Modal/SubModalContenido";

function Contenido() {
    const contenidoHook = useContenido();
    const { contenido, eliminarContenido } = contenidoHook;

    const {
        showSubModal,
        handleContinue,
        closeSubModal,
        operacion,
        openSubModal,
        contenidoSeleccionado,
        handleChange,
        errores
    } = useModelContenido(contenidoHook);

    return (
        <>
            <div className="container-fluid p-3 pt-24">
                <TablaToolbar
                    onBack={() => console.log("Exportar")}
                    onExport={() => console.log("Exportar")}
                    onAdd={() => openSubModal(1)}
                    addLabel="Agregar Ingrediente"
                />

                <TablaReutilizable
                    data={contenido}
                    columnas={[
                        { key: "title", label: "title" },
                        { key: "descripcion", label: "descripcion" },
                        { key: "year", label: "year" },
                        { key: "temporadas", label: "temporadas" },
                        { key: "episodios", label: "episodios" },
                        { key: "isNew", label: "Nuevo", isBoolean: true },
                        { key: "isPopular", label: "Popular", isBoolean: true },
                        { key: "isExclusive", label: "Exclusivo", isBoolean: true },
                        { key: "categoria", label: "Categoria" },
                        { key: "generos", label: "Generos" },

                    ]}
                    expandible={[

                    ]}
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
                        errores={errores}
                        operacion={operacion}
                    />
                </SubModal>
            </div>
        </>
    );
}

export default Contenido;