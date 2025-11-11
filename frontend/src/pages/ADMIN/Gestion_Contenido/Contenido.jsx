import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { useContenido } from "../../../data/useContenido";

function Contenido() {
    const { contenido } = useContenido();

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
                        { label: "Eliminar", variant: "danger", icon: "trash", onClick: (item) => deleteOnClick(item.idFamilia) }
                    ]}
                    idKey="idContenido"
                />
            </div>
        </>
    );
}

export default Contenido;