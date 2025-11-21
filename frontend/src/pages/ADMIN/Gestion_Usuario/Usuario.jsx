import { useState } from "react";
import Select from "react-select"; // ✅ Faltaba importar Select
import SubModal from "../../../components/SubModal";
import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { useUsuario } from "../../../data/useUsuario";
import { useModelUsuario } from "./data/useModelUsuario";
import SubModalUsuario from "./Modal/SubModalUsuario";
import { useRol } from "../../../data/useRol";

function Usuario() {
    const usuarioHook = useUsuario();
    const { usuarios, selectedRol, handleRol, eliminarUsuario } = usuarioHook;
    const { roles } = useRol();

    const opcionesRoles = roles.map(item => ({
        value: item.idRol,
        label: item.rol
    }));

    const {
        showSubModal,
        handleContinue,
        closeSubModal,
        operacion,
        openSubModal,
        usuarioSeleccionado,
        handleChange,
        errores
    } = useModelUsuario(usuarioHook);

    // ✅ Handler corregido para el select de roles
    const handleRolSelect = (selected) => {
        const rolId = selected ? selected.value : "";
        handleRol(rolId); // Usar el handleRol del hook
    };

    return (
        <div className="container-fluid p-3 pt-24">
            <TablaToolbar
                onBack={() => console.log("Volver")}
                onExport={() => console.log("Exportar")}
                onAdd={() => openSubModal(1)} // ✅ Descomentado
                addLabel="Agregar Usuario"
            />
            
            {/* Selects para filtrar */}
            <div className="bg-gray-600 rounded-lg p-4 mb-6 border border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Select de Rol - CORREGIDO */}
                    <div>
                        <label className="block text-gray-300 text-sm font-medium mb-2">
                            Seleccionar Rol
                        </label>
                        <Select
                            options={opcionesRoles}
                            value={opcionesRoles.find(o => o.value === Number(selectedRol)) || null} // ✅ Usar selectedRol, no usuarioSeleccionado
                            onChange={handleRolSelect} // ✅ Handler corregido
                            placeholder="Seleccione un rol..."
                            isClearable
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: '#374151',
                                    borderColor: '#4B5563',
                                    color: 'white',
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: 'white',
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: '#374151',
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isFocused ? '#4B5563' : '#374151',
                                    color: 'white',
                                }),
                                placeholder: (base) => ({
                                    ...base,
                                    color: '#9CA3AF',
                                }),
                            }}
                        />
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
                    //{ label: "Eliminar", variant: "danger", icon: "trash", onClick: (item) => eliminarUsuario(item.idUsuario) }
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