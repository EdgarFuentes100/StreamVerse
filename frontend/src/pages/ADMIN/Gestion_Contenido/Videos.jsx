import { useState } from "react";
import Select from "react-select";
import TablaReutilizable from "../../../components/TablaReutilizable";
import TablaToolbar from "../../../components/TablaToolbar";
import { useContenido } from "../../../data/useContenido";
import { useCategoria } from "../../../data/useCategoria";
import { useModelEpisodio } from "./data/useModelEpisodio";
import SubModal from "../../../components/SubModal";
import SubModalEpisodio from "./Modal/SubModalEpisodio";
import { useTemporada } from "../../../data/useTemporada";
import { useVideo } from "../../../data/useVideo";

function Videos() {
    const videoHook = useVideo();
    const {
        videos,
        getVideos,
        eliminarVideo,
        selectedCategoria,
        setSelectedCategoria,
        selectedContenido,
        setSelectedContenido,
        selectedTemporada,
        setSelectedTemporada
    } = videoHook;

    const { contenidoCategoria, getContenidoCategoria } = useContenido();
    const { categoria } = useCategoria();
    const { temporadas, getTemporadas } = useTemporada();

    const {
        showSubModal,
        handleContinue,
        closeSubModal,
        operacion,
        openSubModal,
        episodioSeleccionado,
        handleChange,
        errores
    } = useModelEpisodio(videoHook);

    // Convertir arrays a formato react-select
    const opcionesCategoria = categoria.map(cat => ({
        value: cat.idCategoria,
        label: cat.nombre
    }));

    const opcionesContenido = contenidoCategoria.map(contenido => ({
        value: contenido.idContenido,
        label: contenido.title
    }));

    const opcionesTemporada = temporadas.map(temporada => ({
        value: temporada.idTemporada,
        label: temporada.nombre || `Temporada ${temporada.numeroTemporada}`
    }));

    const handleCategoria = (selected) => {
        const categoriaId = selected ? selected.value : "";
        setSelectedCategoria(categoriaId);
        // Limpiar selects dependientes
        setSelectedContenido("");
        setSelectedTemporada("");

        // Cargar contenidos de la categoría seleccionada
        if (categoriaId) {
            getContenidoCategoria(categoriaId);
        }
    };

    const handleContenido = (selected) => {
        const contenidoId = selected ? selected.value : "";
        setSelectedContenido(contenidoId);
        setSelectedTemporada("");

        // Cargar temporadas del contenido seleccionado
        if (contenidoId) {
            getTemporadas(contenidoId);
        }
    };

    const handleTemporada = (selected) => {
        const temporadaId = selected ? selected.value : "";
        setSelectedTemporada(temporadaId);

        if (temporadaId) {
            getVideos(temporadaId);
        }
    };

    return (
        <>
            <div className="container-fluid p-3 pt-24">
                <TablaToolbar
                    onBack={() => console.log("Exportar")}
                    onExport={() => console.log("Exportar")}
                    onAdd={() => openSubModal(1)}
                    addLabel="Agregar Episodio"
                />

                {/* Selects para filtrar CON REACT-SELECT */}
                <div className="bg-gray-600 rounded-lg p-4 mb-6 border border-gray-600">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Select de Categoría */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Seleccionar Categoría
                            </label>
                            <Select
                                options={opcionesCategoria}
                                value={opcionesCategoria.find(o => o.value === Number(selectedCategoria)) || null}
                                onChange={handleCategoria}
                                placeholder="Seleccione una categoría..."
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

                        {/* Select de Contenido */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Seleccionar Contenido
                            </label>
                            <Select
                                options={opcionesContenido}
                                value={opcionesContenido.find(o => o.value === Number(selectedContenido)) || null}
                                onChange={handleContenido}
                                placeholder="Seleccione un contenido..."
                                isClearable
                                isDisabled={!selectedCategoria}
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

                        {/* Select de Temporada */}
                        <div>
                            <label className="block text-gray-300 text-sm font-medium mb-2">
                                Seleccionar Temporada
                            </label>
                            <Select
                                options={opcionesTemporada}
                                value={opcionesTemporada.find(o => o.value === Number(selectedTemporada)) || null}
                                onChange={handleTemporada}
                                placeholder="Seleccione una temporada..."
                                isClearable
                                isDisabled={!selectedContenido}
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
                    data={videos}
                    columnas={[
                        { key: "idEpisodio", label: "ID" },
                        { key: "title", label: "Título" },
                        { key: "capitulo", label: "Capitulo" },
                        { key: "duration", label: "Duración" },
                        { key: "image", label: "Imagen" },
                        { key: "videoUrl", label: "Video" },
                    ]}
                    expandible={[]}
                    acciones={[
                        { label: "Editar", variant: "primary", icon: "pencil", onClick: (item) => openSubModal(2, item) },
                        { label: "Eliminar", variant: "danger", icon: "trash", onClick: (item) => eliminarVideo(item.idEpisodio) }
                    ]}
                    idKey="idEpisodio"
                />

                <SubModal
                    show={showSubModal}
                    handleContinue={handleContinue}
                    handleClose={closeSubModal}
                    titulo={operacion === 2 ? "Editar Episodio" : "Agregar Episodio"}
                    width={700}
                    continueText={operacion === 2 ? "Guardar Cambios" : "Agregar"}
                    cancelText="Cancelar"
                    continueVariant="success"
                    backdrop={true}
                    scrollable={false}
                >
                    {/* 📄 Contenido del modal */}
                    <SubModalEpisodio
                        episodio={episodioSeleccionado}
                        onChange={handleChange}
                        errores={errores}
                        operacion={operacion}
                        // Pasamos los selects actuales
                        selectedCategoria={selectedCategoria}
                        selectedContenido={selectedContenido}
                        selectedTemporada={selectedTemporada}
                        // Pasamos las opciones
                        categorias={categoria}
                        contenidos={contenidoCategoria}
                        temporadas={temporadas}
                        // Pasamos los handlers por si necesitan cambiar
                        onCategoriaChange={handleCategoria}
                        onContenidoChange={handleContenido}
                        onTemporadaChange={handleTemporada}
                    />
                </SubModal>
            </div>
        </>
    );
}

export default Videos;