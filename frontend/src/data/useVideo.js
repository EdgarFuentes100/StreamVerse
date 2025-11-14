import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useVideo = () => {
    const { getFetch, postFetch, putFetch, deleteFetch } = useFetch();
    const [videos, setVideos] = useState([]);
    const [videoActual, setVideoActual] = useState([]);
    const [selectedContenido, setSelectedContenido] = useState("");
    const [selectedTemporada, setSelectedTemporada] = useState("");
    const [selectedCategoria, setSelectedCategoria] = useState("");


    const getVideos = (idTemporada) => {
        getFetch(`episodio/listadoEpisodio/${idTemporada}`)
            .then((data) => {
                setVideos(data.datos || []);
                console.log("videos", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const getVideoActual = (idVideo) => {
        getFetch(`episodio/episodioActual/${idVideo}`)
            .then((data) => {
                setVideoActual(data.datos[0] || []);
                console.log("espiidodio", data.datos[0]);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    useEffect(() => {
        getVideos();
    }, []);

    useEffect(() => {
        getVideoActual();
    }, []);

    // ======== PETICIONES CRUD ========
    const crearVideo = (body) => {
        return postFetch('episodio/crear', body)
            .then((data) => {
                if (data.datos.ok) getVideos(selectedTemporada);
                return data;
            })
            .catch((err) => {
                console.error('Error al crear:', err);
            });
    };

    const actualizarVideo = (id, body) => {
        return putFetch(`episodio/editar/${id}`, body)
            .then((data) => {
                if (data.datos.ok) getVideos(selectedTemporada);
                return data;
            })
            .catch((err) => {
                console.error('Error al actualizar:', err);
            });
    };

    const eliminarVideo = (id) => {
        return deleteFetch(`episodio/eliminar/${id}`)
            .then((data) => {
                if (data.datos.ok) getVideos(selectedTemporada);
                return data;
            })
            .catch((err) => {
                console.error('Error al eliminar:', err);
            });
    };

    return {
        videos,
        videoActual,
        getVideos,
        getVideoActual,
        crearVideo,
        actualizarVideo,
        eliminarVideo,
        selectedCategoria,
        setSelectedCategoria,
        selectedContenido,
        setSelectedContenido,
        selectedTemporada,
        setSelectedTemporada
    };
};

export { useVideo };
