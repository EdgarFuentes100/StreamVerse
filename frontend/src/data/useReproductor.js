import { useState, useEffect } from 'react';
import { useFetch } from '../api/useFetch';

const useReproductor = () => {
    const { getFetch } = useFetch();
    const [temporadas, setTemporadas] = useState([]);
    const [videos, setVideos] = useState([]);
    const [videoActual, setVideoActual] = useState([]);
    const [contenidoInfo, setContenidoInfo] = useState([]);
    const [recomendacion, setRecomendacion] = useState([]);
    const [disponible, setDisponible] = useState(false);

    const getTemporadas = (idContenido) => {
        getFetch(`temporada/listadoTemporada/${idContenido}`)
            .then((data) => {
                setTemporadas(data.datos || []);
                console.log("Temporada", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

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

    const getContenidoInfo = (idContenido) => {
        getFetch(`contenido/contenidoInfo/${idContenido}`)
            .then((data) => {
                setContenidoInfo(data.datos[0] || []);
                console.log("informacion", data.datos[0]);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const getRecomendaciones = () => {
        getFetch('contenido/listado')
            .then((data) => {
                setRecomendacion(data.datos || []);
                console.log("informacion", data.datos);
            })
            .catch((error) => {
                console.error('Error al obtener:', error);
            });
    };

    const getVerficarPermiso = (idContenido) => {
        getFetch(`plan/verificarPermisoVideo/${idContenido}`)
            .then((data) => {
                setDisponible(data.datos.existe);
                console.log("SI EXISTE",data.datos.existe);
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

    useEffect(() => {
        getRecomendaciones();
    }, []);

    return {
        temporadas,
        videos,
        videoActual,
        contenidoInfo,
        getTemporadas,
        getVideos,
        getVideoActual,
        getContenidoInfo,
        recomendacion,
        getVerficarPermiso,
        disponible
    };
};

export { useReproductor };
