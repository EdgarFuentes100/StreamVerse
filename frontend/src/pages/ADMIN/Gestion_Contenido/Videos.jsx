import { useState } from "react";
import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { useContenido } from "../../../data/useContenido";
import { useCategoria } from "../../../data/useCategoria";
import { useReproductor } from "../../../data/useReproductor";

function Videos() {
    const { contenidoCategoria, getContenidoCategoria } = useContenido();
    const { categoria } = useCategoria();
    const { temporadas, getTemporadas, videos, getVideos } = useReproductor();

    const [selectedContenido, setSelectedContenido] = useState("");
    const [selectedTemporada, setSelectedTemporada] = useState("");
    const [selectedCategoria, setSelectedCategoria] = useState("");

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

    const handleCategoria = (categoriaId) => {
        setSelectedCategoria(categoriaId);
        // Limpiar selects dependientes
        setSelectedContenido("");
        setSelectedTemporada("");

        // Cargar contenidos de la categoría seleccionada
        if (categoriaId) {
            getContenidoCategoria(categoriaId);
        }
    };

    const handleContenido = (contenidoId) => { // ✅ Corregí el nombre del parámetro
        setSelectedContenido(contenidoId);
        setSelectedTemporada("");

        // Cargar temporadas del contenido seleccionado
        if (contenidoId) { // ✅ Corregí el nombre de la variable
            getTemporadas(contenidoId);
        }
    };

    const handleTemporada = (temporadaId) => {
        setSelectedTemporada(temporadaId);

        if (temporadaId) { // ✅ Corregí el nombre de la variable
            getVideos(temporadaId);
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

                {/* Selects para filtrar */}
                <div className="bg-gray-600 rounded-lg p-4 mb-6 border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Select de Categoría */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Seleccionar Categoría
                            </label>
                            <select
                                value={selectedCategoria}
                                onChange={(e) => handleCategoria(e.target.value)}
                                className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Todas las categorías --</option>
                                {categoria.map(cat => (
                                    <option key={cat.idCategoria} value={cat.idCategoria}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Select de Contenido */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Seleccionar Contenido
                            </label>
                            <select
                                value={selectedContenido}
                                onChange={(e) => handleContenido(e.target.value)}
                                className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">-- Todos los contenidos --</option>
                                {contenidoCategoria.map(contenido => (
                                    <option key={contenido.idContenido} value={contenido.idContenido}>
                                        {contenido.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Select de Temporada */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Seleccionar Temporada
                            </label>
                            <select
                                value={selectedTemporada}
                                onChange={(e) => handleTemporada(e.target.value)}
                                disabled={!selectedContenido}
                                className="w-full border border-gray-600 bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                <option value="">-- Todas las temporadas --</option>
                                {temporadas.map(temporada => (
                                    <option key={temporada.idTemporada} value={temporada.idTemporada}>
                                        {temporada.nombre || `Temporada ${temporada.numeroTemporada}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <TablaReutilizable
                    data={videos}
                    columnas={[
                        { key: "idEpisodio", label: "ID" },
                        { key: "title", label: "Título" },
                        { key: "capitulo", label: "Capitulo" },
                        { key: "duration", label: "Diracion" },
                        { key: "image", label: "Imagen" },
                    ]}
                    expandible={[]}
                    acciones={[
                        { label: "Editar", variant: "primary", icon: "pencil", onClick: (item) => openSubModal(2, item) },
                        { label: "Eliminar", variant: "danger", icon: "trash", onClick: (item) => deleteOnClick(item.idContenido) }
                    ]}
                    idKey="idContenido"
                />
            </div>
        </>
    );
}

export default Videos;