import SubModal from "../../../components/SubModal";
import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { useContenido } from "../../../data/useContenido";
import { useModelPlan } from "./data/useModelPlan";
import SubModalPlan from "./Modal/SubModalPlan";

function Plan() {
    const { plan } = useContenido();

    const {
        showSubModal,
        handleContinue,
        closeSubModal,
        operacion,
        openSubModal,
        planSeleccionado,
        handleChange,
        errores
    } = useModelPlan();

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
                    data={plan}
                    columnas={[
                        { key: "idPlan", label: "ID" },
                        { key: "nombre", label: "Plan" },
                        { key: "precio", label: "Precio" },
                        { key: "maxPerfil", label: "Cantidad perfiles" }
                    ]}
                    expandible={[

                    ]}
                    acciones={[
                        { label: "Editar", variant: "primary", icon: "pencil", onClick: (item) => openSubModal(2, item) },
                        { label: "Eliminar", variant: "danger", icon: "trash", onClick: (item) => deleteOnClick(item.idFamilia) }
                    ]}
                    idKey="idPlan"
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
                    <SubModalPlan
                        plan={planSeleccionado}
                        onChange={handleChange}
                        errores={errores}
                        operacion={operacion}
                    />
                </SubModal>
            </div>
        </>
    );
}

export default Plan;