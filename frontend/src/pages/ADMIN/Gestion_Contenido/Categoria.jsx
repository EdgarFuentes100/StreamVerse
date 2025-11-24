import { useNavigate } from "react-router-dom";
import SubModal from "../../../components/SubModal";
import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { useCategoria } from "../../../data/useCategoria";
import { useModelCategoria } from "./data/useModelCategoria";
import SubModalCategoria from "./Modal/SubModalCategoria";

function Categoria() {
    const categoriaHook = useCategoria();
    const { categoria, eliminarCategoria } = categoriaHook;
    const { showSubModal, handleContinue, closeSubModal, operacion, openSubModal, categoriaSeleccionada, handleChange, errores } = useModelCategoria(categoriaHook);
    const navigate = useNavigate();

    const handleVolver = () => {
        navigate(-1); // Vuelve a la página anterior
    };
    return (
        <div className="container-fluid p-3 pt-24">
            {/* 🧭 Toolbar */}
            <TablaToolbar
                onBack={handleVolver}
                onAdd={() => openSubModal(1)}
                addLabel="Agregar Categoría"
            />

            {/* 📋 Tabla */}
            <TablaReutilizable
                data={categoria}
                columnas={[
                    { key: "idCategoria", label: "ID" },
                    { key: "nombre", label: "Categoría" },
                    { key: "icon", label: "Icono" }
                ]}
                acciones={[
                    {
                        label: "Editar",
                        variant: "primary",
                        icon: "pencil",
                        onClick: (item) => openSubModal(2, item) // 👈 Abrir modal editar
                    },
                    {
                        label: "Eliminar",
                        variant: "danger",
                        icon: "trash",
                        onClick: (item) => eliminarCategoria(item.idCategoria)
                    }
                ]}
                idKey="idCategoria"
            />

            {/* 🪟 SubModal */}
            <SubModal
                show={showSubModal}
                handleContinue={handleContinue}
                handleClose={closeSubModal}
                titulo={operacion === 2 ? "Editar Categoría" : "Agregar Categoría"}
                width={900}
                continueText={operacion === 2 ? "Guardar Cambios" : "Agregar"}
                cancelText="Cancelar"
                continueVariant="success"
                backdrop={true}
                centered={true}
                scrollable={false}
            >
                <SubModalCategoria
                    categoria={categoriaSeleccionada}
                    onChange={handleChange}
                    errores={errores}
                    operacion={operacion}
                />
            </SubModal>
        </div>
    );
}

export default Categoria;
