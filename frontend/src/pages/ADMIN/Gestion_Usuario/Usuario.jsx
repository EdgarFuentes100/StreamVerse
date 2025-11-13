import { useState } from "react";
import SubModal from "../../../components/SubModal";
import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { useUsuario } from "../../../data/useUsuario";
import { useModelUsuario } from "./data/useModelUsuario";
import SubModalUsuario from "./Modal/SubModalUsuario";

function Usuario() {
    const { usuarios, roles, getUsuarioId } = useUsuario();
    const [selectedRol, setSelectedRol] = useState("");

    const {
        showSubModal,
        handleContinue,
        closeSubModal,
        operacion,
        openSubModal,
        usuarioSeleccionado,
        handleChange,
        errores
    } = useModelUsuario();

    const deleteOnClick = (id) => {
        console.log("Eliminar usuario con ID:", id);
    };

    const handleRol = (RolId) => {
        setSelectedRol(RolId);
        if (RolId) {
            getUsuarioId(RolId);
        }
    };

    return (
        <div className="container-fluid p-3 pt-24">
            <TablaToolbar
                onBack={() => console.log("Volver")}
                onExport={() => console.log("Exportar")}
                onAdd={() => openSubModal(1)}
                addLabel="Agregar Usuario"
            />
            {/* Selects para filtrar */}
            <div className="bg-gray-600 rounded-lg p-4 mb-6 border border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Select de Categoría */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Seleccionar Rol
                        </label>
                        <select
                            value={selectedRol}
                            onChange={(e) => handleRol(e.target.value)}
                            className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">-- Todas los roles --</option>
                            {roles.map(rol => (
                                <option key={rol.idRol} value={rol.idRol}>
                                    {rol.rol}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <TablaReutilizable
                data={usuarios}
                columnas={[
                    { key: "idUsuario", label: "ID" },
                    { key: "nombre", label: "Nombre" },
                    { key: "email", label: "Email" },
                    { key: "estado", label: "Estado" },
                    { key: "idRol", label: "Rol" },
                ]}
                acciones={[
                    { label: "Editar", variant: "primary", icon: "pencil", onClick: (item) => openSubModal(2, item) },
                    { label: "Eliminar", variant: "danger", icon: "trash", onClick: (item) => deleteOnClick(item.idUsuario) }
                ]}
                idKey="idUsuario"
            />

            <SubModal
                show={showSubModal}
                handleContinue={handleContinue}
                handleClose={closeSubModal}
                titulo={operacion === 2 ? "Editar Usuario" : "Agregar Usuario"}
                width={650}
                continueText={operacion === 2 ? "Guardar Cambios" : "Agregar"}
                cancelText="Cancelar"
                continueVariant="success"
                backdrop={true}
                scrollable={true}
            >
                <SubModalUsuario
                    usuario={usuarioSeleccionado}
                    onChange={handleChange}
                    errores={errores}
                    operacion={operacion}
                />
            </SubModal>
        </div>
    );
}

export default Usuario;
