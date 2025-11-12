import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { usePlan } from "../../../data/usePlan";

function Plan() {
    const { Plan } = usePlan();

    // Funciones de ejemplo para las acciones
    const openSubModal = (tipo, item) => {
        console.log("Editar:", item);
        alert(`Editando: ${item.nombre}`);
    };

    const deleteOnClick = (id) => {
        console.log("Eliminar ID:", id);
        if (confirm(`¿Estás seguro de eliminar la categoría con ID: ${id}?`)) {
            alert(`Categoría con ID: ${id} eliminada`);
        }
    };

    return (
        <>
            <div className="container-fluid p-3 pt-24">
                <TablaToolbar
                    onBack={() => console.log("Exportar")}
                    onExport={() => console.log("Exportar")}
                    onAdd={() => console.log("Exportar")}
                    addLabel="Agregar Ingrediente"
                />

                <TablaReutilizable
                    data={Plan}
                    columnas={[
                        { key: "idPlan", label: "ID" },
                        { key: "nombre", label: "Plan" },
                    ]}
                    expandible={[

                    ]}
                    acciones={[
                        { label: "Editar", variant: "primary", icon: "pencil", onClick: (item) => openSubModal(2, item) },
                        { label: "Eliminar", variant: "danger", icon: "trash", onClick: (item) => deleteOnClick(item.idFamilia) }
                    ]}
                    idKey="idPlan"
                />
            </div>
        </>
    );
}

export default Plan;