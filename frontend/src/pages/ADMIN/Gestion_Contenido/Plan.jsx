import { useNavigate } from "react-router-dom";
import SubModal from "../../../components/SubModal";
import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { usePlan } from "../../../data/usePlan";
import { useModelPlan } from "./data/useModelPlan";
import SubModalPlan from "./Modal/SubModalPlan";

function Plan() {
    const planHook = usePlan()
    const { plan, eliminarPlan } = planHook;
    const navigate = useNavigate();

    const handleVolver = () => {
        navigate(-1); // Vuelve a la página anterior
    };
    const {
        showSubModal,
        handleContinue,
        closeSubModal,
        operacion,
        openSubModal,
        planSeleccionado,
        handleChange,
        errores
    } = useModelPlan(planHook);

    return (
        <>
            <div className="container-fluid p-3 pt-24">
                <TablaToolbar
                    onBack={handleVolver}
                    onAdd={() => openSubModal(1)}
                    addLabel="Agregar Plan"
                />

                <TablaReutilizable
                    data={plan}
                    columnas={[
                        { key: "idPlan", label: "ID" },
                        { key: "nombre", label: "Plan" },
                        { key: "precio", label: "Precio" },
                        { key: "maxPerfil", label: "Cantidad perfiles" },
                        { key: "contenidoExclusivo", label: "Contenido nuevo", isBoolean: true },
                        { key: "contenidoNuevo", label: "Contendio exclusivo", isBoolean: true },
                        { key: "contenidoNuevo", label: "Sin anuncio", isBoolean: true }

                    ]}
                    expandible={[

                    ]}
                    acciones={[
                        { label: "Editar", variant: "primary", icon: "pencil", onClick: (item) => openSubModal(2, item) },
                        { label: "Eliminar", variant: "danger", icon: "trash", onClick: (item) => eliminarPlan(item.idPlan) }
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