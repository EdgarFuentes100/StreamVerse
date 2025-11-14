import SubModal from "../../../components/SubModal";
import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { useRol } from "../../../data/useRol";
import { useModelRol } from "./data/useModelRol";
import SubModalRol from "./Modal/SubModalRol";

function Rol() {
    const rolHook = useRol();
    const { roles, eliminarRol } = rolHook;

    const {
        showSubModal,
        handleContinue,
        closeSubModal,
        operacion,
        openSubModal,
        rolSeleccionado,
        handleChange,
        errores
    } = useModelRol(rolHook);

    return (
        <div className="container-fluid p-3 pt-24">
            <TablaToolbar
                onBack={() => console.log("Volver")}
                onExport={() => console.log("Exportar")}
                onAdd={() => openSubModal(1)}
                addLabel="Agregar Rol"
            />

            <TablaReutilizable
                data={roles}
                columnas={[
                    { key: "idRol", label: "ID" },
                    { key: "rol", label: "Nombre del Rol" },
                ]}
                acciones={[
                    { label: "Editar", variant: "primary", icon: "pencil", onClick: (item) => openSubModal(2, item) },
                    { label: "Eliminar", variant: "danger", icon: "trash", onClick: (item) => eliminarRol(item.idRol) }
                ]}
                idKey="idRol"
            />

            <SubModal
                show={showSubModal}
                handleContinue={handleContinue}
                handleClose={closeSubModal}
                titulo={operacion === 2 ? "Editar Rol" : "Agregar Rol"}
                width={500}
                continueText={operacion === 2 ? "Guardar Cambios" : "Agregar"}
                cancelText="Cancelar"
                continueVariant="success"
                backdrop={true}
                scrollable={false}
            >
                <SubModalRol
                    rol={rolSeleccionado}
                    onChange={handleChange}
                    errores={errores}
                    operacion={operacion}
                />
            </SubModal>
        </div>
    );
}

export default Rol;
