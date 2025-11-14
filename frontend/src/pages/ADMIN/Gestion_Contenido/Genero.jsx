import SubModal from "../../../components/SubModal";
import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { useGenero } from "../../../data/useGenero";
import { useModelGenero } from "./data/useModelGenero";
import SubModalGenero from "./Modal/SubModalGenero";

function Genero() {

    const generoHook = useGenero();
    const { genero, eliminarGenero } = generoHook;

    const {
        showSubModal,
        handleContinue,
        closeSubModal,
        operacion,
        openSubModal,
        generoSeleccionado,
        handleChange,
        errores
    } = useModelGenero(generoHook);

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
                    data={genero}
                    columnas={[
                        { key: "idGenero", label: "ID" },
                        { key: "nombre", label: "Genero" },
                    ]}
                    expandible={[

                    ]}
                    acciones={[
                        { label: "Editar", variant: "primary", icon: "pencil", onClick: (item) => openSubModal(2, item) },
                        { label: "Eliminar", variant: "danger", icon: "trash", onClick: (item) => eliminarGenero(item.idGenero) }
                    ]}
                    idKey="idGenero"
                />
                <SubModal
                    show={showSubModal}
                    handleContinue={handleContinue}
                    handleClose={closeSubModal}
                    titulo={operacion === 2 ? "Editar Género" : "Agregar Género"}
                    width={500}
                    continueText={operacion === 2 ? "Guardar Cambios" : "Agregar"}
                    cancelText="Cancelar"
                    continueVariant="success"
                    backdrop={true}
                    scrollable={false}
                >
                    {/* 📄 Contenido del modal */}
                    <SubModalGenero
                        genero={generoSeleccionado}
                        onChange={handleChange}
                        errores={errores}
                        operacion={operacion}
                    />
                </SubModal>
            </div>
        </>
    );
}

export default Genero;