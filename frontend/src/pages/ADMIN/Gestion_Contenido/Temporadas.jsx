import SubModal from "../../../components/SubModal";
import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { useTemporada } from "../../../data/useTemporada";
import { useModelTemporada } from "./data/useModelTemporada";
import SubModalTemporada from "./Modal/SubModalTemporada";

function Temporada() {
    const { listaTemporas } = useTemporada();

    const {
        showSubModal,
        handleContinue,
        closeSubModal,
        operacion,
        openSubModal,
        temporadaSeleccionada,
        handleChange,
        errores
    } = useModelTemporada();

    const deleteOnClick = (id) => {
        console.log('Eliminar temporada con ID:', id);
    };

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
                    data={listaTemporas}
                    columnas={[
                        { key: "idTemporada", label: "ID" },
                        { key: "nombre", label: "Temporada" },
                        { key: "title", label: "Contenido" }
                    ]}
                    expandible={[

                    ]}
                    acciones={[
                        { label: "Editar", variant: "primary", icon: "pencil", onClick: (item) => openSubModal(2, item) },
                        { label: "Eliminar", variant: "danger", icon: "trash", onClick: (item) => deleteOnClick(item.idFamilia) }
                    ]}
                    idKey="idTemporada"
                />
                <SubModal
                    show={showSubModal}
                    handleContinue={handleContinue}
                    handleClose={closeSubModal}
                    titulo={operacion === 2 ? "Editar Temporada" : "Agregar Temporada"}
                    width={600}
                    continueText={operacion === 2 ? "Guardar Cambios" : "Agregar"}
                    cancelText="Cancelar"
                    continueVariant="success"
                    backdrop={true}
                    scrollable={false}
                >
                    <SubModalTemporada
                        temporada={temporadaSeleccionada}
                        onChange={handleChange}
                        errores={errores}
                        operacion={operacion}
                    />
                </SubModal>
            </div>
        </>
    );
}

export default Temporada;